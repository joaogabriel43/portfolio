"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillTag } from "@/components/ui/SkillTag";
import { skillGroups } from "@/data/skills";

// ─── Primary skills receive highlighted treatment ─────────────
const PRIMARY_SKILLS = new Set([
  "Java",
  "Spring Boot",
  "TypeScript",
  "Angular",
]);

// ─── Single skill group card ──────────────────────────────────
interface SkillGroupCardProps {
  group: string;
  icon: string;
  skills: string[];
  groupIndex: number;
  isInView: boolean;
}

function SkillGroupCard({
  group,
  icon,
  skills,
  groupIndex,
  isInView,
}: SkillGroupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.6,
        delay: groupIndex * 0.09,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group bg-surface border border-border rounded-sm p-6 hover:border-accent/25 transition-colors duration-300"
    >
      {/* Group header */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-lg leading-none"
          role="img"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted/80 group-hover:text-muted transition-colors duration-200">
          {group}
        </span>
      </div>

      {/* Skill tags with stagger */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, skillIndex) => (
          <SkillTag
            key={skill}
            size="sm"
            highlighted={PRIMARY_SKILLS.has(skill)}
            index={groupIndex * 10 + skillIndex}
          >
            {skill}
          </SkillTag>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Skills section ───────────────────────────────────────────
export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Total count for the subtitle
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <section
      ref={ref}
      id="skills"
      className="section-padding border-t border-border"
    >
      <div className="container-main">
        {/* ── Header ── */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-5"
          >
            <SectionLabel index={2} animate={false}>
              habilidades
            </SectionLabel>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground"
            >
              Stack técnico
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="font-mono text-[11px] text-muted/60 whitespace-nowrap"
            >
              {skillGroups.length} grupos · {totalSkills} tecnologias
            </motion.p>
          </div>
        </div>

        {/* ── Legend for primary tags ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent/70" />
            <span className="font-mono text-[10px] text-muted/60 tracking-wider">
              principais tecnologias
            </span>
          </span>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-accent/20 to-transparent" />
        </motion.div>

        {/* ── Grid of skill groups ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => (
            <SkillGroupCard
              key={group.group}
              group={group.group}
              icon={group.icon}
              skills={group.skills}
              groupIndex={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Highlighted skills spotlight ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 p-5 border border-accent/15 rounded-sm bg-accent/[0.03]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-accent/70 shrink-0">
              Core stack
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(PRIMARY_SKILLS).map((skill, i) => (
                <SkillTag key={skill} size="md" highlighted index={i}>
                  {skill}
                </SkillTag>
              ))}
            </div>
            <p className="font-sans text-xs text-muted/60 sm:ml-auto sm:text-right sm:max-w-[200px] leading-snug">
              Onde concentro{" "}
              <span className="text-muted/90">90%</span> do meu trabalho diário
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
