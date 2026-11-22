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

Two themes. Dark is the default. The choice is saved in `localStorage` under `theme` and applied to `<html data-theme="light">` before paint (inline script in `Layout.astro`).

| Token | Dark | Light | Tailwind class | Use for |
| --- | --- | --- | --- | --- |
| `--color-background` | `#2e2e2e` | `#f5f5f3` | `bg-background` | Page background (set on `body`) |
| `--color-foreground` | `#ececec` | `#2e2e2e` | `text-foreground`, `border-foreground` | Text and lines (default text color on `body`) |

- Use opacity for muted text and lines, e.g. `text-foreground/60`, `border-foreground/40`.
- Add new colors only as CSS variables for both themes in `global.css`, then list them here.
- Do not use raw hex values in components. Do not use `dark:` variants, the variables already switch.
- Theme toggle: `src/components/ThemeSwitcher.astro`, a sun/moon button at the right of the nav row.

## Pages

Routes in `src/pages/`. Every page wraps its content in `src/layouts/Layout.astro`.

| Page | File | URL |
| --- | --- | --- |
| Landing | `index.astro` | `/` |
| Blog | `blog/index.astro` | `/blog` |
| Blog post (dynamic) | `blog/[slug].astro` | `/blog/<slug>` |
| Projects | `projects.astro` | `/projects` |
| Favourites | `favourites.astro` | `/favourites` |
| Work | `work.astro` | `/work` |

All pages are empty for now: only the background color.

## Landing page layout

- Content column: `max-w-xl`, centered, with dashed left and right borders (`border-x border-dashed border-foreground/40`).
- Header (`src/components/Header.astro`): profile picture (`public/pfp.jpeg`) + name in `font-heading`, then a dotted line, then the nav row.
- Name format: "Mohak Gupta *aka* rushbeef04". "aka" is muted, handle is italic.
- Nav: Home, Blog, Projects, Work, Favourites, Resume. `font-heading`. Active link is full `text-foreground` with a dotted underline, others are `text-foreground/60`.
- Resume links to `/resume.pdf` (file not added yet).

## Summary section

- Component: `src/components/Summary.astro`, rendered under the header on the landing page.
- Written in first person, plain and specific. Every fact comes from the resume (`~/Documents/resume/resume_general_swe.tex`). Do not invent facts (no hobbies, cities or employers that are not in the resume) and do not copy the resume summary word for word.
- Structure: who I am and what I ship now, how I like to work (own tools: mredis, mcode), hackathon and security proof, then where to find me.
- Body text is `font-sans`, `leading-relaxed`, paragraphs spaced with `space-y-4`.
- Emphasis and links use the `.scribble` class: a hand-drawn wavy underline in `global.css`. Use it for key phrases (plain `<span>`) and for links (`<a>`). Do not use a plain browser underline in body text.
- External social links end with ` ↗`: GitHub (`https://github.com/MohakGupta2004`), LinkedIn (`https://www.linkedin.com/in/mohak-gupta-007065294`). Email is a `mailto:` link without arrow. There is no X account in the resume, so do not add one.
- Underline color is the `--scribble` variable: light blue `#9be7f5` in dark mode, deeper blue `#0e8ba5` in light mode. Change it only in `global.css`.
- In `.astro` markup, keep a link on the same line as the space before it, so line wrapping in the source does not remove the space.

## Git workflow

- Work on a feature branch, commit small, then merge into `main` and push to GitHub (`origin`).
- Follow every rule in this file. If you make a design decision, record it here before you finish.
