# Design

## Context

See `proposal.md` — Why. Relevant current state:

- `renderStats('curiosity')` (`app.js:1978`) fills four fixed cards by id: `stat-top-cpu-single` (Rarest Specimen, value = tier letter), `stat-top-cpu-multi` (Oldest CPU), `stat-top-gpu` (Oldest GPU), `stat-most-humble-score` (Console APU). Labels live in `STATS_PILL_LABELS.curiosity` and tooltips in `STAT_TOOLTIPS.curiosity`.
- `collectSpecimenData()` (`app.js:3055`) returns `sampleCounts` keyed by normalized CPU (counts every row). The Oldest tie-break already builds a GPU-keyed `gpuSamples` map in the same branch.
- Curated regex tables are an established pattern (`CPU_YEARS` `app.js:2704`, `GPU_YEARS` `app.js:2737`), and `lookupHardwareYear` is first-match-wins.
- Historical `getRarestHardware()` (removed in `add-curiosity-tab`) counted samples with a `<= 3` threshold — rejected here because 213 CPU models tie at one submission.

## Goals / Non-Goals

**Goals:**
- Two concrete hardware cards (Rarest CPU / Rarest GPU) driven by a **hand-curated ranked list**.
- Deterministic, present-only podium; the value is the hardware, the sub is the *why*.
- Reuse existing counting/dedup machinery; no new dependencies.

**Non-Goals:**
- Reintroducing sample-count rarity or the removed charts.
- Changing tags, tiers, filter bar, submissions table, or modal.
- Perfect ranking; the list is a curated editorial artifact and will be revised over time.

## Decisions

### D1. Curated ranked lists, first-present wins

Add two module-scope tables, ordered by curator priority:

```js
const RARE_CPUS = [
  { match: /eng\s*sample|genuine intel 0000|100-0000/i, reason: 'Engineering sample' },
  { match: /liverpool|jaguar/i,                          reason: 'PlayStation 4 APU' },
  ...
];
const RARE_GPUS = [ ... ];
```

The Rarest CPU/GPU card walks the list in order, skips entries with no matching row present, and fills the podium (max 3 distinct models). Within an entry matching several models, pick fewest submissions, then normalized key. This keeps "rarest" truthful while the *editorial order* decides what is surfaced — solving the 200-way tie.

**Alternative rejected:** auto-ranking all models by sample count — arbitrary winner (huge tie); auto ranking by tier — that is the removed Rarest Specimen card.

### D2. Family signatures, not exact models

Entries match by family regex so new exotic hardware (a new engineering sample, a new console APU, a new ARM SBC) is caught without editing the list. Curated `reason` strings are per-entry and shown as the card sub-label. If finer control is needed later, an entry can be narrowed to an exact signature.

**Alternative considered:** exact-model allowlist — maximum control, but rots immediately and needs manual review for every new submission.

### D3. Value = hardware, sub = reason

Card value is the normalized hardware model; sub is the curated reason; `#2`/`#3` show `model — reason`. This matches the earlier request to show hardware instead of an abstract tier letter, and the `.stat-value` ellipsis + `title` (`applyStatValueTitles`, `app.js:1894`) keeps long names accessible on hover.

### D4. Seed curation lists

**`RARE_CPUS`** (rank order):

| # | match | reason |
|---|---|---|
| 1 | `eng\s*sample` · `genuine intel 0000` · `100-0000` | Engineering sample |
| 2 | `liverpool` · `jaguar` | PlayStation 4 APU |
| 3 | `custom apu 0932` · `custom apu 0405` | Handheld APU |
| 4 | `cortex-a53` · `rk3588` · `oryon` | Non-x86 silicon |
| 5 | `xeon gold` · `epyc` | Datacenter silicon |
| 6 | `threadripper pro` | Workstation HEDT |
| 7 | `gx-420ca` | Embedded AMD SoC |
| 8 | `a10-9700` · `a6-9500` | Bristol Ridge APU |
| 9 | `a6-5200` · `a8-7410` | Kabini / Beema APU |
| 10 | `phenom ii x6 1100t` | Last pre-FX hexacore |
| 11 | `fx-8350` · `fx-6300` | Final FX flagship |
| 12 | `x5450` · `x3440` · `x5675` · `x5690` | Harpertown / Westmere Xeon |

**`RARE_GPUS`** (rank order):

| # | match | reason |
|---|---|---|
| 1 | `100-000000891` | Engineering sample |
| 2 | `dg1501` | Console GPU part |
| 3 | `liverpool` | PlayStation 4 GPU |
| 4 | `adreno x1` · `mali-g` | ARM SoC graphics |
| 5 | `titan xp` · `titan rtx` | NVIDIA TITAN |
| 6 | `pro vii` · `pro v620` · `pro w5500` · `pro w7500` · `pro wx` | Radeon Pro workstation |
| 7 | `e9170` · `embedded radeon` | Embedded Polaris |
| 8 | `r9 200` · `r9 3x0` · `hd 7900` | Legacy GCN flagship |
| 9 | `quadro k` · `quadro p` · `rtx a\d{4}` | Quadro workstation |
| 10 | `\bvii\b` · `r9700` | Halo flagship |
| 11 | `6750 gre` · `7650 gre` | China-only GRE SKU |
| 12 | `rx 6\d{3}m` · `rx 7\d{3}s` | Rare mobile RDNA |

### D5. Exclude non-hardware and count-only icons

Entries intentionally omit generic strings (`Graphics`, `Unknown`) and omit iconic-but-common hardware (`BC-250` at 73 runs, `Custom APU 0405` at 20) from the *ranking* intent — they are not rare. If the community wants those surfaced, the card label should change to "Most Curious CPU/GPU"; that rename is a separate decision, not part of this change.

### D6. Curiosity-only card order via CSS `order`

The four stat cards are a single shared grid across the Performance / Efficiency / Curiosity pills. Curiosity is presented as `Rarest CPU, Rarest GPU, Oldest CPU, Oldest GPU` (rarest pair, then oldest pair), while the other pills keep their existing order. Rather than moving DOM nodes (which would reorder every pill and desync the id-indexed labels and DOM-ordered tooltips), the Curiosity pill sets `style.order` on the grid items and clears it for other pills. No HTML/CSS file change; the label and tooltip mappings are untouched.

## Risks / Trade-offs

- **Ranking is editorial, not objective** → acceptable; the reason string and curated order are the point. Revisit the lists as hardware arrives.
- **Overlap with Oldest CPU/GPU** (last `RARE_CPUS` entries, `RARE_GPUS` #8) → some hardware can appear on both cards. Accepted for now; excluding Oldest winners is a possible follow-up if it looks redundant.
- **Family regex over-matching** (e.g. `\bvii\b` matching unrelated strings) → anchor patterns and verify against the live dataset in the harness before merging.
- **`reason` wording drifts** → keep short, English, sentence-case, matching the existing UI tone.

## Migration Plan

Static site, no migration. Deploy via GitHub Pages; rollback = revert the `app.js` commit.
