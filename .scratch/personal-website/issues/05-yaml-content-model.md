# YAML content model

Type: prototype
Status: resolved
Blocked by: 04

## Question

Once content types are chosen, sketch the YAML shape for each type: required fields, optional fields, and one example file per type that would feel good to write in.

Should blog-like entries be YAML only, YAML + markdown body, or markdown with YAML front matter? Optimize for "I can add a new page in two minutes."

## Comments

## Answer

**Logs and essays:** markdown with YAML frontmatter (option A).

**Everything else:** pure YAML in `content/` (`mocs/`, `projects/`, `now.yaml`, `reading.yaml`).

**Resume:** hosted PDF at `public/resume.pdf`, linked from nav. Not YAML content.

**Site config:** `src/data/home.yaml` (intro, photo, gwern-style topic index) and `src/data/nav.yaml`.

**Recently updated:** derived at build time from dates across content types. No separate file.

Full spec + examples: [content-model.md](../prototype/content-model.md) and [prototype/examples/](../prototype/examples/).
