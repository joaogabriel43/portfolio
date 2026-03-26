"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Dot: snappy follow
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 42, mass: 0.3 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 42, mass: 0.3 });

  // Ring: slightly lagged
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 28, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 28, mass: 0.6 });

  // Ring size spring (36px default → 56px on hover)
  const ringSize = useSpring(hovering ? 56 : 36, { stiffness: 300, damping: 28 });

  useEffect(() => {
    // Don't render on touch/coarse pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], label, input, textarea, select"
      );
      setHovering(!!el);
    };

    document.documentElement.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [cursorX, cursorY]);

  // Update ring size spring when hovering changes
  useEffect(() => {
    ringSize.set(hovering ? 56 : 36);
  }, [hovering, ringSize]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          border: "1px solid rgba(201,185,122,0.35)",
          transition: "opacity 0.2s",
        }}
      />

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-accent"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      />
    </>
  );
}
