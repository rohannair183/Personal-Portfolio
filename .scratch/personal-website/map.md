# Personal website

Labels: wayfinder:map

## Destination

A build-ready spec for rohannair.com (or equivalent): what the site is for, what content types it holds, how YAML files become pages, how the home page shows that you love to learn, and which stack to use. Clear enough that the next session can scaffold without reopening the big questions.

**Status: route clear.** All decision tickets closed. Next step is implementation.

## Notes

- Owner: Rohan Nair. LinkedIn: https://www.linkedin.com/in/rohan-nair-108771212/
- Voice: apply unslop to all site copy and spec text.
- Content via YAML files in-repo, not a CMS. Adding a page should mean adding or editing a YAML file.
- Visual bar: clean, monochrome, dark mode supported. Learning and interests over resume polish.
- Stack: Astro. Deploy to Vercel or Netlify.
- Spec artifacts: [content-model.md](.scratch/personal-website/prototype/content-model.md), [prototype/examples/](.scratch/personal-website/prototype/examples/), [research/yaml-static-site-options.md](.scratch/personal-website/research/yaml-static-site-options.md)
- Skills: grilling, domain-modeling, prototype, research as ticket types dictate.
- Tracker: local markdown under `.scratch/personal-website/`.

## Decisions so far

- [YAML-friendly static site options](.scratch/personal-website/issues/03-yaml-static-site-research.md): Astro first; Eleventy or Hugo if you want thinner or Node-free; skip Next.js/Contentlayer for this site.
- [Who is the site for?](.scratch/personal-website/issues/01-who-is-the-site-for.md): Hiring managers first, future you second. Learning-log tone, not hire-me marketing. LinkedIn holds credentials; this site shows how you think.
- [What does clean look like?](.scratch/personal-website/issues/02-what-does-clean-look-like.md): Gwern-style simplicity and topic index; Steven Gong-style MOC/map of notes. Monochrome. Your photo on the home page.
- [What content types belong on the site?](.scratch/personal-website/issues/04-what-content-types.md): All seven types in v1 (logs, MOCs, essays, projects, now, reading list, resume PDF). Sporadic updates. YAML-only authoring, no Obsidian.
- [YAML content model](.scratch/personal-website/issues/05-yaml-content-model.md): Logs/essays = md + frontmatter; MOCs, projects, now, reading = pure YAML; resume = PDF; home/nav in `src/data/`. See [content-model.md](.scratch/personal-website/prototype/content-model.md).
- [Home page: show that you love to learn](.scratch/personal-website/issues/06-home-page-learning.md): Photo + intro, now strip, gwern topic index, small recently-updated list. Resume in nav only. Takeaway: curious and organized.
- [v1 scope](.scratch/personal-website/issues/07-v1-scope.md): All routes + seed content + dark mode + client-side search in v1. Defer RSS, analytics, about page, tag indexes.
- [Pick a stack](.scratch/personal-website/issues/08-pick-a-stack.md): Astro on Vercel or Netlify.

## Not yet specified

- Typography specifics (monochrome is set; font choices are not)
- Deployment host (Vercel vs Netlify)
- RSS, SEO beyond basic meta, analytics (deferred)
- About page: folded into home intro for v1
- Social links beyond LinkedIn

## Out of scope

- Admin UI or headless CMS (YAML in git is the workflow)
- Obsidian sync, vault export, or graph view from a notes app
- Comments or discussion threads
- Auth-gated content
- E-commerce or paid content
