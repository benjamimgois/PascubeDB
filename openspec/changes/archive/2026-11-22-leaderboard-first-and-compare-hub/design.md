# Design

## Context

Currently, PascubeDB opens on the `Hardware Benchmark` tab, while the Leaderboard lives inside `#leaderboard-modal` with 15 horizontal columns and all 5,700+ rows rendered into `#leaderboard-body` at once. See `proposal.md` for motivation and scope.

## Goals / Non-Goals

**Goals:**
- Make `Leaderboard & Compare` (`#tab-leaderboard`) the first and default active tab in `#tab-nav`.
- Provide an immediate "Compare Your Hardware" percentile summary at the top of `#tab-leaderboard`.
- Make the Leaderboard table scannable (7 columns, proportional score bars, inline baseline `%` deltas, expandable row details) and fast (50-row pagination + `Best per Contributor` default).
- Remove the `Curiosity` pill and `#specimen-modal` cleanly without breaking existing chart drilldowns or user drilldowns.

**Non-Goals:**
- Changing the Google Sheets data source or CSV schema.
- Removing `Hardware Charts`, `Software Benchmark`, `Desktop Landscape`, or `Community Insights` tabs.
- Removing `detectCPUBrand`, `detectGPUBrand`, or `classifyDevice` (used across all remaining tabs).

## Decisions

### 1. Promote `#tab-leaderboard` to First Tab & Adapt Drilldowns
- **Decision**: Move the contents of `#leaderboard-modal` (`#leaderboard-view` and `#compare-view`) directly into `<div id="tab-leaderboard" class="tab-content active" data-tab="leaderboard">` as the first tabpanel, and add a `Leaderboard & Compare` button as the first `.tab-btn.active` in `#tab-nav`. Remove `#leaderboard-btn` and `#leaderboard-modal`.
- **Drilldown impact**: Existing chart-bar and contributor drilldowns (previously opening `#leaderboard-modal`) will instead call `window.switchTab('leaderboard')` and scroll smoothly to `#leaderboard-table`.

### 2. "Compare Your Hardware" Percentile Summary Card
- **Decision**: Populate `#my-cpu-select` and `#my-gpu-select` from normalized `benchmarkData`. When either or both are selected, compute percentile rank (`Top X%` = percentage of community runs/best-per-contributor runs that score equal or lower, inverted to `Top (100 - pct)%`, clamped to `Top 1%`) for `Main Score`, `CPU 1T`, `CPU MT`, and `GPU Score` against community medians. Provide a "Filter table to my hardware" button that sets `#cpu-filter` / `#gpu-filter` and runs `handleFilterChange()`.

### 3. 7-Column Table, Expandable Details, Inline Baseline Pin & Pagination
- **Decision**:
  - Replace the 15-column `<thead>`/`<colgroup>` with 7 columns: `#`, `Hardware`, `OS`, `Main Score`, `CPU 1T / MT`, `GPU Score`, `Actions`.
  - Add `leaderboardGrouping` (`'best'` | `'all'`, default `'best'`) using `dedupByBestScore` (per `user + cpu + gpu`, or per `clientId` when anonymous) before sorting/paginating.
  - Add `leaderboardPage` (default `1`, `LEADERBOARD_PAGE_SIZE = 50`).
  - Add `pinnedBaselineRow` state: clicking `Pin` on any row sets it as the inline baseline and renders signed `%` delta badges (`+12.4%` / `-8.1%`) on `Main`, `CPU 1T`, `CPU MT`, and `GPU` cells across all visible rows.
  - Clicking a row (outside action buttons/checkboxes) toggles an adjacent `<tr class="leaderboard-detail-row">` containing `CPU Freq`, `GPU Freq`, `RAM`, `VRAM`, `Kernel`, `Driver`, `GOverlay`, `Client ID`, and `Date`.

### 4. Remove `Curiosity` Pill & `#specimen-modal`
- **Decision**: Remove `#pill-btn-curiosity`, `#pill-curiosity`, and `#specimen-modal` from `index.html`, remove `'curiosity'` from `PILL_STATE` / `STATS_PILL_LABELS` / `STAT_TOOLTIPS`, and remove `renderCuriosityCharts()` and specimen gallery/chip rendering in `app.js`.

## Risks / Trade-offs

- **[Risk] Chart drilldowns or `?subtab=curiosity` deep links** → Mitigation: Update drilldown handlers to call `window.switchTab('leaderboard')`; ignore `?subtab=curiosity` gracefully by falling back to `'performance'`.
- **[Risk] Removing 15-column pinned CSS breaks table styling** → Mitigation: Update `style.css` table rules cleanly for the 7-column layout and test responsive behavior on mobile and desktop widths.
