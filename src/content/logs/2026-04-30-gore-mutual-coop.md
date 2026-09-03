---
title: Four months as a data engineer at Gore Mutual
date: 2026-04-30
summary: Insurance pipelines fail in boring, specific ways. Most of my co-op was making those failures loud instead of silent.
tags: [data-engineering, databricks, coop]
topic: data-engineering
draft: false
---

I spent January through April 2026 on the data engineering team at Gore Mutual in Cambridge, working on the Databricks pipelines that feed the rest of the company's reporting. Insurance data is not exciting to look at. Policies, claims, entities that have to reconcile against each other across a dozen source systems. What I learned there wasn't about the domain. It was about what happens when a pipeline fails quietly.

That was the first real problem I got handed: pipelines were failing, but the failures showed up as a wrong number in a downstream report weeks later, not as an alert anyone saw. I built a failure-handling module that aggregates errors at the table level and enforces validation on the entities that actually matter, so a broken critical field stops the pipeline instead of flowing through silently. Rolled out across more than ten pipelines, it cut failures by 80%. The number is satisfying, but the real change was cultural. People stopped finding out about data problems from a business analyst asking why a number looked off.

The second piece was less dramatic and more useful long-term: a config-based transformation layer so new datasets could be onboarded by writing configuration instead of another slab of inline SQL. Every pipeline before that was its own bespoke script, which meant every bug fix had to be re-learned per pipeline. Standardizing that pattern was slower to build than just writing the SQL for the next dataset, and I had to convince a couple of people it was worth the upfront cost. It was.

I also spent a chunk of time on something nobody asks about in interviews: slow tests. Our CI suite for the pipeline modules had ballooned to the point where nobody wanted to run it locally. Optimizing the slowest tests bought back two hours of CI/CD runtime a day, which sounds small until you multiply it by every person who touches that repo, every day.

What stuck with me is that data engineering, at least in an org this size, is mostly a trust problem. The pipeline being correct matters less than someone finding out fast when it isn't.
