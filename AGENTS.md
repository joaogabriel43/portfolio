# AGENTS.md — Portfolio João Gabriel Nascimento
> Versão: 1.3.0 | Última atualização: 2026-05-05

---

## 🏗️ Visão Geral do Projeto

Portfolio profissional desenvolvido para recolocação no mercado de trabalho.
Single-page + blog técnico MDX, design dark premium e formulário de contato funcional.

**Dono:** João Gabriel Nascimento
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Resend + MDX
**Hospedagem:** Vercel (deploy automático via git push)
**Repositório:** https://github.com/joaogabriel43/portfolio
**URL local:** http://localhost:3000
**Build status:** ✅ Zero errors, zero TypeScript issues (12 páginas estáticas — 135 kB blog, 173 kB home)

---

## 📁 Estrutura de Pastas

```
content/
└── blog/
    └── outbox-pattern-notifyflow.mdx   # Artigo 1 — Outbox Pattern (~1500 palavras PT-BR)
src/
├── app/
│   ├── layout.tsx          # Metadata global, SEO, JSON-LD, fontes + <Analytics />
│   ├── page.tsx            # Composição das seções
│   ├── globals.css         # Reset, variáveis CSS, prose-blog, hljs dark theme
│   ├── blog/
│   │   ├── page.tsx        # /blog — lista estática de artigos (SSG)
│   │   └── [slug]/
│   │       └── page.tsx    # /blog/[slug] — post com MDXRemote + generateStaticParams
│   └── api/
│       └── contact/
│           └── route.ts    # POST handler com Resend + rate limiting
├── components/
│   ├── layout/
│   │   └── Navbar.tsx      # Navbar fixa + Blog link + usePathname active state
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Certificates.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── SectionLabel.tsx
│       ├── AnimatedText.tsx
│       ├── ProjectCard.tsx
│       ├── SkillTag.tsx
│       ├── ContactForm.tsx
│       └── CustomCursor.tsx
├── lib/
│   └── mdx.ts              # getAllPosts() + getPostBySlug() — gray-matter + reading-time
└── data/
    ├── personal.ts         # Nome, bio, contatos, idiomas, formação
    ├── projects.ts         # 5 projetos: FortunAI, NotifyFlow, AuditVault, ContractGuard, RoutineFlow
    ├── skills.ts           # Grupos de skills + soft skills
    ├── experience.ts       # Experiências com achievements[]
    └── certificates.ts     # Certificados agrupados por instituição
public/
├── avatar.jpg              # Foto de perfil
├── robots.txt
└── sitemap.xml
```

---

## ⚙️ Configurações do Ambiente

### Variáveis de ambiente (.env.local — desenvolvimento local)
```
RESEND_API_KEY=re_sua_chave_aqui
CONTACT_EMAIL=joaogabrielnb43@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### gh CLI — instalação e autenticação no Windows
`gh` CLI instalado via `winget install --id GitHub.cli`.
Requer autenticação interativa antes de usar: `gh auth login` (abre o browser).
Para criar repositório com o projeto local já inicializado:
```bash
gh repo create <user>/<repo> --public --source=. --remote=origin --push
```
**Atenção:** se o remote `origin` já existir localmente, o `gh repo create` retorna
"Unable to add remote origin" — é só um aviso, o repo é criado normalmente.
Resolver com: `git push -u origin main`

### Scripts disponíveis
```bash
npm run dev       # Desenvolvimento local
npm run build     # Build de produção (deve passar sem erros)
npm run start     # Servir build de produção localmente
npm run lint      # Checar linting
```

### Foto de perfil
Localização original: `C:\Users\joaoz\OneDrive\Área de Trabalho\ \Parquinho do Codex\Foto_de_perfil.jpg`
Destino no projeto: `public/avatar.jpg`

---

## 📐 Padrões do Projeto

### Estilo Visual
- Fundo: `#0a0a0a` | Texto: `#f0ece4` | Accent (dourado): `#c9b97a`
- Verde status: `#7ac97a` | Accent azul: `#7a9dc9`
- Fontes: Playfair Display (títulos) · DM Sans (corpo) · DM Mono (labels/code)

### Padrões de Código
- TypeScript strict — sem `any` implícito (explícito tolerado pontualmente)
- Tailwind only para estilos — sem CSS modules
- Código em inglês, explicações em PT-BR
- Dados sempre importados de `src/data/` — nunca hardcoded nos componentes
- Animações sempre com `whileInView` + `viewport={{ once: true }}` para não repetir
- Blog: conteúdo em `content/blog/*.mdx`, lib em `src/lib/mdx.ts` — nunca hardcoded

### Padrão do Blog
- Novo artigo = novo arquivo `.mdx` em `content/blog/`
- Frontmatter obrigatório: `title`, `description`, `date` (YYYY-MM-DD), `tags`, `featured`
- Build automático: `generateStaticParams` lê `getAllPosts()` → gera rota estática
- `prose-blog` CSS class em globals.css — estiliza todo o MDX (headings, code, tables)
- hljs dark theme em globals.css — highlighting para Java, SQL, TypeScript, etc.

### ESLint — atenção
O projeto usa apenas `next/core-web-vitals`. **Não tem** `@typescript-eslint` plugin.
Nunca usar comentários `// eslint-disable-next-line @typescript-eslint/*` — causa erro de build.

### Navbar — dois tipos de link
- `href` começando com `#` → section link: smooth scroll no home, navega `/#hash` em outras páginas
- `href` começando com `/` → page link: `<Link>` do Next.js + `usePathname()` para active state
- Quando não está em `/`, seção links apontam para `/${href}` (ex: `/#about`)

### Padrão de Prompt (aprendizado desta sessão)
Sempre embutir o contexto relevante diretamente no prompt em vez de instruir
o agente a "ler o AGENTS.md". Mais eficiente em tokens e mais confiável.

---

## 🏛️ ADRs — Decisões de Arquitetura

### ADR-001: Next.js 14 com App Router para portfolio estático
**Contexto:** Precisava de SEO sólido, visual impressionante, fácil manutenção
e código limpo para exibir no GitHub.
**Decisão:** Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.
Deploy na Vercel (mesma empresa, integração perfeita).
**Consequências:** +SEO automático via SSG, +deploy trivial com git push,
+bundle 148 kB aceitável com Framer Motion | -mais complexo que HTML puro
**Status:** Aceita

### ADR-002: Resend para formulário de contato
**Contexto:** Precisava de envio de email funcional sem back-end próprio.
**Decisão:** Resend (free tier: 3k emails/mês) via API Route do Next.js.
**Consequências:** +simples, +free tier generoso | -dependência de serviço externo
**Status:** Aceita

### ADR-003: Rate limiting em memória para API de contato
**Contexto:** Proteger o endpoint POST /api/contact contra spam sem Redis/DB.
**Decisão:** Map em memória com IP + timestamp. Máx 3 requests/hora por IP.
**Consequências:** +zero infraestrutura extra | -reseta a cada cold start na Vercel
**Status:** Aceita (suficiente para portfolio)

### ADR-004: Blog com next-mdx-remote/rsc + content/blog/*.mdx
**Contexto:** Precisava de um blog técnico com syntax highlighting, sem CMS externo e
com SSG perfeito para SEO.
**Decisão:** `next-mdx-remote/rsc` (Server Component RSC) + frontmatter via `gray-matter` +
arquivos `.mdx` em `content/blog/` (fora de `src/app/` para separar conteúdo de código).
Plugins: `remark-gfm` (tabelas/listas GFM) + `rehype-highlight` (syntax) + `rehype-slug` (anchors).
**Por que next-mdx-remote e não @next/mdx:** O `@next/mdx` exige os arquivos MDX dentro de `app/`,
o que mistura conteúdo com código. O `next-mdx-remote/rsc` aceita qualquer fonte de string.
**Consequências:** +conteúdo separado do código, +SSG automático, +leve (135 kB)
| -precisa de `generateStaticParams` manual
**Status:** Aceita

---

## 🤖 Agentes — Casos de Uso Confirmados

### Feature: About float layout (magazine-style)
Layout CSS float onde o texto da bio flui ao redor da foto circular.
- Foto: `md:float-right md:ml-10` com clearfix via `after:content-[''] after:block after:clear-both` no container
- Mobile: `mx-auto block` (sem float)
- Métricas: `clear-both` garante que ficam abaixo de todo o conteúdo
- `Parallax3DLayer` único envolve tudo (removido o segundo layer do grid)

### Feature completa de seção UI
`@engineering-frontend-developer` → `@engineering-senior-developer` → `@engineering-code-reviewer`
**Resultado:** Build limpo, zero TS errors, 15/15 tasks completas, 148 kB first load.

### API Route com segurança
`@engineering-backend-architect` + `@engineering-security-engineer` → `@testing-api-tester`
**Resultado:** Rate limiting por IP, sanitização server-side, validação independente do frontend.

### Deploy e polish final
`@engineering-devops-automator` + `@engineering-sre` + `@testing-accessibility-auditor`
→ `@engineering-technical-writer` → `@engineering-code-reviewer`

### Blog MDX completo (2026-05-05)
Implementação autônoma sem agentes específicos:
- `src/lib/mdx.ts`, `content/blog/`, rotas `/blog` e `/blog/[slug]`
- Navbar atualizada com lógica dual (section vs page links)
- prose-blog + hljs CSS adicionados ao globals.css
- Primeiro artigo técnico: Outbox Pattern em PT-BR (~1500 palavras)
- 0 erros TypeScript, 12 páginas estáticas no build

---

## 👤 Dados do Dono do Portfolio

```
Nome:        João Gabriel Nascimento
Email:       joaogabrielnb43@gmail.com
Telefone:    (51) 99502-8300
Localização: Porto Alegre, RS — Brasil
GitHub:      github.com/joaogabriel43
LinkedIn:    linkedin.com/in/joão-gabriel-borba
```

**Stack principal:** Java · Spring Boot · Spring Data JPA · C# · .NET · Angular · TypeScript · SQL Server · PostgreSQL

**Experiência atual:**
- Engenheiro de Aplicativos — Intermidia (Abril 2023 – Presente)
- Help Desk — Compuletra (Março 2022 – Março 2023)

**Formação:** Sistemas de Informação — Unisinos (previsão 2025/2)

**Projetos no portfolio (5 total):**
1. `finassistant` (FortunAI) — Next.js + Java + Spring Boot + PostgreSQL + AI (featured, col 8/12)
2. `notifyflow` — Java + Spring Boot + RabbitMQ + Outbox Pattern (col 4/12)
3. `auditvault` — Java + Spring Boot + Event Sourcing + CQRS (col 6/12)
4. `contractguard` — Java + Spring Boot + OpenAPI diff + GitHub Actions (col 6/12)
5. `routineflow` — Java + Spring Boot + YAML import + Strategy Pattern (full width)

---

## 🚀 Deploy

### Vercel (produção)
1. `git push origin main` → deploy automático via integração GitHub
2. Variáveis de ambiente no painel Vercel → Settings → Environment Variables:
   - `RESEND_API_KEY` — chave do Resend para o formulário de contato
   - `CONTACT_EMAIL` — email que recebe as mensagens (`joaogabrielnb43@gmail.com`)
   - `NEXT_PUBLIC_SITE_URL` — **preencher APÓS o primeiro deploy** com a URL que a Vercel atribuiu

### ⚠️ NEXT_PUBLIC_SITE_URL — como configurar
A Vercel atribui um domínio automático no primeiro deploy (ex: `portfolio-xyz.vercel.app`).
**Fluxo correto:**
1. Fazer o primeiro deploy **sem** a variável (o código tem fallback em `layout.tsx`)
2. Vercel exibe a URL final (ex: `https://joaogabriel43-portfolio.vercel.app`)
3. Ir em Vercel → Project Settings → Environment Variables → adicionar
   `NEXT_PUBLIC_SITE_URL = https://joaogabriel43-portfolio.vercel.app`
4. Redeploy (botão "Redeploy" no painel ou novo `git push`)

### Checklist antes do deploy
- [x] `src/data/` preenchido com dados reais
- [x] `public/avatar.jpg` presente
- [x] `vercel.json` com security headers
- [ ] `RESEND_API_KEY` configurada no painel Vercel
- [x] `npm run build` sem erros (12 páginas estáticas)

---

## 📚 Regras de Negócio Relevantes

- Home é single-page — seções via scroll + hash anchors
- Blog é rota separada (`/blog`, `/blog/[slug]`) — SSG via MDX files
- Projetos em `data/projects.ts`: layout determinado por posição no array (COL_SPANS)
- `featured: true` nos projetos é cosmético (badge + glow) — não afeta mais o layout
- Disponibilidade para trabalho controlada por `personal.available` (boolean)
- Email de destino do formulário vem sempre de `CONTACT_EMAIL` (env var), nunca hardcoded
- Novos artigos de blog: criar `.mdx` em `content/blog/`, build gera a rota automaticamente

---

## 🔗 Dependências Relevantes

| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 14.x | Framework principal |
| typescript | 5.x | Tipagem |
| tailwindcss | 3.x | Estilização |
| framer-motion | 11.x | Animações |
| react-hook-form | 7.x | Formulário de contato |
| resend | latest | Envio de email |
| @vercel/analytics | 2.x | Web Analytics (page views, etc.) |
| next-mdx-remote | 6.x | MDX rendering via Server Components |
| gray-matter | 4.x | Parsing de frontmatter dos arquivos MDX |
| reading-time | 1.x | Cálculo de tempo de leitura |
| remark-gfm | 4.x | GitHub Flavored Markdown (tabelas, listas, etc.) |
| rehype-highlight | 7.x | Syntax highlighting via hljs classes |
| rehype-slug | 6.x | Anchors automáticos em headings |

---

## 📝 Changelog do AGENTS.md

| Versão | Data | O que mudou |
|--------|------|-------------|
| 1.3.0 | 2026-05-05 | Blog MDX completo + Vercel Analytics + Navbar dual-link + ADR-004 + padrões ESLint |
| 1.2.0 | 2026-03-27 | About layout: float magazine-style + case study page /projects/[slug] + Parallax3DLayer em todas as seções + grain melhorado |
| 1.1.0 | 2026-03-26 | Dados reais João Gabriel, seção Certificates, soft skills, repositório GitHub, instruções gh CLI e NEXT_PUBLIC_SITE_URL |
| 1.0.0 | 2026-03-26 | Criação inicial — projeto portfolio concluído com build limpo |
