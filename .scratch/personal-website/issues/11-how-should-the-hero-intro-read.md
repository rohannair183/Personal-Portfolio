# How should the hero intro read?

Type: grilling
Status: resolved
Blocked by: —

## Question

`home.yaml` stores the intro as a YAML block scalar with line wraps. `index.astro` splits on `\n` and renders each non-empty line as its own `<p>`, which produces the awkward breaks you saw ("studying," alone on a line, big gaps).

How should it read?

1. **One paragraph** — reflow wraps in YAML; render as a single `<p>` (recommended for this copy).
2. **Two paragraphs** — intentional break after the first sentence ("…pulling on.") for rhythm.
3. **Structured fields** — split intro into separate YAML keys (e.g. `intro_lead`, `intro_hiring`) for layout control.

Also: keep the `<h1>` as your name next to the photo, or drop it since the header/title already identify you?

## Comments

## Answer

- **One paragraph:** render `intro` as a single `<p>`; YAML line wraps are authoring convenience only, not paragraph breaks.
- **Keep `<h1>`** with name next to photo — primary on-page identity once header brand is removed.
