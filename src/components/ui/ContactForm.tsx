"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// ─── Types ────────────────────────────────────────────────────
interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Spinner ──────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Mensagem de erro de validação ────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 font-mono text-[11px] text-negative">
      {message}
    </p>
  );
}

// ─── ContactForm ──────────────────────────────────────────────
export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Antes da hidratação não existe handler de submit: um clique no botão
  // dispararia o submit NATIVO do browser, navegando para
  // /?name=...&email=...&message=... e vazando os dados na URL.
  // Manter o botão desabilitado no HTML do servidor elimina essa janela.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ mode: "onBlur" });

  const onSubmit = async (data: FormFields) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Erro desconhecido");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      console.error("[ContactForm]", (err as Error).message);
    }
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5" noValidate>
      <div>
        <label htmlFor="contact-name" className="sr-only">
          Nome
        </label>
        <input
          id="contact-name"
          {...register("name", {
            required: "Nome é obrigatório",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          placeholder="Nome"
          autoComplete="name"
          disabled={isLoading}
          aria-invalid={!!errors.name}
          className="field"
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          Email
        </label>
        <input
          id="contact-email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          })}
          type="email"
          placeholder="Email"
          autoComplete="email"
          disabled={isLoading}
          aria-invalid={!!errors.email}
          className="field"
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="contact-subject" className="sr-only">
          Assunto
        </label>
        <input
          id="contact-subject"
          {...register("subject", {
            required: "Assunto é obrigatório",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          placeholder="Assunto"
          disabled={isLoading}
          aria-invalid={!!errors.subject}
          className="field"
        />
        <FieldError message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          {...register("message", {
            required: "Mensagem é obrigatória",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
          placeholder="Mensagem"
          rows={5}
          disabled={isLoading}
          aria-invalid={!!errors.message}
          className="field"
        />
        <FieldError message={errors.message?.message} />
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isLoading || !hydrated}
          className="btn-pill px-[26px]"
        >
          {isLoading && <Spinner />}
          {isLoading ? "Enviando" : "Enviar mensagem"}
        </button>

        {/* Feedback de envio — equivalente ao [data-status] do protótipo.
            CSS puro em vez de framer-motion: mantém a home fora do bundle da lib. */}
        <div aria-live="polite" className="font-mono text-[11px]">
          {status === "success" && (
            <span className="animate-slide-up text-positive">
              Mensagem enviada.
            </span>
          )}
          {status === "error" && (
            <span className="animate-slide-up text-negative">
              Falha ao enviar — envie e-mail direto.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
