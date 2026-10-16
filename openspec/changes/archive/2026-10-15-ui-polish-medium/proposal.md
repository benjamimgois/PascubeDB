# Proposal

## Why

Four medium-priority UI/UX issues remain from the dashboard review, all in daily-use surfaces: the leaderboard gives no visible cue about which filters are active and offers no way to clear them in one action; the rank/contributor columns are pinned with a hardcoded offset that breaks if the first column's width changes; each of the ~11 charts repeats its own tooltip styling so the tooltip language can drift; and the stat card label "Most Humble" does not tell the user what it actually measures.

## What Changes

- Show a removable indicator ("chip") for every active leaderboard filter and add a **Clear all** control that resets the search box and all dropdowns at once.
- Base the pinned columns' offset on the measured width of the first column instead of a hardcoded `left: 42px`, so rank + contributor stay aligned at any width.
- Centralize the Chart.js tooltip styling into one shared definition and apply it to every chart, keeping only per-chart callbacks.
- Rename the ambiguous stat label "Most Humble" to wording that states what it measures.

## Capabilities

### New Capabilities
- `leaderboard-table-layout`: pinned-column alignment in the leaderboard table.

### Modified Capabilities
- `dashboard-leaderboard-filters`: active-filter indicators and a clear-all action.
- `goverlay-theme`: a single shared Chart.js tooltip style applied across all charts.

## Impact

- `index.html`: active-filter chip container + Clear all button in the leaderboard filter row; default stat label text.
- `app.js`: filter-change path (compute active filters, render chips, clear-all handler), table render (measure pinned column), a shared tooltip style constant reused by all chart configs.
- `style.css`: chip/clear styles (reuse existing `.curiosity-chip` language), pinned-column rule.
- No new dependencies, no build step, no data changes.
