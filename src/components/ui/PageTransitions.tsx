"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Envolve a navegação client-side do App Router numa View Transition nativa.
 * O Next 14 não faz isso sozinho: interceptamos o clique em links internos,
 * abrimos a transição e só a resolvemos quando o pathname novo foi commitado
 * (senão o browser fotografaria a página antiga como "nova").
 * Sem `startViewTransition` ou com reduced-motion, não interceptamos nada.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);

  // Rota nova commitada → libera o snapshot "novo"
  useEffect(() => {
    settle.current?.();
    settle.current = null;
  }, [pathname]);

  useEffect(() => {
    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a") : null;
      if (
        !link ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(link.href, location.href);
      // Externo ou mesma página (âncora/scroll nativo): deixa passar
      if (url.origin !== location.origin || url.pathname === location.pathname) {
        return;
      }

      // preventDefault já basta: o <Link> do Next verifica e.defaultPrevented
      // antes de navegar, então não precisamos de stopPropagation — isso deixa
      // onClick handlers React futuros no link (bubble phase) livres para rodar.
      e.preventDefault();
      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            settle.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            // Rede lenta / navegação abortada: nunca deixa a transição travada
            setTimeout(resolve, 1000);
          })
      );
      // Transição pulada (clique rápido, aba oculta) rejeita .ready — não é erro
      transition.ready.catch(() => {});
    };

    // Captura: roda antes do onClick do <Link>, que faria o push sem transição
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
