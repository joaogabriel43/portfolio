// ─── Case Study types ────────────────────────────────────────
export interface CaseStudy {
  problem: string;
  architecture: {
    overview: string;
    boundedContexts: string[];
    keyDecisions: { title: string; description: string }[];
  };
  challenges: { title: string; description: string; solution: string }[];
  metrics: {
    label: string;
    value: string;
    /**
     * Marca ESTA métrica como o total canônico de testes do projeto.
     * Serve de fonte única para o número agregado exibido na home
     * (ver `totalTests` em src/data/site.ts).
     *
     * Só pode existir UMA por projeto. Não marcar métricas que sejam
     * decomposição de outra — em finassistant, por exemplo, "Testes
     * backend" (238) + "Testes frontend" (91) formam os "Testes
     * automatizados" (329); apenas o 329 é marcado.
     */
    isTestTotal?: boolean;
  }[];
  techStack: { category: string; items: string[] }[];
  demoMoments: { title: string; description: string }[];
}

// ─── Lineup (carrossel da home) ──────────────────────────────
export interface LineupMeta {
  /** Posição no carrossel horizontal da home. */
  order: number;
  /** Rótulo de domínio exibido no topo do card (ex: "IA / Backend"). */
  label: string;
  /** Palavra-conceito que define o projeto, exibida em destaque. */
  keyword: string;
  /** Tamanho da palavra-conceito em px — ajustado ao comprimento. */
  keywordSize: number;
  /** Linha de stack resumida exibida no rodapé do card. */
  stackLine: string;
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
  /** Categorias para o filtro da página /projects (ex: "Backend", "AI / LLM"). */
  tags: string[];
  lineup: LineupMeta;
  caseStudy?: CaseStudy;
}

/** Projetos na ordem do carrossel da home. */
export function getLineup(): Project[] {
  return [...projects].sort((a, b) => a.lineup.order - b.lineup.order);
}

// ─── Data ────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "finassistant",
    tags: ["Backend", "AI / LLM"],
    lineup: {
      order: 1,
      label: "IA / Backend",
      keyword: "Markowitz",
      keywordSize: 26,
      stackLine: "Java 17 · Next.js · Gemini · PostgreSQL",
    },
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
        { label: "Testes automatizados", value: "329", isTestTotal: true },
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
    id: "notifyflow",
    tags: ["Backend", "Mensageria"],
    lineup: {
      order: 3,
      label: "Mensageria",
      keyword: "Outbox",
      keywordSize: 28,
      stackLine: "RabbitMQ · Resilience4j · Angular 17",
    },
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
    id: "auditvault",
    tags: ["Backend", "Infra / DevOps"],
    lineup: {
      order: 2,
      label: "Backend",
      keyword: "CQRS",
      keywordSize: 30,
      stackLine: "Event Sourcing · Elasticsearch · SSE",
    },
    title: "AuditVault",
    description:
      "Motor de auditoria plug-and-play com Event Sourcing, CQRS e dashboard em tempo real via SSE para rastreabilidade total de APIs REST.",
    longDescription:
      "Captura automaticamente todas as mutações de estado em APIs REST via AOP sem poluir o código de negócio. Armazena eventos imutáveis no PostgreSQL, indexa no Elasticsearch e reconstrói o estado de entidades em qualquer ponto no tempo com complexidade O(1) via Snapshots.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Event Sourcing",
      "CQRS",
      "PostgreSQL",
      "Elasticsearch",
      "Angular 17",
      "SSE",
      "Docker",
      "Railway",
    ],
    githubUrl: "https://github.com/joaogabriel43/AuditVault",
    featured: true,
    year: 2025,
    caseStudy: {
      problem:
        "Em sistemas corporativos, responder \"o que aconteceu com o registro X, quem alterou e quando?\" geralmente resulta em logs caóticos, difíceis de consultar e acoplados à lógica de negócio. O AuditVault resolve isso como um motor de auditoria plug-and-play: captura automaticamente todas as mutações de estado via AOP (sem poluir o código de negócio), ofusca dados sensíveis (PII) automaticamente, reconstrói o estado de entidades em qualquer ponto no tempo e exibe tudo em um dashboard em tempo real via SSE.",
      architecture: {
        overview:
          "Clean Architecture com DDD, isolando as regras de auditoria da infraestrutura. O modelo de escrita persiste eventos imutáveis (append-only) em JSONB no PostgreSQL via ThreadPoolTaskExecutor assíncrono — zero latência bloqueante nas requisições. O modelo de leitura reconstrói estado consolidado indexado no Elasticsearch. SSE com Heartbeat entrega atualizações ao vivo para o Angular 17 com Signals.",
        boundedContexts: [
          "Auditoria (captura de eventos)",
          "Event Store (PostgreSQL append-only)",
          "Query Model (Elasticsearch)",
          "Snapshot Engine",
          "Streaming / SSE",
          "Export / Relatórios",
        ],
        keyDecisions: [
          {
            title: "AOP com @Auditable — zero intrusão no código de negócio",
            description:
              "Interceptadores AOP capturam mutações de estado nas APIs REST automaticamente. O código de negócio nunca sabe que está sendo auditado — sem chamadas manuais, sem acoplamento. Ofuscação de PII aplicada automaticamente nos campos marcados.",
          },
          {
            title: "Snapshots para O(1) no Event Sourcing",
            description:
              "No Event Sourcing puro, ler o estado atual exige reprocessar todos os eventos passados — O(N). A cada 50 eventos, o sistema consolida um snapshot do estado. A reconstrução nunca processa mais de 50 eventos, reduzindo para O(1) na prática. ObjectReader do Jackson otimiza o consumo de RAM.",
          },
          {
            title: "SSE com Heartbeat em vez de WebSocket",
            description:
              "Updates são unidirecionais (servidor → cliente), tornando WebSocket desnecessariamente complexo. SSE com Ping a cada 25 segundos mantém conexões ativas em proxies e load balancers sem timeout, garantindo uptime ininterrupto do dashboard em tempo real.",
          },
        ],
      },
      challenges: [
        {
          title: "Custo algorítmico do Event Sourcing — de O(N) para O(1)",
          description:
            "No Event Sourcing puro, ler o estado atual de uma entidade exige reprocessar todos os seus eventos passados. Para entidades com milhares de mudanças, isso causaria timeouts e degradação severa de performance.",
          solution:
            "Implementação do padrão de Snapshots: a cada 50 eventos (limite configurável), o sistema consolida e salva o estado atual. A reconstrução passou de O(N) para no máximo 50 iterações — O(1) na prática. ObjectReader do Jackson reutilizado para otimizar consumo de RAM durante desserialização.",
        },
        {
          title: "Race Condition na exportação de relatórios via Spring Batch",
          description:
            "Requisições simultâneas de usuários diferentes na exportação de PDFs sobrescreviam o mesmo arquivo temporário no servidor, corrompendo relatórios e gerando dados incorretos para os usuários.",
          solution:
            "Writer do Spring Batch limitado ao @StepScope, gerando arquivos com nomes determinísticos baseados no JobExecutionId injetado dinamicamente no contexto da thread. Cada execução de job opera em isolamento total, eliminando a condição de corrida.",
        },
        {
          title: "SSE com uptime ininterrupto em proxies e load balancers",
          description:
            "Conexões SSE de longa duração eram silenciosamente encerradas por proxies e load balancers após períodos de inatividade, causando perda de atualizações em tempo real no dashboard.",
          solution:
            "Mecanismo de Heartbeat injetando um evento de Ping a cada 25 segundos em todas as conexões SSE ativas. Load balancers detectam atividade contínua e mantêm a conexão aberta indefinidamente, garantindo uptime ininterrupto.",
        },
      ],
      metrics: [
        { label: "Latência adicional na API", value: "0ms" },
        { label: "Complexidade de leitura", value: "O(1)" },
        { label: "Heartbeat SSE", value: "25s" },
        { label: "Eventos por snapshot", value: "50" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 17",
            "Spring Boot",
            "AOP",
            "Event Sourcing",
            "CQRS",
            "Spring Batch",
            "Testcontainers",
          ],
        },
        {
          category: "Persistência",
          items: [
            "PostgreSQL (JSONB append-only)",
            "Elasticsearch",
            "Flyway",
            "Snapshots",
          ],
        },
        {
          category: "Frontend",
          items: ["Angular 17", "Signals", "SSE", "Angular Material"],
        },
        {
          category: "Infra",
          items: ["Docker (multi-stage)", "Railway", "GitHub Actions"],
        },
      ],
      demoMoments: [
        {
          title: "Auditoria automática via AOP",
          description:
            "Fazer uma mutação em qualquer endpoint marcado com @Auditable e ver o evento aparecer instantaneamente no dashboard — sem nenhuma linha de código de auditoria no controller.",
        },
        {
          title: "Reconstrução de estado no tempo",
          description:
            "Consultar o estado de uma entidade em uma data específica no passado — o sistema reprocessa eventos a partir do snapshot mais recente em tempo O(1).",
        },
        {
          title: "Dashboard em tempo real via SSE",
          description:
            "Eventos de auditoria aparecendo no dashboard Angular em tempo real sem refresh, com conexão SSE mantida ativa mesmo após minutos de inatividade.",
        },
      ],
    },
  },
  {
    id: "contractguard",
    tags: ["Developer Tooling", "Infra / DevOps"],
    lineup: {
      order: 8,
      label: "Devtooling",
      keyword: "AST diff",
      keywordSize: 26,
      stackLine: "Swagger Parser · Testcontainers · GH Actions",
    },
    title: "ContractGuard",
    description:
      "Engine de análise estática que detecta breaking changes em contratos OpenAPI via CI/CD, bloqueando merges automaticamente antes que APIs quebrem em produção.",
    longDescription:
      "Analisa a AST de especificações OpenAPI a cada Pull Request via GitHub Actions. Se detectar uma breaking change, bloqueia o merge com exit 1. Zero atrito para devs, governança de APIs shift-left sem suítes de contract testing complexas.",
    stack: [
      "Java 17",
      "Spring Boot 3.2",
      "Angular 17",
      "PostgreSQL 16",
      "Signals",
      "Testcontainers",
      "GitHub Actions",
      "Docker",
      "Railway",
      "Vercel",
    ],
    githubUrl: "https://github.com/joaogabriel43/ContractGuard",
    liveUrl: "https://contract-guard-cyan.vercel.app/",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "Em arquiteturas de microsserviços, quebras acidentais de contrato de API são silenciosas e custosas: uma equipe remove um campo ou muda um tipo de dado, e os serviços dependentes quebram em produção. O ContractGuard resolve isso como um guardião automatizado no CI/CD — analisa estaticamente a AST das especificações OpenAPI a cada Pull Request e bloqueia o merge se detectar uma breaking change, sem a complexidade de suítes de contract testing tradicionais como o Pact.",
      architecture: {
        overview:
          "Clean Architecture estrita (Ports & Adapters / Hexagonal) com isolamento absoluto do domínio: as regras de comparação de diff não conhecem HTTP, JSON ou banco de dados. Frontend em Angular 17 com Standalone Components, Signals e novo Control Flow (@if, @for). Persistência com JSONB nativo do Hibernate 6 eliminando conversores complexos. Integração via Composite GitHub Action que consome a API com jq para segurança contra injeções.",
        boundedContexts: [
          "Contract Registry (versionamento)",
          "Diff Engine (análise de AST)",
          "Breaking Change Detector",
          "CI/CD Integration (GitHub Actions)",
          "Dashboard / Reports",
        ],
        keyDecisions: [
          {
            title: "Análise de AST sem dependências pagas",
            description:
              "O motor de diff navega pela Abstract Syntax Tree das especificações OpenAPI via Swagger Parser para inferir breaking changes. Algoritmo próprio sem ferramentas de terceiros pagas, imune a falsos positivos e executado em segundos no CI/CD.",
          },
          {
            title: "JSONB nativo com Hibernate 6",
            description:
              "Persistência de payloads de relatório usando @JdbcTypeCode(SqlTypes.JSON) do Hibernate 6, mapeamento nativo para JSONB no PostgreSQL 16. Eliminou conversores complexos e otimizou queries de busca em payloads estruturados.",
          },
          {
            title: "Governança shift-left via exit 1 no CI",
            description:
              "Quando uma breaking change é detectada, a Composite GitHub Action encerra com exit 1, bloqueando o merge automaticamente. O desenvolvedor recebe feedback imediato no PR, sem esperar testes de integração ou homologação.",
          },
        ],
      },
      challenges: [
        {
          title: "Construir o motor de diff de AST OpenAPI sem falsos positivos",
          description:
            "Determinar o que constitui uma breaking change em contratos OpenAPI exige navegar pela AST de especificações complexas, distinguindo mudanças aditivas (não-breaking) de mudanças destrutivas (breaking) em campos, tipos, required e endpoints.",
          solution:
            "Motor de diff próprio usando Swagger Parser para navegar a AST. Algoritmo classifica cada diferença em breaking ou non-breaking com regras explícitas por tipo de mudança. Mais de 90 testes unitários TDD cobrem 100% dos casos de uso do domínio, garantindo ausência de falsos positivos.",
        },
        {
          title: "O \"Buraco Negro\" do .gitignore na Clean Architecture",
          description:
            "Durante o deploy, as Portas de Saída da Clean Architecture (domain/port/out) desapareciam silenciosamente do build context do Docker. O build completava sem erro mas o código simplesmente não estava lá.",
          solution:
            "Investigação revelou que padrões não-ancorados (out/, target/) no .gitignore e .dockerignore excluíam recursivamente diretórios com esses nomes em qualquer nível da árvore. Solução: ancoragem estrita (/out) nos arquivos de ignore, garantindo que apenas os diretórios raiz são excluídos.",
        },
        {
          title: "Testes E2E com infra real no CI sem ambiente dedicado",
          description:
            "Validar migrações Flyway e mapeamentos JPA em ambiente de CI sem servidor de banco dedicado, garantindo que o que passa no CI é idêntico ao que roda em produção.",
          solution:
            "Testcontainers sobe instâncias efêmeras e reais de PostgreSQL via Docker durante o mvn verify. Cada execução de CI tem seu próprio banco isolado, descartado ao final. Migrações e mapeamentos validados contra PostgreSQL real, não mocks.",
        },
      ],
      metrics: [
        { label: "Testes unitários (TDD)", value: "90+", isTestTotal: true },
        { label: "Cobertura dos casos de uso", value: "100%" },
        { label: "Tempo de validação no CI", value: "segundos" },
        { label: "Falsos positivos", value: "0" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 17",
            "Spring Boot 3.2",
            "Swagger Parser (AST)",
            "Testcontainers",
            "Mockito",
            "Flyway",
          ],
        },
        {
          category: "Persistência",
          items: ["PostgreSQL 16", "JSONB nativo (Hibernate 6)"],
        },
        {
          category: "Frontend",
          items: [
            "Angular 17",
            "Standalone Components",
            "Signals",
            "Tailwind CSS",
          ],
        },
        {
          category: "DevOps",
          items: [
            "GitHub Actions",
            "Composite Action",
            "Docker multi-stage",
            "Railway",
            "Vercel",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Breaking change bloqueando o merge",
          description:
            "Submeter um PR removendo um campo obrigatório de um endpoint e ver o ContractGuard detectar a breaking change e bloquear o merge automaticamente com relatório detalhado.",
        },
        {
          title: "Mudança aditiva aprovada automaticamente",
          description:
            "Adicionar um novo endpoint ou campo opcional e ver o CI passar — o ContractGuard distingue corretamente mudanças non-breaking de breaking.",
        },
        {
          title: "Dashboard de contratos e histórico de diffs",
          description:
            "Visualizar todos os contratos registrados, histórico de análises e relatório detalhado de cada breaking change detectada com localização exata na spec.",
        },
      ],
    },
  },
  {
    id: "routineflow",
    tags: ["Backend"],
    lineup: {
      order: 11,
      label: "Produto",
      keyword: "YAML in",
      keywordSize: 24,
      stackLine: "Clean Architecture · React 18 · PWA",
    },
    title: "RoutineFlow",
    description:
      "Sistema de gerenciamento de rotina pessoal orientado a dados com importação de rotinas via YAML/TXT, streaks engine, analytics por área e edição retroativa de check-ins.",
    longDescription:
      "Em vez de configurar hábito por hábito pela interface, o usuário descreve toda a rotina num arquivo YAML e importa de uma vez. O sistema parseia, valida e popula automaticamente. Suporta agendamentos por dia da semana e dia do mês, histórico imutável e export CSV com streaming.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Clean Architecture",
      "React 18",
      "PostgreSQL",
      "Flyway",
      "Docker",
      "Railway",
      "Vercel",
    ],
    githubUrl: "https://github.com/joaogabriel43/RoutineFlow",
    liveUrl: "https://routine-flow-beta.vercel.app",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "Apps de hábitos genéricos falham quando a rotina é complexa: dias diferentes para áreas diferentes, tarefas com descrição detalhada, agendamentos por dia do mês e tarefas únicas. O RoutineFlow resolve com um modelo orientado a dados — o usuário descreve toda a rotina num arquivo YAML e importa de uma vez. O sistema parseia, valida e popula automaticamente. A partir daí, acompanha progresso diário, calcula streaks, gera analytics por área e permite edição retroativa de check-ins.",
      architecture: {
        overview:
          "Clean Architecture em 4 camadas (presentation, application, domain, infrastructure). Domain com models puros sem Spring ou JPA — totalmente testáveis em isolamento. Strategy Pattern no Import Engine com seleção dinâmica de parser por extensão de arquivo. Frontend React 18 com optimistic updates e estado local que nunca é sobrescrito por refetch, eliminando flickering.",
        boundedContexts: [
          "Import Engine (YAML/TXT)",
          "Task Scheduling (DAY_OF_WEEK / DAY_OF_MONTH)",
          "Streak Engine",
          "Daily Log (histórico imutável)",
          "Analytics",
          "Export CSV",
        ],
        keyDecisions: [
          {
            title: "Strategy Pattern no Import Engine",
            description:
              "RoutineFileParser é uma interface com implementações independentes para YAML e TXT. O controller não sabe qual parser será usado — o Spring injeta uma lista e o use case seleciona pela extensão. Adicionar suporte a JSON é criar uma nova classe sem tocar no código existente — Open/Closed Principle aplicado.",
          },
          {
            title: "Histórico imutável — DailyLog nunca é deletado",
            description:
              "O \"reset\" diário não apaga dados, apenas filtra por logDate na query. Todo o histórico de analytics está sempre disponível para consultas retroativas. Edição de check-ins passados funciona como update no registro existente, preservando o histórico completo.",
          },
          {
            title: "Export CSV com StreamingResponseBody",
            description:
              "O endpoint de export não carrega todos os logs em memória. Escreve o CSV linha por linha via stream com BOM UTF-8 para compatibilidade com Excel no Windows. Qualquer volume de dados é exportado sem risco de OutOfMemoryError.",
          },
        ],
      },
      challenges: [
        {
          title: "Engenharia reversa do formato proprietário HabitNow",
          description:
            "O backup .hn do HabitNow não é JSON nem XML — é um formato proprietário com delimitadores customizados ({seções}, campos por ;, registros por |) e datas em base-36 a partir de uma epoch específica (2012-01-01). Sem documentação disponível.",
          solution:
            "Engenharia reversa completa do formato para implementar o conversor no frontend, sem enviar o arquivo ao servidor. O conversor roda 100% no browser, decodifica as datas em base-36 e transforma o .hn em YAML importável pelo RoutineFlow.",
        },
        {
          title: "Spring Security 6 bloqueando preflight OPTIONS com 403",
          description:
            "Em produção, requisições OPTIONS de preflight chegavam sem Authorization header. O Spring Security as avaliava antes do CORS filter adicionar os headers de resposta, retornando 403 e impedindo qualquer chamada cross-origin do frontend.",
          solution:
            "Dupla correção: requestMatchers(HttpMethod.OPTIONS, \"/**\").permitAll() como primeira regra no SecurityFilterChain, e shouldNotFilter() no JwtAuthenticationFilter para pular completamente rotas de autenticação e preflight — sem processar token onde não há token.",
        },
        {
          title: "Bug de timezone cortando a semana mais recente no heatmap",
          description:
            "Math.floor(days.length / 7) cortava silenciosamente a semana mais recente quando o range não era múltiplo de 7. Com 88 dias, o loop processava apenas 84 células e os últimos 4 dias desapareciam do grid sem nenhum erro visível.",
          solution:
            "Substituição por Math.ceil — a semana incompleta é renderizada normalmente. O diagnóstico exigiu análise completa do algoritmo de transposição do grid para identificar onde os dias eram descartados.",
        },
      ],
      metrics: [
        { label: "Testes automatizados", value: "156+", isTestTotal: true },
        { label: "Migrations Flyway", value: "11" },
        { label: "Endpoints REST", value: "35+" },
        { label: "Sprints entregues", value: "14" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 17",
            "Spring Boot",
            "Spring Security 6",
            "Flyway",
            "Testcontainers",
            "JUnit 5",
          ],
        },
        {
          category: "Persistência",
          items: ["PostgreSQL", "DailyLog imutável", "StreamingResponseBody"],
        },
        {
          category: "Frontend",
          items: ["React 18", "Optimistic Updates", "PWA", "Vite"],
        },
        {
          category: "Infra",
          items: ["Docker multi-stage", "Railway", "Vercel", "GitHub Actions"],
        },
      ],
      demoMoments: [
        {
          title: "Importação de rotina via YAML",
          description:
            "Upload de um arquivo YAML com toda a rotina — o sistema parseia, valida e popula todas as tarefas, áreas e agendamentos automaticamente em segundos.",
        },
        {
          title: "Streak engine e analytics por área",
          description:
            "Dashboard com streaks calculados por frequência (diária, semanal, mensal) e heatmap de consistência — visualização de padrões de produtividade ao longo do tempo.",
        },
        {
          title: "Edição retroativa de check-ins",
          description:
            "Navegar por dias passados e editar check-ins retroativamente — o histórico imutável garante rastreabilidade total sem perda de dados.",
        },
      ],
    },
  },
  {
    id: "postmortem-ai",
    tags: ["Backend", "AI / LLM"],
    lineup: {
      order: 10,
      label: "IA / Backend",
      keyword: "2-prompt",
      keywordSize: 22,
      stackLine: "OpenAI · Resilience4j · SHA-256",
    },
    title: "PostMortem AI",
    description:
      "Gerador inteligente de post-mortems de incidentes a partir de logs e stack traces — do caos ao documento estruturado em segundos.",
    longDescription:
      "Após um incidente em produção, o time precisa escrever um post-mortem estruturado de memória, dias depois, consumindo horas. PostMortem AI automatiza: cola os logs e stack traces e o sistema gera o documento completo no formato padrão da indústria, com timeline, causa raiz, impacto e ações corretivas.",
    stack: [
      "Java 21",
      "Spring Boot 3.2",
      "Angular 17",
      "PostgreSQL",
      "OpenAI API",
      "Resilience4j",
      "Docker",
      "Render",
      "Vercel",
    ],
    githubUrl: "https://github.com/joaogabriel43/postmortem-ai",
    liveUrl: "https://postmortem-ai.vercel.app",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "Após um incidente em produção, o time precisa escrever um post-mortem estruturado — timeline, causa raiz, impacto, ações corretivas. Isso costuma acontecer dias depois, de memória, e consome horas de trabalho técnico valioso. PostMortem AI automatiza todo o processo: o engenheiro cola os logs e stack traces do incidente e o sistema gera o documento completo no formato padrão da indústria, eliminando o esforço manual e garantindo consistência e rastreabilidade.",
      architecture: {
        overview:
          "Pipeline de dois prompts sequenciais separando extração de redação — o Prompt 1 extrai fatos objetivos dos logs em JSON estruturado, o Prompt 2 redige o post-mortem exclusivamente a partir desse JSON, nunca do log bruto. Strategy Pattern para parsing de três formatos de log. Idempotência via SHA-256 evitando reprocessamento. Resilience4j protegendo a integração com OpenAI. Backend Java 21 + Spring Boot 3.2, frontend Angular 17, deploy distribuído Render + Vercel.",
        boundedContexts: [
          "Log Ingestion (parsing multi-formato)",
          "Extraction Pipeline (Prompt 1 — fatos objetivos)",
          "Redaction Pipeline (Prompt 2 — documento final)",
          "Idempotência (SHA-256)",
          "Export (PDF com proteção XSS/SSRF)",
          "Resilience (Circuit Breaker + Retry)",
        ],
        keyDecisions: [
          {
            title: "Pipeline de dois prompts para eliminar alucinação",
            description:
              "O problema central era o LLM inventar dados inexistentes nos logs — especialmente o \"Surface Attribution Error\": culpar um componente só porque aparece mencionado, sem evidência causal real. A solução foi separar em dois prompts: Prompt 1 extrai apenas fatos objetivos em JSON estruturado. Prompt 2 redige o post-mortem com base exclusivamente nesse JSON, nunca no log bruto. O LLM nunca acessa o log diretamente na fase de redação.",
          },
          {
            title: "Strategy Pattern para parsing multi-formato",
            description:
              "LogParser é uma interface com implementações independentes para três formatos de log (structured JSON, plaintext, stack trace). O pipeline não sabe qual parser será usado — seleciona pela assinatura do conteúdo. Adicionar um novo formato é criar uma nova implementação sem tocar no pipeline.",
          },
          {
            title: "Idempotência via SHA-256",
            description:
              "Logs idênticos submetidos múltiplas vezes geram o mesmo SHA-256. O sistema detecta o hash já processado e retorna o post-mortem existente sem chamar a OpenAI novamente — zero custo de API duplicado e resposta instantânea para resubmissões.",
          },
        ],
      },
      challenges: [
        {
          title: "Surface Attribution Error — LLM culpando componentes sem evidência causal",
          description:
            "O LLM consistentemente culpava componentes apenas por aparecerem no log, mesmo sem relação causal com o incidente — um tipo específico de alucinação que é particularmente perigoso em post-mortems, pois leva times a investigar causas erradas.",
          solution:
            "Pipeline de dois prompts com separação estrita de responsabilidades. Prompt 1 com instrução explícita: \"extraia apenas fatos observáveis, nunca infira causa\". Prompt 2 recebe apenas o JSON estruturado, nunca o log bruto — sem acesso ao texto original que causava a atribuição errônea. O LLM só pode redigir sobre o que foi explicitamente extraído.",
        },
        {
          title: "Proteção contra XSS e SSRF no export PDF",
          description:
            "Post-mortems gerados por LLM podem conter URLs, scripts ou referências externas nos logs de entrada — se renderizados diretamente no PDF, abriam vetores de XSS e SSRF que poderiam vazar dados do servidor ou executar código.",
          solution:
            "Exportador PDF configurado com SUPPRESS_HTML, bloqueando renderização de qualquer markup HTML no conteúdo. Sanitização de inputs antes do pipeline de extração. O documento final é texto puro estruturado, imune a injeção de qualquer conteúdo ativo dos logs originais.",
        },
        {
          title: "Resiliência na integração OpenAI — falhas e rate limits",
          description:
            "A OpenAI API tem latência variável, rate limits por tier e falhas intermitentes. Sem proteção, uma falha transiente da API derrubava o pipeline inteiro e o usuário perdia o trabalho de submissão.",
          solution:
            "Resilience4j com Circuit Breaker que abre após falhas consecutivas e Retry com backoff exponencial para falhas transientes. O Circuit Breaker evita cascata de timeouts. Após abrir, retorna erro claro ao usuário em vez de travar a thread. Logs de cada tentativa para observabilidade.",
        },
      ],
      metrics: [
        { label: "Testes automatizados", value: "67", isTestTotal: true },
        { label: "Formatos de log suportados", value: "3" },
        { label: "Prompts no pipeline", value: "2" },
        { label: "Alucinações eliminadas", value: "SHA-256" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 21",
            "Spring Boot 3.2",
            "OpenAI API",
            "Resilience4j",
            "Testcontainers",
            "WireMock",
          ],
        },
        {
          category: "Persistência",
          items: ["PostgreSQL", "Flyway", "Idempotência SHA-256"],
        },
        {
          category: "Frontend",
          items: ["Angular 17", "Export PDF"],
        },
        {
          category: "Infra",
          items: ["Docker", "Render", "Vercel", "GitHub Actions"],
        },
      ],
      demoMoments: [
        {
          title: "Log para post-mortem em segundos",
          description:
            "Colar um stack trace real de um NullPointerException em produção e ver o sistema gerar automaticamente timeline, causa raiz, impacto e ações corretivas no formato padrão da indústria.",
        },
        {
          title: "Idempotência em ação",
          description:
            "Submeter o mesmo log duas vezes e ver o sistema retornar o post-mortem existente instantaneamente na segunda chamada — zero custo de API, resposta imediata.",
        },
        {
          title: "Circuit Breaker protegendo o pipeline",
          description:
            "Simular falha na OpenAI API e ver o Circuit Breaker abrir, retornando erro claro ao usuário em vez de travar o sistema com timeouts em cascata.",
        },
      ],
    },
  },
  {
    id: "ratemaster",
    tags: ["Developer Tooling", "Infra / DevOps"],
    lineup: {
      order: 4,
      label: "Biblioteca",
      keyword: "EVAL/Lua",
      keywordSize: 26,
      stackLine: "Java 21 · Redis · Micrometer · jqwik",
    },
    title: "RateMaster",
    description:
      "Biblioteca Spring Boot Starter para rate limiting distribuído real — Redis + Lua atômico, annotation @RateLimit, fallback configurável e métricas Micrometer.",
    longDescription:
      "Rate limiting in-memory como Resilience4j falha em ambientes com múltiplas instâncias — cada instância tem seu próprio contador. O RateMaster usa Redis como estado compartilhado com scripts Lua executados atomicamente via EVAL, garantindo que nenhuma race condition ocorra entre nós. Uma annotation @RateLimit é tudo que o desenvolvedor precisa.",
    stack: [
      "Java 21",
      "Spring Boot",
      "Redis",
      "Lua",
      "AOP",
      "Micrometer",
      "jqwik",
      "Testcontainers",
      "GitHub Packages",
    ],
    githubUrl: "https://github.com/joaogabriel43/RateMaster",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "APIs em produção com múltiplas instâncias não conseguem aplicar rate limiting consistente com soluções in-memory — cada instância tem seu próprio contador, então um cliente que dispara 10 instâncias pode exceder o limite 10x sem ser barrado. O RateMaster resolve isso usando Redis como estado compartilhado com scripts Lua executados atomicamente, garantindo consistência distribuída real. É uma biblioteca Spring Boot Starter: uma annotation @RateLimit e rate limiting distribuído está ativo.",
      architecture: {
        overview:
          "Arquitetura Hexagonal com 3 módulos Maven separados. ratemaster-core é Java puro sem nenhuma dependência de Spring ou Redis — define a porta LuaScriptExecutor, o algoritmo TokenBucketRateLimiter e Records imutáveis. ratemaster-spring-boot-starter integra o core ao Spring via AOP, SPI de resolução de chave, adapter Redis e fallback configurável. ratemaster-examples é o app demo com teste E2E via Testcontainers.",
        boundedContexts: [
          "Rate Limiting Core (algoritmo puro, sem framework)",
          "Interceptação AOP (@RateLimit + Aspect)",
          "Resolução de Chave (SPI + 4 built-ins)",
          "Execução Redis (adapter + script Lua cache)",
          "Resiliência (fallback OPEN/CLOSED + timeout)",
          "Observabilidade (Micrometer + Actuator)",
        ],
        keyDecisions: [
          {
            title: "Script Lua via EVAL — atomicidade real no Redis",
            description:
              "A operação verificar-decrementar-responder precisa ser atômica. Com Redis multi-client, duas instâncias podem ler \"5 tokens disponíveis\" simultaneamente e ambas decrementarem. O script Lua é executado pelo Redis inteiro em uma única operação atômica via EVAL, bloqueando qualquer outro comando. O clock interno usa redis.call(TIME) do servidor Redis, eliminando clock-skew entre instâncias da aplicação.",
          },
          {
            title: "Porta Hexagonal no core — Redis é um adapter",
            description:
              "ratemaster-core define a interface LuaScriptExecutor sem nenhuma dependência de driver Redis. SpringDataRedisScriptExecutor no starter satisfaz essa porta via StringRedisTemplate — client-agnostic. Trocar de Lettuce para Jedis não toca no algoritmo. Maven enforcer plugin confirma zero dependências Spring no core em todo CI run.",
          },
          {
            title: "Sanitização de chave Redis contra injeção",
            description:
              "Se resolvedKey vem de um header HTTP, um cliente malicioso pode injetar caracteres especiais para colidir com a chave de outro bucket. RateLimitKeyUtils.sanitize() substitui : por - e remove caracteres especiais do Redis antes de qualquer composição de chave — preserva legibilidade e é documentado como comportamento automático no Javadoc.",
          },
        ],
      },
      challenges: [
        {
          title: "Atomicidade real em ambiente distribuído",
          description:
            "Rate limiting distribuído exige que verificar saldo, decrementar e responder sejam uma operação atômica. Com Redis multi-client, duas instâncias podem ler \"5 tokens disponíveis\" simultaneamente, ambas decrementarem, e o limite ser ultrapassado silenciosamente.",
          solution:
            "Script Lua executado via EVAL — Redis executa o script inteiro em uma única operação atômica, bloqueando qualquer outro comando. Clock interno usa redis.call(TIME) do servidor Redis, eliminando clock-skew entre instâncias. Compatível com Redis 7 onde replicação por efeitos é o default.",
        },
        {
          title: "Injeção de chave Redis via header HTTP",
          description:
            "A chave Redis é composta por ratemaster:tokenbucket:{limitName}:{resolvedKey}. Se resolvedKey vem de X-Forwarded-For, um cliente malicioso pode injetar 1.2.3.4:ratemaster:tokenbucket:adminEndpoint:trustedUser e colidir com a chave de outro bucket, bypassando rate limits de endpoints críticos.",
          solution:
            "RateLimitKeyUtils.sanitize() aplicado no RateLimitAspect antes de qualquer composição — substitui : por - e remove caracteres especiais do Redis. Preserva legibilidade (preferível a SHA-256) e é documentado no Javadoc como comportamento automático e auditável.",
        },
        {
          title: "Thread pool exhaustion silencioso com Redis instável",
          description:
            "CompletableFuture.orTimeout() libera o caller em command-timeout-ms, mas a thread no rateMasterExecutor continua bloqueada no socket Redis até o timeout do driver. Sob Redis lento e alto tráfego, o pool de threads se esgota enquanto a aplicação parece responder normalmente.",
          solution:
            "Detecção automática de Virtual Threads (Java 21) como caminho primário — VTs parkam no I/O sem bloquear platform threads. Fallback para pool de plataforma configurável. README documenta explicitamente que spring.data.redis.timeout deve ser menor ou igual a ratemaster.redis.command-timeout-ms, com bloco de aviso destacado.",
        },
      ],
      metrics: [
        { label: "Testes totais", value: "29+", isTestTotal: true },
        { label: "Property tests (jqwik)", value: "4" },
        { label: "Threads concorrentes testadas", value: "50" },
        { label: "CVEs críticos corrigidos", value: "3" },
      ],
      techStack: [
        {
          category: "Core",
          items: [
            "Java 21",
            "Token Bucket Algorithm",
            "Lua Script (EVAL)",
            "Records imutáveis",
          ],
        },
        {
          category: "Spring Integration",
          items: [
            "Spring Boot Starter",
            "Spring AOP/CGLIB",
            "Spring Data Redis",
            "Micrometer",
          ],
        },
        {
          category: "Testes",
          items: [
            "jqwik (property-based)",
            "Testcontainers",
            "Virtual Threads concorrência",
          ],
        },
        {
          category: "Segurança / CI",
          items: [
            "OWASP Dependency-Check",
            "Trivy",
            "GitLeaks",
            "SpotBugs",
            "GitHub Packages",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Zero to rate-limited em 3 linhas",
          description:
            "Adicionar @RateLimit(name=\"api\", capacity=5, refillRate=1.0) em um endpoint. Os primeiros 5 requests retornam 200. O 6° retorna 429 com header Retry-After: 1. Após 1 segundo, aceita novamente. Zero configuração extra.",
        },
        {
          title: "Injeção de chave tentada e bloqueada",
          description:
            "Enviar request com X-Forwarded-For malicioso contendo separadores Redis. Inspecionar via redis-cli KEYS * e ver a chave sanitizada — inofensiva, sem colisão. A sanitização é visível e auditável.",
        },
        {
          title: "Redis cai, aplicação sobrevive",
          description:
            "Pausar o container Redis no meio de carga via Testcontainers. Endpoints com fallback=OPEN continuam em 200. Endpoints com fallback=CLOSED retornam 503. Actuator mostra ratemaster.requests.rejected com tag REDIS_FALLBACK_CLOSED. Redis volta — tudo normaliza sem restart.",
        },
      ],
    },
  },
  {
    id: "agent-memory-store",
    tags: ["AI / LLM", "Backend"],
    lineup: {
      order: 6,
      label: "IA / Backend",
      keyword: "pgvector",
      keywordSize: 24,
      stackLine: "Spring AI · Spring Batch · RLS",
    },
    title: "Agent Memory Store",
    description:
      "API REST de memória de longo prazo para agentes de IA — busca híbrida semântica + temporal com pgvector, consolidação via Spring Batch e multitenancy com RLS.",
    longDescription:
      "Agentes de IA não têm memória entre sessões — cada conversa começa do zero. O Agent Memory Store é uma API que qualquer agente pode consumir para armazenar observações, recuperar contexto por similaridade semântica e consolidar automaticamente memórias antigas, resolvendo o maior gap de usabilidade de agentes autônomos.",
    stack: [
      "Java 21",
      "Spring Boot",
      "pgvector",
      "Spring AI",
      "Spring Batch",
      "PostgreSQL",
      "Resilience4j",
      "Testcontainers",
      "WireMock",
    ],
    githubUrl: "https://github.com/joaogabriel43/agent-memory-store",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "Agentes de IA não têm memória entre sessões — cada conversa começa do zero, sem contexto do que aconteceu antes. Isso torna agentes autônomos inutilizáveis em fluxos longos onde o histórico importa. O Agent Memory Store é uma API REST que qualquer agente pode consumir para armazenar observações, recuperar contexto relevante por similaridade semântica e consolidar automaticamente memórias antigas — resolvendo o maior gap de usabilidade de agentes autônomos hoje.",
      architecture: {
        overview:
          "Clean Architecture em 4 camadas com zero violação verificada: domain com entidades puras e ports sem nenhum import de Spring, JPA ou Spring AI; application orquestrando casos de uso; infrastructure com EmbeddingAdapter (Spring AI + OpenAI), JdbcClient + pgvector e ConsolidationJob (Spring Batch); presentation com controllers REST e Swagger. Busca híbrida com score composto (similaridade cosine 70% + recência 30%) calculada em query SQL única. Multitenancy por X-Tenant-Id com RLS como segunda camada.",
        boundedContexts: [
          "Memory Store (armazenamento + embedding)",
          "Semantic Search (busca híbrida semântica + temporal)",
          "Consolidation Engine (Spring Batch EPISODIC→SEMANTIC)",
          "Resilience Layer (CircuitBreaker + RateLimiter)",
          "Multitenancy (ThreadLocal + RLS)",
          "Observabilidade (p6spy + Actuator)",
        ],
        keyDecisions: [
          {
            title: "Busca híbrida em query SQL única — sem N+1",
            description:
              "Score composto calculado inteiramente no PostgreSQL em uma única query nativa com JdbcClient: (1 - (embedding <=> queryEmbedding)) * 0.7 + decayRecência * 0.3. Pesos configuráveis via application.yml. p6spy confirmou 2 queries por request de search — zero N+1.",
          },
          {
            title: "Spring Batch com FaultTolerant Step — falha por item, não por job",
            description:
              "A consolidação processa múltiplos tenants sem que a falha de um quebre o job inteiro. FaultTolerant Step com skip(EmbeddingUnavailableException) e retry(retryLimit=3). Idempotência garantida pelo campo consolidated=true — o ItemReader filtra consolidated=FALSE, então rodar duas vezes produz o mesmo resultado.",
          },
          {
            title: "Domínio protegido do provider de IA",
            description:
              "EmbeddingPort é uma interface no domínio — OpenAI é detalhe de infraestrutura. EmbeddingUnavailableException protege o domínio de exceções do provider. CircuitBreaker + RateLimiter no EmbeddingAdapter controlam throughput sem Thread.sleep. Trocar de OpenAI para outro provider não toca no domínio.",
          },
        ],
      },
      challenges: [
        {
          title: "Busca semântica + temporal sem N+1 em query única",
          description:
            "Combinar similaridade semântica (cosine distance com pgvector) com recência temporal sem fazer duas queries separadas ou loop sobre resultados — o que causaria N+1 e degradaria performance com volume de memórias.",
          solution:
            "Score composto calculado inteiramente no PostgreSQL em query nativa única com JdbcClient. Decay temporal calculado com EXTRACT(EPOCH FROM (NOW() - created_at)) diretamente no SQL. Pesos configuráveis. p6spy confirmou zero N+1 em todos os fluxos críticos.",
        },
        {
          title: "Bug crítico: sequência do Spring Batch renomeada no Batch 5",
          description:
            "A migration V3 criava BATCH_JOB_INSTANCE_SEQ mas o Spring Batch 5 lê BATCH_JOB_SEQ (renomeado desde o Batch 4). O job nunca teria rodado em produção — relation \"batch_job_seq\" does not exist na primeira execução real.",
          solution:
            "Descoberto via execução real dos testes de integração com Testcontainers na revisão final. Corrigido na migration antes do deploy. Este bug passaria despercebido em qualquer ambiente com initialize-schema=always — a disciplina de usar Flyway como fonte única de verdade foi o que tornou o problema detectável.",
        },
        {
          title: "Consolidação resiliente sem duplicar memórias em reexecuções",
          description:
            "O job de consolidação precisava ser idempotente — rodar duas vezes não podia duplicar memórias semânticas — e resiliente a falhas parciais sem perder o progresso já processado.",
          solution:
            "Campo consolidated=true nas episódicas de origem: ItemReader filtra consolidated=FALSE, garantindo que memórias já processadas nunca entram no pipeline novamente. FaultTolerant Step com semântica de item — uma falha em uma memória faz skip desse item, não cancela o job inteiro.",
        },
      ],
      metrics: [
        { label: "Testes de integração", value: "11/11", isTestTotal: true },
        { label: "Queries por request crítico", value: "2" },
        { label: "Violações Clean Architecture", value: "0" },
        { label: "Gates de CI/CD", value: "4" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 21",
            "Spring Boot",
            "Spring AI",
            "Spring Batch",
            "JdbcClient",
            "Flyway",
          ],
        },
        {
          category: "Persistência",
          items: [
            "PostgreSQL",
            "pgvector (HNSW)",
            "RLS multitenancy",
            "Score composto SQL",
          ],
        },
        {
          category: "Resiliência",
          items: [
            "Resilience4j (CircuitBreaker + RateLimiter)",
            "EmbeddingUnavailableException",
            "FaultTolerant Step",
          ],
        },
        {
          category: "Testes / CI",
          items: [
            "Testcontainers",
            "WireMock standalone",
            "p6spy",
            "SpotBugs",
            "OWASP",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Consolidação ao vivo — episódico para semântico",
          description:
            "POST 5 memórias relacionadas → POST /jobs/consolidation → GET status mostra RUNNING→COMPLETED → GET /memories?type=SEMANTIC mostra 1 memória semântica com sourceMemoryIds apontando para as 5 episódicas. Arquitetura assíncrona e rastreabilidade em ação.",
        },
        {
          title: "Isolamento de multitenancy real",
          description:
            "Armazena 3 memórias com X-Tenant-Id: tenant-a. Busca com X-Tenant-Id: tenant-b retorna lista vazia. Stats com tenant-b mostram totalMemories: 0. Multitenancy não é cosmético — isolamento em todas as camadas.",
        },
        {
          title: "Circuit Breaker protegendo o domínio",
          description:
            "Derrubar o mock da OpenAI via WireMock. POST /memories retorna 503 com Problem Details limpo, sem stack trace, sem mencionar OpenAI. Restaurar conexão — próxima chamada funciona normalmente. O provider é um detalhe de infraestrutura.",
        },
      ],
    },
  },
  {
    id: "flowguard",
    tags: ["Developer Tooling", "Backend"],
    lineup: {
      order: 7,
      label: "Plataforma",
      keyword: "MurmurHash3",
      keywordSize: 22,
      stackLine: "Redis Pub/Sub · SSE · Angular 17",
    },
    title: "FlowGuard",
    description:
      "Plataforma self-hosted de feature flags com rollout progressivo, avaliação local no SDK (zero latência), SSE em tempo real e suporte multi-tenant — alternativa ao LaunchDarkly para Spring Boot.",
    longDescription:
      "LaunchDarkly e similares custam $300+/mês — uma barreira real para startups e times menores. O FlowGuard é uma alternativa self-hosted completa: servidor com Clean Architecture, SDK Java com avaliação local via MurmurHash3, sincronização em tempo real via SSE + Redis Pub/Sub e suporte multi-tenant isolado.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Angular 17",
      "Redis",
      "SSE",
      "Spring AI",
      "Flyway",
      "Docker",
      "GitHub Packages",
    ],
    githubUrl: "https://github.com/joaogabriel43/flowguard-server",
    featured: true,
    year: 2025,
    caseStudy: {
      problem:
        "Times precisam lançar funcionalidades com segurança — ativar para 5% dos usuários, monitorar, expandir gradualmente. LaunchDarkly resolve isso mas custa $300+/mês, criando barreira real para startups. Não existe alternativa self-hosted de qualidade com SDK Java pronto para Spring Boot — ou você paga caro, ou implementa na mão sem garantias de consistência. O FlowGuard preenche essa lacuna com servidor + SDK + dashboard Angular em um único projeto open source.",
      architecture: {
        overview:
          "flowguard-server com Clean Architecture em 4 camadas (domain, application, infrastructure, presentation). Redis como Cache + Pub/Sub: cache evita query no banco a cada avaliação, Pub/Sub sincroniza múltiplas instâncias do servidor. SDK com avaliação local — zero latência por request, flags em memória, servidor só notifica mudanças via SSE. MurmurHash3 para rollout: hash(flagKey + userId) % 100 garante que o mesmo userId sempre cai no mesmo bucket em qualquer instância.",
        boundedContexts: [
          "Flag Engine (avaliação local + MurmurHash3 + segmentação)",
          "Real-time Layer (SSE + SseEmitterRegistry + Redis Pub/Sub)",
          "Multitenancy (TenantContext ThreadLocal + filtro obrigatório)",
          "Audit Trail (log imutável de todas as operações)",
          "flowguard-sdk (cache atômico + SSE listener + auto-config)",
          "Management Dashboard (Angular 17 + toggle em tempo real)",
        ],
        keyDecisions: [
          {
            title: "Avaliação local no SDK — zero latência por request",
            description:
              "O SDK mantém todas as flags em memória e avalia localmente via MurmurHash3. Nenhuma chamada de rede ocorre na avaliação isEnabled() — latência é zero. O servidor só é consultado na inicialização e quando flags mudam via SSE. Reconexão automática com backoff exponencial garante que o SDK sempre tem o estado mais recente.",
          },
          {
            title: "SSE no lugar de WebSocket — traversal de proxy corporativo",
            description:
              "Push de flags é unidirecional (servidor → SDK), tornando WebSocket desnecessariamente complexo. SSE atravessa proxies corporativos sem configuração extra — crítico para times enterprise. Redis Pub/Sub garante que múltiplas instâncias do servidor sincronizam todos os SDKs conectados a qualquer instância.",
          },
          {
            title: "MurmurHash3 para rollout consistente",
            description:
              "hash(flagKey + userId) % 100 < percentual garante que o mesmo userId sempre cai no mesmo bucket, independente da instância do servidor ou do SDK que processa. Um usuário no rollout de 30% vê sempre a feature ativa — sem flickering entre requests.",
          },
        ],
      },
      challenges: [
        {
          title: "Race condition no cache do SDK durante reconexão SSE",
          description:
            "Ao atualizar o cache local após reconexão, cache.clear() e cache.putAll() eram duas operações separadas. Em aplicações de alto throughput, qualquer thread chamando isEnabled() nessa janela recebia fallback — todas as flags desligavam momentaneamente para todos os usuários.",
          solution:
            "Operação cache.replace() atômica em único bloco synchronized, eliminando completamente a janela de inconsistência entre clear e putAll.",
        },
        {
          title: "Locks incompatíveis entre toggle e replace causando descarte silencioso",
          description:
            "replace() usava synchronized(FlagCache.this) enquanto toggle() usava ConcurrentHashMap.computeIfPresent() — dois níveis de locking incompatíveis. Se o servidor enviasse snapshot e toggle simultaneamente, o evento de toggle era silenciosamente descartado e a flag ficava no estado errado sem nenhum log.",
          solution:
            "Unificar todo o locking de escrita no mesmo monitor via synchronized, garantindo que snapshot e toggle nunca competem. Mudança simples com impacto crítico de corretude.",
        },
        {
          title: "HTTP síncrono bloqueando callback SSE em rajadas de eventos",
          description:
            "Ao receber flag-updated, o listener fazia chamada HTTP síncrona para buscar detalhes — bloqueando a thread de callback do OkHttp. Em deploys atualizando 50 flags simultaneamente, os eventos se acumulavam e o SDK parava de processar updates em tempo real.",
          solution:
            "cacheUpdateExecutor dedicado — a callback SSE apenas enfileira o trabalho e retorna imediatamente. O HTTP fetch acontece em thread separada sem bloquear o stream SSE.",
        },
      ],
      metrics: [
        { label: "Testes server", value: "21", isTestTotal: true },
        { label: "Validações MurmurHash3 (jqwik)", value: "4.000+" },
        { label: "Correções na revisão crítica", value: "29" },
        { label: "Commits (server + SDK)", value: "70+" },
      ],
      techStack: [
        {
          category: "Server",
          items: [
            "Java 17",
            "Spring Boot",
            "Redis (Cache + Pub/Sub)",
            "SSE",
            "Flyway",
            "Docker multi-stage",
          ],
        },
        {
          category: "SDK",
          items: [
            "Java",
            "Spring Boot Auto-config",
            "MurmurHash3",
            "OkHttp",
            "GitHub Packages",
          ],
        },
        {
          category: "Frontend",
          items: [
            "Angular 17 Standalone",
            "EventSource",
            "Toggle em tempo real",
          ],
        },
        {
          category: "Testes / CI",
          items: [
            "jqwik (property-based)",
            "WireMock",
            "OWASP",
            "Trivy",
            "GitLeaks",
            "SpotBugs",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Toggle em tempo real — dashboard + SDK lado a lado",
          description:
            "Dashboard Angular e aplicação Spring Boot com SDK abertas lado a lado. Toggle de uma flag no painel — sem refresh, o SDK recebe o evento SSE e a funcionalidade liga/desliga instantaneamente. Redis Pub/Sub propagando o evento visível nos logs.",
        },
        {
          title: "Rollout progressivo com MurmurHash3",
          description:
            "Flag com rollout de 30% restrito a plan=premium. 10 chamadas com userIds diferentes — os mesmos userIds sempre retornam o mesmo resultado (consistência MurmurHash3). Usuários com plan=basic sempre retornam false independente do bucket.",
        },
        {
          title: "Resiliência do SDK — servidor cai, avaliação continua",
          description:
            "Derrubar o flowguard-server. SDK continua avaliando flags com último estado conhecido. Subir o servidor — SDK reconecta via backoff exponencial, recebe snapshot completo e sincroniza sem restart da aplicação consumidora.",
        },
      ],
    },
  },
  {
    id: "apiforge",
    tags: ["Developer Tooling", "AI / LLM"],
    lineup: {
      order: 9,
      label: "Devtooling",
      keyword: "SQL → API",
      keywordSize: 24,
      stackLine: "FreeMarker · OpenAI · SSE · Java 21",
    },
    title: "APIForge",
    description:
      "Gerador de API REST completa a partir de schema SQL — entity, repository, service, controller, DTOs, testes, migrations Flyway e docker-compose em segundos.",
    longDescription:
      "Todo dev Java já perdeu horas criando o mesmo boilerplate: entidade JPA, repositório, service, controller, DTOs, testes, migrations Flyway, docker-compose. O APIForge elimina esse trabalho: cola um schema SQL com CREATE TABLE statements e recebe um projeto Spring Boot completo seguindo Clean Architecture, pronto para rodar com um único comando.",
    stack: [
      "Java 21",
      "Spring Boot",
      "FreeMarker",
      "OpenAI API",
      "SSE",
      "Resilience4j",
      "WireMock",
      "Testcontainers",
      "Angular 17",
    ],
    githubUrl: "https://github.com/joaogabriel43/APIForge",
    featured: false,
    year: 2025,
    caseStudy: {
      problem:
        "Todo desenvolvedor Java já perdeu horas criando o mesmo boilerplate repetitivo — entidade JPA, repositório, service, controller, DTOs, testes, migrations Flyway, docker-compose. O processo é mecânico, propenso a inconsistências entre camadas e não agrega valor real. O APIForge elimina esse trabalho: cola um schema SQL e recebe em segundos um projeto Spring Boot completo seguindo Clean Architecture, pronto para rodar com um único comando.",
      architecture: {
        overview:
          "Clean Architecture estrita em 4 camadas. domain com Records imutáveis puros (TableSchema, ColumnDefinition, ParsedSchema) sem nenhuma dependência de framework. application orquestrando SqlSchemaParser, CodeGenerationService e SchemaEnrichmentService com interface-port TemplateRenderer. infrastructure com FreeMarkerTemplateRenderer, OpenAiLlmGateway e ZipGeneratorService. presentation com GenerationController (REST + SSE) e GlobalExceptionHandler (RFC 7807). LlmGateway como interface no domínio — OpenAI é detalhe de infraestrutura. Silent fallback: falha no LLM nunca falha a geração.",
        boundedContexts: [
          "Parser Module (SqlSchemaParser + SqlTypeMapper + NamingConventionService)",
          "Generation Engine (CodeGenerationService + 11 templates FreeMarker)",
          "Enrichment Module (SchemaEnrichmentService + LlmGateway)",
          "Packaging Module (ZipGeneratorService)",
          "API Layer (REST + SSE + auditoria fire-and-forget)",
        ],
        keyDecisions: [
          {
            title: "Silent fallback no LLM — geração nunca falha",
            description:
              "SchemaEnrichmentService tenta enriquecer o schema via OpenAI (relacionamentos implícitos, Javadoc). Se o LLM falha, retorna o schema sem enriquecimento e a geração continua normalmente. O toggle de AI Enhancement no frontend reflete exatamente esse comportamento — com ou sem IA, o projeto gerado é válido.",
          },
          {
            title: "SSE para preview ao vivo — sem polling",
            description:
              "GenerationController emite eventos SSE enquanto o FreeMarker renderiza cada template. O frontend Angular popula a file tree em tempo real, arquivo por arquivo. Quando SSE completeWithError quebraria o stream, o erro é enviado como evento data estruturado antes de chamar complete() normalmente — o GlobalExceptionHandler não interfere.",
          },
          {
            title: "JavaCompiler API nos testes — prova que o código gerado compila",
            description:
              "javax.tools.JavaCompiler compila os arquivos gerados em memória nos testes de integração. Lombok, MapStruct e Jakarta não estão no classpath de compilação dinâmica — resolvido com stubs programáticos injetados em @TempDir junto com um pré-processador AST. Teste falha se qualquer .java gerado não compilar.",
          },
        ],
      },
      challenges: [
        {
          title: "Provar que o código gerado compila — não apenas parece Java",
          description:
            "Gerar texto que parece Java não é suficiente. Lombok, MapStruct e Jakarta têm anotações que o compilador padrão não conhece — qualquer arquivo gerado com @Getter ou @Mapper falharia silenciosamente na compilação.",
          solution:
            "javax.tools.JavaCompiler (Java Compiler API) compilando os arquivos gerados em memória nos testes. Stubs programáticos de @Getter, @Mapper e anotações Jakarta injetados em @TempDir junto com pré-processador AST. O teste falha se qualquer .java gerado não compilar.",
        },
        {
          title: "@TimeLimiter do Resilience4j incompatível com método síncrono",
          description:
            "@TimeLimiter exige retorno de CompletableFuture — incompatível com o método síncrono do OpenAiLlmGateway. Usar @TimeLimiter em método síncrono causa crash no aspecto AOP em runtime.",
          solution:
            "Timeout injetado diretamente na ClientHttpRequestFactory do Spring (connectTimeout=10s, readTimeout=25s). Controle de timeout na camada HTTP, não no AOP — mais confiável e sem dependência de proxy dinâmico.",
        },
        {
          title: "SSE completeWithError sobrescrevendo o stream com JSON 500",
          description:
            "Ao chamar emitter.completeWithError(e) no handler de erro, o Spring MVC roteava a exceção para o GlobalExceptionHandler — que sobrescrevia o stream SSE com uma resposta JSON 500, quebrando o protocolo SSE para o cliente Angular.",
          solution:
            "Enviar o evento error com JSON estruturado no campo data, depois chamar emitter.complete() normalmente. O stream SSE é a única fonte de verdade de erro — o GlobalExceptionHandler não interfere.",
        },
      ],
      metrics: [
        { label: "Testes totais", value: "48", isTestTotal: true },
        { label: "Templates FreeMarker", value: "11" },
        { label: "Tipos PostgreSQL mapeados", value: "13" },
        { label: "Cenários de resiliência", value: "5" },
      ],
      techStack: [
        {
          category: "Backend",
          items: [
            "Java 21",
            "Spring Boot",
            "FreeMarker (11 templates)",
            "SqlSchemaParser",
            "JavaCompiler API",
          ],
        },
        {
          category: "AI Integration",
          items: [
            "OpenAI API",
            "LlmGateway (port)",
            "Silent fallback",
            "Resilience4j",
          ],
        },
        {
          category: "Frontend",
          items: [
            "Angular 17",
            "SSE preview ao vivo",
            "Monaco Editor",
            "AI Enhancement toggle",
          ],
        },
        {
          category: "Testes / CI",
          items: [
            "Testcontainers",
            "WireMock standalone",
            "jqwik",
            "OWASP",
            "SpotBugs",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Preview ao vivo via SSE",
          description:
            "Cola o schema SQL, clica em Preview — file tree popula em tempo real arquivo por arquivo enquanto FreeMarker renderiza cada template. Cada arquivo clicado abre no Monaco Editor com syntax highlight pela extensão (.java, .yml, .sql).",
        },
        {
          title: "AI Enhancement — inferência de relacionamentos",
          description:
            "Ativa o toggle AI Enhancement, cola schema com author_id sem REFERENCES explícito — LLM infere @ManyToOne para a tabela users e adiciona Javadoc em cada entidade. Desativa o toggle — geração idêntica sem chamada à OpenAI. Silent fallback visível.",
        },
        {
          title: "Download e rodar o projeto gerado",
          description:
            "Clica em Download — recebe api-forge-generated.zip. Descompacta, docker-compose up + ./mvnw spring-boot:run. Projeto Spring Boot gerado sobe com endpoints funcionais e migration Flyway aplicada. Zero alteração manual.",
        },
      ],
    },
  },
  {
    id: "java-mcp-hub",
    tags: ["AI / LLM", "Infra / DevOps"],
    lineup: {
      order: 5,
      label: "IA / Infra",
      keyword: "MCP",
      keywordSize: 30,
      stackLine: "Spring AI · WebFlux · GitHub Packages",
    },
    title: "JavaMCPHub",
    description:
      "Servidor MCP de referência em Java 21 + Spring AI — conformidade verificada com spec MCP 2025-06-18, dual transport (stdio + Streamable HTTP), observabilidade Micrometer e publicado no GitHub Packages.",
    longDescription:
      "O ecossistema MCP era dominado por TypeScript e Python. Desenvolvedores Java/Spring Boot não tinham forma idiomática e production-ready de expor sistemas como ferramentas MCP. O JavaMCPHub preenche essa lacuna: servidor de referência com conformidade verificada, conectando serviços Java reais ao ecossistema de agentes de IA.",
    stack: [
      "Java 21",
      "Spring AI",
      "Spring Boot",
      "WebFlux",
      "Micrometer",
      "WireMock",
      "Testcontainers",
      "GitHub Packages",
      "Docker",
    ],
    githubUrl: "https://github.com/joaogabriel43/java-mcp-hub",
    featured: true,
    year: 2025,
    caseStudy: {
      problem:
        "O ecossistema MCP (Model Context Protocol — padrão adotado por Anthropic, OpenAI, Google e Microsoft para conectar agentes de IA a ferramentas externas) era dominado por TypeScript e Python. Desenvolvedores Java/Spring Boot não tinham uma forma idiomática, bem documentada e production-ready de expor seus sistemas como ferramentas MCP. O JavaMCPHub preenche essa lacuna com conformidade verificada contra a spec oficial e dual transport simultâneo.",
      architecture: {
        overview:
          "Estrutura Maven multi-módulo com separação clara. jmcp-core com lógica de domínio: tools com @Tool, records Java como structured output, instrumentação Micrometer (McpToolMetrics) e WebClient para serviços externos. jmcp-spring-boot-starter com auto-configuração Spring AI via MethodToolCallbackProvider registrando todas as tools em qualquer transporte. jmcp-example com servidor executável, dois transportes simultâneos (stdio + Streamable HTTP POST /mcp) e testes de conformidade. SSE deliberadamente evitado por ter sido depreciado na spec em março/2025.",
        boundedContexts: [
          "jmcp-core (tools @Tool, structured output, Micrometer)",
          "jmcp-spring-boot-starter (auto-config Spring AI, registro de tools)",
          "jmcp-example (servidor executável, transportes, testes conformidade)",
          "Observabilidade (mcp.tool.calls.total, mcp.tool.duration.seconds)",
          "Segurança (GitLeaks + SpotBugs/FindSecBugs + OWASP + Trivy)",
        ],
        keyDecisions: [
          {
            title: "Conformidade manual com spec MCP 2025-06-18",
            description:
              "A auditoria revelou 3 defeitos no servidor gerado automaticamente que quebrariam clientes HTTP reais: tools/list sem inputSchema, header MCP-Protocol-Version ausente e códigos JSON-RPC errados (-32500 genérico em vez de -32602/-32603). Implementação manual do StreamableMcpController validando cada item da spec, com testes encadeados via WebTestClient.",
          },
          {
            title: "Blocking I/O isolado do event loop WebFlux",
            description:
              "Streamable HTTP exige WebFlux, mas as tools chamam serviços externos via WebClient.block(). Bloquear a thread do event loop lança exceção em runtime. Solução: Mono.fromCallable().subscribeOn(Schedulers.boundedElastic()) isolando operações bloqueantes, preservando o event loop e mantendo o código das tools síncrono e legível.",
          },
          {
            title: "WireMock standalone — sem conflito com WebFlux",
            description:
              "wiremock-spring-boot causava NoSuchMethodError por conflito do httpclient5 com WebFlux. Migração para wiremock-standalone 3.5.4 com gerenciamento manual via @BeforeAll e porta dinâmica via @DynamicPropertySource. Padrão documentado como ADR-003 para reuso em projetos futuros.",
          },
        ],
      },
      challenges: [
        {
          title: "Conformidade real com spec MCP — 3 defeitos críticos na auditoria",
          description:
            "O servidor gerado automaticamente tinha defeitos que quebrariam clientes HTTP reais na prática: tools/list sem inputSchema (cliente não consegue invocar tools), header MCP-Protocol-Version ausente (handshake falha em clientes estritos) e códigos JSON-RPC errados (-32500 genérico em vez de -32602/-32603 semânticos).",
          solution:
            "Implementação manual do StreamableMcpController validando cada requisito da spec MCP 2025-06-18. Testes de conformidade encadeados (initialize → tools/list → tools/call) via WebTestClient garantem que qualquer regressão na spec é detectada no CI.",
        },
        {
          title: "Blocking I/O em contexto reativo — WebClient.block() no event loop",
          description:
            "Streamable HTTP exige WebFlux (contexto reativo), mas as tools Java fazem chamadas síncronas a serviços externos via WebClient.block(). Bloquear a thread do event loop causa IllegalStateException em runtime e degrada toda a capacidade do servidor.",
          solution:
            "Mono.fromCallable().subscribeOn(Schedulers.boundedElastic()) em cada tool — operações bloqueantes executam em thread pool elástico dedicado, o event loop nunca é bloqueado. Código das tools permanece síncrono e legível sem expor complexidade reativa.",
        },
        {
          title: "NoSuchMethodError — conflito WireMock + WebFlux + httpclient5",
          description:
            "wiremock-spring-boot gerencia o httpclient5 internamente de forma incompatível com a versão transitiva do WebFlux. NoSuchMethodError em runtime nos testes de integração, sem mensagem clara de onde vinha o conflito.",
          solution:
            "Migração para wiremock-standalone 3.5.4 com ciclo de vida manual via @BeforeAll/@AfterAll e porta dinâmica via @DynamicPropertySource. Documentado como ADR-003 — padrão a seguir em qualquer projeto Spring WebFlux que precise de WireMock.",
        },
      ],
      metrics: [
        { label: "Testes automatizados", value: "27", isTestTotal: true },
        { label: "Gates de segurança CI", value: "5" },
        { label: "Transportes simultâneos", value: "2" },
        { label: "Bugs FindSecBugs", value: "0" },
      ],
      techStack: [
        {
          category: "Core",
          items: [
            "Java 21",
            "Spring AI",
            "Spring Boot",
            "WebFlux",
            "@Tool annotation",
            "Records structured output",
          ],
        },
        {
          category: "Transportes",
          items: [
            "stdio (Claude Desktop)",
            "Streamable HTTP POST /mcp",
            "MCP spec 2025-06-18",
          ],
        },
        {
          category: "Observabilidade",
          items: [
            "Micrometer",
            "Actuator",
            "mcp.tool.calls.total",
            "mcp.tool.duration.seconds",
          ],
        },
        {
          category: "Testes / CI",
          items: [
            "WireMock standalone",
            "WebTestClient",
            "GitLeaks",
            "SpotBugs/FindSecBugs",
            "OWASP",
            "Trivy",
          ],
        },
      ],
      demoMoments: [
        {
          title: "Claude Desktop conectado via stdio",
          description:
            "Claude Desktop configurado com claude_desktop_config.json. Pergunta: \"Analisa o incidente #42 e gera um post-mortem\". O agente invoca postmortem_analyze autonomamente, recebe o PostMortemRecord estruturado e responde com a análise. Zero código de integração — só a anotação @Tool.",
        },
        {
          title: "MCP Inspector — conformidade com a spec",
          description:
            "MCP Inspector apontado para POST http://localhost:8080/mcp. Executar tools/list e ver os 4 tools com inputSchema completo — conformidade com spec provada. Chamar audit_search com filtros reais e ver o AuditEventRecord tipado no retorno.",
        },
        {
          title: "Métricas por tool em tempo real",
          description:
            "Chamar as tools algumas vezes e abrir GET /actuator/metrics/mcp.tool.calls.total?tag=tool.name:audit_search — counter incrementando por tool. Um servidor MCP production-ready não é só protocolo, é observabilidade.",
        },
      ],
    },
  },
];
