import Link from "next/link";
import { projects } from "@/data/projects";
import { featuredProjectId } from "@/data/site";

const project = projects.find((p) => p.id === featuredProjectId);

export function FeaturedProject() {
  // Sem caseStudy não há métricas nem decisões para exibir
  if (!project?.caseStudy) return null;

  const { metrics, architecture } = project.caseStudy;
  const decisions = architecture.keyDecisions.slice(0, 3);

  return (
    <section
      aria-labelledby="featured-title"
      className="container-page section-y border-y border-border bg-surface"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-[72px]">
        <header className="flex flex-col items-center gap-5 text-center">
          <p className="eyebrow">Em destaque</p>
          <h2
            id="featured-title"
            className="display-lg text-[clamp(2.6rem,9vw,7.5rem)] tracking-[-0.05em]"
          >
            {project.title}
          </h2>
          <p className="max-w-[640px] text-[19px] leading-[1.5] text-muted [text-wrap:pretty]">
            {project.description}
          </p>
        </header>

        {/* Métricas */}
        <dl className="hairline-grid hairline-grid-surface grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-5 py-8 text-center">
              <dt className="eyebrow-sm">{metric.label}</dt>
              <dd className="tnum mt-3 font-mono text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-none tracking-[-0.03em] text-accent">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Decisões de arquitetura */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-12">
          {decisions.map((decision, i) => (
            <div key={decision.title} data-reveal>
              <p className="eyebrow-sm">
                Decisão {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[17px] font-medium leading-[1.35] tracking-[-0.015em]">
                {decision.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                {decision.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/projects/${project.id}`} className="btn-pill">
            Ler o case study
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-ghost"
          >
            Código no GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
