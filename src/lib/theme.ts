export const THEME_STORAGE_KEY = "portfolio-theme";

export type Theme = "light" | "dark";

/**
 * Script inline injetado no <head> — roda antes da primeira pintura para
 * aplicar a classe `.dark` sem flash de tema errado (FOUC).
 *
 * Precisa ser uma string porque é serializado via dangerouslySetInnerHTML.
 * Mantido em sync com `THEME_STORAGE_KEY`.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY
)};var s=localStorage.getItem(k);var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
