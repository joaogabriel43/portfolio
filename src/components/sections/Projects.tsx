"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { Parallax3DLayer } from "@/components/ui/Parallax3DLayer";

// ─── Layout logic ─────────────────────────────────────────────
// Row 1: featured[0] (8/12) + others[0] (4/12)
// Row 2: featured[1] (6/12) + others[1] (6/12)
// Extras: full-width featured | half-width others
function buildLayout(items: Project[]): Array<Project & { colSpan: string }> {
  const featured = items.filter((p) => p.featured);
  const others = items.filter((p) => !p.featured);

  return [
    // Row 1 — hero featured + compact non-featured
    ...(featured[0] ? [{ ...featured[0], colSpan: "col-span-full lg:col-span-8" }] : []),
    ...(others[0]   ? [{ ...others[0],   colSpan: "col-span-full lg:col-span-4" }] : []),
    // Row 2 — second featured + second non-featured, equal halves
    ...(featured[1] ? [{ ...featured[1], colSpan: "col-span-full lg:col-span-6" }] : []),
    ...(others[1]   ? [{ ...others[1],   colSpan: "col-span-full lg:col-span-6" }] : []),
    // Overflow — full-width featured, half-width others
    ...featured.slice(2).map((p) => ({ ...p, colSpan: "col-span-full" })),
    ...others.slice(2).map((p) => ({ ...p, colSpan: "col-span-full lg:col-span-6" })),
  ];
}

export function Projects() {
  const layout = buildLayout(projects);

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
      </Parallax3DLayer>
    </section>
  );
}
