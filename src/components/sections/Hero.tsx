import { hero, heroStats } from "@/data/site";

export function Hero() {
  return (
    <>
      <section
        id="hero"
        className="container-page flex min-h-[calc(100vh-48px)] flex-col justify-center gap-10 pb-[72px] pt-24"
      >
        <p className="eyebrow">{hero.eyebrow}</p>

        <h1 className="display-xl text-[clamp(3.2rem,10.5vw,9.5rem)]">
          {hero.headline[0]}
          <br />
          {hero.headline[1]}
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border-t border-border pt-7">
          <p className="max-w-[440px] text-[17px] leading-[1.55] text-muted [text-wrap:pretty]">
            {hero.lead}
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-pill">
              Ver os projetos
            </a>
            <a href="#contact" className="btn-pill-ghost">
              Falar comigo
            </a>
          </div>
        </div>
      </section>

      {/* ── Faixa de números ── */}
      <section
        aria-label="Números"
        className="border-y border-border bg-surface"
      >
        <div className="hairline-grid hairline-grid-surface grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {heroStats.map((stat) => (
            <div key={stat.label} className="px-5 py-[34px] text-center">
              <p className="eyebrow-sm">{stat.label}</p>
              <p className="tnum mt-3 font-mono text-[clamp(1.7rem,3.4vw,2rem)] font-normal leading-none tracking-[-0.02em] text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
