# v1 scope

Type: grilling
Status: resolved
Blocked by: 04, 05, 06

## Question

What ships in v1 vs what waits? Aim for something you can publish in a weekend once the spec is done.

Propose a minimal slice: which routes exist, how many example YAML entries you'll seed, and what you explicitly defer (RSS, dark mode, search, about page polish, etc.).

## Comments

## Answer

**In v1:**

- All routes: `/`, `/now`, `/reading`, `/resume.pdf`, `/logs/*`, `/essays/*`, `/mocs/*`, `/projects/*`
- Seed content: 1 log, 1 essay, 1 MOC, 1 project (prototype examples), plus `now.yaml` and `reading.yaml`
- Placeholder photo + resume PDF (swap for real files later)
- Monochrome styling with **dark mode toggle** (light/dark, both grayscale)
- **Client-side search** across logs, essays, MOCs, and projects (title + summary)
- Nav with resume PDF link

**Defer to post-v1:**

- RSS feed
- Analytics
- Separate about page (home intro is enough for now)
- Tag index pages
- SEO polish beyond basic meta tags

**Target:** publishable in a weekend once real intro copy, photo, and resume are in place.
