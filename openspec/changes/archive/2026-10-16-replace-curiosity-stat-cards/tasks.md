# Tasks

## 1. Curated rare-hardware tables

- [x] 1.1 Add `RARE_CPUS` and `RARE_GPUS` module-scope tables (regex `match` + `reason`) with the seed entries from design D4, ordered by rank; verify each entry's regex parses and matches at least the intended raw strings in the live dataset via the harness.
- [x] 1.2 In the harness, assert every curated entry's `match` resolves to at least one present model (or is intentionally future-proof), and that no entry over-matches a modern/commodity model; report the resolved model per entry and fix any over-broad pattern (e.g. `\bvii\b`).

## 2. Card wiring

- [x] 2.1 Update `STATS_PILL_LABELS.curiosity` to `['Rarest CPU', 'Oldest CPU', 'Oldest GPU', 'Rarest GPU']` and rewrite `STAT_TOOLTIPS.curiosity` for the new card meanings; verify the four labels render in the Curiosity pill.
- [x] 2.2 Replace card 1 (Rarest Specimen) in `renderStats('curiosity')` with the Rarest CPU logic: walk `RARE_CPUS`, first present entry per rank, value = `normalizeCPU(model)`, sub = entry `reason`, `#2`/`#3` = `model — reason`; verify against the harness output.
- [x] 2.3 Replace card 4 (Console APU) with the Rarest GPU logic over `RARE_GPUS` using the existing `gpuSamples` map for the within-entry "rarest" pick; verify value/sub/podium against the harness.

## 3. Podium rules

- [x] 3.1 Implement per-entry resolution: among present models matching an entry, pick fewest submissions then normalized key; skip entries with no present hardware; cap the podium at three distinct models. Verify with a harness case where the top curated entry is absent and a lower one is shown, and where one entry matches several models.
- [x] 3.2 Verify the podium never repeats a model and that empty/first-render state shows placeholders (`-`) as before.

## 4. Integration verification

- [x] 4.1 Re-run the harness on the live dataset: confirm Rarest CPU and Rarest GPU resolve to the expected curated hardware and that the full `renderStats('curiosity')` path throws on no row.
- [x] 4.2 Verify in a headless browser (`index.html?subtab=curiosity` + `renderStats`/`renderCuriosityCharts`) that all four cards show Rarest CPU / Oldest CPU / Oldest GPU / Rarest GPU with hardware values and reasons, and that the Oldest cards are unchanged.
- [x] 4.3 Confirm no HTML/CSS change was needed, `node --check app.js` passes, and `openspec validate replace-curiosity-stat-cards` passes.

## 5. Card order

- [x] 5.1 Present the Curiosity cards as Rarest CPU, Rarest GPU, Oldest CPU, Oldest GPU by setting CSS `order` on the shared grid items for the Curiosity pill and clearing it otherwise; verify Curiosity shows the new order and the Performance/Efficiency pills keep their original card order and values.

## Workflow follow-up

- Archive the change after browser verification and review.
