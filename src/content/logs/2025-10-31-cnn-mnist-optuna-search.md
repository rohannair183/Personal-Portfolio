---
title: Searching CNN architectures with Optuna instead of guessing
date: 2025-10-31
summary: Kernel size, dilation, depth, and augmentation all in one search space. The winner surprised me.
tags: [ml, pytorch, optuna, cnn]
topic: machine-learning
draft: false
---

Assignment two was simple to state: beat 99% test accuracy on MNIST. I started with the boring baseline, a three-layer MLP on flattened pixels, to get the training loop and metrics right before touching convolutions. It landed in the high 97s, which is about what you'd expect from a network with no notion of spatial structure.

The CNN needed more than a fixed architecture, so I wrote `FlexibleConvNet`: number of conv layers, kernel size, dilation, optional pooling, and dropout all as constructor arguments, with padding computed from dilation so the spatial size stays predictable regardless of what the search picks. That let Optuna treat architecture choice as part of the hyperparameter space instead of something I picked by hand and hoped was right.

The search ran five trials with a median pruner cutting off runs that fell behind by epoch two or three, which mattered because a 6-layer, 5x5, dilation-2 network burns real time per trial. Two trials got pruned early. The best one wasn't the biggest: 4 conv layers, a 7x7 kernel, dilation 1, no pooling, dropout around 0.084, hit 99.25% validation accuracy in 10 epochs. A deeper, more dilated network with a larger effective receptive field actually did worse, at 98.32%. Wider input coverage isn't automatically better once training time and pruning enter the picture.

I'd assumed depth would win. It didn't, and the search caught that before I'd have caught it by hand.
