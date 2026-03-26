"use client";

import { MotionConfig } from "framer-motion";
import { CustomCursor } from "@/components/ui/CustomCursor";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      {children}
    </MotionConfig>
  );
}
