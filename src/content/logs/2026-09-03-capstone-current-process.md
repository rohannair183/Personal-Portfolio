---
title: Where NoteWorthy stands, and where LLMs actually help
date: 2026-09-03
summary: The pipeline is stable now. The interesting open question is which parts of it should stay LLM-driven.
tags: [capstone, llm, healthcare]
topic: capstone
draft: false
---

NoteWorthy is our MSE capstone for a pediatric speech-language clinic. The high-level shape has settled by now, so it's worth writing down what actually runs day to day, and being honest about which parts of it lean on an LLM versus which parts don't need one.

The process starts with raw session notes, unstructured text a clinician wrote after each appointment. A YAML signal registry defines what we want to pull out of them: `num_baseline_goals`, progress metrics, discharge readiness indicators, each one scoped to a specific window of sessions so a signal can't accidentally read data from after the point we're predicting at. Extraction jobs run in batches on Compute Canada, one signal at a time across the note corpus, and write per-session and per-client rows. Those get published to Supabase, where two frontends read from the same tables: a Streamlit app for the team running extractions and checking job state, and a Next.js clinic dashboard for the people who just want a caseload view with utilization numbers.

That's the whole loop: notes in, structured signals out, predictions on top of the signals, dashboards on top of the predictions.

The LLM's job in that loop is narrow and it should stay narrow. It reads a note and returns a value for one signal, guided by the registry's definition of what that signal means. It is not deciding what a client needs or making a clinical call. It's doing the specific thing LLMs are actually good at: turning a paragraph of prose into a number or a category, faster and more consistently than a person skimming a chart would.

Where I think LLMs could do more, and mostly haven't yet, is upstream of extraction. Writing a new signal definition today means someone reads a pile of notes, notices a pattern, and hand-writes a YAML entry describing it. An LLM could draft that first pass from a handful of example notes, cutting the time from "we noticed a pattern" to "we have a testable signal." The other underused spot is validation. Right now a signal's quality gets checked by comparing extracted values against a small hand-labeled set. An LLM-as-judge pass, scoring extractions against the same clinical reasoning we'd use to grade an assignment, could catch bad signals before they poison a downstream model, instead of after.

What I wouldn't hand to an LLM is anything touching the leakage windows or the prediction targets themselves. Those need to stay deterministic and auditable, because a clinic making staffing decisions off this data needs to trust the number, not just the story behind it.
