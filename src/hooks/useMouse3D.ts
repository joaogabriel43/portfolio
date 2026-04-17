"use client";

import { createContext, useContext } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

// ─── Context type ─────────────────────────────────────────────
export interface Mouse3DCtx {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const Mouse3DContext = createContext<Mouse3DCtx | null>(null);

// ─── Hook ─────────────────────────────────────────────────────
/**
 * Returns shared, normalized mouse MotionValues in range [-1, +1].
 * Always { x: 0, y: 0 } on touch devices and prefers-reduced-motion.
 * Must be used inside <Mouse3DProvider>.
 */
export function useMouse3D(): Mouse3DCtx {
  const ctx = useContext(Mouse3DContext);

  // Unconditional fallback — rules-of-hooks compliant
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  return ctx ?? { x: fallbackX, y: fallbackY };
}
