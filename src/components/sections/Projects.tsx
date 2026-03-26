"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, type Project } from "@/data/projects";

// ─── Layout logic ─────────────────────────────────────────────
// Row 1: first featured (col-span-8) + first non-featured (col-span-4)
// Row 2: remaining featured (col-span-12, full-width)
function buildLayout(items: Project[]): Array<Project & { colSpan: string }> {
  const featured = items.filter((p) => p.featured);
  const others = items.filter((p) => !p.featured);

  return [
    // Row 1 pair
    ...(featured[0] ? [{ ...featured[0], colSpan: "col-span-full lg:col-span-8" }] : []),
    ...(others[0]   ? [{ ...others[0],   colSpan: "col-span-full lg:col-span-4" }] : []),
    // Remaining featured — full width
    ...featured.slice(1).map((p) => ({ ...p, colSpan: "col-span-full" })),
    // Remaining non-featured — half
    ...others.slice(1).map((p) => ({ ...p, colSpan: "col-span-full lg:col-span-6" })),
  ];
}

export function Projects() {
  const layout = buildLayout(projects);

  return (
    <section id="projects" className="section-padding border-t border-border">
      <div className="container-main">
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

        {/* ── Asymmetric grid ── */}
        <div className="grid grid-cols-12 gap-5 lg:gap-6">
          {layout.map((project, i) => (
            <div
              key={project.id}
              className={`${project.colSpan} ${
                // Subtle alternating surface tint for texture
                i % 2 === 1 ? "lg:[&>article]:bg-[#0f0f0f]" : ""
              }`}
            >
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
