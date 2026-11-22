# Design decisions

Follow these rules on every page and component. If a rule needs to change, change it here first.

## Stack

- Styling: Tailwind CSS v4 through the `@tailwindcss/vite` plugin (see `astro.config.mjs`).
- All design tokens live in the `@theme` block of `src/styles/global.css`. Do not hardcode font names or colors in components. Use the Tailwind utilities below.
- `src/styles/global.css` is imported once in `src/layouts/Layout.astro`. Every page must use that layout.

## Typography

| Role | Font | Tailwind class | Use for |
| --- | --- | --- | --- |
| Main text | Söhne | `font-sans` (default on `body`) | Paragraphs, UI text, links, buttons, labels |
| Heading | Gaegu | `font-heading` | Section headings, card titles (`h2`–`h4`) |
| Big heading | Inter | `font-display` | Hero and page titles (`h1`), large statements |
| Dates | Sono (monospace) | `font-mono` | Dates, timestamps, durations, version numbers |

Rules:

- Body text never needs a font class. It inherits Söhne from `body`.
- Do not mix roles. A date is always `font-mono`, even inside a heading.
- Use only the fonts in this table. No new font families without updating this file.

### Font files

Self-hosted in `public/fonts/`, Latin subset, `.woff2`. Each folder has its `OFL.txt` license.

| Font | File | Weights |
| --- | --- | --- |
| Inter | `inter/inter-latin-wght-normal.woff2` | 100–900 (variable) |
| Gaegu | `gaegu/gaegu-latin-{300,400,700}-normal.woff2` | 300, 400, 700 |
| Sono | `sono/sono-latin-full-normal.woff2` | 200–800 (variable, `MONO` axis) |
| Söhne | not in repo | — |

- **Söhne** is a paid font (Klim Type Foundry) and is not stored here. Until licensed files are added, `font-sans` falls back to the system sans-serif. To add it later: put the `.woff2` files in `public/fonts/sohne/` and add `@font-face` rules for `"Söhne"` in `global.css`.
- **Sono** is one variable file. `font-mono` sets `font-variation-settings: "MONO" 1` so it renders as monospace. Do not override this.
- Gaegu only has 300, 400 and 700. Do not use other weights with `font-heading`.

## Color

| Token | Value | Tailwind class | Use for |
| --- | --- | --- | --- |
| `--color-ink` | `#2e2e2e` | `text-ink`, `bg-ink`, `border-ink` | Default text color (set on `body`) |

- Add new colors only as `--color-*` tokens in `@theme`, then list them here.
- Do not use raw hex values in components.
