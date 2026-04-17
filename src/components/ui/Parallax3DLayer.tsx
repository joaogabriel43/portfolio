"use client";

import { motion, useTransform } from "framer-motion";
import { useMouse3D } from "@/hooks/useMouse3D";

// ─── Constants ────────────────────────────────────────────────
/** Base pixel intensity at depth=1. Kept deliberately subtle. */
const BASE_PX = 4;

// ─── Props ────────────────────────────────────────────────────
interface Parallax3DLayerProps {
  children: React.ReactNode;
  /**
   * Depth multiplier.
   * - Background decoratives: 1.5–2  (move most → feel distant)
   * - Main content:           1      (baseline)
   * - Foreground cards:       0.5    (move least → feel close)
   */
  depth?: number;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────
export function Parallax3DLayer({
  children,
  depth = 1,
  className = "",
}: Parallax3DLayerProps) {
  const { x, y } = useMouse3D();

  // Derive pixel offsets from normalized [-1, +1] mouse values
  const translateX = useTransform(x, (v) => v * BASE_PX * depth);
  const translateY = useTransform(y, (v) => v * BASE_PX * depth);

  return (
    <motion.div
      style={{ x: translateX, y: translateY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
