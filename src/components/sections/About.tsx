"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, GraduationCap, Zap } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Parallax3DLayer } from "@/components/ui/Parallax3DLayer";

// ─── Highlighted keyword inline component ─────────────────────
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-foreground/90 font-sans">
      {children}
    </strong>
  );
}

// ─── Single metric — minimal underline style ──────────────────
interface MetricProps {
  value: string;
  label: string;
  delay: number;
  isInView: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
}

function Metric({ value, label, delay, isInView, borderRight, borderBottom }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={[
        "group py-6 px-4",
        borderRight ? "border-r border-white/[0.07]" : "",
        borderBottom ? "border-b border-white/[0.07]" : "",
      ].join(" ")}
    >
      <p className="font-serif text-[2.8rem] font-bold text-accent leading-none mb-2">
        {value}
      </p>
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted leading-snug whitespace-pre-line">
        {label}
      </p>
      {/* Accent underline — expands on hover */}
      <div className="w-10 h-px bg-accent/30 mt-3 transition-[width] duration-300 ease-out group-hover:w-full" />
    </motion.div>
  );
}

// ─── About data ───────────────────────────────────────────────
const METRICS = [
  { value: "4",    label: "Anos de\nexperiência" },
  { value: "2",    label: "Empresas\nno currículo" },
  { value: "10+",  label: "Tecnologias\nno dia a dia" },
  { value: "2025", label: "Formação\nSistemas de Info." },
];

const QUICK_FACTS = [
  { Icon: MapPin,         text: "Porto Alegre, RS" },
  { Icon: GraduationCap, text: "Aberto a oportunidades" },
  { Icon: Zap,           text: "Resposta em 24h" },
] as const;

// ─── About section ────────────────────────────────────────────
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
        {/*
         * New layout:
         * Left  — label + title + bio + quick facts + metrics
         * Right — round photo (top-aligned, smaller)
         */}
        <Parallax3DLayer depth={0.8}>
          {/* ── Label ── */}
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

          {/* ── Title (full width, above float) ── */}
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

          {/* ── Float container: photo right, bio wraps around ── */}
          <div className="after:content-[''] after:block after:clear-both">

            {/* Photo — floats right on md+, centered block on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mx-auto mb-6 block md:float-right md:ml-10 md:mb-4 md:mt-1 md:mx-0 w-fit"
            >
              <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/avatar.jpg"
                  alt="João Gabriel Nascimento — Desenvolvedor Full-Stack"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 200px, 240px"
                  priority
                />
                {/* Subtle bottom vignette */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none rounded-b-full"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.3))",
                  }}
                />
              </div>
            </motion.div>

            {/* Bio paragraphs — flow around photo */}
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
                      Bacharel em <Kw>Sistemas de Informação</Kw> pela Unisinos
                      (2025), busco oportunidades para aplicar
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
                  className="font-sans text-muted text-lg leading-[1.9]"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Quick facts — also flows around photo */}
            <motion.div
              custom={0.34}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-border"
            >
              {QUICK_FACTS.map(({ Icon, text }) => (
                <span
                  key={text}
                  className="font-mono text-[11px] text-muted flex items-center gap-2"
                >
                  <Icon size={13} strokeWidth={1.5} className="text-accent/60 shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Metrics grid — below float ── */}
          <motion.div
            custom={0.42}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 clear-both"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {METRICS.map(({ value, label }, i) => (
                <Metric
                  key={label}
                  value={value}
                  label={label}
                  delay={0.44 + i * 0.06}
                  isInView={isInView}
                  borderRight={i < METRICS.length - 1}
                  borderBottom={false}
                />
              ))}
            </div>
          </motion.div>
        </Parallax3DLayer>
      </div>
    </section>
  );
}
