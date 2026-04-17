# CLAUDE.md — Portfolio João Gabriel Nascimento
> Versão: 1.2.0 | Última atualização: 2026-03-27

---

## 🏗️ Visão Geral do Projeto

Portfolio profissional desenvolvido para recolocação no mercado de trabalho.
Single-page com scroll suave, design dark premium e formulário de contato funcional.

**Dono:** João Gabriel Nascimento
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Resend
**Hospedagem:** Vercel (deploy automático via git push)
**Repositório:** https://github.com/joaogabriel43/portfolio
**URL local:** http://localhost:3000
**Build status:** ✅ Zero errors, zero TypeScript issues (154 kB first load — com Certificates)

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx          # Metadata global, SEO, JSON-LD, fontes
│   ├── page.tsx            # Composição das seções
│   ├── globals.css         # Reset, variáveis CSS, scrollbar
│   └── api/
│       └── contact/
│           └── route.ts    # POST handler com Resend + rate limiting
├── components/
│   ├── layout/
│   │   └── Navbar.tsx      # Navbar fixa, active state, menu mobile
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
└── data/
    ├── personal.ts         # Nome, bio, contatos, idiomas, formação
    ├── projects.ts         # Projetos com stack, links, featured flag
    ├── skills.ts           # Grupos de skills + soft skills
    ├── experience.ts       # Experiências com achievements[]
    └── certificates.ts     # Certificados agrupados por instituição
public/
├── avatar.jpg              # Foto de perfil (copiada do Parquinho do Claude)
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
Localização original: `C:\Users\joaoz\OneDrive\Área de Trabalho\ \Parquinho do claude\Foto_de_perfil.jpg`
Destino no projeto: `public/avatar.jpg`

---

## 📐 Padrões do Projeto

### Estilo Visual
- Fundo: `#0a0a0a` | Texto: `#f0ece4` | Accent (dourado): `#c9b97a`
- Verde status: `#7ac97a` | Accent azul: `#7a9dc9`
- Fontes: Playfair Display (títulos) · DM Sans (corpo) · DM Mono (labels/code)

### Padrões de Código
- TypeScript strict — sem `any`
- Tailwind only para estilos — sem CSS modules
- Código em inglês, explicações em PT-BR
- Dados sempre importados de `src/data/` — nunca hardcoded nos componentes
- Animações sempre com `whileInView` + `viewport={{ once: true }}` para não repetir

### Padrão de Prompt (aprendizado desta sessão)
Sempre embutir o contexto relevante diretamente no prompt em vez de instruir
o agente a "ler o CLAUDE.md". Mais eficiente em tokens e mais confiável.

### Padrão de Agentes
Sempre invocar agentes com `@nome-do-agente` para que o Claude Code reconheça
e orquestre corretamente. Nunca citar agentes sem o `@`.

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

**Projetos no GitHub:**
- `finassistant` — Next.js, TypeScript, Java, Spring Boot, PostgreSQL, AI Integration (featured)
- `gerenciador-pedidos-api` — Java 17, Spring Boot, JUnit 5, Mockito (featured)
- `Screenmatch-frases` — Java, Spring Boot, Spring Data JPA, PostgreSQL

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
- [x] `npm run build` sem erros

---

## 📚 Regras de Negócio Relevantes

- Portfolio é single-page — não criar rotas adicionais sem necessidade
- Projetos em `data/projects.ts`: o campo `featured: true` define layout 8/12 colunas
- Disponibilidade para trabalho controlada por `personal.available` (boolean)
- Email de destino do formulário vem sempre de `CONTACT_EMAIL` (env var), nunca hardcoded

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

---

## 📝 Changelog do CLAUDE.md

| Versão | Data | O que mudou |
|--------|------|-------------|
| 1.2.0 | 2026-03-27 | About layout: float magazine-style + case study page /projects/[slug] + Parallax3DLayer em todas as seções + grain melhorado |
| 1.1.0 | 2026-03-26 | Dados reais João Gabriel, seção Certificates, soft skills, repositório GitHub, instruções gh CLI e NEXT_PUBLIC_SITE_URL |
| 1.0.0 | 2026-03-26 | Criação inicial — projeto portfolio concluído com build limpo |
