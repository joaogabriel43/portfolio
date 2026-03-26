export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "finassistant",
    title: "FortunAI",
    description:
      "Assistente financeiro inteligente com integração de IA para análise de portfólios e recomendações personalizadas.",
    longDescription:
      "Aplicação full-stack com frontend em Next.js e backend robusto, integrando APIs de mercado financeiro com interpretação via IA. Arquitetura em camadas separando dados factuais de análise interpretativa.",
    stack: [
      "Next.js",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "AI Integration",
    ],
    githubUrl: "https://github.com/joaogabriel43/finassistant",
    liveUrl: "https://finassistant-frontend.vercel.app/login",
    featured: true,
    year: 2025,
  },
  {
    id: "gerenciador-pedidos-api",
    title: "API de Gerenciamento de Pedidos",
    description:
      "API REST robusta para gerenciamento de pedidos com foco em arquitetura limpa, boas práticas e cobertura de testes.",
    longDescription:
      "Projeto back-end construído com Java 17 e Spring Boot, aplicando princípios de Clean Architecture e SOLID. Inclui suite completa de testes unitários e de integração com JUnit 5 e Mockito.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Spring Data JPA",
      "H2 Database",
      "JUnit 5",
      "Mockito",
    ],
    githubUrl: "https://github.com/joaogabriel43/gerenciador-pedidos-api",
    liveUrl: undefined,
    featured: true,
    year: 2024,
  },
  {
    id: "screenmatch-frases",
    title: "ScreenMatch Frases",
    description:
      "API REST para servir frases e informações de filmes e séries, atuando como serviço de back-end desacoplado.",
    longDescription:
      "Serviço back-end construído com Spring Boot e PostgreSQL. Expõe endpoints REST para consulta de frases e informações de filmes, com persistência relacional via Spring Data JPA.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "PostgreSQL",
      "REST API",
    ],
    githubUrl: "https://github.com/joaogabriel43/Screenmatch-frases",
    liveUrl: undefined,
    featured: false,
    year: 2024,
  },
];
