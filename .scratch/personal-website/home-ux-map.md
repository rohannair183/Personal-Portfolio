# Home page UX refinement

Labels: wayfinder:map

## Destination

A build-ready home page and navigation spec: header, hero intro, and content-discovery layout that a hiring manager can scan in under a minute without duplicate links, broken intro copy, or a confusing two-column index. Clear enough that the next session can implement without reopening IA questions.

**Status: route clear.** All decision tickets closed. Ready to implement.

## Notes

- Builds on the closed [Personal website](map.md) map (content types, monochrome, Astro stack).
- Prototype lives in `src/` — react to what's running, not the old scratch examples.
- Primary audience unchanged: hiring managers who should see curiosity and organized learning.
- Visual bar unchanged: monochrome, text-first, photo on home.
- Skills: grilling, domain-modeling, prototype as ticket types dictate.
- Tracker: local markdown under `.scratch/personal-website/`.

## Decisions so far

- [How should visitors discover content?](issues/09-how-should-visitors-discover-content.md): Type-based nav with `/logs`, `/essays`, `/projects`, `/maps` index pages. Home: hero → now strip → recently updated (single column). Topic index removed from home.
- [What belongs in the site header?](issues/10-what-belongs-in-the-site-header.md): No brand link. Nav: Home · Logs · Essays · Projects · Maps · Reading · Resume. Search + theme icon on the right. Now is not in nav.
- [How should the hero intro read?](issues/11-how-should-the-hero-intro-read.md): Single `<p>` for intro; keep `<h1>` name in hero.
- [Theme toggle affordance](issues/12-theme-toggle-affordance.md): Inline SVG moon/sun, icon-only, same persistence behavior.
- [Does the now strip stay on home?](issues/13-does-now-strip-stay-on-home.md): Yes — hero → now strip → recently updated. `/now` linked from strip only.

## Not yet specified

- Mobile nav pattern with 7 nav links (wrap vs hamburger)
- Footer content beyond copyright

## Out of scope

- Typography or font changes (monochrome palette is set)
- Search implementation changes
- New content types or CMS workflow
- RSS, analytics, about page (deferred from v1 map)
- Renaming `/mocs/[slug]` routes to `/maps/[slug]` (nav label is "Maps"; individual MOC URLs can stay `/mocs/…` for now)
