"use client";

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";
import { Mouse3DContext } from "@/hooks/useMouse3D";

// ─── Mouse3DProvider ──────────────────────────────────────────
/**
 * Single RAF loop + lerp smoothing for the entire app.
 * Disables itself on touch devices and prefers-reduced-motion.
 * Place at root (Providers.tsx) — only one instance needed.
 */
export function Mouse3DProvider({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      // Lerp factor 0.05 → smooth ~20-frame lag
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      x.set(currentX);
      y.set(currentY);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  return (
    <Mouse3DContext.Provider value={{ x, y }}>
      {children}
    </Mouse3DContext.Provider>
  );
}
