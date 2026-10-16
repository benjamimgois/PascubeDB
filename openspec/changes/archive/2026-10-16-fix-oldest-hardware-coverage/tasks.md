# Tasks

## 1. Baseline and harness

- [x] 1.1 Capture the current year-coverage baseline: add a temporary dev harness (or a `console.table` snippet run against `FALLBACK_CSV`) that reports, for all rows, how many CPU/GPU rows resolve to a year and which model each of the four Curiosity cards would pick; record the numbers (CPU ~41%, GPU ~74%, Oldest GPU = GTX 950/2015, Oldest CPU = 2011). Verify the baseline matches this expected output.
- [x] 1.2 Extend the harness to list every distinct model whose `lookupHardwareYear` returns `null`, split into "datable legacy" and "ambiguous/generic" buckets. Verify the legacy list matches Appendix A in `design.md` and that ambiguous strings (`Graphics`, `Intel Graphics`, `llvmpipe`) are not in the legacy bucket.

## 2. Expand `CPU_YEARS`

- [x] 2.1 Add the Appendix A legacy CPU entries (Xeon X5450/X3440/X5675/X5690, Core2 Quad Q9550, i7 950, Pentium T4200, Phenom II X6 1100T) and verify `lookupHardwareYear` returns 2007/2008/2009/2010 for each without changing any previously matching model.
- [x] 2.2 Add the 2011–2015 gap families from Appendix A (Sandy/Ivy/Haswell/Broadwell, Bay Trail/Braswell, Xeon v2/v3/v5/v6, AMD A-series/Athlon X4) and verify each example model resolves to its table year.
- [x] 2.3 Add the generation-range patterns from design D1 (Intel `i[3579]-2xxx`…`-14xxx`, Core Ultra; Ryzen 1000→9000, Ryzen AI, Threadripper PRO) ordered after the existing specific entries; verify a full-dataset run asserts no row matches a newer pattern before its correct one (ordering guard from D1).
- [x] 2.4 Confirm ambiguous/generic CPU strings still return `null` so `fossil`/`anachronism` are not applied to them; verify the harness reports no year for `Jaguar`, `BC-250`, `Custom APU`, `Genuine Intel 0000`.

## 3. Expand `GPU_YEARS`

- [x] 3.1 Add the Appendix A legacy GPU entries (R9 200/HD 7900, HD 7700, GTX 650, R7/R9 200, GT 730, GTX 750 Ti, GTX 850M, HD 8400/R3, Quadro K/M) and verify the Oldest GPU harness pick moves from `GTX 950` (2015) to the lowest-year legacy model (2012).
- [x] 3.2 Add the post-2015 identifiable gaps from Appendix A (Polaris RX 460/470/480/550/560/570, Vega, Navi RX 5500/5600/5700 + Radeon VII, RTX 20-series + TITAN RTX, MX 110–550, Quadro P/T, TITAN Xp) and verify each example resolves to its year.
- [x] 3.3 Add Intel iGPU generation entries (HD 4000–6000, HD 5xx/6xx, UHD 6xx/7xx, Iris Plus/Pro, Iris Xe, Arc A/B, Adreno/Mali) and verify they resolve while bare `Intel Graphics`/`Graphics` stay null.
- [x] 3.4 Confirm ordering: verify no legacy model matches a newer pattern first (e.g. `GT 730` must hit the legacy entry, not a generic GT rule).

## 4. Align the legacy-GPU matcher

- [x] 4.1 Broaden the `exotic-gpu` matcher in `classifySpecimen()` (`app.js:2831`) to cover the legacy families added in group 3 (`HD \d{4}`, `R[579]`, `GTX? [0-9]\d{2}`) and verify a legacy row such as `HD 7700 Series` now carries the `exotic-gpu` tag while a modern row still does not.
- [x] 4.2 Verify the gallery and the Oldest GPU card agree: every model the Oldest GPU card can surface also appears as an `exotic-gpu` (or higher-tier) specimen when it has a matching tag.

## 5. Deterministic Oldest tie-break

- [x] 5.1 Replace the alphabetical secondary sort in the Oldest CPU and Oldest GPU reducers (`app.js:2004`, `app.js:2015`) with ascending sample count (rarest first) then normalized key, and verify the harness pick is stable across repeated runs. See design D3.
- [x] 5.2 Verify a same-year cohort (e.g. the 2015 GPUs) orders by the new key, not alphabetically, and that the first/second/third podium entries are unchanged between two consecutive evaluations.

## 6. Integration verification

- [x] 6.1 Re-run the full harness and verify: CPU coverage rises above ~41%, GPU coverage above ~74%; Oldest CPU shows a pre-2011 model; Oldest GPU shows a pre-2015 model; no row throws in `classifySpecimen()`.
- [x] 6.2 Verify the Curiosity pill end-to-end in the browser: the four cards render, the `fossil`/`anachronism` chip counts and the live summary reflect the newly covered hardware, and the submissions table filters/chips still work.
- [x] 6.3 Confirm no HTML/CSS change was needed and run the project's lint/typecheck (none defined — note N/A) plus `openspec validate fix-oldest-hardware-coverage`.

## Workflow follow-up

- Archive the change after manual browser verification and review.
