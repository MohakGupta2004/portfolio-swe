# Design decisions

Follow these rules on every page and component. If a rule needs to change, change it here first.

## Stack

- Styling: Tailwind CSS v4 through the `@tailwindcss/vite` plugin (see `astro.config.mjs`).
- All design tokens live in the `@theme` block of `src/styles/global.css`. Do not hardcode font names or colors in components. Use the Tailwind utilities below.
- `src/styles/global.css` is imported once in `src/layouts/Layout.astro`. Every page must use that layout.

## Typography

| Role | Font | Tailwind class | Use for |
| --- | --- | --- | --- |
| Main text | JetBrains Mono | `font-sans` (default on `body`) | Paragraphs, UI text, links, buttons, labels |
| Heading | Gaegu | `font-heading` | Section headings, card titles (`h2`–`h4`) |
| Big heading | Inter | `font-display` | Hero and page titles (`h1`), large statements |
| Dates | Sono (monospace) | `font-mono` | Dates, timestamps, durations, version numbers |

Rules:

- Body text never needs a font class. It inherits JetBrains Mono from `body`.
- Do not mix roles. A date is always `font-mono`, even inside a heading.
- Use only the fonts in this table. No new font families without updating this file.

### Font files

Self-hosted in `public/fonts/`, Latin subset, `.woff2`. Each folder has its `OFL.txt` license.

| Font | File | Weights |
| --- | --- | --- |
| Inter | `inter/inter-latin-wght-normal.woff2` | 100–900 (variable) |
| Gaegu | `gaegu/gaegu-latin-{300,400,700}-normal.woff2` | 300, 400, 700 |
| Sono | `sono/sono-latin-full-normal.woff2` | 200–800 (variable, `MONO` axis) |
| JetBrains Mono | `jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2` | 100–800 (variable) |

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
- Social icons (`src/components/SocialLinks.astro`): top right of the name row, inside the content column only. GitHub, LinkedIn, Email, Download resume. Round-stroke line icons (1.75 stroke, round caps and joins) to match Gaegu. Muted `text-foreground/60`, full on hover. Social links open in a new tab. The resume icon downloads `/resume.pdf` (file not added yet).
- Nav: Home, Blog, Projects, Work, Favourites, Resume. `font-heading`. Active link is full `text-foreground` with a dotted underline, others are `text-foreground/60`.
- Resume links to `/resume.pdf` (file not added yet).

## Summary section

- Component: `src/components/Summary.astro`, rendered under the header on the landing page.
- Written in first person, plain and specific. Every fact comes from the resume (`~/Documents/resume/resume_general_swe.tex`). Do not invent facts (no hobbies, cities or employers that are not in the resume) and do not copy the resume summary word for word.
- Structure: who I am and what I ship now, how I like to work (own tools: mredis, mcode), hackathon and security proof, then where to find me.
- The whole section is lowercase (`lowercase` class on the `<section>`). Body text is `font-sans`, `leading-relaxed`, paragraphs spaced with `space-y-4`.
- Emphasis and links use the `.dotted` class: a dotted underline (2px, offset 4px) in `global.css`, same style as the active nav link. Use it for key phrases (plain `<span>`) and for links (`<a>`). Do not use solid or wavy underlines anywhere.
- No arrows on links, except the "view all work →" and "view all projects →" links. External links are plain `.dotted` links: GitHub (`https://github.com/MohakGupta2004`), LinkedIn (`https://www.linkedin.com/in/mohak-gupta-007065294`). Email is a `mailto:` link. There is no X account in the resume, so do not add one.
- The underline uses the current text color. There is no separate underline color variable.
- In `.astro` markup, keep a link on the same line as the space before it, so line wrapping in the source does not remove the space.

## Work section

- Component: `src/components/Work.astro`, rendered under the summary on the landing page, separated by a dotted top border.
- Heading "Work" is `font-heading` (`h2`). Only one row: the single most fitting role (now Valstrand Solutions, Software Engineer), not the full list. Facts from the resume only. Plain, simple one-liners.
- Row: round logo (`public/valstrand.webp`, `size-9`, `rounded-full`), then `Company (Role)` in `font-semibold` main text, a muted `/`, then the one-liner in `text-foreground/60`. Row text is `text-sm`.
- No links, no underline and no arrows on the rows.
- To change the role, edit the `job` object in the component.
- Below the list, a "view all work →" text link goes to `/work`: `.dotted` underline, `text-sm`, muted. Arrow links are only the two "view all" links. No button box. The `/work` page stays empty for now.

## Projects section

- Component: `src/components/Projects.astro`, rendered under Work on the landing page, same dotted top border. Shared icon paths live in `src/data/icons.ts`.
- Heading "Projects" is `font-heading` (`h2`). Below it, 2 projects (mredis, mcode) sit in a plain list with no panel, no background and no extra padding. Facts from the resume only.
- Project: name in `text-sm` main text on the left, link chips on the right (they wrap under the name on small screens), then a one-line description in `text-sm text-foreground/60`.
- Chips: `bg-foreground/10`, `text-xs`, round-stroke icon plus a word: "live" (globe) and "source" (GitHub). Open in a new tab. No arrows, no underline.
- Language icon: a small `size-4` image (`public/icons/go.svg`, `cpp.svg`, from Devicon, MIT) sits just left of the chips, with the language name as `alt` and tooltip. Add one per project via `language` and `languageIcon`.
- Below the panel, a "view all projects →" text link to `/projects`, same style as "view all work →". The `/projects` page stays empty for now.
- Add a project by adding one object to the `projects` array.

## Git workflow

- Work on a feature branch, commit small, then merge into `main` and push to GitHub (`origin`).
- Follow every rule in this file. If you make a design decision, record it here before you finish.
