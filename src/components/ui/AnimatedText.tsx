"use client";

import { motion, type Variants } from "framer-motion";

// ─── Shared variants ─────────────────────────────────────────
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0,
    },
  },
};

// ─── AnimatedText ─────────────────────────────────────────────
interface AnimatedTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
}

export function AnimatedText({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.21, 0.47, 0.32, 0.98],
            delay,
          },
        },
      }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}

// ─── AnimatedList (stagger container) ────────────────────────
interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

export function AnimatedList({
  children,
  className = "",
  stagger = 0.09,
  delayChildren = 0,
}: AnimatedListProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedItem (stagger child) ────────────────────────────
interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedItem({ children, className = "" }: AnimatedItemProps) {
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}

// ─── AnimatedReveal (fade-in only, no Y shift) ───────────────
interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: AnimatedRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
