import Link from "next/link";
import type { Project, CaseStudy } from "@/data/projects";

// ─── Types ────────────────────────────────────────────────────
interface Props {
  project: Project & { caseStudy: CaseStudy };
}

// ─── Cabeçalho numerado de seção ──────────────────────────────
function SectionHead({
  number,
  eyebrow,
  title,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <header className="flex flex-col gap-5">
      <p className="eyebrow">
        {number} — {eyebrow}
      </p>
      <h2
        id={id}
        className="display-md text-[clamp(1.9rem,4.5vw,3.2rem)] tracking-[-0.035em]"
      >
        {title}
      </h2>
    </header>
  );
}

// ─── Diagrama: roteamento (FortunAI) ──────────────────────────
function RoutingDiagram() {
  const outputs = [
    { label: "Local", sub: "CatalogoAtivoService — zero custo de API" },
    { label: "Alpha Vantage", sub: "cache PostgreSQL 24h — cotações de mercado" },
    { label: "Gemini", sub: "consultas abertas — interpretação NLU" },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-border p-6">
      <div className="rounded-[11px] border border-border px-4 py-3">
        <p className="eyebrow-sm">Input</p>
        <p className="mt-1.5 text-[14.5px]">Mensagem do usuário</p>
      </div>

      <p className="text-center text-muted" aria-hidden>
        ↓
      </p>

      <div className="rounded-[11px] border border-accent bg-accent-soft px-4 py-3">
        <p className="eyebrow-sm text-accent">Roteador</p>
        <p className="mt-1.5 text-[14.5px] font-medium text-accent">
          Classificação inteligente
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted">
          3 níveis de roteamento
        </p>
      </div>

      <p className="text-center text-muted" aria-hidden>
        ↓
      </p>

      <ul className="flex flex-col gap-2">
        {outputs.map((o) => (
          <li key={o.label} className="rounded-[11px] bg-surface px-4 py-3">
            <p className="font-mono text-[12px] font-medium">{o.label}</p>
            <p className="mt-1 font-mono text-[10px] leading-[1.5] text-muted">
              {o.sub}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Diagrama: entrega com fallback (NotifyFlow) ──────────────
function DeliveryDiagram() {
  const pipeline = [
    { label: "API", sub: "POST /notifications" },
    { label: "PostgreSQL", sub: "Outbox · PENDING" },
    { label: "Scheduler", sub: "polling 5s" },
    { label: "RabbitMQ", sub: "exchange principal" },
    { label: "Consumer", sub: "fallback engine" },
  ];

  const channels = [
    { label: "Email", sub: "SendGrid" },
    { label: "SMS", sub: "Twilio" },
    { label: "Push", sub: "Firebase" },
    { label: "DLQ", sub: "falhas definitivas" },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-border p-6">
      <ol className="flex flex-col gap-2">
        {pipeline.map((node, i) => (
          <li key={node.label}>
            <div className="rounded-[11px] bg-surface px-4 py-3">
              <p className="font-mono text-[12px] font-medium">{node.label}</p>
              <p className="mt-1 font-mono text-[10px] text-muted">{node.sub}</p>
            </div>
            {i < pipeline.length - 1 && (
              <p className="py-1 text-center text-muted" aria-hidden>
                ↓
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className="border-t border-border pt-5">
        <p className="eyebrow-sm">Fallback automático — em sequência</p>
        <ol className="mt-4 flex flex-col gap-2">
          {channels.map((ch, i) => (
            <li key={ch.label}>
              <div
                className={`rounded-[11px] px-4 py-2.5 ${
                  i === channels.length - 1
                    ? "border border-border"
                    : "bg-surface"
                }`}
              >
                <p className="font-mono text-[12px] font-medium">{ch.label}</p>
                <p className="mt-0.5 font-mono text-[10px] text-muted">{ch.sub}</p>
              </div>
              {i < channels.length - 1 && (
                <p className="py-1 font-mono text-[10px] text-dim" aria-hidden>
                  ↓ falhou?
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ─── Seleção do diagrama por projeto ──────────────────────────
const DIAGRAMS: Record<string, { label: string; render: () => JSX.Element }> = {
  notifyflow: {
    label: "Fluxo de entrega com fallback",
    render: () => <DeliveryDiagram />,
  },
  finassistant: {
    label: "Fluxo de roteamento",
    render: () => <RoutingDiagram />,
  },
};

// ─── Component ───────────────────────────────────────────────
export function CaseStudyContent({ project }: Props) {
  const cs = project.caseStudy;
  const diagram = DIAGRAMS[project.id];

  return (
    <main id="main-content">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="container-page pb-20 pt-20">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
            >
              <span className="inline-block transition-transform duration-base ease-out group-hover:-translate-x-1">
                ←
              </span>
              Todos os projetos
            </Link>
            <span className="tnum font-mono text-[11px] text-muted">
              {project.year}
            </span>
          </div>

          <p className="eyebrow">Case study · {project.lineup.label}</p>

          <h1 className="display-lg text-[clamp(2.6rem,9vw,6.5rem)] tracking-[-0.05em]">
            {project.title}
          </h1>

          <p className="max-w-[640px] text-[19px] leading-[1.5] text-muted [text-wrap:pretty]">
            {project.description}
          </p>

          <p className="font-mono text-[11px] leading-[1.6] text-muted">
            {project.stack.join(" · ")}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              Ver código ↗
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-ghost"
              >
                Demo ao vivo ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS ──────────────────────────────────────────── */}
      <section aria-label="Métricas do projeto" className="border-y border-border bg-surface">
        <dl className="hairline-grid hairline-grid-surface grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {cs.metrics.map((m) => (
            <div key={m.label} className="px-5 py-9 text-center">
              <dt className="eyebrow-sm">{m.label}</dt>
              <dd className="tnum mt-3 font-mono text-[clamp(1.7rem,3.4vw,2.2rem)] font-light leading-none tracking-[-0.02em] text-accent">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── 01 — O PROBLEMA ───────────────────────────────────── */}
      <section className="container-page section-y">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
          <SectionHead
            number="01"
            eyebrow="O problema"
            title={`Por que o ${project.title} existe`}
          />

          <div
            className={
              diagram
                ? "grid grid-cols-1 items-start gap-12 lg:grid-cols-2"
                : "max-w-[720px]"
            }
          >
            <p
              data-reveal
              className="text-[17px] leading-[1.7] text-muted [text-wrap:pretty]"
            >
              {cs.problem}
            </p>

            {diagram && (
              <div data-reveal>
                <p className="eyebrow-sm mb-4">{diagram.label}</p>
                {diagram.render()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 02 — ARQUITETURA ──────────────────────────────────── */}
      <section className="container-page section-y border-y border-border bg-surface">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
          <SectionHead
            number="02"
            eyebrow="Arquitetura"
            title={cs.architecture.overview}
          />

          <div>
            <p className="eyebrow-sm">
              {cs.architecture.boundedContexts.length} bounded contexts
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {cs.architecture.boundedContexts.map((bc, i) => (
                <li
                  key={bc}
                  className="rounded-full border border-border bg-background px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted"
                >
                  {String(i + 1).padStart(2, "0")} {bc}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-9">
            <p className="eyebrow-sm">Decisões arquiteturais</p>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10">
              {cs.architecture.keyDecisions.map((kd, i) => (
                <div key={kd.title} data-reveal>
                  <p className="eyebrow-sm">
                    Decisão {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-[17px] font-medium leading-[1.35] tracking-[-0.015em]">
                    {kd.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                    {kd.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 — DESAFIOS TÉCNICOS ────────────────────────────── */}
      <section className="container-page section-y">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
          <SectionHead
            number="03"
            eyebrow="Desafios técnicos"
            title="Problemas reais, soluções reais."
          />

          <div className="flex flex-col">
            {cs.challenges.map((ch, i) => (
              <article
                key={ch.title}
                data-reveal
                className={`border-t border-border py-9 ${
                  i === cs.challenges.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="eyebrow-sm">
                  Desafio {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-[clamp(1.2rem,2.4vw,1.6rem)] font-light leading-[1.3] tracking-[-0.025em]">
                  {ch.title}
                </h3>

                <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-7">
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-negative">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-negative"
                        aria-hidden
                      />
                      Problema
                    </p>
                    <p className="mt-3 text-[14.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                      {ch.description}
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-positive">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-positive"
                        aria-hidden
                      />
                      Solução
                    </p>
                    <p className="mt-3 text-[14.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                      {ch.solution}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 — STACK TÉCNICA ────────────────────────────────── */}
      <section className="container-page section-y border-y border-border bg-surface">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
          <SectionHead
            number="04"
            eyebrow="Stack técnica"
            title="O que tem por dentro."
          />

          <dl>
            {cs.techStack.map((group, i) => (
              <div
                key={group.category}
                data-reveal
                className={`grid grid-cols-1 gap-y-3 border-t border-border py-[26px] sm:grid-cols-[minmax(110px,180px)_1fr] sm:gap-x-[clamp(16px,3vw,32px)] ${
                  i === cs.techStack.length - 1 ? "border-b" : ""
                }`}
              >
                <dt className="font-mono text-[11px] uppercase leading-[1.4] tracking-[0.14em] text-muted sm:pt-1.5">
                  {group.category}
                </dt>
                <dd className="text-[clamp(1rem,2.2vw,1.4rem)] font-light leading-[1.45] tracking-[-0.02em] [text-wrap:pretty]">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 05 — DEMONSTRAÇÃO ─────────────────────────────────── */}
      <section className="container-page section-y">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
          <SectionHead number="05" eyebrow="Demonstração" title="Veja em ação." />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {cs.demoMoments.map((dm, i) => (
              <div
                key={dm.title}
                data-reveal
                className="rounded-[20px] bg-surface px-7 py-8"
              >
                <p className="eyebrow-sm">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-[17px] font-medium leading-[1.35] tracking-[-0.015em]">
                  {dm.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                  {dm.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-9">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill"
              >
                Ver demo ao vivo ↗
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-ghost"
            >
              Ver código no GitHub ↗
            </a>
            <Link
              href="/projects"
              className="group ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
            >
              <span className="inline-block transition-transform duration-base ease-out group-hover:-translate-x-1">
                ←
              </span>
              Todos os projetos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
