import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { CaseStudyContent } from "@/components/pages/CaseStudyContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Props {
  params: { slug: string };
}

// ─── Static params for SSG ────────────────────────────────────
export function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.id }));
}

// ─── Per-page metadata ────────────────────────────────────────
export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      type: "article",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────
export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.slug);
  if (!project || !project.caseStudy) notFound();

  return (
    <>
      <Navbar />
      <CaseStudyContent
        project={project as typeof project & { caseStudy: NonNullable<typeof project.caseStudy> }}
      />
      <Footer />
    </>
  );
}
