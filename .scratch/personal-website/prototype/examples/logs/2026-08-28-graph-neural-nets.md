---
title: Graph neural networks, day one
date: 2026-08-28
summary: Message passing finally clicked after I drew the graph on paper.
tags: [ml, graphs]
moc: machine-learning
draft: false
---

I spent an hour on the Distill article about GNNs. The part that stuck: each node aggregates messages from its neighbors, then updates itself. I kept getting lost in the matrix notation until I sketched a three-node graph and walked through one round by hand.

Still fuzzy on how many layers you need before over-smoothing kicks in. Next step: implement the simplest possible GNN on Zachary's karate club.
