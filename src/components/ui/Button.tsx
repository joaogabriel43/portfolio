"use client";

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────
type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined;
  external?: never;
}

interface ButtonAsAnchor
  extends ButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// ─── Style maps ───────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-background font-semibold",
    "hover:bg-accent-dim",
    "border border-accent hover:border-accent-dim",
  ].join(" "),

  ghost: [
    "bg-transparent text-foreground/80",
    "border border-white/15 hover:border-accent hover:text-accent",
    "transition-colors",
  ].join(" "),

  outline: [
    "bg-transparent text-accent",
    "border border-accent/40 hover:border-accent hover:bg-accent/5",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

// ─── Component ───────────────────────────────────────────────
export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-medium rounded-sm",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "cursor-pointer",
  ].join(" ");

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = props as ButtonAsAnchor;
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        {...(anchorRest as React.ComponentProps<typeof motion.a>)}
      >
        {children}
      </motion.a>
    );
  }

  const buttonRest = props as ButtonAsButton;
  return (
    <motion.button
      className={classes}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      {...(buttonRest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
