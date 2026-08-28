---
title: Building my own autodiff module
date: 2025-10-10
summary: Forward and backward passes clicked once I treated every op as a graph node.
tags: [ml, autodiff]
topic: machine-learning
draft: false
---

For SYDE 577 assignment one we couldn't use PyTorch. We had to build autodiff ourselves. I sketched a tiny graph first: two parameters, one multiply, one loss. Each node stores its value, accumulates gradients from children, and implements `forward()` and `backward(grad)`.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" role="img" aria-labelledby="autodiff-diagram-title">
<title id="autodiff-diagram-title">Computational graph for a single training step</title>
<defs>
<marker id="arrow-forward" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
<path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/>
</marker>
<marker id="arrow-backward" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
<path d="M8,0 L0,4 L8,8 Z" fill="currentColor"/>
</marker>
</defs>
<text x="280" y="24" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="13" fill="currentColor">Forward pass</text>
<rect x="24" y="44" width="72" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="60" y="69" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="14" fill="currentColor">W</text>
<rect x="24" y="108" width="72" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="60" y="133" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="14" fill="currentColor">x</text>
<rect x="148" y="76" width="96" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="196" y="101" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="13" fill="currentColor">MatMul</text>
<rect x="296" y="76" width="88" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="340" y="101" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="13" fill="currentColor">ReLU</text>
<rect x="436" y="76" width="88" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="480" y="101" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="13" fill="currentColor">Loss</text>
<line x1="96" y1="64" x2="148" y2="88" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-forward)"/>
<line x1="96" y1="128" x2="148" y2="104" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-forward)"/>
<line x1="244" y1="96" x2="296" y2="96" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-forward)"/>
<line x1="384" y1="96" x2="436" y2="96" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-forward)"/>
<text x="280" y="188" text-anchor="middle" font-family="Source Sans 3, sans-serif" font-size="13" fill="currentColor">Backward pass</text>
<line x1="436" y1="128" x2="384" y2="128" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrow-backward)"/>
<line x1="384" y1="148" x2="296" y2="148" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrow-backward)"/>
<line x1="296" y1="168" x2="196" y2="168" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrow-backward)"/>
<line x1="196" y1="188" x2="96" y2="208" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrow-backward)"/>
<line x1="196" y1="188" x2="96" y2="152" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrow-backward)"/>
<text x="130" y="204" font-family="Source Sans 3, sans-serif" font-size="11" fill="currentColor">dW</text>
<text x="130" y="148" font-family="Source Sans 3, sans-serif" font-size="11" fill="currentColor">dx</text>
<text x="248" y="144" font-family="Source Sans 3, sans-serif" font-size="11" fill="currentColor">dL/dz</text>
<text x="400" y="144" font-family="Source Sans 3, sans-serif" font-size="11" fill="currentColor">dL/da</text>
<text x="500" y="144" font-family="Source Sans 3, sans-serif" font-size="11" fill="currentColor">1</text>
</svg>
<figcaption>Forward values flow left to right. Gradients accumulate on the way back.</figcaption>
</figure>

Matrix multiply's backward pass took the longest. Grad w.r.t. both `W` and `x`. Once that worked, stacking activations and a simple trainer was mechanical. PyTorch hides a lot of bookkeeping.

Code: [SYDE577-A1-Autodifferentiation](https://github.com/Josiah-Lam/SYDE577-A1-Autodifferentiation).
