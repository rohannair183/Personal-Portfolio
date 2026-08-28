# YAML-friendly static site options

Type: research
Status: resolved

## Question

What stacks make it easy to add pages and blog-like entries from YAML (or YAML + markdown) in a git repo, with a clean default theme and low maintenance?

Compare at least: Astro content collections, Eleventy data files, Next.js + contentlayer (or successor), Hugo data/templates, and any lighter options worth naming. For each: how you add a new page, build/deploy story, theming effort, and fit for a learning-focused personal site.

## Comments

## Answer

**Astro** is the best default: native YAML/markdown content collections, schema validation, clean starters, low upkeep. **Eleventy** wins on minimalism if you'll write templates; **Hugo** wins on zero-Node maintenance but themes skew portfolio. Skip Contentlayer (dead) and Next.js + Velite unless you need React — overkill for a YAML-driven learning site.

Full comparison: [yaml-static-site-options.md](../research/yaml-static-site-options.md)
