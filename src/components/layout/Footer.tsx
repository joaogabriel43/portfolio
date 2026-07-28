import { personal } from "@/data/personal";

const YEAR = new Date().getFullYear();

/** "Porto Alegre, RS — Brasil" → "Porto Alegre · RS · Brasil" */
const location = personal.location
  .split(/[,—]/)
  .map((part) => part.trim())
  .filter(Boolean)
  .join(" · ");

export function Footer() {
  return (
    <footer className="container-page flex flex-wrap items-center justify-between gap-3 border-t border-border py-[30px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
      <p>
        © {YEAR} {personal.name}
      </p>
      <p>{location}</p>
    </footer>
  );
}
