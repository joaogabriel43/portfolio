"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Search, SearchX } from "lucide-react";
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
    <main id="main-content" className="container-page pb-32 pt-24">
      <div className="mx-auto max-w-[1100px]">
        {/* ── Header ── */}
        <header className="flex flex-col gap-6">
          <Link
            href="/#projects"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
          >
            <span className="inline-block transition-transform duration-base ease-out group-hover:-translate-x-1">
              ←
            </span>
            Voltar
          </Link>

          <p className="eyebrow">Projetos</p>

          <h1 className="display-lg text-[clamp(2.4rem,7vw,5rem)]">
            Todos os projetos.
          </h1>

          <p className="max-w-[560px] text-[17px] leading-[1.55] text-muted [text-wrap:pretty]">
            {projects.length} sistemas — mensageria, event sourcing, developer
            tooling e AI engineering. Cada um nasceu de um problema concreto.
          </p>
        </header>

        {/* ── Barra de filtro ── */}
        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-9">
          {/* Busca */}
          <div className="relative max-w-md">
            <Search
              size={15}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dim"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar projeto..."
              aria-label="Buscar projeto por nome ou tecnologia"
              className="field pl-11"
            />
          </div>

          {/* Chips de categoria */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por categoria"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={[
                    "h-9 rounded-full border px-4 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-base ease-out",
                    active
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-border text-muted hover:border-border-strong hover:text-foreground",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Contador */}
          <p className="tnum font-mono text-[11px] text-dim">
            Exibindo {filtered.length} de {projects.length} projetos
          </p>
        </div>

        {/* ── Grid de projetos ── */}
        {filtered.length > 0 ? (
          /* MotionConfig fica aqui (e não no root layout) para que o framer-motion
             carregue apenas nesta rota — a home fica fora do bundle da lib. */
          <MotionConfig reducedMotion="user">
            <motion.div
              layout
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
          </MotionConfig>
        ) : (
          /* ── Estado vazio ── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchX size={32} strokeWidth={1.5} className="mb-5 text-dim" aria-hidden />
            <p className="text-[21px] font-light tracking-[-0.02em]">
              Nenhum projeto encontrado
            </p>
            <p className="mt-2 max-w-xs text-[14.5px] text-muted">
              Tente outro filtro ou termo de busca.
            </p>
            <button onClick={clearFilters} className="btn-pill-ghost mt-7">
              Limpar filtros
            </button>
          </div>
        )}

        {/* Atalho para limpar quando há filtro ativo mas ainda há resultados */}
        {hasActiveFilter && filtered.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={clearFilters}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
            >
              Limpar filtros ✕
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
