# Proposal

## Why

The current "Rarest CPUs" and "Rarest GPUs" charts rank hardware by sample count (models with ≤3 submissions). Sample count is a statistical artifact, not a story: a model with one sample is only interesting if the hardware itself is unusual. The community wants to surface genuinely curious hardware — embedded boards racked to run Linux, consoles, engineering samples, server silicon, fossils, and mismatched CPU/GPU pairings — and to inspect each specimen's actual benchmark performance.

## What Changes

- **BREAKING** (visual): Remove the Thermals pill and all of its content — the AMD/NVIDIA/Intel GPU-temperature charts, the mobile/handheld thermal-load charts, and the four temperature stat cards.
- **BREAKING** (visual): Remove the `Rarest CPUs` / `Rarest GPUs` charts and their count-based helper.
- Add a new **Curiosity** pill inside the Hardware tab (replacing Thermals) that hosts:
  - A **curiosity filter bar**: chips per specimen tag with counts (SBC, console, engineering sample, server, fossil, VM, exotic architecture, legacy GPU, anachronism), applied directly to the submitted-benchmarks table.
  - A **submitted benchmarks** table: the actual benchmark runs contributed, one row per run, with a **Type** column showing that run's specimen tags, filterable by tag and device and sortable by score/date.
  - A **live summary** line showing the active filter, matching hardware count, and submitted-benchmark count.
  - A **run detail modal**: clicking a table row opens a dialog with that run's full performance profile (main, CPU single/multi, GPU, RTX scores, frequencies, temps, power) plus OS/kernel/driver/arch context.
  - Four **Curiosity stat cards** replacing the temperature cards: Oldest CPU, Rarest Specimen, Oldest GPU, and Console APU.
- Add a curation classifier `classifySpecimen(row)` returning `{ tags[], tier, reasons[] }` from a tag taxonomy (engineering sample, console, exotic architecture, VM, SBC/embedded, server, fossil, anachronism, exotic GPU). The taxonomy excludes a handheld tag, a halo/new-release tag, and an open-driver tag.
- Broaden console-APU detection to cover console-derived silicon observed in the sheet: the PS5-derived `BC-250` (61 submissions) and PlayStation 4 `Jaguar`/`Liverpool`, plus PS5/Xbox codenames, with canonical model names. Broaden engineering-sample detection to AMD OPNs (`100-0000…`).
- Deduplicate specimens by normalized CPU model so the same hardware is never counted or listed more than once.
- Add curated `CPU_YEARS` and `GPU_YEARS` lookup tables so `fossil` and `anachronism` tags can be computed from model names.
- Add 4 tier color tokens to the design system (tiers S/A/B/C).
- Reuse the classifier to render up to 3 specimen chips on each leaderboard table row.
- Tolerate false positives in detection (e.g. unresolvable `0000` CPU IDs may be flagged as engineering samples).

## Capabilities

### New Capabilities

- `specimen-gallery`: Detection and curation of curious hardware (tag taxonomy, tiers, CPU/GPU year tables, entry/ordering/cap rules), rendering of the Specimens gallery inside the Curiosity pill, the per-specimen detail modal, the Curiosity stat cards, and specimen chips in the leaderboard table.

### Modified Capabilities

<!-- None in the main spec store: the Thermals pill is not described by an archived main spec
     (its requirements live only in in-flight changes), so its removal is delivered without a
     spec delta. See Impact for the follow-up on in-flight changes. -->

## Impact

- `app.js`: remove `getRarestHardware()` and the rarest chart blocks; remove `renderThermalsCharts()`, its closure helpers, and the thermal bar block inside `renderSystemCharts()`; remove the thermal stats branch and its helpers (`getHottestGPU`, `getBestCooling`, `getCategoryHottestRuns`, `getVendorHottestRuns`); add `classifySpecimen()`, `CPU_YEARS`, `GPU_YEARS`, gallery renderer, curiosity stats, detail modal, and table chip rendering; update pill state/navigation from `thermals` to `curiosity`.
- `index.html`: replace the Thermals pill button and content with the Curiosity pill (gallery + modal); remove the Specimens section previously added to the Performance pill.
- `style.css`: add tier color tokens, specimen card/chip styles, and specimen detail modal styles.
- No dependencies added; data shape unchanged (all signals derive from existing fields: `cpu`, `gpu`, `architecture`, `productName`, `os`, `kernel`, temps, frequencies).
- **Follow-up / risk**: the Thermals pill is described by in-flight changes `hardware-tab-restructure` (`subtab-pills`, `thermal-efficiency-charts`) and `add-mobile-bottleneck-thermal`. Those changes will need to drop their thermals-pill requirements before archiving, or they will re-introduce the removed pill.
