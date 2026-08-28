# YAML content model (prototype)

Stack assumption: Astro content collections + `src/data/` for site config.

## Folder layout

```
content/
  logs/           # .md + YAML frontmatter
  essays/         # .md + YAML frontmatter
  mocs/           # .yaml
  projects/       # .yaml
  now.yaml        # single file, edit in place
  reading.yaml    # single file, edit in place
src/data/
  home.yaml       # intro copy, photo path, topic index sections
  nav.yaml        # top nav links
public/
  images/rohan.jpg
  resume.pdf
```

## Formats by type

| Type | Format | Add new entry |
|------|--------|---------------|
| Learning log | `.md` + frontmatter | New file in `content/logs/` |
| Essay | `.md` + frontmatter | New file in `content/essays/` |
| MOC | `.yaml` | New file in `content/mocs/` |
| Project | `.yaml` | New file in `content/projects/` |
| Now | `content/now.yaml` | Edit the one file |
| Reading list | `content/reading.yaml` | Edit the one file |
| Resume | `public/resume.pdf` | Replace the PDF; nav link in `nav.yaml` |

Logs and essays use markdown with YAML frontmatter (option A). Everything else is pure YAML except resume, which is a hosted PDF.

## Schemas

### Learning log (`content/logs/*.md`)

```yaml
---
title: string          # required
date: YYYY-MM-DD       # required
summary: string        # required, one line for index cards
tags: string[]         # optional
moc: string            # optional, slug of parent MOC
draft: false           # optional, default false
---
```

Body: markdown.

### Essay (`content/essays/*.md`)

Same as learning log. Folder separates short logs from longer writes.

### MOC (`content/mocs/*.yaml`)

```yaml
title: string          # required
slug: string           # required, URL segment
description: string    # optional, shown on hub page
links:                 # required, at least one
  - type: log | essay | project | external
    slug: string       # for internal types
    label: string      # optional override
    url: string        # for external only
```

### Project (`content/projects/*.yaml`)

```yaml
title: string          # required
slug: string           # required
date: YYYY-MM-DD       # required
description: string    # required
url: string            # optional, repo or demo
moc: string            # optional
tags: string[]         # optional
```

### Now (`content/now.yaml`)

```yaml
updated: YYYY-MM-DD    # required
focus: string[]        # required, bullet list for home page strip
```

### Reading list (`content/reading.yaml`)

```yaml
updated: YYYY-MM-DD    # required
items:
  - title: string      # required
    type: book | paper | article | video | other
    status: reading | finished | queued
    url: string        # optional
    note: string       # optional, one line
```

### Home (`src/data/home.yaml`)

```yaml
name: Rohan Nair
photo: /images/rohan.jpg
intro: |
  Multi-line intro paragraph. Learning-first, hiring-manager friendly.
topic_index:         # gwern-style grouped links
  - title: string
    links:
      - label: string
        href: string
tagline: string        # optional, one line under name
```

### Nav (`src/data/nav.yaml`)

```yaml
links:
  - label: string
    href: string
```

## Recently updated

Derived at build time: sort all logs, essays, projects, and MOCs by `date` or `updated`, take the last 5. No separate YAML file.

## Search (v1)

Build a client-side index from `title` + `summary` on logs, essays, MOCs, and projects. Pagefind or a lightweight Astro integration is fine. No external search service.

## Dark mode (v1)

Toggle in nav or corner. Light and dark themes, both monochrome. No accent colors in either theme.

## Example files

See sibling files in this `prototype/` directory.
