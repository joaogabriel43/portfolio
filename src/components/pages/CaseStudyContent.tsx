"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project, CaseStudy } from "@/data/projects";
import { SkillTag } from "@/components/ui/SkillTag";

// ─── Types ────────────────────────────────────────────────────
interface Props {
  project: Project & { caseStudy: CaseStudy };
}

// ─── Animation helpers ────────────────────────────────────────
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" } as const,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay },
  };
}

// ─── Icons ───────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// ─── Routing Diagram (FortunAI) ──────────────────────────────
function RoutingDiagram() {
  const outputs = [
    { label: "Local", sub: "CatalogoAtivoService", note: "zero custo de API", color: "text-[#7ac97a] border-[#7ac97a]/30 bg-[#7ac97a]/5" },
    { label: "Alpha Vantage", sub: "cache PostgreSQL 24h", note: "cotações de mercado", color: "text-[#7a9dc9] border-[#7a9dc9]/30 bg-[#7a9dc9]/5" },
    { label: "Gemini", sub: "consultas abertas", note: "interpretação NLU", color: "text-accent border-accent/30 bg-accent/5" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 p-6 bg-surface border border-border rounded-sm overflow-x-auto">
      {/* Input node */}
      <div className="shrink-0 px-4 py-3 border border-border rounded-sm text-center min-w-[120px]">
        <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">input</p>
        <p className="font-sans text-sm text-foreground/80">Mensagem do usuário</p>
      </div>
      <div className="sm:mx-4 flex sm:flex-row flex-col items-center gap-1 text-muted shrink-0">
        <span className="hidden sm:block text-muted/60 text-xl leading-none">→</span>
        <span className="block sm:hidden text-muted/60 text-xl leading-none">↓</span>
      </div>
      {/* Router node */}
      <div className="shrink-0 px-4 py-3 border-2 border-accent/40 bg-accent/5 rounded-sm text-center min-w-[140px]">
        <p className="font-mono text-[10px] text-accent/70 uppercase tracking-widest mb-1">roteador</p>
        <p className="font-sans text-sm text-accent font-medium">Classificação inteligente</p>
        <p className="font-mono text-[9px] text-muted mt-1">3 níveis de roteamento</p>
      </div>
      <div className="sm:mx-4 flex items-center text-muted shrink-0">
        <span className="hidden sm:block text-muted/60 text-xl leading-none">→</span>
        <span className="block sm:hidden text-muted/60 text-xl leading-none">↓</span>
      </div>
      {/* Output nodes */}
      <div className="flex flex-col gap-2 shrink-0">
        {outputs.map((o) => (
          <div key={o.label} className={`px-3 py-2 border rounded-sm text-left min-w-[180px] ${o.color}`}>
            <p className="font-mono text-[11px] font-medium">{o.label}</p>
            <p className="font-mono text-[9px] text-muted/70 mt-0.5">{o.sub} — {o.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Delivery Diagram (NotifyFlow) ───────────────────────────
function DeliveryDiagram() {
  const pipeline = [
    { id: "api",      label: "API",        sub: "POST /notifications", cls: "border-border" },
    { id: "pg",       label: "PostgreSQL", sub: "Outbox · PENDING",    cls: "border-accent/40 bg-accent/5 text-accent" },
    { id: "sched",    label: "Scheduler",  sub: "polling 5s",          cls: "border-border" },
    { id: "rmq",      label: "RabbitMQ",   sub: "exchange principal",  cls: "text-[#7a9dc9] border-[#7a9dc9]/30 bg-[#7a9dc9]/5" },
    { id: "consumer", label: "Consumer",   sub: "fallback engine",     cls: "border-border" },
  ];

  const channels = [
    { id: "email", label: "EMAIL", sub: "SendGrid",          cls: "text-[#7ac97a] border-[#7ac97a]/30 bg-[#7ac97a]/5", last: false },
    { id: "sms",   label: "SMS",   sub: "Twilio",            cls: "text-[#7a9dc9] border-[#7a9dc9]/30 bg-[#7a9dc9]/5", last: false },
    { id: "push",  label: "PUSH",  sub: "Firebase",          cls: "text-accent border-accent/30 bg-accent/5",           last: false },
    { id: "dlq",   label: "DLQ",   sub: "falhas definitivas", cls: "text-red-400/80 border-red-400/25 bg-red-400/5",   last: true  },
  ];

  return (
    <div className="p-6 bg-surface border border-border rounded-sm space-y-5">
      {/* Pipeline horizontal */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {pipeline.map((node, i) => (
            <div key={node.id} className="flex items-center gap-2">
              <div className={`shrink-0 px-3 py-2.5 border rounded-sm text-center min-w-[100px] bg-surface ${node.cls}`}>
                <p className="font-mono text-[11px] font-medium leading-none">{node.label}</p>
                <p className="font-mono text-[9px] text-muted/70 mt-1">{node.sub}</p>
              </div>
              {i < pipeline.length - 1 && (
                <span className="text-muted/50 text-lg shrink-0 leading-none">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fallback chain vertical */}
      <div className="pt-4 border-t border-border">
        <p className="font-mono text-[10px] text-muted/50 uppercase tracking-widest mb-3">
          fallback automático — Consumer tenta em sequência
        </p>
        <div className="flex flex-col gap-0 ml-4">
          {channels.map((ch) => (
            <div key={ch.id}>
              <div className={`px-3 py-2 border rounded-sm w-fit min-w-[180px] ${ch.cls}`}>
                <p className="font-mono text-[11px] font-medium">{ch.label}</p>
                <p className="font-mono text-[9px] text-muted/70 mt-0.5">{ch.sub}</p>
              </div>
              {!ch.last && (
                <div className="flex items-center gap-2 ml-3 my-1.5">
                  <span className="text-muted/40 text-sm leading-none">↓</span>
                  <span className="font-mono text-[9px] text-muted/35">falhou?</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Problem Diagram selector ─────────────────────────────────
function ProblemDiagram({ projectId }: { projectId: string }) {
  if (projectId === "notifyflow") return <DeliveryDiagram />;
  return <RoutingDiagram />;
}

// ─── Diagram label per project ────────────────────────────────
function diagramLabel(projectId: string): string {
  if (projectId === "notifyflow") return "Fluxo de entrega com fallback";
  return "Fluxo de roteamento";
}

// ─── Component ───────────────────────────────────────────────
export function CaseStudyContent({ project }: Props) {
  const cs = project.caseStudy;

  // Highlight metrics for hero (first 3 most impactful)
  const heroMetrics = cs.metrics.slice(0, 3);
  const restMetrics = cs.metrics.slice(3);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-main">
          {/* Back + year */}
          <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 group"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Voltar para projetos
            </Link>
            <span className="font-mono text-[11px] text-accent/60 px-2.5 py-1 border border-accent/20 rounded-sm">
              {project.year}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Left: title + description + links */}
            <div>
              <motion.p {...fadeUp(0.05)} className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/70 mb-4">
                {"// case study"}
              </motion.p>
              <motion.h1
                {...fadeUp(0.08)}
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.08]"
              >
                {project.title}
              </motion.h1>
              <motion.p {...fadeUp(0.12)} className="font-sans text-lg text-muted leading-relaxed mb-8 max-w-xl">
                {project.description}
              </motion.p>

              {/* Stack badges */}
              <motion.div {...fadeUp(0.15)} className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech, i) => (
                  <SkillTag key={tech} index={i} size="sm">
                    {tech}
                  </SkillTag>
                ))}
              </motion.div>

              {/* Links */}
              <motion.div {...fadeUp(0.18)} className="flex items-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground/80 font-mono text-xs hover:border-accent/40 hover:text-accent transition-all duration-200 rounded-sm"
                >
                  <GitHubIcon />
                  Ver código
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-mono text-xs hover:bg-accent/90 transition-colors duration-200 rounded-sm"
                  >
                    Demo ao vivo
                    <ExternalLinkIcon size={12} />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right: hero metrics */}
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-0">
              {heroMetrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`py-6 ${i < heroMetrics.length - 1 ? "border-b border-border" : ""}`}
                >
                  <p className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-none mb-2">
                    {m.value}
                  </p>
                  <p className="font-mono text-[11px] text-muted uppercase tracking-widest">
                    {m.label}
                  </p>
                </div>
              ))}
              {/* Extra metrics in a compact row */}
              {restMetrics.length > 0 && (
                <div className="pt-6 flex gap-6">
                  {restMetrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-serif text-2xl font-bold text-foreground/70">{m.value}</p>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-widest mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="mb-5">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/60">
              {"// 01 — O PROBLEMA"}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Problem text */}
            <div>
              <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Por que o {project.title} existe
              </motion.h2>
              <motion.p {...fadeUp(0.08)} className="font-sans text-base text-muted/90 leading-loose">
                {cs.problem}
              </motion.p>
            </div>

            {/* Routing diagram */}
            <motion.div {...fadeUp(0.1)}>
              <p className="font-mono text-[11px] text-muted/60 uppercase tracking-widest mb-4">
                {diagramLabel(project.id)}
              </p>
              <ProblemDiagram projectId={project.id} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ──────────────────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="mb-5">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/60">
              {"// 02 — ARQUITETURA"}
            </span>
          </motion.div>

          <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            {cs.architecture.overview}
          </motion.h2>
          <motion.p {...fadeUp(0.08)} className="font-sans text-sm text-muted mb-10 max-w-xl">
            Sistema dividido em {cs.architecture.boundedContexts.length} Bounded Contexts independentes com contratos bem definidos entre camadas.
          </motion.p>

          {/* Bounded Contexts pills */}
          <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-14">
            {cs.architecture.boundedContexts.map((bc, i) => (
              <span
                key={bc}
                className="font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2 border border-accent/25 bg-accent/5 text-accent/80 rounded-sm"
              >
                {String(i + 1).padStart(2, "0")} {bc}
              </span>
            ))}
          </motion.div>

          {/* Key Decisions */}
          <p className="font-mono text-[11px] text-muted/60 uppercase tracking-widest mb-6">
            Decisões arquiteturais
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cs.architecture.keyDecisions.map((kd, i) => (
              <motion.div
                key={kd.title}
                {...fadeUp(i * 0.08)}
                className="pl-4 border-l-2 border-accent/40 bg-surface p-5 rounded-sm"
              >
                <p className="font-sans text-sm font-semibold text-foreground mb-3">{kd.title}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{kd.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ────────────────────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="mb-5">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/60">
              {"// 03 — DESAFIOS TÉCNICOS"}
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
            Problemas reais, soluções reais
          </motion.h2>

          <div className="flex flex-col gap-8">
            {cs.challenges.map((ch, i) => (
              <motion.div
                key={ch.title}
                {...fadeUp(i * 0.08)}
                className="border border-border bg-surface rounded-sm overflow-hidden"
              >
                {/* Challenge header */}
                <div className="px-7 py-4 border-b border-border flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 bg-background text-muted border border-border rounded-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-base font-semibold text-foreground">{ch.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  {/* Problem */}
                  <div className="p-7">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/70 shrink-0" />
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-red-400/80">
                        Problema
                      </span>
                    </div>
                    <p className="font-sans text-sm text-muted/90 leading-relaxed">{ch.description}</p>
                  </div>

                  {/* Solution */}
                  <div className="p-7">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7ac97a]/70 shrink-0" />
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#7ac97a]/80">
                        Solução
                      </span>
                    </div>
                    <p className="font-sans text-sm text-muted/90 leading-relaxed">{ch.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="mb-5">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/60">
              {"// 04 — STACK TÉCNICA"}
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
            Tecnologias utilizadas
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {cs.techStack.map((group, i) => (
              <motion.div key={group.category} {...fadeUp(i * 0.07)}>
                <p className="font-mono text-[11px] text-muted/60 uppercase tracking-widest mb-4">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <SkillTag key={item} index={j} size="sm">
                      {item}
                    </SkillTag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO ──────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeUp(0)} className="mb-5">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/60">
              {"// 05 — DEMONSTRAÇÃO"}
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
            Veja em ação
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {cs.demoMoments.map((dm, i) => (
              <motion.div
                key={dm.title}
                {...fadeUp(i * 0.08)}
                className="group relative bg-surface border border-border rounded-sm p-6 hover:border-accent/30 transition-colors duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,185,122,0.05) 0%, transparent 70%)" }}
                />

                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-sm border border-accent/25 bg-accent/5 flex items-center justify-center text-accent/70 mb-5">
                    <PlayIcon />
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-foreground mb-3">{dm.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{dm.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTAs */}
          <motion.div {...fadeUp(0.15)} className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-mono text-xs hover:bg-accent/90 transition-colors duration-200 rounded-sm"
              >
                Ver demo ao vivo
                <ExternalLinkIcon size={12} />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground/80 font-mono text-xs hover:border-accent/40 hover:text-accent transition-all duration-200 rounded-sm"
            >
              <GitHubIcon />
              Ver código no GitHub
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 ml-auto group"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Todos os projetos
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
