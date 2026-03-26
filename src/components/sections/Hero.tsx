"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

// ─── Java Code Snippet ────────────────────────────────────────
function JavaCodeCard() {
  type TokenType = "annotation" | "keyword" | "type" | "identifier" | "string" | "comment" | "operator" | "plain" | "method";

  const Token = ({
    type,
    children,
  }: {
    type: TokenType;
    children: React.ReactNode;
  }) => {
    const colors: Record<TokenType, string> = {
      annotation:  "text-[#c9b97a]",   // accent — @Service, @GetMapping
      keyword:     "text-[#c792ea]",   // purple — public, class, return, new
      type:        "text-[#82aaff]",   // blue — List, ResponseEntity, String
      identifier:  "text-[#f0ece4]",   // foreground — variable/class names
      string:      "text-[#c3e88d]",   // green — string literals
      comment:     "text-[#546e7a] italic", // dark muted — // comments
      operator:    "text-[#89ddff]",   // cyan — . () -> :: {}
      plain:       "text-[#f0ece4]/70",
      method:      "text-[#82aaff]/90",
    };
    return <span className={colors[type]}>{children}</span>;
  };

  const lines = [
    <>
      <Token type="annotation">@Service</Token>
    </>,
    <>
      <Token type="annotation">@Transactional</Token>
      <Token type="plain">(readOnly = </Token>
      <Token type="keyword">true</Token>
      <Token type="plain">)</Token>
    </>,
    <>
      <Token type="keyword">public class </Token>
      <Token type="identifier">PortfolioService </Token>
      <Token type="operator">{"{"}</Token>
    </>,
    <></>,
    <>
      {"  "}
      <Token type="keyword">private final </Token>
      <Token type="type">ProjectRepository </Token>
      <Token type="identifier">repo</Token>
      <Token type="plain">;</Token>
    </>,
    <></>,
    <>
      {"  "}
      <Token type="keyword">public </Token>
      <Token type="type">List</Token>
      <Token type="operator">{"<"}</Token>
      <Token type="type">Project</Token>
      <Token type="operator">{">"}</Token>
      <Token type="method"> findFeatured</Token>
      <Token type="operator">() {"{"}</Token>
    </>,
    <>
      {"    "}
      <Token type="keyword">return </Token>
      <Token type="identifier">repo</Token>
      <Token type="operator">.</Token>
      <Token type="method">findAll</Token>
      <Token type="operator">()</Token>
    </>,
    <>
      {"      "}
      <Token type="operator">.</Token>
      <Token type="method">stream</Token>
      <Token type="operator">()</Token>
    </>,
    <>
      {"      "}
      <Token type="operator">.</Token>
      <Token type="method">filter</Token>
      <Token type="operator">(</Token>
      <Token type="type">Project</Token>
      <Token type="operator">::</Token>
      <Token type="method">isFeatured</Token>
      <Token type="operator">)</Token>
    </>,
    <>
      {"      "}
      <Token type="operator">.</Token>
      <Token type="method">sorted</Token>
      <Token type="operator">(</Token>
      <Token type="type">Comparator</Token>
    </>,
    <>
      {"        "}
      <Token type="operator">.</Token>
      <Token type="method">comparing</Token>
      <Token type="operator">(</Token>
      <Token type="type">Project</Token>
      <Token type="operator">::</Token>
      <Token type="method">getYear</Token>
      <Token type="operator">)</Token>
    </>,
    <>
      {"        "}
      <Token type="operator">.</Token>
      <Token type="method">reversed</Token>
      <Token type="operator">())</Token>
    </>,
    <>
      {"      "}
      <Token type="operator">.</Token>
      <Token type="method">collect</Token>
      <Token type="operator">(</Token>
      <Token type="method">toList</Token>
      <Token type="operator">());</Token>
    </>,
    <>
      {"  "}
      <Token type="operator">{"}"}</Token>
    </>,
    <>
      <Token type="operator">{"}"}</Token>
    </>,
  ];

  return (
    <div className="animate-float">
      <div
        className="relative rounded-sm overflow-hidden border border-border/60"
        style={{
          background: "linear-gradient(135deg, #0d0d0d 0%, #111111 100%)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,185,122,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] text-muted/60">
            PortfolioService.java
          </span>
          <div className="w-16" />
        </div>

        {/* Code body */}
        <div className="px-4 py-4 overflow-auto">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr
                  key={i}
                  className={i === 6 ? "bg-accent/[0.04] rounded" : ""}
                >
                  <td className="font-mono text-[11px] text-muted/30 select-none pr-4 text-right w-6 align-top pt-0.5">
                    {i + 1}
                  </td>
                  <td className="font-mono text-[12px] leading-[1.7] whitespace-pre">
                    {line}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center gap-3 px-4 py-2 border-t border-border/30">
          <span className="font-mono text-[9px] text-muted/40">Java 17</span>
          <span className="font-mono text-[9px] text-accent/50">● Spring Boot 3</span>
          <span className="font-mono text-[9px] text-muted/40 ml-auto">UTF-8</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center section-padding overflow-hidden">
        {/* Vertical lines background */}
        <div
          className="hero-lines absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden
        />

        {/* Radial gradient — right side glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 45%, rgba(201,185,122,0.045) 0%, transparent 65%)",
          }}
          aria-hidden
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background))",
          }}
          aria-hidden
        />

        <div className="container-main w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left: text ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Tag */}
              <motion.div variants={itemVariants} className="mb-7">
                <SectionLabel animate={false}>
                  Engenheiro de Software Sênior
                </SectionLabel>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-serif text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.06] mb-6"
              >
                Sistemas
                <br />
                <em className="not-italic text-accent">robustos,</em>
                <br />
                código que
                <br />
                <span className="italic">perdura.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="font-sans text-muted text-lg leading-relaxed max-w-md mb-10"
              >
                Especializado em{" "}
                <span className="text-foreground/80">Java</span> ·{" "}
                <span className="text-foreground/80">Spring Boot</span> ·{" "}
                <span className="text-foreground/80">TypeScript</span> ·{" "}
                <span className="text-foreground/80">Angular</span>.
                <br />
                Clean Architecture e DDD na prática.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button href="#projects" variant="primary" size="lg">
                  Ver projetos
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button href="#contact" variant="ghost" size="lg">
                  Entrar em contato
                </Button>
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mt-14"
              >
                <motion.div
                  className="w-px h-8 bg-border origin-top"
                  animate={{ scaleY: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
                <span className="font-mono text-[10px] text-muted/50 tracking-[0.2em] uppercase">
                  scroll para explorar
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right: code card ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="hidden lg:flex justify-center items-center"
            >
              <JavaCodeCard />
            </motion.div>
          </div>
        </div>
    </section>
  );
}
