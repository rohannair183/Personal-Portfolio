# Domain glossary

Terms for Rohan Nair's personal website effort. Implementation-free.

## Primary audience

Hiring managers. They should see curiosity and active learning, not a classic portfolio pitch.

## Secondary audience

Future Rohan. The site is a public notebook you can search and revisit later.

## Learning log

A short post about what you're studying: what you tried, what clicked, open questions. Lighter than an essay.

## Essay

A longer, deeper write on one topic. Gwern-style: more polished than a learning log, still in your voice.

## Map of content (MOC)

A topic hub page that links to related notes, essays, and projects. Defined in YAML, not imported from Obsidian.

## Now page

A standing page listing what you're focused on this month. Updated sporadically.

## Reading list

What you're reading or watching now. YAML-defined entries, not a separate app.

## Project

Something you built. Description, links, maybe tie-in to a learning log.

## Resume

A PDF hosted at `/resume.pdf`, linked from nav. Not YAML-defined work history.

## YAML page

Any route backed by a YAML file (or markdown with YAML frontmatter) in the repo. Adding a page means adding a file. No CMS, no Obsidian sync.

## Home page

Photo and intro at top. Now strip below. Gwern-style topic index as the main body. Small recently-updated list at the bottom. Resume link lives in nav, not the hero.

## Clean

Monochrome palette in both light and dark mode. Gwern-style simplicity: text-first, topic-grouped index, no portfolio gimmicks. Home page includes your photo. MOC structure inspired by Steven Gong's site, without Obsidian integration.

## Search

Client-side search in v1. Indexes titles and summaries across logs, essays, MOCs, and projects. Build-time index, no external service.

## Stack

Astro. Content collections for prose, YAML for structured pages, static deploy.
