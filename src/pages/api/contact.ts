import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import nodemailer from "nodemailer";

export const prerender = false;

const MIN_SUBMIT_MS = 3000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const contactBodySchema = z.object({
	name: z.string().trim().min(1, "Todos os campos são obrigatórios"),
	email: z.email("Email inválido").trim().min(1, "Todos os campos são obrigatórios"),
	message: z.string().trim().min(1, "Todos os campos são obrigatórios"),
	website: z.string().optional(),
	_ts: z.union([z.number(), z.string()]).optional(),
});

function getClientIp(request: Request): string {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) {
		return forwarded.split(",")[0]?.trim() ?? "unknown";
	}
	return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitStore.get(ip);

	if (!entry || now >= entry.resetAt) {
		rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
		return false;
	}

	if (entry.count >= RATE_LIMIT_MAX) {
		return true;
	}

	entry.count += 1;
	return false;
}

function isSpamPayload(data: z.infer<typeof contactBodySchema>): boolean {
	if ((data.website ?? "").trim().length > 0) {
		return true;
	}

	const loadedAt = typeof data._ts === "string" ? Number(data._ts) : (data._ts ?? NaN);
	if (!Number.isFinite(loadedAt) || Date.now() - loadedAt < MIN_SUBMIT_MS) {
		return true;
	}

	return false;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const clientIp = getClientIp(request);
		if (isRateLimited(clientIp)) {
			return new Response(JSON.stringify({ error: "Muitas tentativas. Tente novamente mais tarde." }), { status: 429 });
		}

		const raw: unknown = await request.json();
		const parsed = contactBodySchema.safeParse(raw);

		if (!parsed.success) {
			const message = parsed.error.issues[0]?.message ?? "Dados inválidos";
			return new Response(JSON.stringify({ error: message }), { status: 400 });
		}

		if (isSpamPayload(parsed.data)) {
			return new Response(JSON.stringify({ error: "Não foi possível enviar." }), { status: 400 });
		}

		const { name, email, message } = parsed.data;

		const emailUser = getSecret("EMAIL_USER");
		const emailPass = getSecret("EMAIL_PASS");

		if (!emailUser || !emailPass) {
			return new Response(JSON.stringify({ error: "Servidor não configurado" }), { status: 500 });
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: emailUser,
				pass: emailPass,
			},
		});

		await transporter.sendMail({
			from: `"${name}" <${emailUser}>`,
			to: emailUser,
			subject: `Nova mensagem de contato de ${name} no site do Portifolio`,
			text: `Email: ${email}\n\n${message}`,
			replyTo: email,
		});

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ success: false, error: "Erro interno no servidor" }), { status: 500 });
	}
};
