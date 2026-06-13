"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { Parallax3DLayer } from "@/components/ui/Parallax3DLayer";

// ─── Layout logic ─────────────────────────────────────────────
// Row 1: [0] FortunAI    (8/12) + [1] NotifyFlow     (4/12)
// Row 2: [2] AuditVault  (6/12) + [3] ContractGuard  (6/12)
// Row 3: [4] RoutineFlow (8/12) + [5] PostMortem AI  (4/12)
// Row 4: [6] RateMaster  (12/12 — full-width banner)
// Extras além de 7: 6/12
const COL_SPANS: string[] = [
  "col-span-full lg:col-span-8",
  "col-span-full lg:col-span-4",
  "col-span-full lg:col-span-6",
  "col-span-full lg:col-span-6",
  "col-span-full lg:col-span-8",
  "col-span-full lg:col-span-4",
  "col-span-full",
];

function buildLayout(items: Project[]): Array<Project & { colSpan: string }> {
  return items.map((p, i) => ({
    ...p,
    colSpan: COL_SPANS[i] ?? "col-span-full lg:col-span-6",
  }));
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
              <ProjectCard project={project} index={projects.findIndex((p) => p.id === project.id)} />
            </div>
          ))}
        </div>
      </Parallax3DLayer>
    </section>
  );
}
