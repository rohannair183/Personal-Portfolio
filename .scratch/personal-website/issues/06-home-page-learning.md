# Home page: show that you love to learn

Type: grilling
Status: resolved
Blocked by: 01, 04

## Question

The home page should make "I love to learn" obvious without sounding like a LinkedIn headline. How should it do that?

Options to react to (pick, combine, or reject):

- A short manifesto paragraph in your voice
- "Currently learning" / "Recently figured out" sections fed from YAML
- Latest posts front and center
- Interest tags that drill into topic pages
- A timeline or garden-style map of threads you're following
- Almost no copy — let the content list speak

What is the one thing a stranger should remember about you after 10 seconds on the home page?

## Comments

## Answer

**Layout (top to bottom):**

1. Photo + intro paragraph
2. Now strip (from `content/now.yaml`)
3. Gwern-style topic index (from `src/data/home.yaml`, links to MOCs, essays, projects)
4. Recently updated (last 5 entries, build-time derived)

**Nav:** Resume as PDF link. Not in the hero.

**10-second takeaway:** This person is curious and organizes what they learn.
