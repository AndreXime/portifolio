import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import nodemailer from "nodemailer";

export const prerender = false;

const contactBodySchema = z.object({
	name: z.string().trim().min(1, "Todos os campos são obrigatórios"),
	email: z.email("Email inválido").trim().min(1, "Todos os campos são obrigatórios"),
	message: z.string().trim().min(1, "Todos os campos são obrigatórios"),
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const raw: unknown = await request.json();
		const parsed = contactBodySchema.safeParse(raw);

		if (!parsed.success) {
			const message = parsed.error.issues[0]?.message ?? "Dados inválidos";
			return new Response(JSON.stringify({ error: message }), { status: 400 });
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
