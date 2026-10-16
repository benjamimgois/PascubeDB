# Proposal

## Why

The Curiosity pill's four stat cards are half abstract and half redundant. **Rarest Specimen** shows a bare tier letter (`S`) with no hardware name in the prominent slot — readers see a letter, not a machine. **Console APU** is a narrow, count-based card that duplicates what the submissions table already answers. Meanwhile the two axes the community actually wants to compare are **rare CPUs** and **rare GPUs** as concrete hardware.

Sample-count rarity alone does not work: 213 CPU models and 80 GPU models have exactly one submission, so "fewest samples" is a 200-way tie and the winner is arbitrary. A curated, ranked list of rare/notable hardware is the only way to make the ranking meaningful and interesting, and it follows the project's existing pattern of curated tables (`CPU_YEARS` / `GPU_YEARS`).

## What Changes

- Replace the **Rarest Specimen** card with **Rarest CPU**, and the **Console APU** card with **Rarest GPU**. The two Oldest CPU / Oldest GPU cards keep their positions.
- Introduce curated, ranked **rare-hardware lists** (`RARE_CPUS` / `RARE_GPUS`): ordered entries of regex signatures with a short reason. The card surfaces the highest-ranked entry **present in the dataset**, deduplicated by normalized model, showing the hardware as the value and the reason as the sub.
- Within a curated entry that matches several present models, pick the **rarest** one (fewest submissions) so "rarest" stays true.
- Update the Curiosity card labels and tooltips; no HTML/CSS change (same card slots/ids).

### Non-goals

- Not a return of the removed `Rarest CPUs` / `Rarest GPUs` **charts** — those stay removed; these are stat cards.
- No change to specimen tags, tiers, the filter bar, submissions table, or detail modal.
- Not auto-deriving rarity from sample count; the lists are curated by hand and maintained as new exotic hardware appears.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `specimen-gallery`: the **Curiosity stat cards** requirement changes from `Rarest Specimen / Oldest CPU / Oldest GPU / Console APU` to `Rarest CPU / Oldest CPU / Oldest GPU / Rarest GPU`; a new **Curated rare-hardware ranking** requirement defines the ranked rare CPU/GPU lists and how the cards consume them.

## Impact

- `app.js`: new `RARE_CPUS` / `RARE_GPUS` curated tables; `renderStats('curiosity')` cards 1 and 4; `STATS_PILL_LABELS.curiosity`; `STAT_TOOLTIPS.curiosity`. Reuses `sampleCounts` (CPU) and the `gpuSamples` map already computed for the Oldest tie-break.
- `openspec/specs/specimen-gallery/spec.md`: modified + added requirements.
- No new dependencies; no HTML/CSS changes expected.
