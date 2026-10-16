# Design

## Context

See `proposal.md` — Why. Two facts shape the approach:

1. `lookupHardwareYear(name, table)` (`app.js:2774`) returns the year of the **first** regex entry that matches; ordering in `CPU_YEARS`/`GPU_YEARS` is significant (first-match-wins). Both tables are currently ordered roughly oldest→newest.
2. The live sheet holds 555 distinct CPU strings and 271 distinct GPU strings. Only 41% of CPU rows and 74% of GPU rows currently resolve to a year. Per-model entries cannot scale to that diversity; the fix needs family/generation patterns.

Everything downstream (Oldest cards, `fossil`, `anachronism`) reads `cpuYear`/`gpuYear` from `classifySpecimen()`, so widening the tables is the single lever.

## Goals / Non-Goals

**Goals:**
- Give every datable legacy model a curated year so the Oldest CPU/GPU cards stop flooring at 2011/2015.
- Cover the whole identifiable history (Intel Core 2 → Arrow Lake, AMD K10 → Zen 5, GeForce 400 → 50, Radeon HD 2000 → RX 9000) with a maintainable set of patterns.
- Make oldest-ranking ties deterministic.
- Keep the tables curated — no runtime guessing on ambiguous names.

**Non-Goals:**
- Perfect per-SKU accuracy. Entries use the **family/generation launch year**; exact SKU date is not required.
- Resolving genuinely ambiguous strings (`Graphics`, `Intel Graphics`, `llvmpipe`, `AMD Ryzen ... Processor` reported as a GPU, VM/softpipe). These stay yearless.
- Touching the tag taxonomy, tiers, filter bar, submissions table, or modal.

## Decisions

### D1. Generation-range regex entries, not per-model entries

Extend both tables with anchored family patterns that map a whole generation to its launch year. Examples (CPU):

- Sandy Bridge `\bi[3579]-2\d{3}` → 2011
- Ivy Bridge `\bi[3579]-3\d{3}` → 2012
- Haswell `\bi[3579]-4\d{3}` → 2013
- Broadwell `\bi[3579]-5\d{3}` → 2015
- Skylake `\bi[3579]-6\d{3}` → 2015
- Kaby Lake `\bi[3579]-7\d{3}` → 2017
- Coffee Lake `\bi[3579]-8\d{3}` → 2018, `-9\d{3}` → 2019
- Comet `-10\d{3}` → 2020, Rocket `-11\d{3}` → 2021
- Alder `-12\d{3}` → 2022, Raptor `-13\d{3}`/`-14\d{3}` → 2023
- Core Ultra `Ultra [3579] \d{3}` → 2024
- Ryzen `Ryzen [3579] 1\d{3}` → 2017, … `9\d{3}` → 2024 (Zen 1→Zen 5)

**Why over per-model:** 555 CPUs / 271 GPUs; hand-listing each is unmaintainable and will rot as new SKUs arrive. A generation regex covers unknown SKUs of a known family automatically.

**Alternative rejected:** heuristic year estimate from model number alone without a family table — violates the "curated" spec and mis-dates rebrands.

**Constraint from first-match-wins:** order matters. Keep the most specific / oldest entries first (e.g. `GTX 9\d\d` before a generic `GTX`), and place broad numeric-generation patterns after the existing hand-curated model entries. Add a test in the harness that re-runs every known pattern against the live/full dataset and asserts no row matches a *newer* pattern before its correct one.

### D2. Fix the legacy floor with targeted entries

The generation patterns above start at Sandy Bridge (2011) / GeForce 400 era but the data contains earlier silicon that no numeric pattern captures. Add explicit legacy entries (see Appendix A). This is the part that actually changes the Oldest cards' answer.

### D3. Deterministic tie-break for the Oldest podiums

Today the sort is `year asc, normalize*(name).localeCompare` (`app.js:2004`, `app.js:2015`). Alphabetical coincidence is why `GTX 950` wins over the equal-year 960/970/980. Replace the secondary key with a stable hardware signal: **ascending sample count (rarest first), then normalized key**. Rarest-first fits the Curiosity theme, avoids a ubiquitous integrated GPU (e.g. `Intel HD Graphics 4000`, which `normalizeGPU` collapses to a bare `HD`) dominating a same-year podium, and is deterministic without leaving alphabetical name ordering to decide the oldest model.

**Alternative considered:** descending sample count — deterministic but surfaced the generic `HD` iGPU as the "oldest GPU" label, which reads as a bug. Also rejected: plain alphabetical (the original behavior).

### D4. Leave ambiguous generic GPU strings yearless

`Graphics`, `Intel Graphics`, `llvmpipe`, `RX Graphics`, `500 Series`, etc. cannot be dated. They remain `gpuYear = null`, so they are excluded from Oldest GPU but can still appear in the gallery via `exotic-gpu` if the regex matches. Confirm the `exotic-gpu` matcher (`app.js:2831`) is broadened where an old family is clearly identifiable (`HD \d{4}`, `R[579]`, `GTX? [0-9]\d{2}`), so the gallery and the Oldest card agree on what counts as legacy.

## Risks / Trade-offs

- **Broad regex false positives** (a `-2\d{3}` matching an unrelated string) → anchor every pattern on the vendor/model prefix (`\bi[3579]-`, `\bRyzen`, `\bGTX`, `\bRX`, `\bHD`); add a dataset-wide assertion test.
- **`fossil`/`anachronism` counts jump** (more rows now have years) → expected and desirable; capture before/after counts in the task verification and review the chip/summary deltas rather than treating them as regressions.
- **Family-launch year vs SKU launch year mismatch** (e.g. `5800X3D` existing entry is 2020 while the SKU shipped 2022) → documented D-Non-Goal; keep existing entries unchanged to avoid scope creep, note any factual fixes as follow-ups.
- **Ordering regressions on first-match-wins** → the assertion test from D1 guards this.

## Migration Plan

Static site, no migration. Deploy via the normal GitHub Pages push. Rollback = revert the single `app.js` commit; no persisted state depends on the tables.

## Appendix A — Legacy models currently missing a year

Complete set of datable legacy models present in the live sheet that no current entry matches. These are the entries that move the Oldest cards.

### CPU — older than the current 2011 floor

| Model (as in data) | Year |
|---|---|
| Intel Xeon X5450 @ 3.00GHz | 2007 |
| Intel Core2 Quad Q9550 @ 2.83GHz | 2008 |
| i7 950 @ 3.07GHz | 2008 |
| Pentium Dual-Core T4200 @ 2.00GHz | 2009 |
| Intel Xeon X3440 @ 2.53GHz | 2009 |
| Phenom II X6 1100T | 2010 |
| Intel Xeon X5675 @ 3.07GHz | 2010 |
| Intel Xeon X5690 @ 3.47GHz | 2010 |

### CPU — 2011–2015 gap (identifiable, currently unmatched)

| Family / examples | Year |
|---|---|
| Sandy Bridge: i3-2100/2120, i5-2310/2320/2430M/2467M/2500, i7-2600 (non-K) | 2011 |
| Ivy Bridge: i3-3110M/3217U, i7-3520M/3540M/3612QM; Xeon E3-1220/1230/1245/1270 V2 | 2012 |
| Haswell: i3-4130/4160/4170, i5-4200U…4690K, i7-4700MQ…4930K, Xeon E3-1230/1240/1246 v3 | 2013 |
| Ivy Bridge-EP/Haswell refresh: Xeon E5-1650/1680/2470/2650 v2, E5-2689/2690 (0), i7-4790 | 2014 |
| Broadwell: i7-5775C/5775R; Celeron N2840, Pentium G3240/G3250 | 2014–2015 |
| Bay Trail/Braswell: Celeron 2955U/2980U, Pentium N3700, Celeron J/N-series | 2013–2015 |
| AMD: A6-5200, GX-420CA (2013); A8-7410, Athlon X4 870K (2015) | 2013–2015 |
| Xeon v5/v6/E3/E5/E-2xxx, Gold 6138, W-2123/2145 | 2015–2018 |
| AMD APU: A9-9420, A6-9500, A10-9700 | 2016–2017 |

### CPU — modern families to fill via D1 generation patterns

Skylake→Raptor Lake (`i[3579]-6xxx`…`-14xxx`), Core Ultra (Meteor/Arrow Lake), Ryzen 1000→9000, Ryzen AI, Threadripper PRO 5000/7000 — all currently unmatched and covered by generation regexes.

### GPU — older than the current 2015 floor

| Model (as in data) | Year |
|---|---|
| R9 200 / HD 7900 Series | 2012 |
| HD 7700 Series | 2012 |
| GTX 650 | 2012 |
| R7 200 Series, R9 200 Series | 2013 |
| HD 8500M | 2013 |
| Quadro K1100M | 2013 |
| GT 730 | 2014 |
| GTX 750 Ti | 2014 |
| GTX 850M | 2014 |
| HD 8400 / R3 Series | 2014 |
| Quadro K620 | 2014 |
| R7 370 Series, R9 M370X | 2015 |
| Quadro M2000M | 2015 |

### GPU — post-2015 identifiable gaps

| Family / examples | Year |
|---|---|
| AMD Polaris: RX 460/470/480 | 2016 |
| AMD Polaris refresh: RX 550/560/570 | 2017 |
| AMD Vega: RX Vega, Vega 8/10/11, Vega 3/6 | 2017–2018 |
| AMD Navi: RX 5500/5500M/5600/5700, Radeon VII | 2019 |
| NVIDIA Turing: RTX 2050/2060/2060S/2070/2070S/2080/2080S/2080Ti, TITAN RTX | 2018–2019 |
| NVIDIA MX: MX110/130/150/230/250/330/350/450/550 | 2016–2021 |
| NVIDIA pro: Quadro K/M/P, T500/T600, RTX A-series, TITAN Xp | 2014–2023 |
| Intel iGPU: HD 4000/4400/4600/5000/5500/6000, HD 515/520/530, HD 620/630, UHD 620/630/730/770, Iris Plus/Pro, Iris Xe, Arc (A/B), Adreno/Mali | 2013–2025 |

## Open Questions

- None blocking. Whether generic `"Graphics"`-style strings should ever be datable is deliberately resolved as **no** (D4); revisit only if a future SKU string becomes unambiguous.
