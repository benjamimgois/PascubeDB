# Tasks

## 1. Remove Curiosity Pill & Promote Leaderboard to Tab 1

- [x] 1.1 Remove `#pill-btn-curiosity`, `#pill-curiosity`, and `#specimen-modal` from `index.html`, and remove Curiosity/Specimen gallery rendering and dead handlers from `app.js` (keeping `classifyDevice` and core hardware normalizers intact); verify `Hardware Charts` only has `Performance` and `Efficiency` pills.
- [x] 1.2 Promote `Leaderboard & Compare` to the first `.tab-btn.active` in `#tab-nav` (`index.html`), move `#leaderboard-view` and `#compare-view` into `#tab-leaderboard`, remove `#leaderboard-btn` and `#leaderboard-modal`, and update `switchTab()` / drilldown handlers in `app.js` so `leaderboard` is the default tab on load.

## 2. Compare Your Hardware Percentile Card

- [x] 2.1 Add the "Compare Your Hardware" card markup (`#hw-compare-card` with CPU/GPU selects, 4 metric percentile readouts, and "Filter table to my hardware" button) at the top of `#tab-leaderboard` in `index.html` and style it in `style.css`.
- [x] 2.2 Implement `populateMyHardwareSelects()`, `renderMyHardwareSummary()`, and the "Filter table to my hardware" handler in `app.js`; verify selecting a CPU/GPU updates `Top X%` standings and filters the table accurately.

## 3. Spacious 7-Column Table, Expandable Details, Inline Pin & Pagination

- [x] 3.1 Update `#leaderboard-table` in `index.html` and `style.css` to the 7-column layout (`#`, `Hardware`, `OS`, `Main Score`, `CPU 1T / MT`, `GPU Score`, `Actions`) with inline proportional bars, delta badges, and expandable detail-row styling.
- [x] 3.2 Add the `Best per Contributor` | `All Runs` toggle (default `Best per Contributor`) and pagination controls (`50` rows/page) in `index.html` and `app.js`, and implement expandable row details (`CPU Freq`, `GPU Freq`, `VRAM`, `Kernel`, `Driver`, `GOverlay`, `Client ID`, `Date`).
- [x] 3.3 Implement direct per-row `Pin as Baseline` (showing live `%` deltas across all visible rows) and direct `Compare` selection controls in `app.js`, preserving the side-by-side `#compare-view`.

## 4. End-to-End Verification

- [x] 4.1 Verify `node --check app.js` passes and test `http://localhost:8000` in the browser: default `Leaderboard & Compare` tab, `Compare Your Hardware` percentiles, `Best per Contributor` / `All Runs` toggle, row expansion, `Pin as Baseline` deltas, `Compare` view, pagination, and all secondary tabs (`Hardware Charts`, `Software`, `Desktop Landscape`, `Community`) with 0 console errors.
