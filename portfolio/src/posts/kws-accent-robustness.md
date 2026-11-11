Keyword spotters are the small models that listen for "yes", "stop" or "left" on a device. The standard benchmark for them, Google's Speech Commands, was crowd-sourced through a web page that never asked anyone about their accent, and it's generally assumed to be mostly native English. A model can look great on its test set and still fail the people it's meant to serve. I wanted to know how much worse one does for Serbian-accented speakers, and what it takes to fix it.

So I trained a small CNN on Speech Commands, recorded 19 Serbian-accented speakers saying the same ten words, and compared two cheap fixes: training-time augmentation and few-shot fine-tuning. The short version:

- **The gap is smaller than I expected.** Accuracy on the ten words drops from 0.964 to 0.945, but with 19 speakers that 1.9-point gap is not statistically distinguishable from zero, and two speakers account for most of it.
- **The errors are different, though.** On accented speech the model mostly doesn't confuse words. It rejects them as "some other word".
- **Augmentation doesn't help. Fine-tuning on 50 clips does:** +1.0 point on unseen speakers, in all 9 runs, at no cost on the original test set.

Code, run logs and a longer technical report are on [GitHub](https://github.com/vasicm4/kws-accent-robustness).

## The model

The task is the standard 12-class version of Speech Commands: the ten command words (`yes no up down left right on off stop go`), `_unknown_` for the other 25 words in the dataset, and `_silence_`. Each 1-second clip becomes a 40 × 101 log-mel spectrogram, and the model is deliberately small:

```
log-mel 40×101
  → conv 3×3, 16  → BN → ReLU → maxpool 2×2
  → conv 3×3, 32  → BN → ReLU → maxpool 2×2
  → conv 3×3, 64  → BN → ReLU → maxpool 2×2
  → conv 3×3, 128 → BN → ReLU
  → global average pool → dropout 0.3 → linear → 12 classes

98,940 parameters
```

It trains on my laptop's CPU (a Ryzen 7 7735HS) in about 11 minutes: AdamW, one epoch of warmup, cosine decay over 30 epochs, keeping the checkpoint with the best validation macro-F1. The only hyperparameter I really tuned was the peak learning rate. 3e-3 beat 1e-3 by 0.65 validation F1 points over three seeds, and the final model reaches 0.961 macro-F1 on the official test set.

### Where the training time went

I assumed the bottleneck would be computing log-mel features on the fly. Profiling said otherwise. With four data-loader workers, waiting for data was about **2%** of an epoch. The backward pass was 63% of every step, and the convolution backward kernel alone was 28%.

The surprising part was the first block. It took ~29 of the ~44 ms of a forward pass while doing about 4% of the FLOPs, because it's the only layer working on the full-resolution 16 × 40 × 101 map, so its BatchNorm, ReLU and pooling are bound by memory, not compute. Two fixes:

| Change | Epoch time | Kept? |
|---|---|---|
| Baseline | ~27.5 s | — |
| `channels_last` weights | −17% | Yes, now the default |
| Stride-2 first convolution, on top | another −32% | No: −0.35 val F1 points over 3 seeds |

I wrote the decision rule for the strided stem down before running its extra seeds (adopt it if it costs at most 0.2 points), and it missed. It stays available as an option for when speed matters more. `torch.compile` gave nothing on top of `channels_last` and complicated checkpointing and the ONNX export, so it went too.

## Recording the accented set

There's no public dataset of Serbian-accented English commands, so I made one. 19 people recorded themselves on their own phones reading the ten words in a fixed order, 16 of them three times and 3 once: 510 clips. Everyone signed a consent form, in Serbian, covering recording, storage, use and the right to withdraw. Speakers are only `spk01` to `spk19`, and the audio isn't published, only aggregate results.

The recordings arrived as phone voice memos and WhatsApp voice notes, so a script cuts them into clips with no manual editing:

1. Detect words by short-time energy, with a threshold set per recording.
2. Accept a recording only if it yields exactly 10 or 30 words. Anything else gets looked at by hand.
3. Cut a 1-second window around each word from the original audio, so each clip keeps the speaker's real background.
4. Label each clip by its position in the word list.

Position-based labels are only safe if the segmentation is right, so a local Whisper model transcribed every clip as a cross-check. I only used its disagreements to pick clips to listen to, never to drop them, since Whisper struggles with accents too. It found two recordings whose labels had shifted by one word. Five noisy recordings I cleaned up in Audacity first.

## Measuring a gap with 19 speakers

The accented set has no silence or unknown clips, so I score it on the ten words only. The model still predicts all twelve classes, so a word classified as `_unknown_` counts as an error. For a fair comparison, the official numbers below use the same ten-word subset of the Speech Commands test set.

The statistics need care, because with 19 speakers the uncertainty comes from *which people* you recorded much more than from how many clips you have. So every confidence interval comes from a **speaker-level bootstrap**: resample the speakers 10,000 times, each with all their clips. To compare two models I score the same resampled speakers with both (a paired bootstrap), so a speaker who is hard for everyone cancels out.

Two other rules I stuck to: the accented set is never used to pick a model or a setting, and every configuration that matters runs with three seeds.

## Results

| Experiment | Official acc | Accented acc | Gap |
|---|---|---|---|
| E0, lr 1e-3 (3 seeds) | 0.957 | 0.939 | 1.7 pts |
| E1: + time shift and background noise (3 seeds) | 0.951 | 0.937 | 1.4 pts |
| E2: E1 + SpecAugment (1 seed) | 0.946 | 0.937 | 0.9 pts |
| **Final: E0, lr 3e-3 (3 seeds)** | **0.964** | **0.945** | **1.9 pts** |

**The gap is real in direction, but not established.** The final model's 95% interval for the gap runs from about −1.5 to +7 points. One of the hypotheses I wrote down before recording anyone was that accented accuracy would be *noticeably* lower, and with this data I can't claim that.

**Augmentation doesn't close it.** Time shift and noise match the baseline on validation and are slightly worse on the test set. Adding SpecAugment is worse on both. Neither changes accented accuracy measurably: the paired intervals all contain zero. E2's gap looks smaller only because its official accuracy dropped, which is not the kind of gap-closing anyone wants.

**A better learning rate lifts everything equally.** 3e-3 improves official accuracy by 0.8 points (interval excludes zero) and accented accuracy by a similar, noisier amount. The model gets better, and the gap stays exactly where it was.

## The errors are a different kind of error

![Accuracy per word on Speech Commands and on the accented set](blog/kws/per_word.png)

The hardest accented words are *on* (0.88), *right* (0.89) and *no* (0.91), against 0.94, 0.97 and 0.97 on Speech Commands. *up*, *yes* and *go* are actually *easier* on the accented set.

More interesting is what the mistakes look like. On Speech Commands, most errors are confusions between neighbours: `on → off`, `go → no`. On accented speech, **64% of errors are a command word rejected as `_unknown_`**, against 28% on Speech Commands. `on → _unknown_` and `right → _unknown_` alone are 37% of accented errors. The only common word-to-word confusion is `down → go`. Eighteen clips are wrong for all three seeds, so those errors come from the audio, not from one model's initialisation.

My hypothesis, which I still need to check by listening to those 18 clips: the Serbian versions of these words sit outside what the model learned. A tapped or trilled *r* in *right*, a pure /o/ in *no* instead of the English diphthong, a different vowel in *on*. The model's training teaches it that anything unfamiliar belongs to `_unknown_`, so an unfamiliar *right* looks more like one of the 25 "other" words than like any single target.

![Accuracy per accented speaker](blog/kws/per_speaker.png)

And the gap is mostly two people. `spk09` (0.66) is the weakest speaker for every model and every seed, and `spk16` (0.83) is next. Without them, accented accuracy is 0.966, level with the official 0.964.

## 50 clips of fine-tuning

The second fix is the obvious one if you can get a little accented data: fine-tune on it. Five speakers are picked at random for adaptation and the other 14 are held out. Each final-model checkpoint gets 200 AdamW steps at lr 1e-4 on k clips per word per adaptation speaker, so k = 1 is just 50 clips. Every batch mixes 32 accented clips with 96 replayed Speech Commands clips, because the accented set has no silence or unknown examples and the model would otherwise forget those classes.

The settings were fixed in advance. There's no accented validation set, and tuning on the held-out speakers would leak. The one design decision I did test, whether to freeze BatchNorm, was settled on the official validation split (freezing it caused more forgetting). Then everything ran for 3 speaker splits × 3 seeds:

| Clips per word | Before | After | Δ accented | Δ official |
|---|---|---|---|---|
| 1 (50 clips) | 0.948 | 0.958 | **+1.0 pts** | +0.1 pts |
| 3 (150 clips) | 0.948 | 0.960 | **+1.1 pts** | +0.0 pts |

Every one of the 9 runs improves, for both k, and the official test set doesn't suffer. On the held-out speakers that takes the gap from 1.6 points to about half a point, roughly two thirds of it gone. Three clips per word are barely better than one.

It's a small effect, and I don't want to oversell it. Each held-out set is only 14 speakers, so the per-run interval excludes zero in only 3 of 9 runs, and the runs aren't independent (splits share speakers, seeds share data). But it's the only thing I tried that moved accented accuracy at all, and it moved it every time. Fine-tuning the weaker lr 1e-3 model the same way gave less (+0.7 points, 6–7 of 9 runs improved) and cost 0.3 points on the official set, so a better base model also adapts better.

## Shipping it

The model is exported to ONNX with the log-mel front end inside the graph, the STFT written as a fixed 1-D convolution, so the server takes raw 16 kHz audio and needs nothing but ONNX Runtime and numpy. It's a 1.1 MB model in a 290 MB Docker image behind a FastAPI endpoint.

| 1 s clip, batch 1 | 1 thread, p50 | 8 threads, p50 |
|---|---|---|
| PyTorch (torchaudio features + model) | 0.86 ms | 0.52 ms |
| ONNX Runtime, one graph | 0.54 ms | 0.19 ms |

A test checks that both agree: same top-1 prediction on all 500 benchmark clips, logits within 1e-5.

## What this doesn't show

- **19 speakers is too few.** The intervals are wide, and per-word numbers rest on 51 clips each.
- **Accent and channel are tangled together.** Every accented clip went through a lossy phone or WhatsApp codec, a different microphone and a different room, while Speech Commands is uncompressed. Part of the gap, and part of the fine-tuning gain, may be the model adapting to codecs, not to accents. With this data I can't separate the two.
- **Reading style differs.** My speakers read a list, up to three times in a row. Speech Commands has one prompted word per recording.
- **No accented negatives.** Without accented `_unknown_` or `_silence_` clips I can't measure false accepts, and a model that rejects less might also accept more things it shouldn't.
- **Limited tuning.** E2 has one seed, and the augmentation runs weren't redone at the final learning rate. Augmented training was still improving at epoch 30, so a longer schedule might help it.

## What I'd do next, and again

The next steps, in order of value: more speakers (25–30 would tighten the intervals the most), a codec control that runs Speech Commands through the same AAC and Opus codecs to separate channel from accent, accented `_unknown_` clips to measure false accepts, and a small accented validation split so fine-tuning can be tuned honestly.

And the things I'd keep:

- **Bootstrap over the unit you sampled.** The clips aren't the sample here, the speakers are. Clip-level intervals would have made a 1.9-point gap look significant.
- **Write the decision rule down before the run.** It's much harder to talk yourself into the faster model when the threshold is already in the README.
- **Look at the kind of error, not just the count.** The accuracy gap is small and uncertain. The shift from confusions to rejections is large and shows up for every seed, and it's the finding that says what to fix.
- **Profile before optimising.** I'd have spent a week on the data pipeline for a 2% win.
