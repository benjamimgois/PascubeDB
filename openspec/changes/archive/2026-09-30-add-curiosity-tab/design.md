# Design

## Context

The dashboard is a static, no-build vanilla JS app. The Hardware tab has three pills (`performance`, `curiosity`, `efficiency`) sharing one context-switched stat grid; pill content is lazy-rendered on activation via `switchPill()` (`app.js:187`). `benchmarkData[]` already carries the fields needed for curation: `cpu`, `gpu`, `architecture`, `productName`, `os`, `kernel`, scores, temps, and frequencies. Existing helpers are reusable: `normalizeCPU()` / `normalizeGPU()` (already map `eng sample`, `dg` and console codenames), `classifyDevice()` (Handheld / SBC / Notebook / Desktop), and `getGPUBrandDistribution()` (Broadcom `VideoCore`, ARM `Mali`, `llvmpipe`).

Notable pre-existing quirk: `renderSystemCharts()` rendered the thermal bar charts into canvas IDs that lived in the Thermals pill, not the System tab — dead cross-tab wiring. Those canvases are removed along with the pill. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- One classifier that produces tags, tier, and reason strings, reused by the submissions table, the run detail modal, the stat cards, and the leaderboard table.
- Deterministic, testable curation rules (tag entry, de-duplication by hardware).
- A dedicated Curiosity pill that filters the real submitted benchmarks and shows each run's type.
- Clean removal of the Thermals pill and its orphaned System-tab chart wiring.

**Non-Goals:**
- No new data source or schema change.
- No Chart.js rendering for the Curiosity view — the submissions table and modal are DOM.
- No changed behavior for `sbc-devices` or `portable-device-*`.
- No automatic inference of release year from raw strings beyond the curated tables.

## Decisions

### Tag-based entry, not count-based

A run is "curious" when its hardware has one or more specimen tags. Count is shown as metadata, not as the entry gate. Count answered "how often", which every other chart already covers. Alternative (rarity score gate) was rejected: a single-sample ordinary GPU would still qualify.

### Compose a new `classifySpecimen(row)` instead of extending `classifyDevice()`

`classifyDevice()` returns one class and returns early (`app.js:2331`), which cannot express overlapping tags like "server", "fossil", and "anachronism" on the same row. The new classifier collects tags independently and derives `tier = max(tag tiers)`.

Signature:
```
classifySpecimen(row) -> {
  tags: string[],                                  // e.g. ['sbc','fossil']
  tier: 'S'|'A'|'B'|'C'|null,
  reasons: string[],                               // one per tag, template-filled
  key: string                                      // normalized CPU model (hardware identity)
}
```

### Curated year tables over generation regex

`fossil` and `anachronism` need a release year the raw data does not contain. A curated `CPU_YEARS` / `GPU_YEARS` table keyed by model/family is precise and predictable; generation regex is broader but misclassifies suffixes and OEM variants. False positives are accepted only for `es` (per proposal), not for year tags — unknown models skip year-based tags.

### Console-APU detection covers console-derived silicon

The sheet contains a large population of console-derived APUs that the original detector missed: `BC-250` / `AMD BC-250` (61 submissions, PS5-derived Oberon lineage) and PlayStation 4 `Jaguar` CPU + `AMD Liverpool` GPU. Detection is extended with console codenames (`bc-?250`, `liverpool`, `jaguar`, `oberon`, `ariel`, `durango`, `scarlett`, `grizzly`) alongside the existing `dg` prefix and literal name list. The `dg` pattern requires a part number (`dg` + 3+ digits, e.g. `DG1501SML87LB`); the looser `dg\d` matched Intel Arc `(DG2)` GPUs and wrongly tagged them as tier-S consoles, so it was tightened. `normalizeCPU`/`normalizeGPU` canonicalize `BC-250` → "PS5 APU (BC-250)" and `Liverpool`/`Jaguar` → "PlayStation 4 APU (AMD)" so the table and modal show meaningful names. Engineering-sample detection also accepts AMD OPNs (`100-0000…`). Rejected alternative: matching on the sheet's `device-type` column, which mislabels console boards as `desktop`.

### Curiosity pill hosts filters + submissions, not a card gallery

The pill bar models "lazy, switchable content". A standalone card gallery duplicated the leaderboard row concept and read as static, so the Curiosity pill filters the real submitted-benchmark runs and annotates each with its type. The tag filter bar is applied directly to the table; there is no separate Specimens card grid. Replacing the Thermals pill reuses an existing lazy-render hook, the shared stat grid, and URL `subtab` state.

Pill wiring changes:
- `PILL_STATE.rendered`: `thermals` → `curiosity`.
- `switchPill()`: `if (name === 'curiosity') renderCuriosityCharts()` (filter bar + summary + table, nothing canvas-based).
- `initPillNav()` URL parsing accepts `curiosity`.
- `renderStats()` pill list and labels/tooltips: `thermals` → `curiosity`.
- Filter-invalidation flag: `rendered.curiosity = false`.

### Submissions table with a Type column; modal on row click

The table is the primary surface: one row per submitted run, showing contributor, CPU, GPU, a **Type** column of the run's specimen tags, main/CPU/GPU scores, and date, with a proportional inline main-score bar. A device selector (restricted to the active tag) and a sort control narrow and order the rows; rows are capped with a total count. Clicking a row opens the run detail modal, which reuses the existing `<dialog>` + `::backdrop` pattern. De-duplication is by normalized CPU model, so the same hardware never appears twice.

### Shared collector and view state

`collectSpecimenData()` classifies once and returns `{ annotated, sampleCounts, specimens, tagCounts }`, consumed by the filter bar, summary, and table to avoid repeated classification and divergent logic. A single module-scope `curiosityState = { tag, deviceKey, sort }` drives all three.

### Curiosity stat cards

The shared 4-card grid is repurposed (not hidden):
- **Rarest Specimen**: highest-tier specimen present (S first, then A); value = tier letter, sub = `normalizeCPU + normalizeGPU`.
- **Oldest CPU**: row with the lowest curated `CPU_YEARS` year; value = year, sub = `normalizeCPU`.
- **Oldest GPU**: row with the lowest curated `GPU_YEARS` year; value = year, sub = `normalizeGPU`.
- **Console APU**: most-submitted console-derived APU; value = sample count, sub = canonical model name (e.g. "PS5 APU (BC-250)").

Each card deduplicates its podium by hardware model so the same model never occupies two positions. `renderStats()` cancels any in-flight `animateCounter` frame for the shared stat-grid value elements before writing, so a Performance-pill counter animation cannot bleed into the Curiosity values.

### Leaderboard chips share the classifier

`renderTable()` renders up to three chips using `classifySpecimen(row).tags`, sliced to 3, inside the CPU cell (no column-count change).

### Thermal removal is a code cleanup, not just hidden markup

Delete `renderThermalsCharts()`, `renderVendorChartClosure()`, `renderCatChartClosure()`, the thermal sub-block inside `renderSystemCharts()`, the `thermals` branch in `renderStats()`, and the now-unused helpers `getHottestGPU`, `getBestCooling`, `getCategoryHottestRuns`, `getVendorHottestRuns`, `getVendorBestCooling`. Removing the canvases alone would leave dead rendering paths; removal is verified by searching for zero remaining references.

### Tier color tokens (4 new)

```
--tier-s: #e879f9;   --tier-s-bg: rgba(232,121,249,0.15);  /* legendary */
--tier-a: #a78bfa;   --tier-a-bg: rgba(167,139,250,0.15);
--tier-b: #38bdf8;   --tier-b-bg: rgba(56,189,248,0.15);
--tier-c: #94a3b8;   --tier-c-bg: rgba(148,163,184,0.15);
```
S reuses the freed magenta from `SCORE_COLORS.rare` (removed). Filter chips use their tag tier color; table tags use the neutral chip style.

## Risks / Trade-offs

- **False-positive `es` on unresolvable `0000`/OPN CPUs** → accepted per proposal; chip label is descriptive, not authoritative.
- **Year table drift as hardware ages** → literal, easy to extend; unknown models degrade gracefully.
- **Large curious populations (BC-250)** → the table caps visible rows with a total count.
- **Removing Thermals orphans an in-flight change** → flagged in the proposal; `hardware-tab-restructure` and `add-mobile-bottleneck-thermal` must drop their thermals-pill requirements before archiving.
- **Removing `renderSystemCharts` thermal block** → canvases are only in the Thermals pill; removing both sides is consistent. Verify no remaining reference to the removed canvas IDs.
- **Modal accessibility** → reuse the existing `<dialog>` behavior; add backdrop-click close consistent with the leaderboard modal.

## Migration Plan

1. Update pill state, navigation, and stat labels from `thermals` to `curiosity`.
2. Remove the Thermals pill markup and canvas IDs; add the Curiosity pill markup (filter bar + summary + submissions table) and the modal.
3. Swap the thermal render/stats code for the curiosity equivalents; add the classifier, filter bar, table with Type column, stats, and modal logic.
4. Add CSS tokens, filter chip/summary styles, table Type column styles, and modal styles; remove the card/grid styles.
5. Verify: `node --check`, a Node harness against the fallback dataset plus synthetic console rows, local static serve, and a repository-wide search confirming zero thermal references.
6. Rollback: revert the four files; no persisted state or data migration.

## Open Questions

- Section copy inside the pill ("Curiosity" vs "Curiosities") — copy-only.
- Whether to paginate the submissions table beyond the visible cap — deferrable.
