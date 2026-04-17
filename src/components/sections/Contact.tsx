"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactForm } from "@/components/ui/ContactForm";
import { personal } from "@/data/personal";
import { Parallax3DLayer } from "@/components/ui/Parallax3DLayer";

// ─── Build social links from personal.ts ─────────────────────
// Strip protocol prefix for display value
function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

const SOCIAL_LINKS = [
  {
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    label: "GitHub",
    value: stripProtocol(personal.github),
    href: personal.github,
  },
  {
    label: "LinkedIn",
    value: stripProtocol(personal.linkedin),
    href: personal.linkedin,
  },
] as const;

// ─── Animated social link ─────────────────────────────────────
function SocialLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className="group flex items-center gap-4"
      whileHover="hovered"
      aria-label={`${label}: ${value}`}
    >
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted/50 w-16 shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-2 overflow-hidden">
        <motion.span
          className="font-sans text-sm text-foreground/70 group-hover:text-accent transition-colors duration-200"
          variants={{ hovered: { x: 6 } }}
          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {value}
        </motion.span>
        <motion.span
          className="text-accent text-sm"
          variants={{
            initial: { opacity: 0, x: -6 },
            hovered: { opacity: 1, x: 0 },
          }}
          initial="initial"
          transition={{ duration: 0.18 }}
        >
          →
        </motion.span>
      </div>
    </motion.a>
  );
}

// ─── Contact section ──────────────────────────────────────────
export function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <Parallax3DLayer depth={0.8} className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* ── Left: info ── */}
          <div>
            <div className="mb-5">
              <SectionLabel index={6}>contato</SectionLabel>
            </div>

            <AnimatedText
              as="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
              delay={0.08}
            >
              Vamos trabalhar
              <br />
              <span className="text-accent">juntos.</span>
            </AnimatedText>

            <AnimatedText delay={0.14}>
              <p className="font-sans text-muted text-base leading-relaxed mb-8">
                Aberto a oportunidades de trabalho, projetos freelance ou
                simplesmente uma boa conversa sobre tecnologia. Me manda uma
                mensagem.
              </p>
            </AnimatedText>

            {/* Availability badge */}
            <AnimatedText delay={0.18}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm border border-white/8 bg-white/[0.03] mb-10">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-green-400" />
                </span>
                <span className="font-mono text-[11px] text-muted tracking-wide">
                  Disponível para novas oportunidades
                </span>
              </div>
            </AnimatedText>

            {/* Social links from personal.ts */}
            <AnimatedText delay={0.22}>
              <div className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </AnimatedText>
          </div>

          {/* ── Right: form ── */}
          <AnimatedText delay={0.1}>
            <ContactForm />
          </AnimatedText>
        </div>
      </Parallax3DLayer>

      {/* Footer */}
      <div className="container-main mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} — Todos os direitos reservados.
        </p>
        <p className="font-mono text-xs text-muted/40">
          Next.js 14 · Tailwind · Framer Motion
        </p>
      </div>
    </section>
  );
}
