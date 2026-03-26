"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

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
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── ContactForm ──────────────────────────────────────────────
export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

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

  const inputBase = [
    "w-full bg-transparent border border-white/10 rounded-sm",
    "px-4 py-3 font-sans text-sm text-foreground",
    "placeholder:text-muted/50",
    "focus:outline-none focus:border-accent",
    "transition-colors duration-200",
  ].join(" ");

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Name */}
      <div>
        <input
          {...register("name", {
            required: "Nome é obrigatório",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          placeholder="Nome"
          disabled={isLoading}
          aria-invalid={!!errors.name}
          className={inputBase}
        />
        {errors.name && (
          <p className="font-mono text-[11px] text-red-400 mt-1.5">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          {...register("email", {
            required: "Email é obrigatório",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
          })}
          type="email"
          placeholder="Email"
          disabled={isLoading}
          aria-invalid={!!errors.email}
          className={inputBase}
        />
        {errors.email && (
          <p className="font-mono text-[11px] text-red-400 mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <input
          {...register("subject", {
            required: "Assunto é obrigatório",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          placeholder="Assunto"
          disabled={isLoading}
          aria-invalid={!!errors.subject}
          className={inputBase}
        />
        {errors.subject && (
          <p className="font-mono text-[11px] text-red-400 mt-1.5">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          {...register("message", {
            required: "Mensagem é obrigatória",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
          placeholder="Mensagem"
          rows={5}
          disabled={isLoading}
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none`}
        />
        {errors.message && (
          <p className="font-mono text-[11px] text-red-400 mt-1.5">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className={[
          "w-full flex items-center justify-center gap-2.5",
          "px-5 py-3 rounded-sm font-sans font-medium text-sm",
          "bg-accent text-background border border-accent",
          "hover:bg-accent-dim hover:border-accent-dim",
          "transition-colors duration-200 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" ")}
        whileHover={!isLoading ? { y: -1 } : undefined}
        whileTap={!isLoading ? { scale: 0.98 } : undefined}
      >
        {isLoading && <Spinner />}
        {isLoading ? "Enviando..." : "Enviar mensagem"}
      </motion.button>

      {/* Status feedback */}
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-mono text-xs text-accent text-center py-1"
          >
            ✓ Mensagem enviada com sucesso!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-mono text-xs text-red-400 text-center py-1"
          >
            Falha ao enviar. Tente novamente ou envie email direto.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
