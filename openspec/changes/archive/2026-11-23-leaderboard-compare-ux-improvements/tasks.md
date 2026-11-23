# Tasks

## 1. Compact Header Split, Unified Toolbar & Filter Bar (Option A + C)

- [x] 1.1 Restructure `#hw-compare-card` in `index.html` and `style.css` into a 2-column horizontal split on desktop (`>= 1024px`, search controls left, 4 percentile cards right) with stacked mobile fallback, and verify no horizontal overflow at 1920px and 375px viewports.
- [x] 1.2 Move `#leaderboard-count` into `.leaderboard-toolbar` (left-aligned) in `index.html` and `style.css`, remove `#compare-mode-btn`, and verify the toolbar renders on a single row with grouping/baseline controls on the right.
- [x] 1.3 Update `.leaderboard-filters` in `style.css` and `index.html` so `#search-input` expands (`flex: 1`) across the 1800px container and standardize filter default labels (`All OS`, `All RAM`, `All VRAM`, `All Arch`), verifying placeholder text is not truncated on desktop.

## 2. Streamlined Direct Compare & 1-Click Baseline Flow

- [x] 2.1 Update `app.js` and `style.css` to keep `.compare-row-checkbox` always accessible in the `#` column without a mode toggle, auto-show `#compare-bar` whenever `>= 1` run is selected with `Compare (N)`, and verify keyboard/screen-reader accessibility and pinned column alignment.
- [x] 2.2 Update row `Compare` button behavior in `app.js` so that when `pinnedBaselineRow` is active, clicking `Compare` on a non-baseline row selects `[pinnedBaselineRow, row]` and opens `#compare-view` directly (falling back to toggling selection when no baseline is pinned), verifying both paths in the browser.

## 3. Enhanced Benchmark Comparison View (Charts + Grouped Metrics)

- [x] 3.1 Add a `Show Charts` toggle (`compareShowCharts`, default `true`) and render an inline SVG normalized 6-axis Radar chart plus normalized horizontal category bars in `renderCompareResults()` (`app.js`, `style.css`), verifying safe rendering when `N/D` values are present.
- [x] 3.2 Group `COMPARE_METRICS` in `app.js` and `style.css` into 4 sections (`Performance`, `Efficiency`, `Clocks & Power`, `Thermals`), constrain the `Metric` column width with subtle zebra striping, and highlight the best valid value (`★`) per row respecting `lowerIsBetter`, verifying `node --check app.js` and visual rendering for 2 and 3 runs.

## 4. Validation & Final Verification

- [x] 4.1 Run `openspec validate leaderboard-compare-ux-improvements` and verify the live Leaderboard & Compare tab (filtering, 1-click compare, multi-select compare, charts toggle, and mobile responsiveness) passes without console errors.
