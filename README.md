# Rohan Nair — personal site

Astro site with YAML-driven content. Gwern-style topic index, monochrome, dark mode, client-side search.

## Run locally

```bash
nvm use
npm install
npm run dev
```

Search only works after a production build (`npm run build && npm run preview`).

## Add content

| Type | Where | Format |
|------|-------|--------|
| Learning log | `src/content/logs/` | `.md` + YAML frontmatter |
| Essay | `src/content/essays/` | `.md` + YAML frontmatter |
| MOC | `src/content/mocs/` | `.yaml` |
| Project | `src/content/projects/` | `.yaml` |
| Now | `src/data/now.yaml` | edit in place |
| Reading list | `src/data/reading.yaml` | edit in place |
| Home copy / topic index | `src/data/home.yaml` | edit in place |
| Nav | `src/data/nav.yaml` | edit in place |
| Photo | `public/images/rohan.svg` | replace with your photo |
| Resume | `public/resume.pdf` | replace with your PDF |

See `.scratch/personal-website/prototype/content-model.md` for field schemas.

## Stack

- Astro 7
- Source Serif 4 + Source Sans 3 (same families as [gwern.net](https://gwern.net/))
- Pagefind for search
- Deploy to Vercel or Netlify
