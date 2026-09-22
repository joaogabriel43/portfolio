import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsExplorer } from "@/components/pages/ProjectsExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projetos — João Gabriel Nascimento",
  description: `${projects.length} projetos de software com Java, Spring Boot, arquitetura distribuída e AI engineering — case studies detalhados com decisões técnicas, desafios e soluções.`,
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <ProjectsExplorer />
      <Footer />
    </>
  );
}
