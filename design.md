# Design decisions

Follow these rules on every page and component. If a rule needs to change, change it here first.

## Stack

- Styling: Tailwind CSS v4 through the `@tailwindcss/vite` plugin (see `astro.config.mjs`).
- Icons: React Icons (`react-icons/fi`) through `@astrojs/react`. See the icons rule under "Achievements, Personal, Work with me, Footer".
- All design tokens live in the `@theme` block of `src/styles/global.css`. Do not hardcode font names or colors in components. Use the Tailwind utilities below.
- `src/styles/global.css` is imported once in `src/layouts/Layout.astro`. Every page must use that layout.

## Typography

| Role | Font | Tailwind class | Use for |
| --- | --- | --- | --- |
| Main text | JetBrains Mono | `font-sans` (default on `body`) | Paragraphs, UI text, links, buttons, labels |
| Heading | Gaegu | `font-heading` | Section headings, card titles (`h2`–`h4`) |
| Big heading | Inter | `font-display` | Hero and page titles (`h1`), large statements. Blog post titles use Gaegu (`font-heading`). |
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

- The scrollbar is hidden on every page (`scrollbar-width: none` and `::-webkit-scrollbar` on `html`). Scrolling still works. This also stops the centered column from shifting between pages.

Routes in `src/pages/`. Every page wraps its content in `src/layouts/Layout.astro`.

| Page | File | URL |
| --- | --- | --- |
| Landing | `index.astro` | `/` |
| Blog | `blog/index.astro` | `/blog` |
| Blog post (dynamic) | `blog/[slug].astro` | `/blog/<slug>` |
| Projects | `projects.astro` | `/projects` |
| Favourites | `favourites.astro` | `/favourites` |
| Work | `work.astro` | `/work` |

Pages that are not built yet are empty: only the background color.

## Landing page layout

- Content column: `max-w-xl`, centered, with dashed left and right borders (`border-x border-dashed border-foreground/40`).
- Header (`src/components/Header.astro`): profile picture (`public/pfp.jpeg`) + name in `font-heading`, then a dotted line, then the nav row.
- Profile picture and name are one link to `/`. Hovering either tilts the picture 6deg (`group-hover:-rotate-6`, 200ms, motion-safe only).
- Name format: "Mohak Gupta *aka* rushbeef04". "aka" is muted, handle is italic.
- Social icons (`src/components/SocialLinks.astro`): top right of the name row, inside the content column only. GitHub, LinkedIn, Email, Download resume. Round-stroke line icons (1.75 stroke, round caps and joins) to match Gaegu. Muted `text-foreground/60`, full on hover. Social links open in a new tab. The resume icon downloads `/resume.pdf` (file not added yet).
- Nav: Home, Blog, Projects, Work, Favourites, Resume. `font-heading`. Active link is full `text-foreground` with a dotted underline, others are `text-foreground/60`.
- Resume links to `/resume.pdf` (file not added yet).

## Summary section

- Component: `src/components/Summary.astro`, rendered under the header on the landing page.
- Written in first person, plain and specific. Every fact comes from the resume (`~/Documents/resume/resume_general_swe.tex`). Do not invent facts (no hobbies, cities or employers that are not in the resume) and do not copy the resume summary word for word.
- Structure: who I am and what I ship now, how I like to work (own tools: mredis, mcode), hackathon and security proof, then where to find me.
- The whole section is lowercase (`lowercase` class on the `<section>`). Body text is `font-sans`, `leading-relaxed`, paragraphs spaced with `space-y-4`.
- Emphasis and links use the `.dotted` utility: a dotted underline (2px, offset 4px) in `global.css`, same style as the active nav link. Use it for key phrases (plain `<span>`) and for links (`<a>`). Do not use solid or wavy underlines anywhere.
- No arrows on links, except the "view all work →", "view all projects →" and "view all blogs →" links. External links are plain `.dotted` links: GitHub (`https://github.com/MohakGupta2004`), LinkedIn (`https://www.linkedin.com/in/mohak-gupta-007065294`). Email is a `mailto:` link. There is no X account in the resume, so do not add one.
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

- Component: `src/components/Projects.astro`, rendered under Work on the landing page, same dotted top border.
- Heading "Projects" is `font-heading` (`h2`). Below it, 2 projects (mredis, mcode) sit in a plain list with no panel, no background and no extra padding. Facts from the resume only.
- Project: name in `text-sm` main text on the left, link chips on the right (they wrap under the name on small screens), then a one-line description in `text-sm text-foreground/60`.
- Chips: `bg-foreground/10`, `text-xs`, round-stroke icon plus a word: "live" (globe) and "source" (GitHub). Open in a new tab. No arrows, no underline.
- Language icon: a small `size-4` image (`public/icons/go.svg`, `cpp.svg`, from Devicon, MIT) sits just left of the chips, with the language name as `alt` and tooltip. Add one per project via `language` and `languageIcon`.
- Below the panel, a "view all projects →" text link to `/projects`, same style as "view all work →". The `/projects` page stays empty for now.
- Add a project by adding one object to the `projects` array.

## Blogs section

- Rows come from the shared `src/components/BlogList.astro` (used here and on `/blog`). It holds the hover effect: other rows blur, the thumbnail follows the cursor. Prop `large` gives the `/blog` look (Gaegu titles); the landing page uses the small look.

- Component: `src/components/Blogs.astro`, rendered under Projects on the landing page, same dotted top border.
- Heading "Blogs" is `font-heading` (`h2`). The 3 newest rows come from `src/data/blogs.ts`. Post bodies live in `src/content/blog/` and thumbnails in `public/images/blogs/`.
- Row: title in `text-sm` main text on the left, date on the right in `font-mono text-xs text-foreground/60` (format `23.MAR.2026`). Whole row is a link to `/blog/<slug>`. Title gets the `.dotted` underline on hover.
- Below the list, a "view all blogs →" link to `/blog`, same style as the other "view all" links (now three arrow links).
- `blog/[slug].astro` reads all posts from the `blog` collection (`src/content/blog/`).

## Blog page

- Route: `blog/index.astro` (`/blog`). Same shell as the landing page: the `max-w-2xl` column with dashed side borders, `Header`, then the content, then `Footer`.
- Data: `src/data/blogs.ts` exports `blogs`, newest first. Each entry has `title`, `date` (`19.APR.2026`), `slug` and `thumbnail` (`/images/blogs/<slug>.jpg`). The landing page Blogs section and this page both read from this file.
- Titles use `font-heading` (Gaegu) at `text-2xl`. The page is a flex column, so the footer sits at the bottom of the viewport on short pages (`mt-auto`). The thumbnail follows the cursor with easing and sits 24px below it (flips above when there is no room below), never under the pointer. `main` has `overflow-y-clip` so the thumbnail never adds a scrollbar (small inline script, lerp 0.15).
- Page heading: `h1` "Blog" in `font-heading text-5xl font-bold` (Gaegu), then a one-line subtitle in `text-sm text-foreground/60`: "Thoughts, tutorials, and insights on engineering and programming." No banner box.
- Rows: title left (`text-sm`, truncated to one line), date right (`font-mono text-xs text-foreground/60`). Whole row links to `/blog/<slug>`, rows spaced with `py-3`.
- Hover (CSS only, no JS): the list wrapper is `relative`. `:has()` on the wrapper blurs (`blur(3px)`) and dims (`opacity .35`) every row except the hovered one. The hovered row stays sharp and its title gets `.dotted`.
- Thumbnail: inside each row, hidden by default, `w-72`, `aspect-video`, `object-cover`, `rounded-md`, `border border-foreground/40`, `pointer-events-none`, `z-10`. It follows the cursor (see above). In: opacity 0→1, scale .95→1, blur 8px→0 in 250ms `cubic-bezier(.2,.7,.2,1)`. Out: blur 0→8px, fade to 0 and scale to .95 over 350ms `ease-out`, so it dissolves away.
- Transitions only on `filter`, `opacity` and `transform`. The scale and blur parts sit behind `@media (prefers-reduced-motion: no-preference)`; with reduced motion only opacity fades.
- `@media (hover: none)`: no thumbnail and no blur.
- Thumbnails use `loading="lazy"`, `decoding="async"`, `alt=""` (decorative).

## Blog post page

- Route: `blog/[slug].astro`. Same shell as `/blog`. Posts come from the `blog` collection in `src/content/blog/` (MDX, frontmatter `title`, `description`, `date`). The blog list (`src/data/blogs.ts`, `getBlogs()`) reads the posts themselves, sorted by date. Post images live in `public/images/posts/<slug>/`, thumbnails in `public/images/blogs/`.
- No `Header`, no navbar and no nav links on a post page. The breadcrumb is the only navigation.
- Breadcrumb (`text-sm`): round pfp, "Mohak Gupta", muted `/`, "Writing" link to `/blog`, muted `/`, post title truncated and muted. Links get `hover:dotted`.
- Title is `h1` in Gaegu (`font-heading text-5xl font-bold`), no cover image anywhere on the post page. Date under it in `font-mono text-xs text-foreground/60`, format `19.APR.2026`.
- Body sits in `.post-body` (`text-sm`, justified JetBrains Mono, drop cap on the first letter, Gaegu `h2`/`h3`, dotted links, code blocks, images, tables, quotes). Astro adds heading ids.
- `PostToc.astro`: floating pill at the bottom center shows the current section and a circular scroll-progress ring. Clicking it opens a card above the pill with all h2/h3 rows, a blurred backdrop, Escape/backdrop to close, smooth scroll to a heading. Closed pill is 17rem wide and grows to 24rem when open; a thin divider separates the list from the footer row; the ring is 3px thick. The pill and rows use `cursor-pointer`. Hover: the closed pill lifts 2px and grows 3%, rows get a soft background and slide 0.5rem right, pressing shrinks the card. Open: the card grows with a slight spring (350ms), rows fade and slide up one after another (25ms apart). All motion is skipped with reduced motion. Hidden below two headings.

## Achievements, Personal, Work with me, Footer

- Components: `Achievements.astro`, `Personal.astro`, `WorkWithMe.astro`, `Footer.astro`, rendered in that order under Blogs. Each section has the same dotted top border and `font-heading` `h2`. The footer has a dashed top border.
- Content is copied from the old portfolio (`~/Projects/portfolio-mdx`): achievements (Innovocon 1st, Odoo x Adamas 1st runner-up from the resume, SIH finalist, Murf AI challenge), cal.com call and email, footer text and links.
- Achievements: plain `text-sm` names, no icons.
- Personal: `font-heading` rows `books / my collection of books`, `movies / ...`, both link to `/favourites`. The old portfolio had no books or movies content.
- Work with me: rows with a `size-9` rounded icon box (`bg-foreground/10`, round-stroke icon), bold title, muted `· description`. "Consultation" opens cal.com, "Hire me" is a `mailto:`.
- Footer: `~ @rushbeef04` on the left, "Built with passion, assembled in India" on the right. No social icons (removed).
- Icons: React Icons, Feather set (`react-icons/fi`), through the `@astrojs/react` integration, rendered as static SVG (no client JS). Do not use Lucide. No background behind icons.
- Achievements: a `FiAward` icon sits at the far right of each row.
- Work with me icons: `FiPhoneCall`, `FiUsers`, muted `text-foreground/60`, no box.
- Hover rule: every link shows a dotted underline on hover. Text links use `hover:dotted` (or `group-hover:dotted` on the text inside a row link). Icon links use the `icon-link` utility, a dotted line under the icon. Both are utilities in `global.css`.
- One-line rule: every list row (blogs, achievements, personal, work with me) stays on one line. Long text is cut with `truncate` (ellipsis).

## Git workflow

- Work on a feature branch, commit small, then merge into `main` and push to GitHub (`origin`).
- Follow every rule in this file. If you make a design decision, record it here before you finish.


## Local CMS (Keystatic)

- Config: `keystatic.config.tsx`. Storage is `local`: posts are saved as MDX files in `src/content/blog/`, pasted or dropped images in `public/images/posts/<slug>/`. No database, no cloud, no account.
- Start it with `bun run dev`, then open `http://127.0.0.1:4321/keystatic`.
- It is dev-only. `astro.config.mjs` adds the Keystatic integration only when the command is `astro dev`, and the dev server listens on `127.0.0.1` only. `astro build` output is plain static HTML with no `/keystatic` page and no API route. Do not remove the `isDev` check.
- Post images must stay under `/images/posts/<slug>/`. Keystatic only shows images from that folder and escapes any other image path when you save.
- Thumbnail is a plain path field: put the file in `public/images/blogs/` and type `/images/blogs/<file>`.
- Saving in the CMS rewrites the file a little (YAML quoting, `*` bullets). The content stays the same.
