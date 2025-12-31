import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Todos os campos são obrigatórios" }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return new Response(JSON.stringify({ error: "Servidor não configurado" }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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
