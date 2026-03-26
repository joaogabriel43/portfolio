# Napkin Runbook — Portfolio 2026

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)

1. **[2026-03-26] create-next-app falha com diretório "Portfolio 2026"**
   Do instead: Criar projeto manualmente (package.json + configs + src/) — diretório com espaços e maiúsculas é rejeitado pelo npm naming restrictions.

2. **[2026-03-26] Framer Motion: componentes com `whileHover`/`whileTap` exigem `"use client"`**
   Do instead: Sempre adicionar `"use client"` em qualquer componente que use Framer Motion ou React Hook Form.

3. **[2026-03-26] SectionLabel já tem animação própria — não envolver em AnimatedText**
   Do instead: Usar `<SectionLabel index={N}>label</SectionLabel>` diretamente dentro de um `<div className="mb-5">`. Para Hero (animate stagger), passar `animate={false}`.

4. **[2026-03-26] Button: variantes disponíveis são `primary | ghost | outline` (sem `secondary`)**
   Do instead: Usar `variant="ghost"` para botões de apoio com borda sutil. `secondary` não existe nesse projeto.

## Shell & Command Reliability

1. **[2026-03-26] Windows: curl via bash funciona para health check do Next.js**
   Do instead: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` para confirmar que o servidor respondeu 200.

## Domain Behavior Guardrails

1. **[2026-03-26] Tailwind custom colors devem usar nomes em tailwind.config.ts E variáveis CSS em globals.css**
   Do instead: Definir cores em ambos (`background: "#0a0a0a"` no config + `--background: #0a0a0a` no CSS) para que `bg-background` e `var(--background)` funcionem em paralelo.

2. **[2026-03-26] `next/font/google` — DM_Mono requer import e variable separados**
   Do instead: Declarar cada fonte (Playfair_Display, DM_Sans, DM_Mono) com seu próprio `variable` CSS e passar todos no `className` do `<html>`.

## User Directives

1. **[2026-03-26] Stack do projeto: Next.js 14 App Router, TypeScript 5, Tailwind 3, Framer Motion 11, React Hook Form 7**
   Do instead: Nunca sugerir upgrade para Next.js 15+ sem confirmação — o usuário tem versão específica definida.

2. **[2026-03-26] Tema dark: fundo #0a0a0a, texto #f0ece4, accent #c9b97a**
   Do instead: Manter essas cores como base em qualquer componente novo. Não alterar sem aprovação.
