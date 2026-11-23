# Design

## Context

See `proposal.md` for motivation and scope. The PascubeDB frontend is a vanilla HTML/CSS/JS application (`index.html`, `style.css`, `app.js`) using Chart.js for dashboard charts and custom CSS variables for the GOverlay dark theme. The `.app-container` was recently widened to `1800px`, creating horizontal room to flatten the top-of-page vertical stack.

## Goals / Non-Goals

**Goals:**
- Bring the Leaderboard table significantly higher above the fold on 1080p desktop viewports (~45% height reduction in the top section).
- Eliminate the two-step "enter compare mode -> check rows -> click compare" friction by making checkboxes always accessible and enabling 1-click comparison against a pinned baseline.
- Make the 13-metric Benchmark comparison view scannable at a glance via grouped sections, visual hierarchy, and lightweight comparative charts.

**Non-Goals:**
- Changing the underlying CSV / Google Sheets data schema or leaderboard pagination/sorting algorithms.
- Modifying the `Hardware Charts`, `Software Benchmark`, `Desktop Landscape`, or `Community Insights` tabs.
- Introducing new external chart libraries (comparative charts will use inline SVG/HTML bars or existing Chart.js without adding dependencies).

## Decisions

1. **Horizontal Split for `#hw-compare-card` (Option A):**
   - Use CSS Grid (`grid-template-columns: minmax(320px, 5fr) 7fr`) on desktop (`>= 1024px`) so the title, `Filter table to my runs` button, and `#my-run-input` sit on the left while `#my-hw-summary` (4 percentile cards) sits on the right.
   - *Alternative considered:* Collapsing percentiles into a slim bar until a run is selected (Option B). Rejected because the user prefers keeping the 4 percentile cards visible at all times.

2. **Unified Toolbar & Flexible Filter Search (Option C):**
   - Move `#leaderboard-count` inside `.leaderboard-toolbar` on the left (`justify-content: space-between`), placing grouping and baseline controls on the right.
   - Change `.leaderboard-filters .search-wrapper` / `#search-input` to `flex: 1; min-width: 240px;` so it absorbs extra horizontal space on 1800px viewports and prevents placeholder truncation.
   - Standardize filter default option casing (`All OS`, `All RAM`, `All VRAM`, `All Arch`).

3. **Always-On Row Checkboxes & 1-Click Baseline Compare:**
   - Remove `#compare-mode-btn` from `.leaderboard-toolbar` and keep `.compare-row-checkbox` rendered in the `#` column at all times (subtle opacity until hovered/checked).
   - Auto-show `#compare-bar` whenever `compareState.selection.length >= 1`, updating `#compare-start-btn` label to `Compare (${count})`.
   - When `pinnedBaselineRow` is set and the user clicks `Compare` on a non-baseline row, set `compareState.selection = [pinnedBaselineRow, row]`, `compareState.baseline = pinnedBaselineRow`, and call `openCompareView()` directly.

4. **Inline SVG Radar + Normalized HTML Bars in `#compare-view`:**
   - Render the comparative radar chart with lightweight inline SVG (6 axes: `Main Score`, `CPU 1T`, `CPU MT`, `GPU Score`, `GPU RT`, `CPU Eff`) and normalized horizontal bars using semantic CSS variables.
   - *Alternative considered:* Instantiating two Chart.js canvases inside `#compare-view`. Inline SVG + CSS bars avoid canvas resize/lifecycle management inside a dynamically re-rendered container and match the approved prototype.
   - Add a `Show Charts` toggle (`compareShowCharts` state, defaulting to `true`) in `.compare-controls`.

5. **Grouped Sections & Best-Value Highlight in `COMPARE_METRICS`:**
   - Partition `COMPARE_METRICS` into 4 sections (`Performance`, `Efficiency`, `Clocks & Power`, `Thermals`) rendered with section header rows, subtle zebra striping, `w-64` / `240px` metric label alignment, and `★` highlight on the best valid numeric value per row (respecting `lowerIsBetter` for power and temperature).

## Risks / Trade-offs

- **Always-visible checkboxes increasing `#` column width slightly** → Keep checkbox compact (`15px`) with minimal gap and verify pinned `#` / `Hardware` column alignment in `style.css` still holds on horizontal scroll.
- **Mobile layout crowding in `#hw-compare-card`** → Stack `.hw-compare-card` to 1 column below `1024px` and wrap `.leaderboard-toolbar` cleanly on `< 768px`.
- **Radar chart with `N/D` values (e.g., missing `GPU RT` or `CPU Eff`)** → Treat `null`/`NaN` axes as `0` on the polygon while displaying `N/D` in the table below.
