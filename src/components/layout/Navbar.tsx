"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { personal } from "@/data/personal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// ─── Nav links ────────────────────────────────────────────────
// href começando com "#" → section link (scroll na home, "/#hash" fora dela)
// href começando com "/"  → page link  (Next.js Link)
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Especificações", href: "#specs" },
  { label: "Experiência", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contact" },
];

/**
 * Section links que têm uma página dedicada quando fora da home.
 * Ex: na home "#projects" faz scroll; em outras páginas leva a "/projects".
 */
const SECTION_PAGE_FALLBACK: Record<string, string> = {
  "#projects": "/projects",
};

const SECTION_IDS = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
  l.href.slice(1)
);

const isPageHref = (href: string) => href.startsWith("/");

// ─── Navbar ───────────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("");

  // Destaca a seção visível — só faz sentido na home
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
    );

    const observed = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  function resolveHref(href: string): string {
    if (isPageHref(href)) return href;
    if (isHome) return href;
    return SECTION_PAGE_FALLBACK[href] ?? `/${href}`;
  }

  function isActive(href: string): boolean {
    if (isPageHref(href)) {
      return pathname === href || pathname.startsWith(`${href}/`);
    }
    const fallback = SECTION_PAGE_FALLBACK[href];
    if (!isHome && fallback) {
      return pathname === fallback || pathname.startsWith(`${fallback}/`);
    }
    return isHome && activeSection === href.slice(1);
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="sticky top-0 z-50 flex min-h-12 items-center justify-between gap-4 border-b border-border px-5 md:px-[5vw]"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      <Link
        href="/"
        className="shrink-0 text-[13px] font-medium tracking-[-0.01em] text-foreground"
      >
        {personal.name}
      </Link>

      <div className="flex min-w-0 items-center gap-3">
        <ul className="flex min-w-0 items-center gap-[22px] overflow-x-auto whitespace-nowrap py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            const target = resolveHref(href);
            const linkClass = `text-xs transition-colors duration-base ease-out hover:text-foreground ${
              active ? "text-foreground" : "text-muted"
            }`;

            // Link do Next só para navegação de página pura (sem hash)
            return (
              <li key={href}>
                {isPageHref(target) && !target.includes("#") ? (
                  <Link
                    href={target}
                    className={linkClass}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={target}
                    className={linkClass}
                    aria-current={active ? "true" : undefined}
                  >
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
}
