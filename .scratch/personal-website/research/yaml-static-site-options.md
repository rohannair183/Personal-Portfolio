# YAML-friendly static site options

Research for rohannair.com. Goal: add pages and learning-log entries by dropping YAML (or YAML + markdown) files in git, with a clean default look and minimal upkeep.

## Short answer

| Stack | YAML fit | Clean default theme | Maintenance | Verdict |
|-------|----------|---------------------|-------------|---------|
| **Astro content collections** | Strong | Good starters | Low | **Best default pick** |
| **Eleventy** | Strong (with small config) | DIY | Low once built | Best if you want zero framework |
| **Hugo** | Strong (`data/` + adapters) | Many themes, mixed quality | Very low | Best if you hate Node |
| **Next.js + Velite** | Good | None built-in | Medium–high | Overkill for this site |
| **Next.js + Contentlayer** | Was good | N/A | Dead | Do not start here |
| **Jekyll** | Good | Decent (GitHub Pages) | Medium | Fine on GitHub Pages, aging |
| **Quartz** | Weak (markdown-first) | Great for gardens | Low | Wrong tool if YAML is the contract |

**Recommendation:** Start with **Astro**. It matches the YAML-in-git workflow, ships usable starters, builds fast, and stays boring to maintain. Pick **Eleventy** if you want the thinnest possible stack and are fine writing templates. Pick **Hugo** if you want a single binary and are willing to fight a theme. Skip Next.js unless you already live in React and accept more moving parts for no real gain on a mostly-static personal site.

---

## What "YAML-friendly" actually means here

Three patterns show up across stacks:

1. **YAML frontmatter + markdown body** — best for learning logs (metadata in YAML, prose in markdown). This is what most "blog" workflows use.
2. **Pure YAML entry files** — best for interest hubs, link lists, structured pages with no long body.
3. **`data/` directory YAML** — shared or list data (nav, topics, book lists) that templates turn into pages.

The ticket asks for all of these. Not every stack treats pure YAML files as first-class pages out of the box; some need a thin template layer to map data → routes. That is normal and cheap if done once.

---

## Astro content collections

### Adding a new page

1. Define collections once in `src/content.config.ts` with Zod schemas (title, date, tags, etc.).
2. Drop a file in the matching folder:
   - Learning log: `src/content/logs/2026-08-28-graph-neural-nets.md` with YAML frontmatter.
   - Interest hub: `src/content/interests/ml.yaml` (pure YAML) or `.md` with frontmatter.
3. Astro validates at build time. Bad YAML or missing required fields fail the build with a clear error — a feature, not a bug.

Routing is your job once: a `[...slug].astro` or per-collection index page that calls `getCollection()` and renders entries. One-time setup.

### Build / deploy

- Local: `npm run dev` (hot reload).
- Build: `astro build` → static HTML in `dist/`.
- Deploy: Netlify, Vercel, Cloudflare Pages, GitHub Pages — all one-liner configs. No server required.

### Theming effort

- Official blog starter and community themes get you to "clean" quickly.
- Typography and layout are component-based (`.astro` files); easy to tweak without learning a theme DSL.
- No client JS required for a content site. Add interactivity only where you want it.

### Fit for a learning-focused personal site

**Strong.** Content-first, fast pages, schema catches authoring mistakes early. The mental model maps cleanly to "YAML page" and "learning log" from the domain glossary. You are not fighting a portfolio-template ecosystem — you build what you need.

**Watch out:** Initial collection + routing setup is ~1–2 hours. After that, adding content is a two-minute file drop.

---

## Eleventy (11ty)

### Adding a new page

- **Global/list data:** `_data/topics.yaml`, `_data/site.yaml` — available everywhere via `{{ topics }}`.
- **Per-page data:** `my-page.11tydata.yaml` next to a template, or frontmatter in markdown.
- **New learning log:** add `src/logs/my-post.md` with YAML frontmatter. Eleventy turns it into a page via your folder structure and permalinks.
- **YAML in `_data`:** not on by default. Add ~5 lines to `.eleventy.js` with `js-yaml` (Eleventy already depends on it via gray-matter).

Data-driven pages (generate a route per YAML item) use pagination or a collection loop in a template — slightly more manual than Astro's `getCollection`, but straightforward.

### Build / deploy

- Local: `npx @11ty/eleventy --serve`.
- Build: outputs to `_site/` (configurable).
- Deploy: any static host. Zero runtime dependencies in production.

### Theming effort

**Highest DIY of the serious options.** Eleventy gives you HTML templates (Nunjucks, Liquid, etc.) and almost nothing else. No polished "personal learning site" starter on par with Astro/Hugo themes. You will spend more time on layout upfront to hit "clean."

Tradeoff: once built, the site is dead simple — no framework upgrades, no hydration, no build-tool drama.

### Fit for a learning-focused personal site

**Good if you value minimalism over speed-to-first-deploy.** Ideal when the site is mostly static HTML, you want YAML everywhere, and you do not need React. Less ideal if you want a nice theme on day one without writing CSS.

---

## Next.js + Contentlayer (and successors)

### Contentlayer status

**Do not start new projects on Contentlayer.** Original package stalled around 2023; community fork `contentlayer2` patches Next.js breakage but the ecosystem has moved on.

**Velite** is the practical successor: Zod schemas, markdown/MDX/YAML → typed JSON at build time, framework-agnostic output. **Content Collections** (Astro-native) solves the same problem if you are not tied to Next.js.

### Adding a new page (Velite + Next.js)

1. Define collections in `velite.config.js` with Zod.
2. Add a markdown file (or YAML) under `content/`.
3. Import generated data in Next.js pages/components.
4. Run Velite alongside Next (`velite dev` + `next dev` in parallel — the webpack plugin does not play nice with Turbopack).

Pure YAML pages work but you still wire routes yourself in React.

### Build / deploy

- Heavier: Node, Next.js, Velite, React — for a site that could be static HTML.
- Vercel is the path of least resistance.
- More config surface: `next.config`, Velite config, TypeScript paths, MDX runtime if you use it.

### Theming effort

**No clean default.** You bring Tailwind, shadcn, or a component library. Looks can be excellent, but it is all bespoke work. Easy to over-build a personal site into a small app.

### Fit for a learning-focused personal site

**Poor default choice.** You get React complexity, larger bundles, and more frequent dependency churn — for content that rarely needs client-side behavior. Only makes sense if you already know Next.js well, want to reuse React components, or plan features that genuinely need a framework (search UI, interactive demos, auth — none of which are in v1 scope).

---

## Hugo

### Adding a new page

- **Standard:** add `content/logs/my-post.md` with YAML frontmatter (Hugo's default).
- **Data-only lists:** put structured YAML in `data/` (e.g. `data/interests/ml.yaml`), access via `.Site.Data` in templates.
- **YAML → pages at scale:** Hugo **content adapters** (`content/something/_content.gotmpl`) can generate one page per YAML/JSON record at build time. Powerful, but Go-template syntax and adapter setup are a learning curve.

Hugo does not treat a random `data/foo.yaml` as a URL automatically — you need a list template or content adapter to materialize pages. Same pattern as Astro/Eleventy, different syntax.

### Build / deploy

- Single Go binary. `hugo server` locally, `hugo` to build → `public/`.
- Fast builds even with thousands of pages.
- Deploy anywhere static. Netlify has native Hugo support.

### Theming effort

- Large theme catalog on themes.gohugo.io — many blog themes, quality all over the map.
- Picking a theme is fast; **customizing** a Hugo theme can be frustrating (opaque partials, hardcoded assumptions).
- For "clean" and "not portfolio," budget time to strip resume sections and demo-project grids from most themes.

### Fit for a learning-focused personal site

**Strong on maintenance, mixed on authoring UX.** Once configured, Hugo sites run for years with little touch. YAML in `data/` is first-class. Go templates are the main tax — fine if you tolerate them, annoying if you do not.

Best when you want zero Node in your life and fast builds. Worst when you want to iterate quickly on layout without reading theme source.

---

## Lighter options worth naming

### Jekyll

- **Add a page:** markdown with YAML frontmatter in `_posts/` or `_pages/`; structured data in `_data/*.yml`.
- **Build/deploy:** `jekyll build`. GitHub Pages supports it natively (no build step on their free tier if you use the default setup).
- **Theming:** many themes; "minimal" blog themes exist. Ruby toolchain is the main friction on modern Macs.
- **Fit:** reasonable if hosting on GitHub Pages and you want the simplest deploy story. Ecosystem feels legacy next to Astro/Hugo. Slow builds as the site grows.

### Zola

- **Add a page:** markdown with **TOML** frontmatter (not YAML — minor mismatch with the stated workflow).
- **Build/deploy:** single Rust binary, very fast.
- **Theming:** smaller theme pool than Hugo.
- **Fit:** fine for a markdown blog; weaker match for "YAML is the contract."

### Quartz

- Digital-garden generator (markdown, wikilinks, graph view). Beautiful defaults for connected notes.
- **YAML fit is weak** — content is markdown-first; config is JSON/YAML but not per-page YAML files.
- **Fit:** great for "second brain" aesthetics, wrong shape if every page must be a YAML file.

### MkDocs Material

- Docs site generator. Nav and metadata in `mkdocs.yml`; pages are markdown.
- **Fit:** if the site reads more like a small manual than a personal blog. Over-structured for a learning log unless you lean heavily into "interest hubs as doc sections."

### Lume (Deno)

- Markdown + YAML frontmatter, simple static site generator.
- Tiny community. Viable but you are on your own for themes and examples compared to Astro/Eleventy/Hugo.

---

## Cross-cutting comparison

### Authoring workflow (two-minute test)

| Stack | New learning log | New interest hub (structured, little prose) |
|-------|------------------|---------------------------------------------|
| Astro | `.md` file + frontmatter in collection folder | `.yaml` or `.md` in collection folder |
| Eleventy | `.md` in content dir | `_data` entry + template, or `.md` with frontmatter |
| Hugo | `.md` in `content/` | `data/` entry + list/single template, or content adapter |
| Velite + Next | `.md` in `content/` | YAML possible; React route wiring required |
| Jekyll | `_posts/YYYY-MM-DD-title.md` | `_data/` + liquid template |

**Winner for pure authoring speed after setup:** Astro or Hugo (markdown + frontmatter). **Winner for pure YAML records:** Astro with a YAML collection, or Hugo `data/` + adapter.

### Build / deploy maintenance (six-month test)

| Stack | Dependency churn | Typical breakage |
|-------|------------------|------------------|
| Astro | Low–medium | Major version bumps (v4→v5) need a morning of migration |
| Eleventy | Low | Almost nothing breaks; Node version bumps |
| Hugo | Very low | Binary upgrade occasionally changes template behavior |
| Next + Velite | High | Next.js, React, Velite, Turbopack/webpack — multiple surfaces |
| Jekyll | Medium | Ruby/Bundler/GitHub Actions |

**Winner:** Hugo or Eleventy for "I forget about the toolchain." Astro is close behind.

### Theming ("clean" without portfolio gimmicks)

| Stack | Time to acceptable | Risk of resume-template vibes |
|-------|--------------------|-------------------------------|
| Astro | Hours (starter + tweaks) | Low — you compose layout |
| Eleventy | Days (unless you clone a good starter) | Low — you control everything |
| Hugo | Hours to pick theme; days to de-portfolio it | **High** — themes assume "developer portfolio" |
| Next + Velite | Days | Medium — you might over-engineer |

**Winner:** Astro for balance. Eleventy if you have strong CSS opinions already.

### Fit for learning-focused site (not hire-me)

What matters: readable long-form, easy chronological lists, topic pages, low chrome, no "projects grid" pressure.

1. **Astro** — content model maps to learning logs and interest hubs; no framework baggage on the page.
2. **Eleventy** — same, but you pay upfront template labor.
3. **Hugo** — excellent runtime, but themes fight you on "not a portfolio."
4. **Quartz** — great vibe for learning, wrong content contract (markdown garden, not YAML pages).
5. **Next.js stack** — solves problems you do not have.

---

## Content shape recommendation (feeds ticket 05)

Regardless of stack, split types by file shape:

| Content type | File shape | Why |
|--------------|------------|-----|
| Learning log | YAML frontmatter + markdown body | You will write paragraphs; YAML alone gets awkward |
| Interest hub | YAML file (title, summary, links, resources) or short markdown | Mostly structured data |
| Site config / nav | YAML in `data/` or a single config file | Edit rarely |

Insist on **schema validation** (Zod in Astro/Velite, or disciplined frontmatter conventions in Eleventy/Hugo). A broken YAML file should fail CI, not render a blank page in production.

---

## Suggested next step (ticket 08)

Prototype the content model in **Astro**:

1. Two collections: `logs` (md + frontmatter), `interests` (yaml).
2. One dynamic route per collection.
3. Use the official blog starter or a minimal theme; strip anything that looks like a portfolio.

If the Astro DX feels heavy, fall back to **Eleventy** with the same folder layout. Do not default to Next.js unless there is a concrete feature that needs React.

---

## Sources

- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/) — YAML/JSON/MD support, Zod schemas, glob loader
- [Eleventy custom data formats](https://www.11ty.dev/docs/data-custom/) — YAML via `addDataExtension`
- [Hugo data sources](https://gohugo.io/content-management/data-sources/) and [content adapters](https://gohugo.io/content-management/content-adapters/)
- [Velite docs](https://velite.js.org/) — Contentlayer replacement
- Contentlayer: stalled; community `contentlayer2` exists but new projects should use Velite or Astro collections
