"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

// ─── Icons ────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
}

// ─── Component ───────────────────────────────────────────────
export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative group bg-surface border border-border rounded-sm overflow-hidden"
    >
      {/* Animated top border on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      />

      {/* Featured glow */}
      {project.featured && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,185,122,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="p-7 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-accent/20 select-none leading-none">
              {paddedIndex}
            </span>
            {project.featured && (
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-accent/30 text-accent/70 rounded-sm">
                featured
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-muted/60 shrink-0 mt-1">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-muted leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-7">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-1 rounded-sm bg-background/60 text-muted border border-border group-hover:border-border/80 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-5 border-t border-border/60 flex-wrap">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-foreground transition-colors duration-200"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
          >
            <GitHubIcon />
            Ver código
          </motion.a>

          {project.liveUrl && (
            <>
              <span className="w-px h-3 bg-border" />
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent/70 hover:text-accent transition-colors duration-200"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                Demo live
                <ExternalLinkIcon />
              </motion.a>
            </>
          )}

          {project.caseStudy && (
            <>
              <span className="w-px h-3 bg-border" />
              <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground/60 hover:text-foreground transition-colors duration-200"
                >
                  Ver case study →
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
