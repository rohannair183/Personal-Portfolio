---
title: One record per client, with leakage windows
date: 2026-07-11
summary: Each signal declares which sessions it can see. Prediction re-applies that at every cutoff.
tags: [capstone, llm, signals]
topic: capstone
draft: false
---

Early on I tried rolling a client's full note history into one feature vector. It felt natural until we started scoring signals as predictors of `total_sessions`. Features that peeked at late-session language looked great in backtests and useless in production.

The fix: every signal in `signals.yaml` declares its own session window. `num_baseline_goals` might read only the first session. A progress metric might read sessions 1 through k at prediction time k. We deliberately skipped a per-client roll-up CSV because aggregating the whole history ignores those windows.

Extraction still writes per-session rows for plotting trends. Client-level assessment rows hold pre-block clinical summaries. When we evaluate predictors, the pipeline re-applies client signals at each cutoff instead of trusting a single frozen aggregate. Tedious to implement. Hard to cheat.
