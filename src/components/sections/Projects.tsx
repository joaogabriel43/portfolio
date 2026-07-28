import Link from "next/link";
import { getLineup, type Project } from "@/data/projects";
import { lineupSection } from "@/data/site";

const lineup = getLineup();

// ─── Card ─────────────────────────────────────────────────────
function LineupCard({ project, index }: { project: Project; index: number }) {
  const { label, keyword, keywordSize, stackLine } = project.lineup;
  const hasCaseStudy = Boolean(project.caseStudy);
  const href = hasCaseStudy ? `/projects/${project.id}` : project.githubUrl;

  return (
    <article className="group relative flex w-[min(290px,82vw)] shrink-0 snap-center flex-col rounded-[20px] bg-surface px-[26px] py-[30px] transition-colors duration-slow ease-out hover:bg-surface-2">
      <p className="eyebrow-sm">
        {String(index + 1).padStart(2, "0")} · {label}
      </p>

      <p
        className="flex h-[148px] items-center justify-center text-center font-mono font-normal leading-tight tracking-[-0.02em] text-accent"
        style={{ fontSize: `${keywordSize}px` }}
        aria-hidden
      >
        {keyword}
      </p>

      <h3 className="text-[21px] font-medium tracking-[-0.02em]">
        {hasCaseStudy ? (
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
          >
            {project.title}
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
          >
            {project.title}
          </a>
        )}
      </h3>

      <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.5] text-muted [text-wrap:pretty]">
        {project.description}
      </p>

      <p className="mt-5 font-mono text-[10.5px] leading-[1.5] text-muted">
        {stackLine}
      </p>

      {hasCaseStudy && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-3 w-fit font-mono text-[10.5px] text-muted underline-offset-4 transition-colors duration-base ease-out hover:text-accent hover:underline"
        >
          GitHub ↗
        </a>
      )}
    </article>
  );
}

// ─── Seção ────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="pb-[130px] pt-24 md:pt-32 lg:pt-40">
      <header className="container-page mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
        <p className="eyebrow">{lineupSection.eyebrow}</p>
        <h2 className="display-lg text-[clamp(2.4rem,7vw,6rem)]">
          {lineupSection.title}
        </h2>
        <p className="max-w-[520px] text-[16px] leading-[1.55] text-muted [text-wrap:pretty]">
          {lineupSection.subtitle}
        </p>
      </header>

      {/* Carrossel horizontal com scroll-snap */}
      <div className="lineup mt-[72px] flex gap-5 overflow-x-auto pb-8 [padding-inline:max(24px,7vw)]">
        {lineup.map((project, i) => (
          <LineupCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="container-page mt-4 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
        >
          Explorar os {lineup.length} projetos
          <span className="transition-transform duration-base ease-out group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
