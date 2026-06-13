"use client";

import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { Parallax3DLayer } from "@/components/ui/Parallax3DLayer";

// ─── Layout logic ─────────────────────────────────────────────
// A home exibe apenas os projetos featured (showcase):
// Row 1: FortunAI  (8/12) + AuditVault (4/12)
// Row 2: FlowGuard (6/12) + JavaMCPHub (6/12)
const FEATURED_COL_SPANS: string[] = [
  "col-span-full lg:col-span-8",
  "col-span-full lg:col-span-4",
  "col-span-full lg:col-span-6",
  "col-span-full lg:col-span-6",
];

function buildFeaturedLayout(): Array<Project & { colSpan: string }> {
  return projects
    .filter((p) => p.featured)
    .map((p, i) => ({
      ...p,
      colSpan: FEATURED_COL_SPANS[i] ?? "col-span-full lg:col-span-6",
    }));
}

export function Projects() {
  const layout = buildFeaturedLayout();

  return (
    <section id="projects" className="section-padding border-t border-border">
      <Parallax3DLayer depth={0.8} className="container-main">
        {/* ── Header ── */}
        <div className="mb-14">
          <div className="mb-5">
            <SectionLabel index={4}>projetos</SectionLabel>
          </div>
          <AnimatedText
            as="h2"
            className="font-serif text-4xl md:text-5xl font-bold text-foreground"
            delay={0.08}
          >
            Trabalhos selecionados
          </AnimatedText>
        </div>

        {/* ── Featured grid ── */}
        <div className="grid grid-cols-12 gap-5 lg:gap-6">
          {layout.map((project, i) => (
            <div
              key={project.id}
              className={`${project.colSpan} ${
                // Subtle alternating surface tint for texture
                i % 2 === 1 ? "lg:[&>article]:bg-[#0f0f0f]" : ""
              }`}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* ── CTA: ver todos os projetos ── */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs tracking-[0.1em] uppercase text-muted">
            {projects.length} projetos no total
          </p>
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 font-sans font-medium text-sm rounded-sm px-5 py-2.5 bg-transparent text-foreground/80 border border-white/15 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Ver todos os projetos
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Parallax3DLayer>
    </section>
  );
}
