"use client";

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────
type SkillTagSize = "sm" | "md";
type SkillTagVariant = "default" | "dimmed";

interface SkillTagProps {
  children: string;
  size?: SkillTagSize;
  variant?: SkillTagVariant;
  /** Applies accent border + tint — for primary/featured skills */
  highlighted?: boolean;
  index?: number;
}

// ─── Style helpers ────────────────────────────────────────────
const baseClasses = [
  "relative inline-flex items-center rounded-full cursor-default select-none overflow-hidden",
  "font-mono tracking-wide uppercase",
  "border transition-colors duration-300",
].join(" ");

const sizeClasses: Record<SkillTagSize, string> = {
  sm: "px-2.5 py-1 text-[10px]",
  md: "px-3 py-1.5 text-[11px]",
};

function resolveColorClasses(variant: SkillTagVariant, highlighted: boolean): string {
  if (highlighted) {
    return "border-accent/40 bg-accent/5 text-accent/80 hover:border-accent hover:text-accent hover:bg-accent/10";
  }
  if (variant === "dimmed") {
    return "border-border/50 bg-transparent text-muted/60 hover:text-accent/80 hover:border-accent/30";
  }
  return "border-border bg-surface text-muted hover:text-accent hover:border-accent/40";
}

// ─── SkillTag ─────────────────────────────────────────────────
export function SkillTag({
  children,
  size = "md",
  variant = "default",
  highlighted = false,
  index = 0,
}: SkillTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.04,
      }}
      whileHover="hovered"
      className={[
        baseClasses,
        sizeClasses[size],
        resolveColorClasses(variant, highlighted),
      ].join(" ")}
    >
      {/* Glow layer */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        variants={{
          hovered: {
            background: highlighted
              ? "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,185,122,0.18) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,185,122,0.12) 0%, transparent 70%)",
            transition: { duration: 0.22 },
          },
        }}
        initial={{ background: "none" }}
      />

      {/* Highlighted dot indicator */}
      {highlighted && (
        <span className="relative z-10 mr-1.5 w-1 h-1 rounded-full bg-accent/70 shrink-0" />
      )}

      <span className="relative z-10">{children}</span>
    </motion.span>
  );
}

// ─── SkillTagGroup ─────────────────────────────────────────────
interface SkillTagGroupProps {
  skills: string[];
  size?: SkillTagSize;
  variant?: SkillTagVariant;
  /** Skills in this set receive the highlighted treatment */
  primarySkills?: Set<string>;
  className?: string;
}

export function SkillTagGroup({
  skills,
  size = "md",
  variant = "default",
  primarySkills,
  className = "",
}: SkillTagGroupProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((skill, i) => (
        <SkillTag
          key={skill}
          size={size}
          variant={variant}
          highlighted={primarySkills?.has(skill) ?? false}
          index={i}
        >
          {skill}
        </SkillTag>
      ))}
    </div>
  );
}
