# Proposal

## Why

The Curiosity pill's **Oldest CPU** and **Oldest GPU** cards claim to show the oldest hardware ever benchmarked, but they silently drop most legacy hardware. Both cards filter on `specimen.cpuYear` / `specimen.gpuYear` (`app.js:2003`, `app.js:2014`), and those years come only from the curated `CPU_YEARS` / `GPU_YEARS` tables. Those tables are sparse: the oldest CPU entry is 2011 and the oldest GPU entry is 2015, so any model older than that gets `year = null` and is excluded from the ranking entirely.

On the live sheet this makes the cards wrong: **Oldest GPU** shows `GTX 950` (2015) even though the database holds a `R9 200 / HD 7900 Series`, `HD 7700 Series`, `GTX 650` (all 2012), `R7 200 Series` (2013), and `GT 730`, `GTX 750 Ti` (2014). **Oldest CPU** floors at 2011 (`FX-8350`, `i7-2600K`) even though the database holds a `Xeon X5450` (2007), `Core2 Quad Q9550` and `i7 950` (2008), `Xeon X3440` (2009) and `Phenom II X6 1100T` (2010). Coverage is currently ~41% of CPU rows and ~74% of GPU rows.

## What Changes

- Expand `CPU_YEARS` from a handful of exemplar models to generation/family coverage spanning the full history present in the data — Intel Core 2 / Nehalem / Westmere / Sandy Bridge → Raptor Lake + Meteor/Arrow Lake, AMD FX/A-series/K10, Xeon families, and the full Ryzen 1000→9000 line. Roughly double the datable CPU rows.
- Expand `GPU_YEARS` to cover legacy GeForce (GT/GTX 400–900, mobile M-series), AMD/ATI Radeon HD 2000–8000 and R5/R7/R9 200/300, Intel HD/Iris/UHD, NVIDIA MX/Quadro, and the currently-unmatched modern gaps (RTX 20-series, RX 5000/Vega/Polaris, Apple/embedded iGPUs).
- Fix the **Oldest GPU/CPU** cards so the reported minimum reflects real legacy hardware instead of a 2011/2015 floor.
- Make the oldest-ranking tie-break deterministic and meaningful (not plain alphabetical, which is why `GTX 950` beats the 960/970/980 it ties with).
- Keep table entries curated (no heuristic guessing); unknown models continue to skip year-based tags.

### Non-goals

- No change to the tag taxonomy, tiers, or which tags exist.
- No change to the Curiosity filter bar, submissions table, or detail modal.
- No heuristic/statistical year inference — only curated table entries.
- Not attempting 100% coverage of every modern iGPU string; the priority is correcting the legacy floor and filling obvious gaps.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `specimen-gallery`: the **Curated hardware release-year lookup** requirement changes to mandate coverage across the identifiable release history (not just exemplar models), and the **Curiosity stat cards** requirement gains a deterministic, non-alphabetical tie-break rule for the Oldest CPU / Oldest GPU podiums.

## Impact

- `app.js`: `CPU_YEARS` and `GPU_YEARS` tables (`app.js:2704`, `app.js:2737`); the `exotic-gpu` legacy-GPU matcher (`app.js:2831`) may be broadened for consistency; the Oldest CPU/GPU sort tie-break in `renderStats('curiosity')` (`app.js:2001`–`2021`).
- Side effect: because `fossil` and `anachronism` derive from these years (`app.js:2828`–`2829`), expanding the tables will surface more `fossil`/`anachronism` specimens in the Curiosity gallery, chips, and counts. This is intended but must be verified as a deliberate change.
- No new dependencies; no HTML/CSS changes expected.
