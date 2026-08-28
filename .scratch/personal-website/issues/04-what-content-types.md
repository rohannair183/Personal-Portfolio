# What content types belong on the site?

Type: grilling
Status: resolved
Blocked by: 01

## Question

Besides your name, what *kinds* of things do you want to publish? Check all that apply and say which are v1 vs later:

- **Learning log** — short posts on what you're studying and what clicked
- **Longer essays** — occasional deeper writes
- **Interest hubs** — standing pages per topic (e.g. "ML", "music") that link out or summarize
- **Reading / watching list** — what you're consuming now
- **Projects** — things you built, even small
- **Now page** — what you're focused on this month (à la nownownow)
- **Resume / work history** — even if de-emphasized
- **Something else** — describe it

How often do you expect to add something new (weekly, monthly, sporadic)? That affects how prominent "latest" should be on the home page.

## Comments

## Answer

**All of these ship in v1:**

| Type | Role on site |
|------|----------------|
| Learning log | Short posts on what you're studying |
| Maps of content (MOCs) | Topic hub pages linking related notes |
| Longer essays | Deeper gwern-style writes |
| Projects | Things you built |
| Now page | What you're focused on this month |
| Resume / work history | On-site, not just a LinkedIn link |
| Reading / watching list | What you're consuming |

**Cadence:** sporadic updates. Home page should not assume a steady stream of new posts. Lead with durable structure (topic index, MOCs) over a "latest" feed.

**Authoring:** YAML only in the site repo. No Obsidian sync or vault export. MOCs are YAML-defined hub pages, not imported from a notes app.
