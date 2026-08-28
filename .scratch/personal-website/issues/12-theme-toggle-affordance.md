# Theme toggle affordance

Type: grilling
Status: resolved
Blocked by: —

## Question

The header shows a button labeled **"Theme"**. You want a **moon/sun icon** instead.

Confirm:

1. **Icon only** — no visible text; `aria-label` for accessibility (e.g. "Switch to dark mode" / "Switch to light mode").
2. **Which icon set** — inline SVG (no dependency), or a small icon library?
3. **Default** — still respect `prefers-color-scheme` and `localStorage`, unchanged?

## Comments

## Answer

- **Icon only** with dynamic `aria-label` ("Switch to dark mode" / "Switch to light mode").
- **Inline SVG** — moon when in light mode (click to go dark), sun when in dark mode (click to go light). No icon library.
- **Behavior unchanged:** `prefers-color-scheme` on first visit, `localStorage` thereafter.
