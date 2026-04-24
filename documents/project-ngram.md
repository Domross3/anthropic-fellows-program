# N-gram Language Model — Early Research

## Context
S-STEM Scholars Program, University of Michigan — May 2023.
Presented at the national S-STEM Scholars Meeting in Washington, D.C. representing the University of Michigan.

## What I Built
An n-gram statistical language model with Markov-chain sampling, implemented in Python. Trained on lyric and literary corpora; ran empirical comparisons across n values (unigram through pentagram) and across training sets with different levels of grammatical polish.

## Finding
Output coherence was materially more sensitive to the grammatical quality of training data than to model order. Raising n beyond ~3 had diminishing returns once the corpus was clean; dirty input hurt the model regardless of n.

## Why It's Here
This was my first piece of real NLP research and my first conference-style presentation. The intuition about data quality over model complexity is one I've carried into later AI work.

## Links
- Presentation: S-STEM Scholars national meeting, Washington D.C.
