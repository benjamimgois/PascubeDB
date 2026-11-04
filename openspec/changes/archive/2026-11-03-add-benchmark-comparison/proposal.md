# Proposal

## Why

The leaderboard can filter, search, and sort runs, but it cannot compare them. Users who want to know how their own benchmark differs from selected runs must mentally compare rows and calculate percentages. A run-level comparison view makes the existing data directly useful for “how much faster/slower am I?” questions.

## What Changes

- Add a **Compare mode** to the leaderboard modal with a toggle next to Filters.
- Let users select 2–5 benchmark runs; the first selected run is the baseline by default.
- Keep the selection across search, filter, and sort changes so users can find their own run, select it, then filter for other runs without losing the selection.
- Add a sticky compare bar showing selected runs, the current baseline, Clear, and Compare actions.
- Add an in-modal **Compare view** with:
  - A baseline selector.
  - Absolute values and signed percentage deltas for Main Score, CPU Single, CPU Multi, and GPU Score.
  - Run context (contributor, CPU, GPU, RAM, VRAM, OS, kernel, driver, global rank).
  - A same-hardware badge when selected runs share the baseline's normalized CPU+GPU, or a warning when hardware differs.
- Handle missing or zero baseline values as `N/D`.
- Add keyboard and screen-reader support for selection, the compare bar, and the results table.
- Clear compare state when the leaderboard modal closes or benchmark data is refreshed.

## Capabilities

### New Capabilities

- `benchmark-comparison`: run selection, baseline choice, percentage-delta computation, comparison results view, and comparison accessibility.

### Modified Capabilities

None.

## Impact

- `index.html`: compare toggle, compare bar, and compare view markup inside the leaderboard modal.
- `app.js`: compare state, selection handling, delta computation, comparison rendering, baseline switching, reset lifecycle, and keyboard behavior.
- `style.css`: compare mode row states, selection controls, sticky bar, comparison cards/table, delta indicators, and responsive layout.
- No backend, API, dependency, or build-step changes.
