# CLAUDE.md — Astro Landing Page

Este arquivo instrui o Claude sobre como trabalhar neste projeto.

---

## Projeto

Landing page estática construída com **Astro** + **Tailwind CSS**.  
Output: arquivos estáticos em `/dist`, deploy na Vercel/Netlify.

---

## Stack

| Ferramenta | Versão | Uso |
|------------|--------|-----|
| Astro | latest | Framework principal |
| CSS custom properties | — | Estilização (sem Tailwind) |
| TypeScript | strict | Tipos nos componentes |
| Node.js | ≥ 18 | Runtime |

---

## Comandos essenciais

```bash
npm run dev       # Dev server em localhost:4321
npm run build     # Build em /dist
npm run preview   # Preview do build local
npx astro check  # Type check .astro files
```

---

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis (.astro)
├── layouts/        # Layout base (Layout.astro)
├── pages/          # Rota = arquivo (index.astro = /)
└── assets/         # Imagens otimizadas pelo Astro
public/             # Assets estáticos (sem otimização)
```

---

## Convenções de código

### Componentes `.astro`

- Props sempre com interface TypeScript no frontmatter
- Texto de conteúdo via props (nunca hardcoded no template)
- Estilos via CSS custom properties (`var(--color-accent)` etc.) em `<style>` scoped por componente
- Nomes de componentes em PascalCase

```astro
---
interface Props {
  title: string;
  description?: string;  // sempre tipar opcionais com ?
}
const { title, description = "Valor padrão" } = Astro.props;
---
```

### Imagens

- Imagens de conteúdo → `src/assets/` → usar `<Image>` do Astro
- Favicons, OG image → `public/` → referenciar direto com `/og.png`
- Sempre incluir `alt` descritivo
- Hero image: `loading="eager"`, demais: `loading="lazy"`

### JavaScript / Interatividade

- **Zero JS por padrão** — não adicionar `client:*` sem motivo
- Interatividade simples (menu mobile, accordion) → `<details>` nativo ou CSS
- Interatividade complexa → componente com `client:visible`

---

## Seções da landing page

A página `src/pages/index.astro` monta as seções nesta ordem:

1. `<Header>` — fixo no topo, nav + CTA
2. `<Hero>` — headline principal, sub, botão primário
3. Social proof — logos ou contadores (inline)
4. `<Features>` — cards de benefícios (3–6 itens)
5. How it works — steps ou timeline (inline)
6. `<Testimonials>` — depoimentos
7. `<Pricing>` — planos (se aplicável)
8. `<FAQ>` — perguntas frequentes
9. `<CTA>` — chamada para ação final
10. `<Footer>` — links, legal, redes sociais

---

## SEO e Performance

- Sempre preencher `title` e `description` no `<Layout>`
- OG image em `public/og.png` (1200×630px)
- `lang="pt-BR"` no `<html>`
- Preconnect para fontes externas no `<head>`
- Não usar Google Fonts inline — preferir `font-display: swap`

---

## O que o Claude deve fazer

**Ao criar componentes:**
- Ler o componente atual antes de editar
- Manter interface de props consistente com os demais
- Não quebrar responsividade mobile

**Ao criar novas seções:**
- Seguir a ordem de seções acima
- Importar o componente em `index.astro`
- Passar props com valores de exemplo realistas (não "Lorem ipsum")

**Ao fazer deploy:**
- Rodar `npm run build` e verificar erros antes de fazer push
- Confirmar com o usuário qual plataforma (Vercel/Netlify/GitHub Pages)

**O que evitar:**
- Não adicionar dependências desnecessárias
- Não usar `client:load` onde `client:visible` basta
- Não criar arquivos CSS globais separados (estilos ficam em `<style>` scoped no componente)
- Não hardcodar conteúdo nos templates (usar props ou arrays de dados)

---

## Checklist antes de cada commit

- [ ] `npm run build` passa sem erros
- [ ] `npx astro check` sem type errors
- [ ] Responsivo no mobile (375px) e desktop (1280px)
- [ ] Imagens com `alt` preenchido
- [ ] Meta description preenchida

---

## Paleta de cores

Definida como CSS custom properties no `:root` de `src/layouts/Layout.astro`:

```css
:root {
  --color-bg:           #fefefe;        /* fundo da página */
  --color-surface:      #fef6f9;        /* cards / seções alternadas */
  --color-surface-alt:  #f9edf2;        /* superfície secundária */
  --color-border:       #e8c4d0;        /* bordas */
  --color-text:         #1a0a10;        /* texto principal */
  --color-muted:        #7a4a5a;        /* texto secundário / ícones */
  --color-accent:       #7d2242;        /* cor principal (vinho/bordô) */
  --color-accent-hover: #621933;        /* hover do accent */
  --color-accent-light: #fde8ef;        /* fundo suave do accent */
  --color-warm:         #7d2242;        /* alias do accent */
  --color-warm-light:   #fde8ef;        /* alias do accent-light */
}
```

Usar sempre via `var(--color-accent)`, `var(--color-surface)` etc. — nunca hardcodar hex nos componentes.
