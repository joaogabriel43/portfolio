export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: "Intermidia",
    role: "Engenheiro de Aplicativos em Computação",
    period: "Abril 2023 — Presente",
    location: "Porto Alegre, RS",
    description:
      "Desenvolvimento e manutenção de sistemas internos críticos, atuando full-stack com C#, Java, .NET e Angular em ambiente corporativo.",
    achievements: [
      "Desenvolvimento e manutenção de funcionalidades em sistemas internos com C#, Java, .NET e Angular",
      "Criação, otimização e manutenção de queries, stored procedures e funções em SQL Server",
      "Sustentação do sistema MobiliVendas garantindo performance e estabilidade em produção",
      "Análise, diagnóstico e correção de bugs com versionamento de código via Git",
      "Prestação de suporte técnico especializado e colaboração ativa com o time de desenvolvimento",
    ],
  },
  {
    company: "Compuletra",
    role: "Help Desk",
    period: "Março 2022 — Março 2023",
    location: "Porto Alegre, RS",
    description:
      "Suporte técnico nível 1 e 2 para o sistema Vistoria Pro, com foco em resolução de problemas e documentação de soluções.",
    achievements: [
      "Atendimento de suporte técnico nível 1 e 2 para usuários do sistema Vistoria Pro",
      "Realização de atualizações, configurações e manutenção de ambientes",
      "Produção de documentação técnica de soluções e procedimentos",
    ],
  },
];
