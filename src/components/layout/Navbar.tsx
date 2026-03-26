"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav links ────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Sobre",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Certificados", href: "#certificates" },
  { label: "Projetos",     href: "#projects" },
  { label: "Experiência",  href: "#experience" },
  { label: "Contato",      href: "#contact" },
] as const;

const SECTION_IDS = ["hero", "about", "skills", "certificates", "projects", "experience", "contact"];

// ─── Hamburger icon ───────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-3.5 flex flex-col justify-between" aria-hidden>
      <motion.span
        className="w-full h-px bg-foreground origin-center block"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="w-4 h-px bg-foreground block"
        animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="w-full h-px bg-foreground origin-center block"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection for backdrop
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Give drawer time to close before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-[100]",
          "transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/50"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav
          className="container-main flex items-center justify-between h-16"
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors duration-200"
            aria-label="Início"
          >
            {"< dev />"}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={[
                      "relative font-sans text-sm transition-colors duration-200",
                      isActive ? "text-accent" : "text-muted hover:text-foreground",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[98] bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 z-[99] w-72 bg-surface border-r border-border flex flex-col pt-20 pb-8 px-6 md:hidden"
            >
              <ul className="space-y-1" role="list">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const sectionId = href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <a
                        href={href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                        className={[
                          "flex items-center gap-3 py-3 font-sans text-base transition-colors duration-200",
                          isActive ? "text-accent" : "text-muted hover:text-foreground",
                        ].join(" ")}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {isActive && (
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                        )}
                        {label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer footer */}
              <div className="mt-auto pt-6 border-t border-border">
                <p className="font-mono text-[10px] text-muted/40">
                  {"< dev />"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
