---
title: Two UIs for two audiences
date: 2026-07-30
summary: Streamlit for the team running extractions. Next.js for clinicians who just want the caseload.
tags: [capstone, ui]
topic: capstone
draft: false
---

NoteWorth split into two surfaces pretty quickly. The ops side edits the signal registry, submits SLURM jobs to Narval, tails logs, and publishes CSVs to Supabase. That lived in Streamlit first because we needed it working before we cared how it looked.

Clinicians do not want registry YAML or cluster job state. They want a caseload: one row per client, columns driven by `dashboard.yaml`, click through to grouped stat tiles with units and which direction is clinically better. We moved that to FastAPI plus a Next.js frontend (`clinic/api` and `clinic/web`). Fixtures ship in the repo so a fresh clone runs with no extraction output and no API key.

I spent a chunk of July porting the patient-insights view from Streamlit to React and wiring Compute Canada job submission so extraction runs on the cluster while publishing happens back on a laptop with `SUPABASE_DB_URL`. The ugly part is keeping partial runs from overwriting good tables. SLURM state and row-count guards do most of that work.
