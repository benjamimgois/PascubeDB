# Proposal

## Why

The **Leaderboard & Compare** tab currently pushes the benchmark table far below the fold due to a tall 3-tier **Compare Your Hardware** card, an isolated right-aligned toolbar, and a separate result-count line. In addition, the **Compare** workflow requires an extra mode-toggle step before selecting runs, and the **Benchmark comparison** view lists 13 metrics in a flat table without visual charts or category grouping.

## What Changes

- **Compact Split Header & Unified Toolbar (Option A + C):**
  - Reorganize `#hw-compare-card` into a horizontal 2-column split on wide viewports (search input + title on the left, 4 percentile cards on the right) to cut vertical height by ~45%.
  - Merge the result counter (`#leaderboard-count`) onto the left side of `.leaderboard-toolbar` and allow the filter search input (`#search-input`) to expand (`flex: 1`) across the 1800px container.
- **Streamlined Direct Compare Workflow:**
  - Keep row selection checkboxes always accessible in the `#` column and remove the redundant mode-toggle `Compare` button from `.leaderboard-toolbar`.
  - Automatically reveal the sticky `#compare-bar` whenever 1 or more runs are selected, showing `Compare (N)`.
  - When a pinned baseline is active, clicking `Compare` on any leaderboard row pre-selects the pinned baseline alongside that row (or opens comparison directly against the baseline with 1 click).
- **Enhanced Benchmark Comparison View (`#compare-view`):**
  - Add an interactive comparative charts section (normalized **Radar** chart and normalized **Category Bars**, toggleable) above the metrics table.
  - Group the 13 comparison metrics into 4 scannable sections (**Performance**, **Efficiency**, **Clocks & Power**, **Thermals**), tighten `Metric` column width with subtle row striping, and highlight the best value per row (`★`).

## Capabilities

### New Capabilities
- None (all changes refine existing capabilities).

### Modified Capabilities
- `leaderboard-table-layout`: Compact horizontal split for the hardware percentile summary card, unified toolbar with inline result count, expandable filter search bar, and always-accessible row selection checkboxes without a separate compare-mode toggle.
- `benchmark-comparison`: One-click row comparison against a pinned baseline, auto-revealed floating compare bar, toggleable comparative charts (radar + normalized bars), and 4-section grouped metric table with best-value highlighting.

## Impact

- `index.html`: Restructure `#hw-compare-card` markup for horizontal split, move `#leaderboard-count` into `.leaderboard-toolbar`, remove `#compare-mode-btn`, and add chart/toggle containers in `#compare-view`.
- `style.css`: Responsive split grid for `.hw-compare-card`, unified toolbar alignment, flexible `#search-input`, always-visible subtle checkboxes, and sectioned comparison table + chart layout styles.
- `app.js`: Always-on selection checkbox handlers, 1-click baseline compare action, SVG/Canvas comparative chart rendering (radar + normalized bars), and grouped section rendering in `renderCompareResults()`.
