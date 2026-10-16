# Design

## Context

See `proposal.md - Why`. Constraints shaping the approach:

- Static site: `index.html` + `style.css` + vanilla `app.js`. No build step.
- Leaderboard filters live in `.leaderboard-filters` (search input + 6 selects); filter state is read in `handleFilterChange()` and written back to the URL. There is already a mobile "Filters" toggle button.
- The pinned-column offset is hardcoded: `.modal-dialog table td:nth-child(2) { left: 42px }` paired with `<col style="width:42px">`.
- Chart tooltips are repeated in ~11 chart configs. Values are already identical today (bg `rgba(17,22,34,0.98)`, cyan border 1.5, padding 12, cornerRadius 10, Outfit title / Inter body) — the risk is future drift, not current mismatch.
- The `curiosity-chip` component already provides the chip visual language the filter indicators can reuse.

## Goals / Non-Goals

**Goals:**
- Make active filters visible and individually removable, with one clear-all action.
- Make pinned-column alignment robust to width changes.
- Guarantee one tooltip look across all charts via a single source of truth.
- Replace the ambiguous "Most Humble" label.

**Non-Goals:**
- Not adding new filters or changing filter semantics.
- Not redesigning the leaderboard table or the filter row layout.
- Not changing chart data, scales, or callbacks.
- Not touching the mobile filter-collapse behavior.

## Decisions

### 1. Active filter chips reuse the `curiosity-chip` language

Render active filters as chips in a container above/below the filter row. Each chip carries the filter's human label + current value and a remove control. Chips are derived from the same state `handleFilterChange()` already reads, so there is one source of truth.

**Alternative considered:** a multi-select UI replacing the dropdowns. Rejected — larger change than the friction warrants; chips over the existing select-based model are additive.

### 2. Clear-all resets inputs then re-runs the existing filter path

The clear-all control sets `#search-input` to empty and every filter select to its default, then calls the existing `handleFilterChange()`. This reuses URL sync and re-render logic; no new filtering code path.

**Alternative considered:** a separate reset function that mutates `filteredData` directly. Rejected — would bypass URL sync and the lazy-pill invalidation already in `handleFilterChange()`.

### 3. Pinned-column offset from measured width

Instead of `left: 42px`, the second pinned column's offset is derived from the actual rendered width of the first column. Approach: set a CSS custom property (e.g. `--pin-col1-width`) from JS after render (`firstCell.getBoundingClientRect().width`) and use `left: var(--pin-col1-width)` for the sticky rule. Falls back to the current value if JS measurement is unavailable.

**Alternative considered:** fixing the first column with `table-layout: fixed` and a fixed width. Rejected — the table already uses `table-layout: fixed` with a `<colgroup>`, but gold/silver/bronze rank content varies; measuring is more faithful.

### 4. Shared tooltip style constant

Define one `CHART_TOOLTIP_STYLE` (bg, border, borderWidth, padding, cornerRadius, titleFont, bodyFont, displayColors) in `app.js` and spread it into each chart's `tooltip` config; per-chart `callbacks` remain local. This removes ~11 copies of the same literal.

**Alternative considered:** a Chart.js plugin that mutates all tooltips. Rejected — more indirect and harder to reason about than a shared config object.

### 5. Rename "Most Humble"

Set the performance pill's fourth label to wording that states the measured thing (the lowest recorded Main Score). Exact string finalized in implementation; it lives in `STATS_PILL_LABELS.performance` and the static default in `index.html`.

## Risks / Trade-offs

- **[Chips add vertical space to the filter row]** → Mitigation: hide the chip area entirely when no filter is active; keep chips to one wrapped row.
- **[Measuring the first column on every render costs layout reads]** → Mitigation: measure once after render; width is stable because the table uses a fixed `<colgroup>`.
- **[Spreading a shared tooltip object could be overridden per chart accidentally]** → Mitigation: place per-chart `callbacks` only; verify all 11 configs no longer carry the style literals.
- **[Rename may not match user expectation]** → Trade-off accepted; keep it descriptive and reversible.

## Migration Plan

Static assets — no migration. Deploy via normal push; rollback = revert the commit.

## Open Questions

- Final wording for the renamed stat label ("Lowest Main Score" vs alternatives) — deferrable, does not change the specs or approach.
