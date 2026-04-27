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
    id: "auditvault",
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
        { label: "Testes unitários (TDD)", value: "90+" },
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
        { label: "Testes automatizados", value: "156+" },
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
];
