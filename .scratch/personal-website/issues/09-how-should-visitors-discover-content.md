# How should visitors discover content?

Type: grilling
Status: resolved
Blocked by: —

## Question

The prototype home page puts a gwern-style topic index and a "Recently updated" sidebar on the same row. You said navigation is hard to follow and content discovery needs to be more intuitive.

What should a stranger use as their **primary** path into your writing?

React to these (pick, combine, or reject):

1. **Single-column stack** — hero, now strip, recently updated (full width), then topic index below. No side-by-side.
2. **Feed-first** — recently updated is the main body; topic index demoted or removed from home.
3. **Topic-first** — MOC/topic hubs stay primary; recently updated is a small footer strip.
4. **Type-based nav** — add top-level sections (Logs, Essays, Projects, Maps) with index pages; home becomes a lighter landing.
5. **Hybrid** — one prominent "start here" block (e.g. ML MOC + latest log) plus a shorter list of everything else.

Also: should "Recently updated" and the topic index **both** live on the home page, or should one move elsewhere?

## Comments

## Answer

**Type-based nav + recently updated on home.**

- Add index pages at `/logs`, `/essays`, `/projects`, `/maps` — each lists all entries of that type, newest first, with title, date, and summary/description.
- **Home becomes lighter:** hero + recently updated (full width, single column). Remove the gwern-style topic index from home; topic discovery moves to the Maps index and individual MOC pages.
- **Recently updated stays on home** as the main content-discovery surface for repeat visitors and hiring managers scanning what's fresh.
- `topic_index` in `home.yaml` is no longer rendered on home (can be removed from YAML or left unused).
