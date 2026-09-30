# Tasks

## 1. Detection Layer

- [x] 1.1 Add `CPU_YEARS` and `GPU_YEARS` literal tables seeded with the models observed in the dataset (Raspberry Pi 5, Orange Pi 5 Plus, Steam Deck / Steam Deck OLED, Ryzen Z1 Extreme, Xeon E5 v3, Ryzen 7 3800XT, Ryzen AI MAX+ 395, Ryzen AI 9 HX 370, i7-2600K, i5-3470S, i7-4770, i7-4790K, i5-5250U, RTX 50xx, RX 9xxx, GT 1030, GTX 980 Ti, R9 390, HD 6000, UHD 630, VideoCore VII, Mali G610, Arc A750/B580). Verify via browser console that each seeded model resolves to its year.
- [x] 1.2 Implement `classifySpecimen(row)` returning `{ tags, tier, reasons, key }`, composing `normalizeCPU()`/`normalizeGPU()`/`classifyDevice()` and the year tables, per the taxonomy in `specs/specimen-gallery/spec.md`. Verify against the fallback dataset: Pi 5 and Orange Pi return `sbc` (tier A), Steam Deck and ROG Ally return `handheld` (tier B), Xeons return `server`, i7-2600K returns `fossil`, i7-4790K + RTX 5070 Ti returns `anachronism`, GT 1030 NVK returns `open-gpu`, the Fedora VM row returns `vm`.
- [x] 1.3 Implement the reason-sentence templates for every tag and verify each tag on the fallback data produces a non-empty reason string.

## 2. Gallery Rendering

- [x] 2.1 Add the four tier color tokens (`--tier-s/a/b/c` and their `-bg` variants) to `style.css` and verify they resolve in devtools on a test element.
- [x] 2.2 Add specimen card, chip, tier-dot, gallery grid, and empty-state styles to `style.css`, reusing the `.chart-container-wrapper` glass base. Verify a static mock card matches the dark glassmorphism theme at desktop and 768px/1024px breakpoints.
- [x] 2.3 Replace the two rarest `<div class="chart-container-wrapper">` blocks in `index.html` with the full-width Specimens section (header + grid container + hidden "show more" remainder). Verify the old `cpuRareChart`/`gpuRareChart` canvases are gone and the new section renders.
- [x] 2.4 Implement `renderSpecimenGallery()`: classify all `benchmarkData`, dedup by `key` keeping highest `mainScore`, order by tier/year/score, render first 12 cards, wire the "show more" toggle, and render the empty state when no specimen qualifies. Verify against fallback data that 12 cards show and the remainder reveals on click.

## 3. Remove Rarity-by-Count Charts

- [x] 3.1 Delete `getRarestHardware()` and the 5b/5c chart blocks in `renderCharts()`, and call `renderSpecimenGallery()` in their place. Verify with a repository-wide search that `getRarestHardware` and `cpuRareChart`/`gpuRareChart` have no remaining references and that the dashboard renders without console errors.
- [x] 3.2 Remove the now-unused `rare`/`rareCpu`/`rareGpu` color entries if nothing else references them, verifying with a search before deletion.

## 4. Leaderboard Chips

- [x] 4.1 Extend the `renderTable()` row template to render up to three specimen chips from `classifySpecimen(row).tags`. Verify a tagged row (e.g. a Xeon fossil) shows chips and an ordinary RTX 5070 Ti row shows none.

## 5. Integration Verification

- [x] 5.1 Serve locally (`python3 -m http.server 8000`) and verify end-to-end: rarest charts absent, gallery populated and correctly tier-ordered, "show more" works, table chips match gallery tags, and no console errors.
- [x] 5.2 Verify graceful degradation with a trimmed dataset containing no specimens: the gallery renders its empty state and the table renders no chips.

## 6. Curiosity Tab (replaces Thermals)

- [x] 6.1 Update the change artifacts (proposal, specs, design, tasks) for the Curiosity pill, detail modal, curiosity stats, and Thermals removal; verify `openspec validate` passes.
- [x] 6.2 In `index.html`, replace the Thermals pill button and content with the Curiosity pill (gallery grid + "show more" + empty state + detail modal), and remove the Specimens section previously added to the Performance pill. Verify no `data-pill="thermals"` remains and `#specimen-grid` lives in the Curiosity pill.
- [x] 6.3 Update pill state/navigation: `PILL_STATE.rendered` thermals→curiosity, `switchPill` hook calls `renderCuriosityCharts()`, `initPillNav` accepts `curiosity`, and the filter-invalidation flag is renamed. Verify activating Curiosity renders the gallery.
- [x] 6.4 Remove thermal rendering/stats: delete `renderThermalsCharts`, closure helpers, the thermal block in `renderSystemCharts`, the `thermals` branch in `renderStats`, and unused helpers (`getHottestGPU`, `getBestCooling`, `getCategoryHottestRuns`, `getVendorHottestRuns`). Verify a repository search returns zero references to the removed canvas IDs and helpers.
- [x] 6.5 Implement the curiosity stat cards in `renderStats('curiosity')` (Oldest Silicon, Rarest Specimen, Exotic Architecture, Specimen Count). Verify values against the fallback dataset.
- [x] 6.6 Implement the specimen detail modal (full performance profile; close via control and backdrop) and wire card clicks in `buildSpecimenCard`. Verify clicking a card opens the modal with the specimen's scores and context.
- [x] 6.7 Add specimen detail modal styles to `style.css`. Verify the modal matches the dark glassmorphism theme at desktop and 768px.
- [x] 6.8 Integration: run `node --check`, the Node harness (classification/gallery/stats/modal), a local static serve, and confirm the Curiosity pill renders end-to-end while Thermals is absent.

## 7. Interactive Curiosity (filters + submissions)

- [x] 7.1 Add `curiosityState` and a shared `collectSpecimenData()` collector (annotated rows, sample counts, ordered specimens, tag counts) and refactor `renderSpecimenGallery()` to consume it and filter by the active tag. Verify the gallery still renders and filters.
- [x] 7.2 Add the curiosity filter bar: chips per tag with counts + "All", tier-colored, active state, wired to re-render the view. Verify selecting a tag filters the gallery and highlights the chip.
- [x] 7.3 Add the live summary line (active filter, specimen count, benchmark count). Verify it updates on filter change.
- [x] 7.4 Add the submitted-benchmarks table: rows with contributor/CPU/GPU/scores/date, inline main-score bar, device selector, sort control, row cap, and empty state. Verify rows match the active filter and the device selector narrows to one device.
- [x] 7.5 Add the Curiosity pill markup for the filter bar, summary, and submissions section, and add CSS (chips, summary, table, card entrance animation). Verify layout at desktop and 768px.
- [x] 7.6 Integration: extend the Node harness to cover filter counts, gallery filtering, and submissions selection, then run `node --check`, the harness, and a local static serve.

## 8. Retire Halo and Open-driver tags

- [x] 8.1 Remove the `halo` and `open-gpu` tags from `SPECIMEN_TAG_META`, from `classifySpecimen()` detection, and from the reason templates; update the spec taxonomy to state these tags SHALL NOT be produced. Verify the harness specimen count drops accordingly and no `Halo`/`Open driver` chip remains.

## 9. Retire Handheld, dedupe hardware, rework stat cards

- [x] 9.1 Remove the `handheld` tag from `SPECIMEN_TAG_META`, detection, and reason templates; update the spec taxonomy to exclude it. Verify Steam Deck / ROG Ally no longer qualify and no `Handheld` chip remains.
- [x] 9.2 Key specimens by normalized CPU model (not CPU+GPU) so the same hardware is never shown more than once in the gallery and podiums. Verify the harness reports unique CPU keys and no repeated model within a card.
- [x] 9.3 Replace the Exotic Architecture and Specimen Count curiosity stat cards with Rarest CPU and Rarest GPU (fewest submissions across the platform), deduplicating each podium by model. Verify labels and numeric values in the harness.

## 10. Console-APU detection + Console APU card

- [x] 10.1 Extend `classifySpecimen()` console detection with console codenames (`bc-?250`, `liverpool`, `jaguar`, `oberon`, `ariel`, `durango`, `scarlett`, `grizzly`) and extend `es` detection with AMD OPNs (`100-0000…`). Verify with synthetic rows: BC-250 and Jaguar/Liverpool classify as `console`, an AMD OPN as `es`.
- [x] 10.2 Canonicalize console model names in `normalizeCPU()`/`normalizeGPU()`: `BC-250` → "PS5 APU (BC-250)", `Liverpool`/`Jaguar` → "PlayStation 4 APU (AMD)". Verify the canonical names appear in the resulting specimen keys.
- [x] 10.3 Replace the Rarest GPU curiosity stat card with **Console APU** (most-submitted console-derived APU, deduped by model). Verify the label and that the podium is populated when console rows are present.
- [x] 10.4 Update spec/proposal/design for the console taxonomy and card change; run `node --check`, the harness, `openspec validate`, and a local static serve.

## 11. Filters + Type column on submissions, remove Specimens gallery

- [x] 11.1 Remove the Specimens card gallery: delete `buildSpecimenCard()` and `renderSpecimenGallery()`, drop the `renderSpecimenGallery()` call from `renderCharts()`, and remove the gallery markup and card/grid CSS. Verify no `specimen-grid`/`buildSpecimenCard` references remain.
- [x] 11.2 Add a **Type** column to the submissions table rendering each run's specimen tag chips; verify the Type column and chips appear per row.
- [x] 11.3 Wire the tag filter bar directly to the submissions table (no gallery) and open the run detail modal when a table row is clicked. Verify selecting a tag filters the rows and clicking a row opens the modal.
- [x] 11.4 Update spec/proposal/design for the gallery removal, Type column, and row-click modal; run `node --check`, the harness, `openspec validate`, and a local static serve.

## 12. Oldest CPU / Oldest GPU stat cards

- [x] 12.1 Rename the Oldest Silicon card to **Oldest CPU** (same lowest-curated-CPU-year behavior across the platform) and replace the Rarest CPU card with **Oldest GPU** (lowest curated GPU year, deduped by normalized GPU model). Verify labels and year values in the harness and update spec/design/proposal.

## 13. Swap cards + fix counter bleed

- [x] 13.1 Swap the order of the **Rarest Specimen** and **Oldest CPU** cards (labels, tooltips, and value assignment). Verify the harness reports Rarest Specimen on card 1 (tier) and Oldest CPU on card 2 (year).
- [x] 13.2 Fix the "Oldest GPU" card showing a Performance value (e.g. 9178): track `animateCounter` frames per element, add `cancelCounter()`, and cancel the shared stat-grid counter frames at the start of `renderStats()` so an in-flight Performance animation cannot overwrite Curiosity values. Verify with a harness test that starts the Performance animation and confirms the frame is cancelled after switching to Curiosity.
- [x] 13.3 Fix a console false positive found on the live sheet: Intel Arc `(DG2)` GPUs matched the loose `\bdg\d` console pattern and appeared as tier-S specimens. Tighten the `dg` console/name pattern to a part number (`dg` + 3+ digits, e.g. `DG1501SML87LB`) and verify Arc A770/A750 `(DG2)` are no longer tagged `console` while `DG1501SML87LB` still is.
