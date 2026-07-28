import { personal } from "@/data/personal";
import { ContactForm } from "@/components/ui/ContactForm";

/** Remove protocolo e barra final para exibir a URL de forma limpa. */
const prettyUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const CHANNELS = [
  { label: "GitHub", value: prettyUrl(personal.github), href: personal.github },
  { label: "LinkedIn", value: prettyUrl(personal.linkedin), href: personal.linkedin },
  {
    label: "Telefone",
    value: personal.phone,
    href: `tel:${personal.phone.replace(/\D/g, "")}`,
  },
  { label: "Local", value: personal.location, href: null },
];

export function Contact() {
  return (
    <section id="contact" className="container-page pb-[110px] pt-32 md:pt-40 lg:pt-[170px]">
      <div className="mx-auto flex max-w-[980px] flex-col gap-14">
        <header className="flex flex-col gap-5">
          <p className="eyebrow">Contato</p>
          <h2 className="display-lg text-[clamp(2.4rem,7vw,6rem)]">
            Vamos conversar.
          </h2>
          {personal.available && (
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-positive"
                aria-hidden
              />
              Disponível para novas oportunidades
            </p>
          )}
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(32px,5vw,64px)]">
          {/* ── Formulário (Resend via /api/contact) ── */}
          <ContactForm />

          {/* ── Canais diretos ── */}
          <div className="flex flex-col gap-9">
            <a
              href={`mailto:${personal.email}`}
              className="border-b border-border pb-3.5 text-[clamp(1.1rem,2.4vw,1.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-accent transition-opacity duration-base ease-out hover:opacity-70"
            >
              {personal.email}
            </a>

            <dl className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-6 gap-y-7">
              {CHANNELS.map(({ label, value, href }) => (
                <div key={label}>
                  <dt className="eyebrow-sm">{label}</dt>
                  <dd className="mt-2.5 text-[14.5px] leading-[1.45] [overflow-wrap:anywhere]">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition-colors duration-base ease-out hover:text-accent"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
