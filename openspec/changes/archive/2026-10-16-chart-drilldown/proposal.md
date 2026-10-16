# Proposal

## Why

The charts are dead ends: you can see that `Ryzen 5 5600 + RX 580` won a category, but you cannot get from that bar to the actual test rows behind it. Each row of the Google Sheet is one test run, so a chart bar that maps to a single row should be a doorway to that hardware's full submission history. Today only the leaderboard table (and its detail modal) can show runs, and there is no way to jump to it from a chart.

## What Changes

- Make chart bars **clickable** for the charts whose bars correspond to a single, identifiable benchmark row (not averages/aggregates). Clicking a bar opens the existing **leaderboard modal** filtered to that row's exact hardware (normalized CPU + normalized GPU).
- Add a **hardware-combo filter** to the leaderboard (normalized CPU + GPU equality), applied alongside the existing filters, shown as a removable active-filter indicator, and cleared when the modal closes so the header "Leaderboard" button still opens unfiltered.
- Add a hover affordance (pointer cursor) on clickable bars.
- Charts that are aggregations or averages (popularity counts, averages, efficiency/thermal ratios, brand/RAM/VRAM/OS distributions, top contributors) stay non-clickable, since a single source row cannot be identified.

### Non-goals

- No new modal or table; the leaderboard modal, its table, sort, and detail modal are reused.
- No keyboard interaction for charts (hover + click only, per decision).
- No change to the leaderboard's existing filters, sorting, or columns.

## Capabilities

### New Capabilities

- `chart-drilldown`: clicking a data bar that maps to a single benchmark run opens the leaderboard filtered to that run's hardware.

### Modified Capabilities

- `dashboard-leaderboard-filters`: multi-criteria filtering gains a normalized hardware-combo filter that can be set programmatically (from a chart click), is shown as a removable indicator, and is cleared on modal close.

## Impact

- `app.js`: `renderHorizontalBarChart` / `makeChartScrollable` gain an optional click descriptor + `onClick`/`onHover`; the in-scope call sites pass their source rows; `getTopMobileRuns` / `getTopHandheldRuns` carry the row reference; `handleFilterChange` gains the hardware predicate; new `openLeaderboardForHardware()`; leaderboard close clears the hardware filter. Active-filter chips pick up the new filter.
- `openspec/specs/dashboard-leaderboard-filters/spec.md` and a new `openspec/specs/chart-drilldown/spec.md`.
- No new dependencies; no HTML/CSS changes expected (reuses the leaderboard modal).
