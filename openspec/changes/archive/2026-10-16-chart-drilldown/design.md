# Design

## Context

See `proposal.md` — Why. Current state that shapes the approach:

- Charts are Chart.js canvases built by `renderHorizontalBarChart` (`app.js:6973`) and `makeChartScrollable` (`app.js:7376`). Neither wires `onClick`/`onHover`; datasets already carry arrays (`clientIds`, `cpus`, `gpus`, `startIndex`) aligned to the bars.
- Charts whose bars are individual runs already compute a per-bar source row (e.g. `cpuSingleRuns = Object.values(cpuSingleBest)…`, `app.js:4589`; `mainRuns = dedupByBestScore(benchmarkData)…`, `app.js:4553`). Aggregated charts (popularity, averages, efficiency, distributions) do not.
- The leaderboard already renders one row per `filteredData` entry (`renderTable`, `app.js:2261`) and combines filters in `handleFilterChange` (`app.js:1781`). Its CPU/GPU filters compare **raw** strings (`row.cpu === cpuSelection`).
- `getTopMobileRuns` / `getTopHandheldRuns` (`app.js:3394`, `app.js:3378`) map rows to `{ label, score, … }`, dropping the row reference.

## Goals / Non-Goals

**Goals:**
- One consistent drilldown: click a bar whose source is a single run → leaderboard filtered to that run's normalized CPU + GPU.
- Reuse the leaderboard modal, table, sort, detail modal, and active-filter chips; add only the minimum.
- Precise matching (normalized), not fuzzy search.

**Non-Goals:**
- No new modal/table; no chart→chart navigation (keeping the clicked bar focused).
- No keyboard interaction for charts.
- No clicking on aggregated charts.

## Decisions

### D1. Clickability = the bar maps to one run; always group by CPU+GPU

A chart is clickable iff its bars are derived from single benchmark rows. The click resolves the row behind the bar and filters by `normalizeCPU(row.cpu)` **and** `normalizeGPU(row.gpu)` (per decision), not by the chart's own dimension. This gives the exact hardware combo everywhere, uniformly.

**In scope (single-row bars):** `mainOverallChart`, `cpuSingleChart`, `cpuMultiChart`, `gpuChart`, `gpuRtChart`, `mobileCpuSingChart`, `mobileCpuMultiChart`, `mobileGpuChart`, `mobileGpuRtChart`, `handheldCpuSingChart`, `handheldCpuMultiChart`, `handheldGpuChart`, `handheldGpuRtChart`, `notebookRunsChart`, `handheldRunsChart`.

**Out of scope (aggregate/derived):** `cpuPopularChart`, `gpuPopularChart`, `topContributorsChart`, `cpuAverageChart`, `gpuAverageChart`, all efficiency/thermal charts, and all distribution donuts.

**Alternative rejected:** filter by the chart's own dimension (CPU-only for CPU charts) — the user chose full CPU+GPU.

### D2. Pass the source rows to the builder; wire `onClick`/`onHover` in the two builders

Add an optional `clickRows` parameter to `renderHorizontalBarChart` / `makeChartScrollable` (the array of source rows in bar order). The builder sets `options.onClick` to resolve `row = clickRows[startIndex + dataIndex]` and call `openLeaderboardForHardware(row)`; `options.onHover` sets the canvas cursor to pointer when a bar is hit, default otherwise. Charts without `clickRows` get no handlers.

Two call sites need their source rows attached: `getTopMobileRuns` / `getTopHandheldRuns` must keep the original row (add `row: r` to the mapped object, or return rows and map labels at the call site).

**Alternative considered:** a `CHART_CLICK[canvasId]` registry — works but scatters the mapping away from the build call; passing `clickRows` keeps it colocated.

### D3. Leaderboard hardware-combo filter (normalized)

Add module state `leaderboardHardwareFilter = null | { cpu, gpu }` (normalized strings). In `handleFilterChange`, include `(!hw || normalizeCPU(row.cpu) === hw.cpu) && (!hw.gpu || …)`. `openLeaderboardForHardware(row)` sets it, calls `handleFilterChange()`, then `showModal()` + `body.modal-open`.

The filter is surfaced through the existing active-filter chip list and cleared on the modal's `close` handler (so the header "Leaderboard" button reopens unfiltered).

**Alternative rejected:** set `#cpu-filter`/`#gpu-filter` to raw values or set the search box — raw exact misses normalized siblings and search over-matches (e.g. `5600` vs `5600X`).

### D4. Modal context

The leaderboard title stays "Community Leaderboard"; when opened by a drilldown, the headers/active-filter chip already show the hardware (the chip reads e.g. `Hardware · Ryzen 5 5600 + RX 580`), so no title change is required.

## Risks / Trade-offs

- **Over-narrow filter**: requiring CPU+GPU equality can yield very few rows (down to 1–2). Accepted — it is the exact hardware, and the leaderboard count still communicates it.
- **Source rows dropped in mobile helpers** → must attach the row or the click silently no-ops; covered by a task and verified.
- **Charts re-render on resize/normalize/filter toggle** → handlers live in `options`, so they survive rebuilds; verify after a normalize toggle.
- **Filter leaking between opens** → cleared on close; verify the header button opens unfiltered afterwards.
- **Aggregated charts accidentally wired** → only pass `clickRows` where a single row exists.

## Migration Plan

Static site, no migration. Deploy via GitHub Pages; rollback = revert the `app.js` commit.
