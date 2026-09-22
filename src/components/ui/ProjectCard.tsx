import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <article className="card-lift group flex h-full flex-col rounded-[20px] bg-surface px-7 py-8 hover:bg-surface-2">
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow-sm">{project.lineup.label}</p>
        <span className="tnum shrink-0 font-mono text-[10px] text-dim">
          {project.year}
        </span>
      </div>

      <h3 className="mt-6 text-[21px] font-medium leading-tight tracking-[-0.02em]">
        {hasCaseStudy ? (
          <Link
            href={`/projects/${project.id}`}
            className="after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
          >
            {project.title}
          </Link>
        ) : (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
          >
            {project.title}
          </a>
        )}
      </h3>

      <p className="mt-3 flex-1 text-[13.5px] leading-[1.55] text-muted [text-wrap:pretty]">
        {project.description}
      </p>

      <p className="mt-6 font-mono text-[10.5px] leading-[1.5] text-muted">
        {project.lineup.stackLine}
      </p>

      <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 font-mono text-[10.5px] uppercase tracking-[0.08em]">
        {hasCaseStudy && (
          <Link
            href={`/projects/${project.id}`}
            className="text-accent-text transition-opacity duration-base ease-out hover:opacity-70"
          >
            Case study →
          </Link>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors duration-base ease-out hover:text-accent-text"
        >
          GitHub ↗
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-base ease-out hover:text-accent-text"
          >
            Demo ↗
          </a>
        )}
      </div>
    </article>
  );
}
