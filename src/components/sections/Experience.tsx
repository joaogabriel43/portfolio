import { experiences } from "@/data/experience";
import { certificates } from "@/data/certificates";

const isCurrent = (period: string) => period.toLowerCase().includes("presente");

export function Experience() {
  return (
    <section
      id="experience"
      className="container-page section-y border-y border-border bg-surface"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col gap-16">
        <header>
          <p className="eyebrow">Trajetória</p>
          <h2 className="display-md mt-6 text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em]">
            Onde estive.
          </h2>
        </header>

        {/* ── Experiências ── */}
        <div className="flex flex-col gap-14">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.period}`}
              data-reveal
              className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(24px,4vw,56px)] border-t border-border pt-9"
            >
              <div>
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                    isCurrent(exp.period) ? "text-accent" : "text-muted"
                  }`}
                >
                  {exp.period}
                </p>
                <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)] font-light leading-[1.2] tracking-[-0.03em]">
                  {exp.role}
                </h3>
                <p className="mt-3 text-[15px] text-muted">
                  {exp.company} · {exp.location}
                </p>
              </div>

              <div>
                <p className="text-[15px] leading-[1.6] text-muted [text-wrap:pretty]">
                  {exp.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {exp.achievements.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-[14.5px] leading-[1.55] text-muted [text-wrap:pretty]"
                    >
                      <span
                        className="absolute left-0 top-[0.68em] h-px w-2.5 bg-accent"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* ── Certificações ── */}
        <div className="border-t border-border pt-9">
          <p className="eyebrow-sm">Certificações</p>
          <ul className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-x-8 gap-y-5">
            {certificates.map((cert) => (
              <li
                key={cert.id}
                className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
              >
                <span className="text-[15px] leading-[1.35] [text-wrap:pretty]">
                  {cert.name}
                </span>
                <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-muted">
                  {cert.institution} · {cert.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
