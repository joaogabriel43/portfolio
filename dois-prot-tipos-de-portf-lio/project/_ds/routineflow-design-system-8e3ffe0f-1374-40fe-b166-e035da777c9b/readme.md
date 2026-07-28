# RoutineFlow — Design System

A sophisticated, premium **dark** design language for **RoutineFlow**, a data-driven personal-routine PWA. This system elevates the product's existing dark theme toward the refinement of **Linear, Things 3, Vercel and Apple** — more surface depth, clearer typographic hierarchy, subtle micro-interactions and tighter spacing — while preserving the existing component and screen structure (this is a *visual* redesign, not a functional rewrite).

> **Product**: RoutineFlow lets users import a structured routine (YAML/TXT), organize it into **areas** (e.g. Saúde, Estudo, Trabalho), and check tasks off daily. Screens: **Hoje** (areas + check-in), **Tarefas** (one-off tasks), **Semana** (7-day grid), **Analytics** (heatmap + streaks) and **Gerenciar**. Stack: React + Tailwind + shadcn/ui. UI language is **Brazilian Portuguese**.

## Sources

This system was built by reading the real product code. Explore these to build higher-fidelity designs:

- **Codebase** (mounted locally): `routineflow-web/` — Vite + React 19 + Tailwind v4 + shadcn/ui. Key dirs: `src/pages/` (screens), `src/components/shared/` (molecules), `src/components/ui/` (shadcn primitives), `src/index.css` (original tokens).
- **GitHub**: <https://github.com/joaogabriel43/RoutineFlow> — the canonical repo. Browse it for the full domain model, hooks and API services if you need deeper context.

The original theme (background `#0a0a0a`, cards `#141414`, borders `#1f1f1f`, accent Apple-blue `#0071e3`, Inter, 12px radius) was the starting point. This system is an approved evolution of it.

---

## Direction (locked with the user)

- **Palette — "Graphite" + warm text.** Neutral cool near-blacks in **real elevation layers** (bg → surface-1…4), hairline borders a touch more visible, and a **warm off-white** text ramp (`#F4F2EF`) instead of pure white so the dark feels premium rather than clinical. Single **vivid-blue** accent `#2F8BFF` (a more saturated evolution of the old Apple blue).
- **Type — Geist + Geist Mono.** Geist (Vercel's typeface) for UI/display; **Geist Mono** for *all numeric data* — streaks, percentages, times, durations, counts — which gives the technical, instrument-panel feel of the references. Light (300) display headers, 600 uppercase labels, tabular figures everywhere.

---

## Content fundamentals

How RoutineFlow writes copy — match this in any new surface.

- **Language**: Brazilian Portuguese, always. Even labels and empty states.
- **Voice**: calm, encouraging, second-person implied. Speaks *to* the user about *their* routine ("sua rotina", "seu dia livre"). Never corporate or gamified-shouty.
- **Casing**: **Sentence case** for headings and buttons ("Nova tarefa", "Gerenciar Rotina"). Section eyebrows are **UPPERCASE** with wide tracking ("SEQUÊNCIAS", "HISTÓRICO DE ATIVIDADE").
- **Tone examples** (verbatim from the product):
  - Empty day: *"Nada agendado para Quinta!"* / *"Aproveite o seu dia livre."*
  - Encouragement: *"Nenhuma tarefa pendente — que tal adicionar algo?"*
  - Future days: *"Visualização apenas — sem check-ins para dias futuros"*
  - Helper: *"A tarefa aparecerá todo dia 25 do mês."*
- **Numbers & metrics**: terse, glanceable — "7 de 11 tarefas · 64%", "14 dias", "45 min". Percentages and counts are first-class.
- **Emoji**: used **functionally as area icons only** (🏃 📚 💻 🧘) — the user picks an emoji per area. A celebratory 🎉 / 📅 appears in empty states. Emoji are **not** decoration sprinkled through copy.
- **Punctuation**: middot `·` / bullet `•` as a soft separator between metrics. Em-dashes for asides.

---

## Visual foundations

- **Color & depth.** The signature move is **elevation by layered near-blacks**, not borders alone: `--bg #08080A` (app) → `--surface-1 #0F0F11` (sunken/sidebar/inputs) → `--surface-2 #141416` (cards) → `--surface-3 #1C1C1F` (hover/popover) → `--surface-4 #232327` (pressed). Hairline borders (`--border #26262A`) define edges where contrast alone isn't enough.
- **Text.** Warm off-white ramp: `--text-hi #F4F2EF` → `--text-mid #B8B6B3` → `--text-lo #8C8A88` → `--text-dim #5C5B59`. Never pure `#FFF`.
- **Accent.** One vivid blue `#2F8BFF` for primary actions, selection, focus and progress. Used sparingly — most of the UI is monochrome graphite; blue marks the *one* thing that matters on screen. Tinted fills (`--accent-bg`, 10% alpha) and tinted borders for quiet emphasis.
- **Area colors.** A categorical palette (blue, indigo, violet, pink, red, amber, green, teal, cyan) themes each routine area — shown as the **3px left border** on cards, the checkbox fill, week-grid dots and streak numbers. This is the product's main use of color beyond the accent.
- **Type.** Geist; display sizes use **weight 300 + negative tracking** (Apple-style large light headers); body 400/500; labels 600 UPPERCASE +0.08em. **Geist Mono, tabular**, for every number.
- **Spacing.** 4px grid. Generous outer padding (36px desktop main column, max-width 768px), tight internal rhythm.
- **Corner radii.** Centered on the product's **12px card language**: cards `--radius-lg 12px`, buttons/inputs 8px, nested items 11px, checkboxes 6px, pills full.
- **Cards.** `surface-2` fill, 1px hairline border, 12px radius, **no drop shadow at rest** (depth comes from the surface value, Linear-style). Area/streak cards add a 3px colored left border. Hover lifts to `surface-3`.
- **Shadows.** Reserved for *floating* layers only (popovers, modals, toasts) — soft and dark (`--shadow-md/lg/pop`). Resting cards are flat.
- **Borders.** Hairline, low-contrast. Internal dividers use the even fainter `--border-subtle`.
- **Backgrounds.** Flat near-black. **No gradients, no images, no textures, no patterns** behind UI. Depth is purely tonal layering. (The only "imagery" is the violet logomark and emoji area icons.)
- **Animation.** Quiet and quick. Primary easing `cubic-bezier(0.16,1,0.3,1)` (gentle settle). Page transitions: 200ms fade + 8px rise. Progress bars fill over 700ms. Expand/collapse 320ms max-height. **No bounces, no infinite loops, no parallax.**
- **Hover states.** Surfaces brighten one elevation step (transparent→`surface-2`, `surface-2`→`surface-3`); muted text brightens toward `--text-hi`. **Press**: primary buttons scale to 0.98 and darken to `--accent-press`.
- **Focus.** 3px accent ring at \~45% alpha (`--accent-ring`), never a hard outline.
- **Transparency & blur.** Used only for the mobile bottom-nav (95% bg + backdrop-blur) and tinted accent fills. Not a general motif.
- **Imagery vibe.** Essentially imagery-free; the palette is cool, deep, neutral graphite with a single warm-blue light source.

---

## Iconography

- **System**: **Lucide** (`lucide-react` in the codebase) — clean, 24×24, **2px stroke**, rounded line-caps/joins, `currentColor` outline (never filled). This is the only icon set; match its weight and style for any new glyph.
- **In this design system**: the kit reproduces the needed Lucide glyphs as inline SVG in `ui_kits/routineflow/Icons.jsx` (home, checkSquare, calendar, barChart, settings, upload, plus, chevrons, download, search, bell, x, pencil, trash, arrowLeft, check) so it runs offline. For new production work, import from `lucide-react` directly. If you need a glyph not in the inline set and aren't in the app, pull it from Lucide (CDN or `lucide-react`) — don't hand-draw an off-style icon.
- **Emoji as area icons**: areas are identified by a user-chosen emoji rendered at 16–22px. Treat emoji as *data*, not brand decoration.
- **Logo**: `assets/favicon.svg` — a violet "flow" mark (a flowing chevron/wing, `#863bff`). Brand mark only; the UI accent stays blue. See the **Brand** card.
- **Sizes**: 16px in nav/sidebar, 13–15px inline with text/buttons, 20px in mobile bottom-nav. Hit targets ≥ the surrounding control height.

---

## Index — what's in here

**Foundations**

- `styles.css` — root entry; `@import`s the token files below. **Consumers link this one file.**
- `tokens/colors.css` — surfaces, text ramp, accent, semantic status, area palette + semantic aliases.
- `tokens/typography.css` — Geist/Geist Mono families, weights, type scale, numeric features.
- `tokens/spacing.css` — 4px spacing scale, radii, shadows, layout vars, motion (easing/durations).
- `tokens/fonts.css` — Geist + Geist Mono via Google Fonts CDN *(see caveat)*.
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**Components** (`window.RoutineFlowDesignSystem_8e3ffe.<Name>`)

- `components/core/` — `Button`, `Badge`, `Card`, `Checkbox`, `Input`, `ProgressBar`, `SegmentedTabs`.
- `components/routine/` — `TaskItem`, `AreaCard`, `StreakCard`, `DateNavBar`, `Heatmap` (product molecules).
- Each has `.jsx` (impl), `.d.ts` (props), `.prompt.md` (usage), and a directory `*.card.html` thumbnail.

**UI kit**

- `ui_kits/routineflow/index.html` — interactive recreation of the full app (sidebar + Hoje, Tarefas, Semana, Analytics, Gerenciar). Composed from the components above. Also registered as a Starting Point.

**Assets**

- `assets/favicon.svg` (logomark), `assets/apple-touch-icon.png`, `assets/hero.png`.

**Other**

- `explorations/` — the palette & typography option boards used to lock the direction.
- `SKILL.md` — makes this folder usable as a downloadable Claude Agent Skill.

---

## Caveats / known substitutions

- **Fonts load from Google Fonts CDN** (`tokens/fonts.css`) — no local Geist/Geist Mono binaries are bundled, so the compiler reports 0 webfonts. If you have licensed Geist files, drop them in `assets/fonts/` and swap the `@import` for local `@font-face` rules. Geist is itself a substitution of sorts: it's the chosen elevation over the codebase's Inter (approved by the user).
- The `_ds_bundle.js` that component cards and the UI kit load is **compiled automatically** — it won't exist until the first compile completes.

Want to go deeper on any screen's real behavior? Read the matching file in `routineflow-web/src/pages/` or browse <https://github.com/joaogabriel43/RoutineFlow>.
