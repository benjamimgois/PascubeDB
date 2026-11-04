# Design

## Context

See `proposal.md` — Why. The leaderboard modal already owns the searchable/filterable table (`benchmarkData` → `filteredData` → `renderTable()`), and `benchmarkData` rows are stable objects across filtering and sorting. There is no row-level selection today. The software charts already use a multi-select modal and signed delta bars, so the visual language and checkbox patterns exist; this feature adds a run-level compare state and an in-modal results view.

## Goals / Non-Goals

**Goals:**

- Add run-level selection and comparison without a new page or backend.
- Keep selection stable while the user searches/filters/sorts.
- Make percentage deltas precise, readable, and accessible.
- Reuse existing modal, table, and delta visual patterns.

**Non-Goals:**

- No chart-based comparison in the MVP.
- No shareable comparison URL.
- No persistent “my run” identity across sessions.
- No aggregate/median comparison or automatic same-hardware filtering.
- No changes to leaderboard filtering semantics.

## Decisions

### D1. In-modal compare view instead of a nested dialog

The leaderboard modal gets two views: the normal table view and a compare results view. The compare view replaces the filters/table area and provides a Back action. This avoids stacking dialogs and keeps the selection visible in the same context.

Alternative considered: a separate `<dialog>` opened over the leaderboard. Rejected because nested modal focus/backdrop handling adds risk for little UX gain.

### D2. Selection state by row reference

Use a small `compareState`:

```
compareState = {
  active: boolean,
  selection: BenchmarkRow[],
  baseline: BenchmarkRow | null,
  view: 'leaderboard' | 'results'
}
```

Rows are stored by object reference because `filteredData` contains references into the stable `benchmarkData` array. Selection therefore survives search, filter, and sort changes without key reconstruction. Clear it when the leaderboard modal closes or new benchmark data is loaded.

Alternative considered: serialized keys (`clientId + dateTime`). Rejected for the MVP because duplicates and missing client IDs complicate identity; references are sufficient for a single-page session.

### D3. Compare mode uses a checkbox inside the rank cell

When compare mode is active, render a compact checkbox inside the rank cell, immediately before the rank number. This preserves the existing pinned rank/contributor columns and avoids adding a table column. Outside compare mode the rank cell renders normally. Row clicks also toggle selection as a convenience, except when the click lands on the username badge or another interactive control.

The compare bar is sticky inside the modal and shows selected count, baseline label, Clear, and Compare. Compare is disabled below two selections. Attempting a sixth selection shows the five-run limit instead of adding the row.

Alternative considered: no extra column, using only row clicks and row highlighting. Rejected because checkboxes are clearer and keyboard/screen-reader friendly.

### D4. Baseline is explicit and changeable

The first selected row becomes the baseline. The baseline is marked in the compare bar and results view. The results view exposes a baseline selector populated with all selected runs; changing it recalculates every delta. Deselecting the baseline promotes the next selected run.

### D5. Delta computation is a pure client-side function

For each selected run and metric in `[mainScore, cpuSingle, cpuMulti, gpuScore]`:

```
delta = ((value - baselineValue) / baselineValue) * 100
```

Positive means the selected run is higher. Values are shown with one decimal, e.g. `+4.1%`, `-7.1%`, `0.0%`. If the baseline value is zero, missing, or `N/D`, the delta is `N/D`. If a selected run's value is missing, both its value and delta are `N/D`. The function takes rows and baseline and returns a display-ready matrix; it does not touch the DOM.

### D6. Results view emphasizes the baseline and explains context

The compare view contains:

1. A baseline selector.
2. A per-run summary row/cards with contributor, CPU, GPU, RAM, VRAM, OS, kernel, driver, and global rank.
3. A metric table: Metric | Baseline | Run B | Δ% | Run C | Δ% ...
4. A same-hardware badge when every run's normalized CPU+GPU matches the baseline, otherwise a warning that deltas include hardware differences.
5. Back to leaderboard and Close actions.

Absolute values and deltas are both shown; color is supplemental. The table scrolls horizontally on narrow screens, and the summary cards stack.

### D7. Accessibility is part of the selection model

Use real checkbox inputs for selection with accessible labels, `aria-pressed` on the Compare toggle, an `aria-live` compare bar, and `scope="col"` headers on the results table. Deltas include an explicit sign so meaning is not color-only. Row click toggling is an additional affordance, not the only way to select.

### D8. Lifecycle

- Entering compare mode clears any previous selection.
- Leaving compare mode clears selection and baseline.
- Closing the leaderboard modal clears compare state.
- Refreshing benchmark data clears compare state.
- Leaving the results view keeps the selection intact so the user can adjust it.

## Risks / Trade-offs

- [Wide leaderboard table on mobile] → Hide the checkbox column outside compare mode and keep the results table horizontally scrollable.
- [Deltas misleading across different hardware] → Show a same-hardware badge or a hardware-differences warning.
- [Selection lost on data refresh] → Intentional; avoid comparing stale rows against newly loaded data.
- [Zero/missing scores produce broken percentages] → Return `N/D` for zero/missing baselines and selected values.
- [Row click conflicts with username drilldown] → Stop propagation on interactive cells and keep real checkboxes as the primary control.
- [Modal view state confusion] → Explicit Back action and a visible compare-mode/baseline state in the compare bar.

## Migration Plan

1. Add compare toggle, compare bar, and results view markup inside the leaderboard modal.
2. Add compare state, selection handlers, and reset lifecycle.
3. Add delta computation and results rendering.
4. Add responsive styles and accessibility attributes.
5. Verify with headless browser flows: select across filters, change baseline, deselect baseline, max selection, close/reopen.
6. Rollback is a revert of the three static files; no data migration.

## Open Questions

None blocking. A delta bar chart, shareable comparison URL, “same hardware only” quick filter, and remembered client ID can be separate follow-up changes.
