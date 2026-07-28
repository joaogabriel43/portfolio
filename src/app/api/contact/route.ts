import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Types ────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ApiSuccessResponse = { success: true };
type ApiErrorResponse = { error: string };

// ─── In-memory rate limit store ───────────────────────────────
// Note: resets on cold start — acceptable for portfolio use
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ─── Input sanitization ───────────────────────────────────────
function sanitize(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

// ─── Server-side validation ───────────────────────────────────
function validate(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" || name.trim().length < 2 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof subject !== "string" || subject.trim().length < 3 ||
    typeof message !== "string" || message.trim().length < 10
  ) {
    return null;
  }

  return {
    name: sanitize(name),
    email: sanitize(email),
    subject: sanitize(subject),
    message: sanitize(message),
  };
}

// ─── Email HTML template ──────────────────────────────────────
function buildEmailHtml(data: ContactPayload): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1d1d1f; background: #ffffff; padding: 32px; border: 1px solid #d2d2d7; border-radius: 12px;">
      <h2 style="color: #2f5d75; margin: 0 0 24px; font-size: 18px; font-weight: 500; letter-spacing: -0.02em;">
        Nova mensagem do portfólio
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6e6e73; width: 80px; font-size: 13px;">Nome</td>
          <td style="padding: 8px 0; font-size: 13px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6e6e73; font-size: 13px;">Email</td>
          <td style="padding: 8px 0; font-size: 13px;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6e6e73; font-size: 13px;">Assunto</td>
          <td style="padding: 8px 0; font-size: 13px;">${data.subject}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 20px 0;" />
      <p style="font-size: 14px; line-height: 1.7; color: #1d1d1f; white-space: pre-wrap;">${data.message}</p>
    </div>
  `;
}

// ─── POST handler ─────────────────────────────────────────────
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  // IP extraction (Vercel forwards via x-forwarded-for)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em 1 hora." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  // Server-side validation
  const payload = validate(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Dados inválidos. Verifique os campos e tente novamente." },
      { status: 400 }
    );
  }

  // Send email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail || apiKey === "re_sua_chave_aqui") {
    // Graceful fallback in dev without real API key
    console.info("[contact] Email skipped — RESEND_API_KEY not configured.");
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(apiKey);

    // ATENÇÃO: o SDK do Resend NÃO lança exceção quando a API rejeita o envio —
    // ele resolve com { data: null, error }. Ignorar esse retorno faz a rota
    // responder 200 mesmo quando nenhum e-mail foi enviado (falso sucesso).
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: payload.email,
      subject: `[Portfólio] ${payload.subject}`,
      html: buildEmailHtml(payload),
    });

    if (error) {
      console.error("[contact] Resend rejeitou o envio:", error.name, "-", error.message);
      return NextResponse.json(
        { error: "Falha ao enviar mensagem. Tente novamente." },
        { status: 502 }
      );
    }

    console.info("[contact] E-mail enviado. id:", data?.id);
  } catch (err) {
    // Falha de rede/transporte — o SDK só lança nesses casos
    console.error("[contact] Email send failed:", (err as Error).name);
    return NextResponse.json(
      { error: "Falha ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
