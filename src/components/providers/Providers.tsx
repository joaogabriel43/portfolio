"use client";

import { MotionConfig } from "framer-motion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Mouse3DProvider } from "@/components/providers/Mouse3DProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <Mouse3DProvider>
        <CustomCursor />
        {children}
      </Mouse3DProvider>
    </MotionConfig>
  );
}
