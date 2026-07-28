import Image from "next/image";
import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";
import { about } from "@/data/site";

const current = experiences[0];

const META = [
  {
    label: "Atual",
    value: `${current.role} · ${current.company}`,
  },
  {
    label: "Formação",
    value: `${personal.education.degree} · ${personal.education.institution} (${personal.education.status}, ${personal.education.graduation})`,
  },
  {
    label: "Idiomas",
    value: personal.languages.map((l) => `${l.name} — ${l.level}`).join(" · "),
  },
];

export function About() {
  return (
    <section id="about" className="container-page section-y">
      <div className="mx-auto flex max-w-[880px] flex-col gap-12">
        <p className="eyebrow">Sobre</p>

        <p
          data-reveal
          className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-light leading-[1.28] tracking-[-0.025em] [text-wrap:pretty]"
        >
          {about.statement}
        </p>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          <Image
            src="/avatar.jpg"
            alt={`Foto de ${personal.name}`}
            width={180}
            height={220}
            sizes="180px"
            className="h-[220px] w-[180px] shrink-0 rounded-[14px] object-cover"
          />
          <p className="text-[17px] leading-[1.65] text-muted [text-wrap:pretty]">
            {personal.bio}
          </p>
        </div>

        <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 border-t border-border pt-8">
          {META.map(({ label, value }) => (
            <div key={label}>
              <dt className="eyebrow-sm">{label}</dt>
              <dd className="mt-3 text-[15px] leading-[1.5] text-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
