import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { resolveLocale } from "../../locales";

export const prerender = false;

export type ContactErrorCode = "validation" | "spam" | "config" | "server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const contactBodySchema = z.object({
	name: z.string().trim().min(1),
	email: z.email().trim().min(1),
	message: z.string().trim().min(1),
	website: z.string().optional(),
	locale: z.string().optional(),
});

interface Web3FormsResponse {
	success: boolean;
	message?: string;
}

function jsonError(error: ContactErrorCode, status: number): Response {
	return new Response(JSON.stringify({ error }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

function isWeb3FormsResponse(value: unknown): value is Web3FormsResponse {
	if (typeof value !== "object" || value === null) {
		return false;
	}
	if (!("success" in value) || typeof value.success !== "boolean") {
		return false;
	}
	return true;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const raw: unknown = await request.json();
		const parsed = contactBodySchema.safeParse(raw);

		if (!parsed.success) {
			return jsonError("validation", 400);
		}

		if ((parsed.data.website ?? "").trim().length > 0) {
			return jsonError("spam", 400);
		}

		const { name, email, message } = parsed.data;
		const locale = resolveLocale(parsed.data.locale);

		const accessKey = getSecret("WEB3FORMS_ACCESS_KEY");
		if (!accessKey) {
			return jsonError("config", 500);
		}

		const subject =
			locale === "en"
				? `New portfolio contact message from ${name}`
				: `Nova mensagem de contato de ${name} no site do Portfólio`;

		const upstream = await fetch(WEB3FORMS_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				access_key: accessKey,
				name,
				email,
				message,
				subject,
				replyto: email,
				from_name: name,
			}),
		});

		const upstreamBody: unknown = await upstream.json().catch(() => null);
		if (!upstream.ok || !isWeb3FormsResponse(upstreamBody) || !upstreamBody.success) {
			return jsonError("server", 502);
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return jsonError("server", 500);
	}
};
