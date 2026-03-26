"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

// ─── Highlighted keyword inline component ─────────────────────
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-foreground/90 font-sans">
      {children}
    </strong>
  );
}

// ─── Single metric card ───────────────────────────────────────
interface MetricProps {
  value: string;
  label: string;
  delay: number;
  isInView: boolean;
}

function Metric({ value, label, delay, isInView }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative bg-surface border border-border rounded-sm p-6 hover:border-accent/30 transition-colors duration-300"
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-6 h-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-px h-6 bg-accent/30 group-hover:bg-accent/60 transition-colors duration-300" />
        <div className="absolute top-0 left-0 w-6 h-px bg-accent/30 group-hover:bg-accent/60 transition-colors duration-300" />
      </div>

      <p className="font-serif text-4xl font-bold text-accent mb-2 leading-none">
        {value}
      </p>
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted leading-snug">
        {label}
      </p>
    </motion.div>
  );
}

// ─── About section ────────────────────────────────────────────
const METRICS = [
  { value: "3+",  label: "Anos de\nexperiência" },
  { value: "2",   label: "Empresas\nno currículo" },
  { value: "10+", label: "Tecnologias\nno dia a dia" },
  { value: "2026", label: "Formação\nSistemas de Info." },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const textVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
  };

  return (
    <section
      ref={ref}
      id="about"
      className="section-padding border-t border-border"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 xl:gap-24 items-start">
          {/* ── Left: label + bio ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <SectionLabel index={1} animate={false}>
                sobre mim
              </SectionLabel>
            </motion.div>

            <motion.h2
              custom={0.08}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 leading-[1.1]"
            >
              Desenvolvedor focado em{" "}
              <em className="italic text-accent">qualidade</em>
              <br />e clareza de código.
            </motion.h2>

            <div className="space-y-5">
              {[
                {
                  delay: 0.14,
                  text: (
                    <>
                      Sou desenvolvedor de software com experiência profissional
                      em <Kw>C#/.NET</Kw>, <Kw>Angular</Kw> e{" "}
                      <Kw>SQL Server</Kw>, atuando na{" "}
                      <Kw>Intermidia</Kw> desde abril de 2023. Venho aprofundando
                      intensivamente minhas competências em back-end com{" "}
                      <Kw>Java</Kw> e <Kw>Spring Boot 3</Kw>.
                    </>
                  ),
                },
                {
                  delay: 0.2,
                  text: (
                    <>
                      Acredito que bom software não é apenas o que funciona
                      hoje — é o que pode ser mantido, testado e{" "}
                      <Kw>evoluído por anos</Kw>. Por isso aplico princípios
                      de <Kw>Clean Architecture</Kw>, <Kw>SOLID</Kw> e boas
                      práticas de <Kw>testes automatizados</Kw> em cada
                      entrega.
                    </>
                  ),
                },
                {
                  delay: 0.26,
                  text: (
                    <>
                      Cursando <Kw>Sistemas de Informação</Kw> na Unisinos
                      (conclusão em 2026), busco oportunidades para aplicar
                      conhecimento <Kw>full-stack</Kw> em projetos desafiadores
                      e com impacto real.
                    </>
                  ),
                },
              ].map(({ delay, text }, i) => (
                <motion.p
                  key={i}
                  custom={delay}
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="font-sans text-muted leading-relaxed text-base"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Divider + quick facts row */}
            <motion.div
              custom={0.34}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-border"
            >
              {[
                { icon: "📍", text: "Porto Alegre, RS" },
                { icon: "🎓", text: "Aberto a oportunidades" },
                { icon: "⚡", text: "Resposta em 24h" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="font-mono text-[11px] text-muted flex items-center gap-2"
                >
                  <span>{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: photo + metrics ── */}
          <div className="flex flex-col gap-6">
            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto lg:mx-0">
                {/* Offset border accent */}
                <div
                  className="absolute inset-0 rounded-sm border border-accent/20"
                  style={{ transform: "translate(6px, 6px)" }}
                />
                {/* Photo container */}
                <div className="relative w-full h-full rounded-sm overflow-hidden border border-border/60 bg-surface">
                  <Image
                    src="/avatar.jpg"
                    alt="João Gabriel Nascimento — Desenvolvedor Full-Stack"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 280px, 280px"
                    priority
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(10,10,10,0.4))",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 2×2 metrics grid */}
            <div className="grid grid-cols-2 gap-3">
              {METRICS.map(({ value, label }, i) => (
                <Metric
                  key={label}
                  value={value}
                  label={label}
                  delay={0.18 + i * 0.08}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
