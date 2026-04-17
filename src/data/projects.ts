// ─── Case Study types ────────────────────────────────────────
export interface CaseStudy {
  problem: string;
  architecture: {
    overview: string;
    boundedContexts: string[];
    keyDecisions: { title: string; description: string }[];
  };
  challenges: { title: string; description: string; solution: string }[];
  metrics: { label: string; value: string }[];
  techStack: { category: string; items: string[] }[];
  demoMoments: { title: string; description: string }[];
}

// ─── Project types ───────────────────────────────────────────
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
  caseStudy?: CaseStudy;
}

// ─── Data ────────────────────────────────────────────────────
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
    caseStudy: {
      problem:
        "Quem cuida das próprias finanças usa um app para gastos, outro para investimentos, uma planilha para metas — e nunca tem visão unificada. O FortunAI resolve isso com uma interface conversacional: você digita 'gastei 80 reais no mercado' e a despesa é registrada, categorizada e refletida no dashboard instantaneamente. Digita 'comprei 10 PETR4 a 37 reais' e o portfólio é atualizado com preço médio ponderado automático.",
      architecture: {
        overview: "DDD + Arquitetura Hexagonal",
        boundedContexts: [
          "Orçamento",
          "Investimentos",
          "Chat / Interação",
          "Catálogo",
          "Usuário",
        ],
        keyDecisions: [
          {
            title: "Roteamento inteligente de mensagens",
            description:
              "Classifica mensagens em 3 níveis antes de qualquer chamada externa: comandos com ticker resolvem localmente via CatalogoAtivoService (zero custo de API), cotações consultam Alpha Vantage com cache de 24h em PostgreSQL, apenas consultas abertas chegam ao Gemini.",
          },
          {
            title: "Separação de responsabilidades entre serviços",
            description:
              "Contrato arquitetural rígido: Gemini interpreta e formata texto. Alpha Vantage fornece dados factuais. Java faz todos os cálculos financeiros. Nenhum serviço ultrapassa sua fronteira.",
          },
          {
            title: "Interface HistoricoMercadoPort com perfis",
            description:
              "Port com duas implementações separadas por @Profile Spring — dados determinísticos em dev, Alpha Vantage real em produção. Testes nunca fazem chamadas reais e o comportamento em produção é idêntico ao testado.",
          },
        ],
      },
      challenges: [
        {
          title: "Markowitz do protótipo para produção",
          description:
            "No TCC, retornos esperados eram hardcoded para 4 tickers. Qualquer ativo fora da lista retornava pesos zerados sem erro — uma mentira silenciosa que o usuário nunca descobria.",
          solution:
            "Implementação com log-returns anualizados por 252 pregões e 10.000 simulações Monte Carlo, selecionando o portfólio com maior índice de Sharpe. Funciona para qualquer carteira, não apenas os 4 tickers hardcoded do protótipo.",
        },
        {
          title: "Rate limit da Alpha Vantage gratuita (25 chamadas/dia)",
          description:
            "Com múltiplos usuários otimizando carteiras diferentes, o limite seria atingido em minutos — tornando a feature inutilizável em produção.",
          solution:
            "MarketDataCache no PostgreSQL com TTL de 24h. A segunda chamada para o mesmo ticker no mesmo dia custa zero chamadas de API. Reduziu a complexidade de O(n × usuários) para O(n × dias).",
        },
        {
          title: "Falha silenciosa vs. falha honesta",
          description:
            "Quando Alpha Vantage retornava rate limit, o sistema silenciosamente retornava HTTP 200 com todos os pesos zerados — parecia funcionar, mas estava mentindo com um resultado inválido.",
          solution:
            "AlphaVantageRateLimitException propagado como HTTP 503 com mensagem específica. Frontend exibe banner explicativo. Um erro honesto é preferível a um resultado inválido apresentado como verdade.",
        },
      ],
      metrics: [
        { label: "Testes automatizados", value: "329" },
        { label: "Testes backend (JUnit 5)", value: "238" },
        { label: "Testes frontend (Vitest)", value: "91" },
        { label: "Simulações Monte Carlo", value: "10.000" },
        { label: "Bounded Contexts", value: "5" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 17",
            "Spring Boot",
            "DDD",
            "Arquitetura Hexagonal",
            "JUnit 5",
            "Mockito",
          ],
        },
        {
          category: "Frontend",
          items: [
            "React",
            "TypeScript",
            "Vitest",
            "React Testing Library",
          ],
        },
        {
          category: "Banco de Dados",
          items: ["PostgreSQL", "MarketDataCache (TTL 24h)"],
        },
        {
          category: "Integrações",
          items: [
            "Google Gemini",
            "Alpha Vantage",
            "WebSocket",
            "GitHub Actions",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Chat funcionando de verdade",
          description:
            "Digitar 'gastei 120 reais no restaurante' → transação aparece na lista → gráfico de pizza atualiza em tempo real. NLU + roteamento inteligente em 20 segundos.",
        },
        {
          title: "Markowitz em ação",
          description:
            "Painel de investimentos → clicar em Otimizar → gráfico com alocação atual vs ótima, Sharpe ratio, retorno esperado e volatilidade. Algoritmo financeiro real, não um CRUD.",
        },
        {
          title: "Notificação em tempo real",
          description:
            "Alerta de preço chegando no AppBar sem refresh — WebSocket + backend assíncrono em produção.",
        },
      ],
    },
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
    id: "notifyflow",
    title: "NotifyFlow",
    description:
      "Motor de notificações multi-canal assíncrono com garantia de entrega via Outbox Pattern, fallback automático entre canais e Circuit Breaker.",
    longDescription:
      "Sistema backend que centraliza envio de notificações por EMAIL, SMS e PUSH com fallback automático entre canais. Se o email falha, tenta SMS. Se SMS falha, tenta PUSH. Garante que nenhuma mensagem se perde usando o Outbox Pattern com RabbitMQ.",
    stack: [
      "Java 17",
      "Spring Boot 3.2",
      "RabbitMQ",
      "PostgreSQL 16",
      "Resilience4j",
      "Flyway",
      "Angular 17",
      "Docker",
      "Railway",
    ],
    githubUrl: "https://github.com/joaogabriel43/notifyflow",
    liveUrl: "https://notifyflow-e47f.vercel.app",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "Sistemas de notificação tradicionais são frágeis: emails falham silenciosamente, não há fallback quando um canal está indisponível, e mensagens se perdem sem rastreabilidade. O NotifyFlow resolve isso centralizando o envio de notificações por EMAIL, SMS e PUSH com fallback automático — se o email falha, tenta SMS; se SMS falha, tenta PUSH. Nenhuma mensagem se perde.",
      architecture: {
        overview:
          "Clean Architecture com separação rígida entre domínio, aplicação e infraestrutura. O núcleo do sistema é o Outbox Pattern: a notificação é salva no banco na mesma transação do negócio, e um Scheduler publica no RabbitMQ de forma assíncrona — eliminando inconsistências entre banco e mensageria sem precisar de transação distribuída.",
        boundedContexts: [
          "Notificação",
          "Entrega (Delivery)",
          "Canal (EMAIL / SMS / PUSH)",
          "Tenant",
          "Dead Letter / Reprocessamento",
        ],
        keyDecisions: [
          {
            title: "Outbox Pattern para consistência garantida",
            description:
              "A notificação é persistida no banco na mesma transação do request. Um Scheduler independente lê os registros PENDING e publica no RabbitMQ. Isso elimina o risco de mensagem publicada mas não salva (ou salva mas não publicada) — consistência sem transação distribuída.",
          },
          {
            title: "Fallback automático entre canais",
            description:
              "Cada notificação tem um canal preferencial e uma lista de fallbacks. O Consumer tenta EMAIL → SMS → PUSH em sequência. Cada falha é registrada como DeliveryAttempt, permitindo rastreabilidade completa de qual canal foi tentado, quando e com qual erro.",
          },
          {
            title: "Circuit Breaker + Rate Limiter por tenant",
            description:
              "Resilience4j protege as integrações externas (SendGrid, Twilio, Firebase) com Circuit Breaker que abre após falhas consecutivas, evitando cascata. Rate Limiter dinâmico por tenant garante isolamento — um tenant com pico não afeta os outros.",
          },
        ],
      },
      challenges: [
        {
          title: "Consistência entre banco e mensageria sem transação distribuída",
          description:
            "O padrão naive de salvar no banco e publicar no RabbitMQ em sequência tem uma janela de falha: se o processo cair entre as duas operações, a mensagem se perde ou é duplicada sem como reconciliar.",
          solution:
            "Outbox Pattern: salvar a notificação e o registro no outbox na mesma transação ACID do PostgreSQL. O Scheduler faz polling dos registros PENDING e publica no RabbitMQ com idempotência — se falhar, o registro fica PENDING e é reprocessado. Consistência eventual garantida sem 2PC.",
        },
        {
          title: "Dead Letter Queue e reprocessamento controlado",
          description:
            "Mensagens que falham repetidamente no Consumer iam para a DLQ e ficavam presas — sem visibilidade e sem forma de reprocessar seletivamente sem reiniciar o sistema.",
          solution:
            "DLQ com binding explícito no RabbitMQ e endpoint POST /api/v1/notifications/{id}/retry que republica a mensagem no exchange principal com metadados de tentativa. Dashboard Angular exibe todas as mensagens em FAILED com botão de retry individual.",
        },
        {
          title: "Rate limiting sem estado distribuído",
          description:
            "Limitar requisições por tenant (100 req/min) com múltiplas instâncias rodando em paralelo exigiria Redis ou banco compartilhado — adicionando complexidade de infraestrutura ao MVP.",
          solution:
            "Rate Limiter do Resilience4j configurado por tenant via RateLimiterRegistry dinâmico. No MVP com instância única em Railway, o estado é local e suficiente. A arquitetura de porta/adaptador garante que trocar para Redis no futuro não afeta a lógica de negócio.",
        },
      ],
      metrics: [
        { label: "Canais suportados", value: "3" },
        { label: "Padrão de entrega", value: "Outbox" },
        { label: "Rate limit por tenant", value: "100/min" },
        { label: "Retentativas automáticas", value: "DLQ" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 17",
            "Spring Boot 3.2",
            "Resilience4j",
            "Flyway",
            "JUnit 5",
            "Testcontainers",
          ],
        },
        {
          category: "Mensageria",
          items: ["RabbitMQ", "Dead Letter Queue", "Outbox Pattern"],
        },
        {
          category: "Frontend",
          items: ["Angular 17", "Signals", "Angular Material"],
        },
        {
          category: "Infra",
          items: [
            "PostgreSQL 16",
            "Docker",
            "Railway",
            "Vercel",
            "GitHub Actions",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Fallback em tempo real",
          description:
            "Simular falha no canal EMAIL e ver o sistema automaticamente tentar SMS, registrando cada tentativa com timestamp e erro — rastreabilidade completa no dashboard.",
        },
        {
          title: "Dead Letter Queue e retry",
          description:
            "Mensagem chegando na DLQ após falhas consecutivas, visível no dashboard Angular com botão de retry individual — sem precisar reiniciar o sistema.",
        },
        {
          title: "Swagger UI com API documentada",
          description:
            "Todos os endpoints documentados e testáveis diretamente no browser via https://notifyflow-production.up.railway.app/swagger-ui.html",
        },
      ],
    },
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
