# What belongs in the site header?

Type: grilling
Status: resolved
Blocked by: —

## Question

Today the header has **"Rohan Nair"** (links home) plus nav links starting with **"Home"** — redundant. The hero also shows your name as `<h1>`.

You said you want just **Home**, not both. Pin down the full header:

1. **Brand slot** — remove "Rohan Nair" from header entirely? Replace with "Home" only? Or non-clickable name with separate Home link?
2. **Nav links** — keep current set (Home, Now, Reading, Resume) or reshape once content discovery is decided (e.g. add Logs, Essays)?
3. **Search + theme** — keep both in header tools on the right?

Your name still appears in the hero and `<title>` either way.

## Comments

## Answer

- **Remove "Rohan Nair" brand link** from header entirely. No separate brand slot.
- **Nav links (left to right):** Home · Logs · Essays · Projects · Maps · Reading · Resume (Now removed — home strip links to `/now`)
- **Header tools (right):** search input + theme icon toggle, unchanged position.
- Name appears in hero `<h1>` and in `<title>` only.
