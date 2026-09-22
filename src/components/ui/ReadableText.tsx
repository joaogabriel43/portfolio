"use client";

import { useEffect, useRef, useState } from "react";

interface ReadableTextProps {
  text: string;
  className?: string;
  collapsedLines?: number;
  /** Cor de fundo por trás do fade — precisa bater com a seção que envolve o componente. */
  fadeFrom?: "bg" | "surface";
}

// Divide em 2 parágrafos quando há prosa suficiente para respirar — só formatação, o dado não muda.
function splitParagraphs(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length <= 3) return [text];
  const mid = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, mid).join(" "), sentences.slice(mid).join(" ")];
}

export function ReadableText({
  text,
  className = "text-[17px] leading-[1.7] text-muted [text-wrap:pretty]",
  collapsedLines = 4,
  fadeFrom = "bg",
}: ReadableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [text, collapsedLines]);

  return (
    <div className={`max-w-[68ch] ${className}`}>
      <div className="relative">
        {expanded ? (
          splitParagraphs(text).map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : undefined}>
              {p}
            </p>
          ))
        ) : (
          <p
            ref={measureRef}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: collapsedLines,
              overflow: "hidden",
            }}
          >
            {text}
          </p>
        )}

        {!expanded && overflows && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t to-transparent ${
              fadeFrom === "surface" ? "from-surface" : "from-background"
            }`}
          />
        )}
      </div>

      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="relative z-10 mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent-text transition-opacity duration-base ease-out hover:opacity-70"
        >
          {expanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}
