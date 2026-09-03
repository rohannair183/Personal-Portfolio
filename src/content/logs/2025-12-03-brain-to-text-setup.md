---
title: Setting up the brain-to-text pipeline
date: 2025-12-03
summary: An HDF5 dataloader and a swappable encoder so the team could test models without touching the training loop.
tags: [ml, pytorch, ctc]
topic: machine-learning
draft: false
---

The SYDE 577 final project decodes neural recordings into text. Each session ships as HDF5: `input_features` is a `[T, F]` float array per trial, `seq_class_ids` is the matching phoneme sequence. Variable-length trials, variable-length labels. That combination decided most of the setup before any modeling happened.

I built the dataloader first. `BrainDataset` reads a session folder and hands out `(features, phoneme_ids)` pairs; a custom collate function pads both to the batch max and returns lengths alongside the padded tensors, which CTC loss needs to know where real data ends and padding starts. Getting the padding and length bookkeeping right up front meant nobody on the team had to think about it again.

The model side is one `RecurrentModel` class with a `model_type` flag: LSTM, GRU, or plain RNN, all sharing the same forward signature and CTC head. A separate `TransformerEncModel` swaps in when someone wants attention instead of recurrence. Both output `[B, T, C]` logits, so plugging in a new architecture, including a teammate's CNN front-end, means writing a module with that same shape contract and dropping it into the existing training loop. Nobody has to touch the loss function or the loader.

Most of the tuning happened in a `CFG` class: batch size, epochs, learning rate, transformer heads, whether to apply temporal masking as augmentation. Centralizing it there made runs reproducible without a separate experiment-tracking setup, which was the right amount of infrastructure for a project with a hard deadline and four people running experiments in parallel.
