"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedList, AnimatedItem } from "@/components/ui/AnimatedText";
import { certificates, type Certificate } from "@/data/certificates";

// ─── Utility: group certificates by institution ───────────────
function groupByInstitution(certs: Certificate[]): Map<string, Certificate[]> {
  return certs.reduce((map, cert) => {
    const group = map.get(cert.institution) ?? [];
    group.push(cert);
    map.set(cert.institution, group);
    return map;
  }, new Map<string, Certificate[]>());
}

// ─── Institution badge (initial letter) ──────────────────────
function InstitutionBadge({
  institution,
  badgeUrl,
}: {
  institution: string;
  badgeUrl?: string;
}) {
  if (badgeUrl) {
    return (
      <div className="w-8 h-8 rounded-sm overflow-hidden border border-border/60 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeUrl} alt={institution} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="w-8 h-8 rounded-sm border border-accent/30 bg-accent/5 flex items-center justify-center shrink-0"
      aria-hidden
    >
      <span className="font-mono text-[11px] font-medium text-accent">
        {institution.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

// ─── External link icon ───────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Single certificate card ──────────────────────────────────
function CertificateCard({ cert }: { cert: Certificate }) {
  const hasLink = Boolean(cert.url);

  const inner = (
    <div className="flex items-start gap-3 p-4 rounded-sm border border-border bg-surface hover:border-accent/30 transition-colors duration-200 group">
      <InstitutionBadge
        institution={cert.institution}
        badgeUrl={cert.badgeUrl}
      />
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm text-foreground/85 leading-snug line-clamp-2 group-hover:text-foreground transition-colors duration-200">
          {cert.name}
        </p>
        <p className="font-mono text-[10px] text-muted mt-1">{cert.year}</p>
      </div>
      {hasLink && (
        <span className="text-muted/40 group-hover:text-accent transition-colors duration-200 shrink-0 mt-0.5">
          <ExternalLinkIcon />
        </span>
      )}
    </div>
  );

  if (hasLink) {
    return (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cert.name} — ${cert.institution}, ${cert.year}`}
      >
        {inner}
      </a>
    );
  }

  return <div aria-label={`${cert.name} — ${cert.institution}, ${cert.year}`}>{inner}</div>;
}

// ─── Institution group ────────────────────────────────────────
const VISIBLE_BY_DEFAULT = 3;

function InstitutionGroup({
  institution,
  certs,
  groupIndex,
}: {
  institution: string;
  certs: Certificate[];
  groupIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const visible = certs.slice(0, VISIBLE_BY_DEFAULT);
  const hidden = certs.slice(VISIBLE_BY_DEFAULT);
  const hasMore = hidden.length > 0;

  return (
    <AnimatedItem>
      <div>
        {/* Institution header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent/70">
            {institution}
          </span>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] text-muted/40">
            {certs.length} cert{certs.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Always-visible cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Expandable hidden cards */}
        <AnimatePresence>
          {expanded && hasMore && (
            <motion.div
              key={`${institution}-extra-${groupIndex}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ overflow: "hidden" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {hidden.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / collapse button */}
        {hasMore && (
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted hover:text-accent transition-colors duration-200"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              ↓
            </motion.span>
            {expanded
              ? `Ocultar certificados de ${institution}`
              : `Ver todos de ${institution} (+${hidden.length})`}
          </motion.button>
        )}
      </div>
    </AnimatedItem>
  );
}

// ─── Certificates section ─────────────────────────────────────
export function Certificates() {
  const grouped = groupByInstitution(certificates);

  return (
    <section
      id="certificates"
      className="section-padding border-t border-border"
    >
      <div className="container-main">
        {/* Header */}
        <div className="mb-10">
          <SectionLabel index={3}>certificados</SectionLabel>

          <AnimatedList className="mt-6">
            <AnimatedItem>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
                Aprendizado{" "}
                <em className="italic text-accent">contínuo.</em>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-sans text-muted text-base leading-relaxed mt-4 max-w-xl">
                Formações e certificações que complementam a experiência prática
                no dia a dia.
              </p>
            </AnimatedItem>
          </AnimatedList>
        </div>

        {/* Groups */}
        <AnimatedList className="space-y-10">
          {Array.from(grouped.entries()).map(
            ([institution, certs], groupIndex) => (
              <InstitutionGroup
                key={institution}
                institution={institution}
                certs={certs}
                groupIndex={groupIndex}
              />
            )
          )}
        </AnimatedList>
      </div>
    </section>
  );
}
