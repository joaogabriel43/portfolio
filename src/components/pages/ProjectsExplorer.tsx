"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

// ─── Categorias de filtro ─────────────────────────────────────
// "Todos" não filtra; as demais batem com Project.tags.
const CATEGORIES = [
  "Todos",
  "Backend",
  "Mensageria",
  "AI / LLM",
  "Developer Tooling",
  "Infra / DevOps",
] as const;

type Category = (typeof CATEGORIES)[number];

export function ProjectsExplorer() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  // Debounce da busca (200ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  // Filtro combinado: categoria (tags) + busca (title / stack)
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "Todos" || p.tags.includes(activeCategory);
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [debouncedQuery, activeCategory]);

  const hasActiveFilter = activeCategory !== "Todos" || query.trim() !== "";

  function clearFilters() {
    setQuery("");
    setDebouncedQuery("");
    setActiveCategory("Todos");
  }

  return (
    <main id="main-content" className="section-padding pt-32">
      <div className="container-main">
        {/* ── Header ── */}
        <div className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 mb-8 group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            Voltar
          </Link>

          <div className="mb-5">
            <SectionLabel animate={false}>projetos</SectionLabel>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-[1.1]">
            Todos os projetos
          </h1>
          <p className="font-sans text-muted text-lg max-w-2xl">
            {projects.length} projetos — sistemas distribuídos, developer tooling
            e AI engineering.
          </p>
        </div>

        {/* ── Barra de filtro ── */}
        <div className="mb-10 space-y-5">
          {/* Busca */}
          <div className="relative max-w-md">
            <Search
              size={15}
              strokeWidth={1.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar projeto..."
              aria-label="Buscar projeto por nome ou tecnologia"
              className="w-full font-mono text-sm bg-transparent text-foreground placeholder:text-muted/50 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 transition-colors duration-200 focus:outline-none focus:border-accent"
            />
          </div>

          {/* Chips de categoria */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={[
                    "font-mono text-[0.65rem] tracking-[0.08em] uppercase px-3 py-1.5 rounded-sm border transition-colors duration-200",
                    active
                      ? "bg-accent/15 border-accent text-accent"
                      : "border-white/[0.07] text-muted hover:border-accent hover:text-foreground",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Contador */}
          <p className="font-mono text-[11px] text-muted/60">
            Exibindo {filtered.length} de {projects.length} projetos
          </p>
        </div>

        {/* ── Grid de projetos ── */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    index={projects.indexOf(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ── Estado vazio ── */
          <div className="flex flex-col items-center justify-center text-center py-24">
            <SearchX size={32} strokeWidth={1.5} className="text-muted/50 mb-5" aria-hidden />
            <p className="font-serif text-xl text-foreground mb-2">
              Nenhum projeto encontrado
            </p>
            <p className="font-sans text-sm text-muted mb-6 max-w-xs">
              Tente outro filtro ou termo de busca.
            </p>
            <button
              onClick={clearFilters}
              className="font-mono text-xs px-4 py-2 rounded-sm border border-white/15 text-foreground/80 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Atalho para limpar quando há filtro ativo mas ainda há resultados */}
        {hasActiveFilter && filtered.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={clearFilters}
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200"
            >
              Limpar filtros ✕
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
