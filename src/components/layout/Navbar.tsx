"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav links ────────────────────────────────────────────────
// href starting with "#" → section link (smooth scroll on home, /#hash on other pages)
// href starting with "/"  → page link  (Next.js Link)
const NAV_LINKS = [
  { label: "Sobre",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Certificados", href: "#certificates" },
  { label: "Blog",         href: "/blog" },
  { label: "Projetos",     href: "#projects" },
  { label: "Experiência",  href: "#experience" },
  { label: "Contato",      href: "#contact" },
] as const;

type NavHref = (typeof NAV_LINKS)[number]["href"];

const SECTION_IDS = ["hero", "about", "skills", "certificates", "projects", "experience", "contact"];

// Section links que têm uma página dedicada quando fora da home.
// Ex: na home "#projects" faz scroll; em outras páginas leva a "/projects".
const SECTION_PAGE_FALLBACK: Record<string, string> = {
  "#projects": "/projects",
};

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
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection — only meaningful on home page, harmless elsewhere
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // When near bottom of home page, force "contact" active
      if (isHomePage) {
        const nearBottom =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
        if (nearBottom) setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Active section via IntersectionObserver (home page only)
  useEffect(() => {
    if (!isHomePage) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [isHomePage]);

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

  // Smooth-scroll handler (home page section links only)
  const handleSectionClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Derive active state per link
  function isActive(href: NavHref): boolean {
    if (href.startsWith("/")) {
      // Page link: active when pathname starts with href
      return pathname.startsWith(href);
    }
    // Section link com página dedicada: ativo quando estamos nessa página
    const pageFallback = SECTION_PAGE_FALLBACK[href];
    if (!isHomePage && pageFallback) {
      return pathname.startsWith(pageFallback);
    }
    // Section link: active via IntersectionObserver (home only)
    return isHomePage && activeSection === href.slice(1);
  }

  // Render a single nav item — shared between desktop and mobile
  function NavItem({
    label,
    href,
    mobile = false,
    index = 0,
  }: {
    label: string;
    href: NavHref;
    mobile?: boolean;
    index?: number;
  }) {
    const active = isActive(href);
    const isPageLink = href.startsWith("/");

    const cls = [
      "relative font-sans transition-colors duration-200",
      mobile ? "flex items-center gap-3 py-3 text-base w-full" : "text-sm",
      active ? "text-accent" : "text-muted hover:text-foreground",
    ].join(" ");

    const activeIndicator = active ? (
      mobile ? (
        <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
      ) : (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )
    ) : null;

    if (isPageLink) {
      return (
        <Link
          href={href}
          className={cls}
          aria-current={active ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {mobile && activeIndicator}
          {label}
          {!mobile && activeIndicator}
        </Link>
      );
    }

    // Section link com página dedicada e fora da home → vira page link
    const pageFallback = SECTION_PAGE_FALLBACK[href];
    if (!isHomePage && pageFallback) {
      return (
        <Link
          href={pageFallback}
          className={cls}
          aria-current={active ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {mobile && activeIndicator}
          {label}
          {!mobile && activeIndicator}
        </Link>
      );
    }

    // Section link: smooth-scroll on home, hash-navigate on other pages
    const anchorHref = isHomePage ? href : `/${href}`;
    const handleClick = isHomePage
      ? (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          handleSectionClick(href);
        }
      : () => setMenuOpen(false);

    return (
      <a
        href={anchorHref}
        onClick={handleClick}
        className={cls}
        aria-current={active ? "page" : undefined}
      >
        {mobile && activeIndicator}
        {label}
        {!mobile && activeIndicator}
      </a>
    );
  }

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
          {isHomePage ? (
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleSectionClick("#hero"); }}
              className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors duration-200"
              aria-label="Início"
            >
              {"< dev />"}
            </a>
          ) : (
            <Link
              href="/"
              className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors duration-200"
              aria-label="Início"
            >
              {"< dev />"}
            </Link>
          )}

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavItem label={label} href={href} />
              </li>
            ))}
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
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <NavItem label={label} href={href} mobile index={i} />
                  </motion.li>
                ))}
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
