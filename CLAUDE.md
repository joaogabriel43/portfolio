# CLAUDE.md — Portfolio João Gabriel Nascimento
> Versão: 2.0.0 | Última atualização: 2026-07-28

---

## 🏗️ Visão Geral do Projeto

Portfolio profissional desenvolvido para recolocação no mercado de trabalho.
Single-page + blog técnico MDX, design claro premium com tema escuro opcional
e formulário de contato funcional.

**Dono:** João Gabriel Nascimento
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Geist + Resend + MDX
**Hospedagem:** Vercel (deploy automático via git push)
**Repositório:** https://github.com/joaogabriel43/portfolio
**URL local:** http://localhost:3000
**Build status:** ✅ Zero errors, zero TypeScript issues (19 páginas estáticas — 111 kB home, 95,8 kB blog/case studies, 158 kB /projects)

> **Framer Motion não é mais dependência global.** Sobrevive apenas em
> `/projects` (animação de reordenação do grid ao filtrar). Todo o resto usa
> CSS nativo — ver ADR-006 e o padrão "Provider desce até o consumidor".

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
│   │   ├── Navbar.tsx      # Navbar sticky translúcida + ThemeToggle
│   │   └── Footer.tsx      # Rodapé hairline — ano + localização
│   ├── pages/
│   │   ├── ProjectsExplorer.tsx  # /projects — filtro + busca (ÚNICO consumidor de framer-motion)
│   │   └── CaseStudyContent.tsx  # /projects/[slug] — Server Component
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx        # "O Lineup" — carrossel scroll-snap
│   │   ├── FeaturedProject.tsx # Projeto em destaque (id em site.ts)
│   │   ├── Specs.tsx           # Substitui a antiga Skills.tsx
│   │   ├── Experience.tsx      # Absorveu os certificados
│   │   └── Contact.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── ContactForm.tsx
│       └── ThemeToggle.tsx
├── lib/
│   ├── mdx.ts              # getAllPosts() + getPostBySlug() — gray-matter + reading-time
│   └── theme.ts            # THEME_INIT_SCRIPT — aplica tema antes da 1ª pintura
└── data/
    ├── personal.ts         # Nome, bio, contatos, idiomas, formação
    ├── projects.ts         # 11 projetos + caseStudy.metrics[].isTestTotal
    ├── site.ts             # Copy da home + heroStats DERIVADOS de projects.ts
    ├── skills.ts           # Grupos de skills + soft skills
    ├── experience.ts       # Experiências com achievements[]
    └── certificates.ts     # Certificados agrupados por instituição
public/
├── avatar.jpg              # Foto de perfil
├── robots.txt
└── sitemap.xml
```

### Removidos na 2.0.0
`ui/Button.tsx` · `ui/Card.tsx` · `ui/SectionLabel.tsx` · `ui/SkillTag.tsx` ·
`ui/AnimatedText.tsx` · `ui/CustomCursor.tsx` · `ui/Parallax3DLayer.tsx` ·
`providers/Providers.tsx` · `providers/Mouse3DProvider.tsx` · `hooks/useMouse3D.ts` ·
`sections/Skills.tsx` · `sections/Certificates.tsx`

### Âncoras alteradas — atenção a links externos
| Antes | Depois |
|-------|--------|
| `#skills` | `#specs` |
| `#certificates` | *(removida — dobrada em Experiência)* |
| `#projects` | `#projects` — **mantida de propósito**, mesmo o handoff chamando a seção de "Lineup" |

---

## ⚙️ Configurações do Ambiente

### Variáveis de ambiente (.env.local — desenvolvimento local)
```
RESEND_API_KEY=re_sua_chave_aqui
CONTACT_EMAIL=joaogabrielnb43@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
**Não colocar comentário inline** nesse arquivo (`CHAVE=valor  # nota`) —
ver a armadilha registrada em "Erros Conhecidos".
`CONTACT_EMAIL` define para onde a mensagem chega e é **independente** do e-mail
público em `src/data/personal.ts`. Divergência entre os dois faz o formulário
"funcionar" enquanto as mensagens caem numa caixa que ninguém confere — conferir
os dois sempre que um deles mudar.

### Resend — limitação do remetente `onboarding@resend.dev`
Enquanto não houver domínio próprio verificado, a rota envia de
`Portfolio <onboarding@resend.dev>` — o remetente compartilhado do Resend. Ele tem
duas restrições que **não geram erro**, o envio é aceito e some:
1. Só entrega para o **e-mail dono da conta Resend**. Qualquer outro destinatário
   é aceito com `id` de sucesso e nunca chega.
2. Cai em **spam/promoções** com frequência — checar essas pastas antes de
   concluir que o envio falhou.

Para liberar destinatário arbitrário e melhorar entregabilidade: verificar um
domínio em Resend → Domains (DNS: SPF + DKIM) e trocar o `from:` em
`src/app/api/contact/route.ts` para um endereço desse domínio.
O `replyTo` já aponta para o e-mail de quem preencheu o formulário — responder
direto na mensagem funciona.

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

### Estilo Visual (2.0.0 — tema claro premium)
Nenhuma cor literal em componente. Tudo sai dos tokens de `globals.css` (ver ADR-005).

| Token | Claro | Escuro (`.dark`) |
|-------|-------|------------------|
| `--bg` | `#ffffff` | `#08080a` |
| `--surface` | `#f5f5f7` | `#141416` |
| `--border` | `#d2d2d7` | `#26262a` |
| `--fg` | `#1d1d1f` | `#f4f2ef` |
| `--muted` | `#6e6e73` | `#8c8a88` |
| `--accent` | `#2f5d75` (azul-petróleo) | `#2f8bff` |
| `--positive` / `--negative` | `#1a7f4b` / `#c0392b` | `#34d399` / `#ff453a` |

Movimento também é token: `--ease-out: cubic-bezier(0.16,1,0.3,1)` ·
`--dur-fast/base/slow: 120/200/320ms`.
Fontes: **Geist Sans** (corpo e títulos) · **Geist Mono** (labels, eyebrows, números) — ver ADR-007.
O dourado/Playfair da 1.x foi inteiramente removido.

### Padrões de Código
- TypeScript strict — sem `any` implícito (explícito tolerado pontualmente)
- Tailwind only para estilos — sem CSS modules
- Código em inglês, explicações em PT-BR
- Dados sempre importados de `src/data/` — nunca hardcoded nos componentes
- Números agregados na home são **derivados** de `src/data/`, nunca digitados (ver "Número agregado sempre derivado")
- Scroll reveal via CSS (`.reveal`), não via `whileInView` — ver ADR-006
- Blog: conteúdo em `content/blog/*.mdx`, lib em `src/lib/mdx.ts` — nunca hardcoded

### Padrão: Provider de biblioteca desce até o consumidor
Provider de lib pesada (`MotionConfig`, contextos de animação) fica no componente
que realmente usa a lib — **nunca** no `app/layout.tsx`. Provider no root layout
faz o bundler incluir a biblioteca no chunk compartilhado de **todas** as rotas.
No projeto: `MotionConfig reducedMotion="user"` mora dentro de
`ProjectsExplorer.tsx`, então framer-motion só carrega em `/projects`.
Efeito medido: home 173 kB → 111 kB.
> Regra prática: se o provider existe só para configurar uma lib, ele pertence
> à rota que importa a lib. Se existe para estado global do app, aí sim vai no root.

### Padrão: Hairline via gap de grid
Divisórias de 1px entre cards não usam `border` em cada item (dobra na junção e
gera cantos irregulares). Usa-se o **fundo do container aparecendo pelo gap**:
```
<div className="grid gap-px bg-border">   ← o "traço" é o próprio fundo
  <div className="bg-bg p-6">…</div>       ← cada célula tapa o fundo
  <div className="bg-bg p-6">…</div>
</div>
```
Vantagem: 1px exato independente de quantas colunas o breakpoint tenha, sem
`border-r last:border-r-0` espalhado pelos componentes.

### Padrão: Stretched link em cards
Card clicável inteiro **sem** aninhar `<a>` dentro de `<a>` (HTML inválido e
armadilha de acessibilidade). Um único `<Link>` recebe
`after:absolute after:inset-0 after:content-['']` e o card fica `relative`:
a área de clique cobre o card, mas só existe **um** nó focável, com texto de link
correto para leitor de tela. Links secundários (GitHub, demo) ganham
`relative z-10` para ficarem acima do pseudo-elemento.

### Padrão: Número agregado sempre derivado
Estatística de home nunca é string digitada. `heroStats` em `src/data/site.ts`
calcula tudo a partir de `src/data/projects.ts`:
- **Projetos** → `projects.length`
- **Testes escritos** → soma das métricas marcadas `isTestTotal: true` nos case studies

A flag `isTestTotal` é **opt-in explícito**, não heurística de label. Motivo:
buscar `label.includes("Testes")` conta duas vezes — o `finassistant` declara
"Testes automatizados 329" **e** sua decomposição ("Testes backend 238" +
"Testes frontend 91"), o que produziria 658 num único projeto.
Regra: no máximo **uma** métrica marcada por projeto, sempre o total canônico.
`parseMetricCount()` extrai o inteiro inicial e cobre `"329"`, `"90+"`,
`"11/11"` (→ 11) e `"4.000"` (→ 4000). Se qualquer projeto declarar o total com
`"+"`, o agregado herda o `"+"` — não afirma precisão que a origem não tem.
Valor atual: **778+** (9 projetos com teste declarado; `notifyflow` e
`auditvault` não têm métrica de teste).

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
o agente a "ler o CLAUDE.md". Mais eficiente em tokens e mais confiável.

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

### ADR-005: Design tokens em CSS variables + tema claro/escuro por classe
**Contexto:** A migração para o design "A Final" trocou o tema escuro dourado por um
tema claro premium, mantendo o escuro como opção. Repetir pares de cor
(`text-ink dark:text-cream`) em cada componente dobraria a superfície de mudança
e garantiria divergência entre seções.
**Decisão:** Paleta única em CSS variables no `:root` de `globals.css`, sobrescrita
por `.dark` no `<html>`. Tailwind com `darkMode: "class"` e cores mapeadas para as
variables (`bg-bg`, `text-muted`, `border-border`…), de modo que **a classe do
Tailwind já é agnóstica de tema** — o componente não repete `dark:`.
O tema é aplicado por `THEME_INIT_SCRIPT` (`src/lib/theme.ts`), um script inline
e síncrono no `<head>` que lê `localStorage` + `prefers-color-scheme` **antes da
primeira pintura**.
**Por que script inline e não `useEffect`:** com `useEffect` o tema só aplicaria após
a hidratação — o usuário de tema escuro veria um flash branco (FOUC) em toda
navegação. O custo é ~15 linhas de JS bloqueante no `<head>`, aceitável.
**Consequências:** +troca de tema sem tocar em componente, +zero FOUC,
+`ThemeToggle` só alterna uma classe | -cores não aparecem no autocomplete do
Tailwind como valores literais, -script inline exige atenção com CSP
**Status:** Aceita

### ADR-006: Scroll reveal em CSS puro (`animation-timeline: view()`)
**Contexto:** O reveal ao rolar era feito com `whileInView` do framer-motion em
praticamente toda seção — o que obrigava metade da home a ser Client Component e
prendia a lib no bundle compartilhado.
**Decisão:** Classe `.reveal` em `globals.css` usando `animation-timeline: view()`,
dentro de `@supports (animation-timeline: view())` **e**
`@media (prefers-reduced-motion: no-preference)`.
Browser sem suporte (Safari/Firefox atuais) simplesmente ignora o bloco e o
conteúdo aparece estático e legível — degradação sem JS de fallback.
framer-motion sobreviveu apenas em `/projects`, onde `layout` + `AnimatePresence`
animam a **reordenação** do grid ao filtrar (isso CSS não faz).
**Consequências:** +seções voltaram a ser Server Components, +animação roda no
compositor sem custo de JS, +acessibilidade grátis via `prefers-reduced-motion`
| -progressive enhancement: parte dos visitantes não vê a animação,
-não dá para orquestrar sequências complexas
**Status:** Aceita

### ADR-007: Fonte via pacote `geist` em vez de `next/font/google`
**Contexto:** O novo design usa Geist Sans/Mono. A Geist não está no Google Fonts,
e `next/font/local` exigiria versionar os arquivos de fonte no repositório.
**Decisão:** Pacote npm `geist` (v1.7.2), que já expõe `GeistSans`/`GeistMono` no
formato de `next/font` — self-hosted, sem request para domínio externo, com
`font-display` e preload gerenciados pelo Next.
**Consequências:** +zero requisição a terceiros (privacidade e LCP), +sem binários
de fonte no git, +atualização por `npm update` | -uma dependência a mais
(a **única** adicionada na 2.0.0)
**Status:** Aceita

---

## 🐛 Erros Conhecidos e Como Evitá-los

### [2026-07-28] Erro: Resend retorna `{ data, error }` — `try/catch` não é tratamento de erro
**O que aconteceu:** O formulário de contato exibia "Mensagem enviada." e a rota
respondia `200 {"success":true}` **sem nenhum e-mail ter sido enviado**. Falha
totalmente silenciosa: nada no console do browser, nada no terminal.
**Por que:** O SDK do Resend (v6) **não lança exceção** quando a API rejeita o
envio — ele *resolve* a Promise com `{ data: null, error: {...} }`. O `await`
dentro do `try` completava com sucesso, o `catch` nunca era acionado e o código
seguia direto para o `return NextResponse.json({ success: true })`.
Bug **latente desde a versão original** — não foi introduzido pela migração
visual (o `git diff` da rota era 100% cosmético).
**Como prevenir:** Em SDK que não lança, o retorno **é** o canal de erro.
Sempre desestruturar e ramificar explicitamente:
```ts
// ❌ Errado — o catch nunca dispara, sucesso falso passa direto
try {
  await resend.emails.send({ ... });
  return NextResponse.json({ success: true });
} catch (err) { /* só pega falha de rede */ }

// ✅ Certo — o { error } é verificado antes de responder sucesso
const { data, error } = await resend.emails.send({ ... });
if (error) {
  console.error("[contact] Resend rejeitou:", error.name, "-", error.message);
  return NextResponse.json({ error: "Falha ao enviar mensagem." }, { status: 502 });
}
console.info("[contact] E-mail enviado. id:", data?.id);
```
**Regra geral:** antes de usar um SDK novo, confirmar na doc se ele *throws* ou
*returns* o erro. Se retorna, `try/catch` cobre **apenas** falha de transporte —
manter os dois caminhos, com status distintos (**502** para rejeição do provedor
upstream, **500** para falha de rede/runtime).
**Como se prova:** rodar com `RESEND_API_KEY=re_invalida_para_teste_123`.
Antes da correção: `200 {"success":true}`. Depois: `502` + log
`validation_error - API key is invalid`.

### [2026-07-28] Erro: submit pré-hidratação vazando dados do visitante na URL
**O que aconteceu:** Clicar em "Enviar mensagem" logo após o carregamento navegava
para `/?name=Teste+Browser&email=teste%40teste.com&subject=...&message=...#contact`
— nome, e-mail e mensagem inteiros expostos na barra de endereço, no histórico do
browser e nos eventos do Vercel Analytics.
**Por que:** O HTML do `<form>` chega do servidor já renderizado, mas o
`onSubmit={handleSubmit(...)}` do React só existe **depois da hidratação**. Nessa
janela (centenas de ms em conexão lenta) não há `preventDefault()`, então o
browser executa o submit **nativo**: `method="GET"` no `action` padrão, que
serializa todos os campos na query string.
**Como prevenir:** Se um controle depende de handler React para se comportar
corretamente, ele precisa nascer **desabilitado no HTML do servidor**:
```tsx
const [hydrated, setHydrated] = useState(false);
useEffect(() => setHydrated(true), []);   // roda só no cliente, após hidratar
...
<button type="submit" disabled={isLoading || !hydrated}>
```
`useState(false)` mantém SSR e primeiro render do cliente **idênticos** (sem
hydration mismatch); o `useEffect` libera o botão em seguida.
**Regra geral:** revisar todo `<form>` interativo perguntando "o que acontece se
o usuário clicar antes do JS carregar?". Alternativa aceitável quando o submit
nativo faz sentido: `method="POST"` + `action` real como fallback progressivo.

### [2026-07-28] Armadilha: comentário inline em `.env.local` quebra parsing manual
**O que aconteceu:** Um teste diagnóstico direto na API do Resend retornou
`400 validation_error - API key is invalid`, apontando para uma causa raiz
**errada**. A chave estava correta o tempo todo.
**Por que:** A linha do arquivo era
`RESEND_API_KEY=re_xxxxx  # cole sua chave aqui`. O comando de extração
(`awk -F= '{print $2}'`) capturou a chave **junto com o comentário** — 60
caracteres em vez dos 36 reais. O dotenv/`@next/env` remove comentário inline em
valor sem aspas, então a aplicação sempre recebeu a chave certa; só o teste
manual estava contaminado.
**Como prevenir:** Nunca extrair variável de `.env` com `awk`/`cut` cru. Ou usar
o próprio loader (`node -e "require('@next/env').loadEnvConfig('.'); console.log(process.env.X.length)"`),
ou limpar o comentário: `sed 's/[[:space:]]*#.*$//' | xargs`.
**Lição maior:** **conferir o comprimento/forma do valor antes de acreditar no
resultado do teste.** Um diagnóstico com input contaminado produz uma causa raiz
convincente e falsa — pior do que não ter diagnóstico.

---

## 🚀 Otimizações e Performance

### [2026-07-28] Home: 173 kB → 111 kB First Load JS (−62 kB, −36%)
**Problema:** framer-motion estava no chunk compartilhado de todas as rotas porque
o `MotionConfig` vivia no `app/layout.tsx`, e quase toda seção usava `whileInView`
— forçando `"use client"` em conteúdo que é puramente estático.
**O que foi feito (em ordem de impacto):**
1. `MotionConfig` movido do root layout para `ProjectsExplorer.tsx` — framer-motion
   saiu do bundle compartilhado e ficou restrito a `/projects` (ADR-006)
2. `whileInView` → classe CSS `.reveal` com `animation-timeline: view()` (ADR-006)
3. Seções voltaram a ser **Server Components** (sem `"use client"`); só
   `Navbar`, `ThemeToggle`, `ContactForm` e `ProjectsExplorer` seguem client
4. 12 componentes deletados (wrappers `Button`/`Card`/`SectionLabel`, o
   `CustomCursor`, o `Parallax3DLayer` e a cadeia `Mouse3DProvider`/`useMouse3D`)
**Resultado medido:** home 16,5 kB / **111 kB** First Load · blog e case studies
95,8 kB · `/projects` 64,3 kB / 158 kB (única rota que ainda paga o framer-motion)
· shared 87,2 kB · 19 páginas estáticas.
**Lição:** o custo de uma lib de animação raramente está na lib — está em **onde o
provider foi montado** e em quantos componentes ela obriga a virar client.

---

## 🤖 Agentes — Casos de Uso Confirmados

### Feature: About float layout (magazine-style)
Layout CSS float onde o texto da bio flui ao redor da foto circular.
- Foto: `md:float-right md:ml-10` com clearfix via `after:content-[''] after:block after:clear-both` no container
- Mobile: `mx-auto block` (sem float)
- Métricas: `clear-both` garante que ficam abaixo de todo o conteúdo
> Obsoleto desde a 2.0.0 — o `Parallax3DLayer` que envolvia a seção foi removido.
> O float em si continua valendo.

### Debugging sistemático do formulário de contato (2026-07-28)
`@systematic-debugging` → `@engineering-backend-architect` → `@engineering-frontend-developer`
**Resultado:** três causas raiz independentes, nenhuma delas a hipótese inicial
(a migração visual). Ordem que funcionou:
1. **Provar a hipótese antes de agir** — o `git diff` da migração em `route.ts` era
   100% cosmético e o `onSubmit` do `ContactForm` sequer aparecia no diff. A premissa
   "a migração quebrou o formulário" caiu logo no primeiro passo.
2. **Isolar camada por camada** — curl direto na API do Resend (destino errado +
   chave contaminada por comentário), depois na rota local (200 falso), depois na UI.
3. **Instrumentar em vez de adivinhar** — `read_console_messages` e
   `read_network_requests` no browser mostraram o vazamento na URL, que nenhuma
   leitura de código teria revelado.
**Validação final:** 6 e-mails de teste confirmados na caixa correta, campos
resetando, `502` correto com chave inválida.

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

**Projetos no portfolio (11 total)** — ordem do array em `src/data/projects.ts`.
A coluna "Testes" é a métrica marcada `isTestTotal` que alimenta o `heroStats`:

| # | id | Stack / tema | Testes |
|---|----|--------------|--------|
| 1 | `finassistant` (FortunAI) | Next.js + Java + Spring Boot + PostgreSQL + AI | 329 |
| 2 | `notifyflow` | Java + Spring Boot + RabbitMQ + Outbox Pattern | — |
| 3 | `auditvault` | Java + Spring Boot + Event Sourcing + CQRS | — |
| 4 | `contractguard` | Java + Spring Boot + OpenAPI diff + GitHub Actions | 90+ |
| 5 | `routineflow` | Java + Spring Boot + YAML import + Strategy Pattern | 156+ |
| 6 | `postmortem-ai` | AI / LLM aplicado a incidentes | 67 |
| 7 | `ratemaster` | Rate limiting distribuído | 29+ |
| 8 | `agent-memory-store` | Memória para agentes de AI | 11/11 |
| 9 | `flowguard` | Infra / DevOps | 21 |
| 10 | `apiforge` | Developer tooling | 48 |
| 11 | `java-mcp-hub` | MCP server em Java | 27 |

`auditvault` é o `featuredProjectId` em `site.ts`. `notifyflow` e `auditvault`
não declaram métrica de teste — por isso o agregado é 778+, não a soma de 11 itens.

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
- [ ] `CONTACT_EMAIL` no painel Vercel apontando para a caixa que é de fato conferida
- [x] `npm run build` sem erros (19 páginas estáticas)

---

## 📚 Regras de Negócio Relevantes

- Home é single-page — seções via scroll + hash anchors
- Blog é rota separada (`/blog`, `/blog/[slug]`) — SSG via MDX files
- Home mostra só os projetos `featured`; `/projects` lista os 11 com filtro + busca
- Projeto em destaque = `featuredProjectId` em `site.ts` (precisa ter `caseStudy`)
- `featured: true` nos projetos controla o que aparece na home
- Disponibilidade para trabalho controlada por `personal.available` (boolean)
- Email de destino do formulário vem sempre de `CONTACT_EMAIL` (env var), nunca hardcoded
- Números do hero são derivados de `projects.ts` — projeto novo com `isTestTotal`
  muda o total exibido automaticamente, sem editar `site.ts`
- Novos artigos de blog: criar `.mdx` em `content/blog/`, build gera a rota automaticamente

---

## 🔗 Dependências Relevantes

| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 14.2.20 | Framework principal |
| typescript | 5.x | Tipagem |
| tailwindcss | 3.x | Estilização (`darkMode: "class"` + cores via CSS vars) |
| geist | 1.7.2 | Fontes Geist Sans/Mono self-hosted (ADR-007) |
| framer-motion | 11.x | Animações — **apenas** em `/projects` (ADR-006) |
| lucide-react | latest | Ícones |
| react-hook-form | 7.x | Formulário de contato |
| resend | 6.9.4 | Envio de email — **retorna `{data, error}`, não lança** |
| @vercel/analytics | 2.x | Web Analytics (page views, etc.) |
| next-mdx-remote | 6.x | MDX rendering via Server Components |
| gray-matter | 4.x | Parsing de frontmatter dos arquivos MDX |
| reading-time | 1.x | Cálculo de tempo de leitura |
| remark-gfm | 4.x | GitHub Flavored Markdown (tabelas, listas, etc.) |
| rehype-highlight | 7.x | Syntax highlighting via hljs classes |
| rehype-slug | 6.x | Anchors automáticos em headings |

---

## 📝 Changelog do CLAUDE.md

| Versão | Data | O que mudou |
|--------|------|-------------|
| 2.0.0 | 2026-07-28 | **Migração visual "A Final"** — ADR-005 (design tokens + tema claro/escuro), ADR-006 (scroll reveal em CSS), ADR-007 (fonte `geist`); padrões "Provider desce até o consumidor", "Hairline via gap de grid", "Stretched link", "Número agregado sempre derivado"; otimização −62 kB na home; 12 componentes removidos e âncoras alteradas. **Debugging do formulário** — nova seção "Erros Conhecidos" com o `{data, error}` do Resend, o submit pré-hidratação e o comentário inline em `.env.local`; limitação do remetente `onboarding@resend.dev` documentada. Lista de projetos corrigida (5 → 11) |
| 1.3.0 | 2026-05-05 | Blog MDX completo + Vercel Analytics + Navbar dual-link + ADR-004 + padrões ESLint |
| 1.2.0 | 2026-03-27 | About layout: float magazine-style + case study page /projects/[slug] + Parallax3DLayer em todas as seções + grain melhorado |
| 1.1.0 | 2026-03-26 | Dados reais João Gabriel, seção Certificates, soft skills, repositório GitHub, instruções gh CLI e NEXT_PUBLIC_SITE_URL |
| 1.0.0 | 2026-03-26 | Criação inicial — projeto portfolio concluído com build limpo |
