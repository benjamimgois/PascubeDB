# Design

## Context

PascubeDB is a static vanilla HTML/CSS/JS dashboard ([index.html](file:///mnt/NVME/Software/PascubeDB/index.html), [app.js](file:///mnt/NVME/Software/PascubeDB/app.js), [style.css](file:///mnt/NVME/Software/PascubeDB/style.css)) using Chart.js via CDN. See `proposal.md` for motivation and scope.

Currently:
- `renderDoughnutChart()` accepts raw arrays of labels/data/colors, and most callers (`kernelVersionChart`, `goverlayVersionChart`, `mesaVersionChart`, `osDistChart`, `handheldOsDistChart`) pass unsorted or 10+ slice distributions with 5-color arrays that wrap around.
- Software Benchmark cards bind two separate controls (`#*-toggle` for `normalize` and `#*-mode` for `absolute` / `delta`) into `chartVizState[type]`.
- Hardware Benchmark renders separate DOM canvases and aggregation calls for General, Mobile, and Handheld charts across both `Performance` and `Efficiency` pills.

## Goals / Non-Goals

**Goals:**
- Provide a single reusable `Top 5 + Others` formatter and 6-color palette for all high-cardinality doughnut charts, including an itemized `Others` tooltip breakdown.
- Consolidate Software Benchmark card headers to a single 3-state mode (`absolute` | `normalized` | `delta`) with conditional `Baseline` visibility.
- Replace duplicated Mobile/Handheld chart grids in `#tab-hardware` with a single set of Performance and Efficiency charts scoped by a `hwDeviceCategory` state (`all` | `desktop` | `mobile` | `handheld`).

**Non-Goals:**
- Changing the underlying Google Sheets schema or `classifyDevice()` heuristics.
- Removing the `Mobile Device Type` doughnut chart (`mobileDistChart`) or the `Handheld Operating Systems` doughnut chart (`handheldOsDistChart`) in System Demographics / Desktop Landscape.
- Changing the `Curiosity` pill or `Community Insights` tab.

## Decisions

### 1. Centralized `formatTopNWithOthers()` Helper for Doughnuts
- **Decision**: Introduce `formatTopNWithOthers(countsObj, limit = 5)` returning `{ labels, data, othersBreakdown }`, paired with a 6-color palette (5 distinct hues + neutral `#9ca3af` for `Others`). Extend `renderDoughnutChart()` with an optional `othersBreakdown` parameter so hovering `Others` appends the top 3–5 grouped entries (e.g., `6.12 (4), 6.8 (3), 5.15 (2)...`) to the tooltip.
- **Alternative considered**: Converting Kernel/GOverlay/Mesa to horizontal bar charts. Rejected per user preference to keep the compact 4-column grid with `Top 5 + Others`.

### 2. Unified 3-Mode State for Software Comparison Cards
- **Decision**: Replace `chartVizState[type].mode` + `chartVizState[type].normalize` with a single `mode` value: `'absolute' | 'normalized' | 'delta'`. Remove `.chart-toggle-wrap` from the 4 software scatter cards in `index.html` and add a `Normalized %` button to each `#*-mode` `.chart-mode-group`. Toggle a `.is-hidden` class (or `hidden` attribute) on the `.baseline-row` containing `#*-baseline` whenever `mode !== 'delta'`.
- **Global `Normalize all` integration**: When `#normalize-all-cb` is toggled on, software cards switch to `'normalized'`; when toggled off, cards in `'normalized'` return to `'absolute'` (leaving `'delta'` cards intact or resetting based on global toggle behavior).
- **Alternative considered**: Keeping `Normalize` as a separate toggle and disabling it in `Delta %` mode. Rejected because it still leaves redundant controls in the header.

### 3. Single Scoped Chart Set in Hardware Benchmark
- **Decision**: Add `let hwDeviceCategory = 'all'` in `app.js` and a compact segmented control (`All` | `Desktop` | `Mobile / SBC` | `Handheld`) in `.hw-tab-bar` (or immediately below it). Create a helper `getHardwareScopedData()` that filters `benchmarkData` using `classifyDevice(r)`:
  - `'all'`: all rows
  - `'desktop'`: rows where `classifyDevice(r)` is not `'Notebook'`, `'SBC'`, or `'Handheld'`
  - `'mobile'`: rows where `classifyDevice(r)` is `'Notebook'` or `'SBC'` (and when computing GPU rankings, excludes desktop-only discrete GPUs without `laptop`/`mobile` suffix, matching existing `getTopCategoryGPUs` logic)
  - `'handheld'`: rows where `classifyDevice(r)` is `'Handheld'`
- Remove the 14 duplicated Mobile/Handheld canvases from `index.html` (`notebookRunsChart`, `handheldRunsChart`, `mobileCpuSingChart`, `handheldCpuSingChart`, `mobileCpuMultiChart`, `handheldCpuMultiChart`, `mobileGpuChart`, `handheldGpuChart`, `mobileGpuRtChart`, `handheldGpuRtChart`, `mobileCpuEffChart`, `handheldCpuEffChart`, `mobileGpuEffChart`, `handheldGpuEffChart`, `mobileThermalEffChart`, `handheldThermalEffChart`, `mobileTopCpuBottleneckChart`) and their rendering blocks in `app.js`. Move `mobileDistChart` (`Mobile Device Type`) into the `System Demographics` section alongside `cpuBrandDistChart` / `gpuBrandDistChart`.
- **Alternative considered**: Keeping Mobile/Handheld charts in a collapsible `<details>` accordion. Rejected because maintaining 2x/3x duplicate Chart.js instances and HTML markup slows rendering and clutters `app.js`.

## Risks / Trade-offs

- **[Risk] Removing Mobile/Handheld canvas IDs breaks hardcoded references in `app.js` or `chartNorm` state** → Mitigation: Grep all references to every removed canvas ID across `index.html`, `app.js`, and `style.css` before deleting, and remove orphaned helper functions/event bindings cleanly.
- **[Risk] Small sample sizes when scoped to `Handheld` or `Mobile / SBC` in Bottleneck / Thermal charts** → Mitigation: Ensure empty-state messaging or graceful empty chart handling when a scoped category has `< 2` matching runs.
- **[Risk] `openspec/changes` has older in-progress changes touching `hardware-tab-restructure` or `mobile-efficiency-charts`** → Mitigation: This change targets the current live codebase (`index.html`, `app.js`, `style.css`) directly without modifying archived or unrelated change folders.
