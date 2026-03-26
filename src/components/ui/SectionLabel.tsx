"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  children: string;
  index?: number;
  className?: string;
  animate?: boolean;
}

export function SectionLabel({
  children,
  index,
  className = "",
  animate = true,
}: SectionLabelProps) {
  const formattedIndex = index !== undefined
    ? String(index).padStart(3, "0")
    : null;

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[11px] text-accent/60 select-none">{"//"}</span>
        {formattedIndex && (
          <span className="font-mono text-[11px] text-accent/60">
            {formattedIndex}
          </span>
        )}
        {formattedIndex && (
          <span className="font-mono text-[11px] text-accent/40 select-none">—</span>
        )}
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
          {children}
        </span>
      </div>
      <div className="h-px flex-1 min-w-[32px] bg-gradient-to-r from-accent/30 to-transparent" />
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="inline-flex w-full"
    >
      {content}
    </motion.div>
  );
}
