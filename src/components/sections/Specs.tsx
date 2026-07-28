import { skillGroups } from "@/data/skills";

export function Specs() {
  return (
    <section id="specs" className="container-page section-y">
      <div className="mx-auto max-w-[1000px]">
        <p className="eyebrow">Especificações técnicas</p>

        <h2 className="display-md mt-6 text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] tracking-[-0.04em]">
          O que tem
          <br />
          por dentro.
        </h2>

        <dl className="mt-16">
          {skillGroups.map((group, i) => (
            <div
              key={group.group}
              data-reveal
              className={`grid grid-cols-1 gap-y-3 border-t border-border py-[26px] sm:grid-cols-[minmax(110px,180px)_1fr] sm:gap-x-[clamp(16px,3vw,32px)] ${
                i === skillGroups.length - 1 ? "border-b" : ""
              }`}
            >
              <dt className="font-mono text-[11px] uppercase leading-[1.4] tracking-[0.14em] text-muted sm:pt-1.5">
                {group.group}
              </dt>
              <dd className="text-[clamp(1rem,2.2vw,1.5rem)] font-light leading-[1.45] tracking-[-0.02em] [text-wrap:pretty]">
                {group.skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
