"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { experiences, type Experience } from "@/data/experience";
import { Parallax3DLayer } from "@/components/ui/Parallax3DLayer";

// ─── Single experience row ────────────────────────────────────
interface ExperienceItemProps {
  exp: Experience;
  index: number;
  isLast: boolean;
}

function ExperienceItem({ exp, index, isLast }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`flex flex-col md:flex-row gap-8 md:gap-12 py-10 ${
        !isLast ? "border-b border-white/[0.07]" : ""
      }`}
    >
      {/* ── Left column ── */}
      <div className="md:w-48 shrink-0 space-y-1.5">
        <p className="font-mono text-xs text-muted leading-snug">{exp.period}</p>
        <p className="font-serif text-base font-semibold text-accent leading-snug">
          {exp.company}
        </p>
        <p className="font-mono text-[11px] text-muted/60">{exp.location}</p>
      </div>

      {/* ── Right column ── */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-serif font-bold text-foreground mb-3 leading-snug"
          style={{ fontSize: "1.4rem" }}
        >
          {exp.role}
        </h3>
        <p className="font-sans text-sm text-muted leading-relaxed mb-5">
          {exp.description}
        </p>

        {/* Achievements */}
        <ul className="space-y-2.5">
          {exp.achievements.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-accent shrink-0 font-sans text-sm mt-px select-none">
                →
              </span>
              <span className="font-sans text-sm text-muted/80 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Experience section ───────────────────────────────────────
export function Experience() {
  return (
    <section id="experience" className="section-padding border-t border-border">
      <Parallax3DLayer depth={0.8} className="container-main">
        {/* Header */}
        <div className="mb-4">
          <div className="mb-5">
            <SectionLabel index={5}>experiência</SectionLabel>
          </div>
          <AnimatedText
            as="h2"
            className="font-serif text-4xl md:text-5xl font-bold text-foreground"
            delay={0.08}
          >
            Trajetória profissional
          </AnimatedText>
        </div>

        {/* Items */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceItem
              key={`${exp.company}-${i}`}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </Parallax3DLayer>
    </section>
  );
}
