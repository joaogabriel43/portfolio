import { projects } from "./projects";

/**
 * Copy e números da home — separados dos componentes para manter a regra
 * "dados sempre em src/data/".
 */

export const hero = {
  eyebrow: "Desenvolvedor Full-Stack · Porto Alegre",
  headline: ["Sistemas", "distribuídos."],
  lead: "Java, Spring Boot e arquitetura orientada a eventos. Onze sistemas construídos do zero — cada um resolvendo um problema real de engenharia, documentado decisão por decisão.",
} as const;

export interface Stat {
  label: string;
  value: string;
}

/**
 * Extrai o primeiro inteiro de um valor de métrica.
 * Formatos suportados: "329" · "90+" · "11/11" (→ 11) · "4.000" (→ 4000).
 * Retorna 0 quando não há número no início da string.
 */
function parseMetricCount(value: string): number {
  const match = /^(\d[\d.]*)/.exec(value.trim());
  if (!match) return 0;
  return Number.parseInt(match[1].replace(/\./g, ""), 10);
}

/**
 * Soma dos totais de teste declarados nos case studies.
 * Fonte única: a métrica marcada com `isTestTotal` em cada projeto —
 * nunca um número digitado aqui.
 */
const testTotals = projects.flatMap((project) =>
  (project.caseStudy?.metrics ?? [])
    .filter((metric) => metric.isTestTotal)
    .map((metric) => parseMetricCount(metric.value))
);

const totalTests = testTotals.reduce((sum, count) => sum + count, 0);

/**
 * Vários projetos declaram o total com "+" ("90+", "156+", "29+"), ou seja,
 * são pisos e não valores exatos. O agregado herda esse "+" para não
 * afirmar precisão que os dados de origem não têm.
 */
const hasLowerBound = projects.some((project) =>
  project.caseStudy?.metrics.some(
    (metric) => metric.isTestTotal && metric.value.includes("+")
  )
);

/** Faixa de números logo abaixo do hero. */
export const heroStats: Stat[] = [
  { label: "Projetos", value: String(projects.length) },
  { label: "Stack base", value: "Java 21" },
  {
    label: "Testes escritos",
    value: `${totalTests}${hasLowerBound ? "+" : ""}`,
  },
  { label: "Experiência", value: "desde 2022" },
];

export const about = {
  statement:
    "Escrevo backend em Java com a mesma disciplina que se exige de sistema em produção: fronteiras explícitas, evento imutável, teste que prova comportamento e não implementação.",
} as const;

export const lineupSection = {
  eyebrow: "O Lineup",
  title: "Onze sistemas.",
  subtitle:
    "Cada projeto nasceu de um problema concreto — mensageria confiável, auditoria sem acoplamento, rate limiting distribuído. Nenhum deles é tutorial.",
} as const;

/** Projeto exibido na seção "Em destaque" — precisa ter caseStudy. */
export const featuredProjectId = "auditvault";
