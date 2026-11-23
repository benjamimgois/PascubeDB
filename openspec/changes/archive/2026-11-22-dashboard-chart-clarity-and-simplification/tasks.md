# Tasks

## 1. Doughnut Charts Top 5 + Others Standardization

- [x] 1.1 Add `formatTopNWithOthers(countsObj, limit = 5)` and a 6-color non-repeating palette (5 distinct colors + `#9ca3af` for `Others`) in `app.js`, and extend `renderDoughnutChart()` to accept `othersBreakdown` for itemized `Others` tooltip details; verify in browser that hovering `Others` lists grouped items.
- [x] 1.2 Update `kernelVersionChart`, `goverlayVersionChart`, `mesaVersionChart`, `nvidiaVersionChart`, `osDistChart`, and `handheldOsDistChart` in `app.js` to use `formatTopNWithOthers(..., 5)`; verify visually that no doughnut chart has more than 6 slices or repeated colors.

## 2. Software Benchmark Header Simplification

- [x] 2.1 Update `#tab-software` card headers in `index.html` (`OS vs. Hardware`, `Mesa Driver vs. GPU`, `NVIDIA Driver vs. GPU`, `Kernel vs. CPU Score`) to remove the separate `Normalize` toggle and replace `Absolute | Delta %` with a 3-button `.chart-mode-group` (`Absolute`, `Normalized %`, `Delta %`); verify markup renders cleanly on desktop and mobile widths.
- [x] 2.2 Update `chartVizState`, mode-button handlers, `normalize-all-cb` sync, and `.baseline-row` conditional visibility in `app.js` and `style.css` so `Baseline` is shown only when `Delta %` is active; verify all 3 modes and `Normalize all` work across all 4 software comparison charts with zero console errors.

## 3. Hardware Benchmark Device Category Consolidation

- [x] 3.1 Add the segmented Device Category filter (`All`, `Desktop`, `Mobile / SBC`, `Handheld`) to `#tab-hardware` in `index.html` and style it in `style.css`; verify active/focus states and responsive wrapping.
- [x] 3.2 Remove duplicated Mobile and Handheld chart cards from `#pill-performance` and `#pill-efficiency` in `index.html` (moving `mobileDistChart` into `System Demographics`); verify no orphaned canvas IDs or broken grid layouts remain.
- [x] 3.3 Implement `hwDeviceCategory` state and `getHardwareScopedData()` (including desktop-GPU exclusion when scoped to `Mobile / SBC`) in `app.js`, wire all unified Performance, Clock Efficiency, Bottleneck, and Thermal charts to re-render on category change, and remove dead Mobile/Handheld chart code; verify switching between `All`, `Desktop`, `Mobile / SBC`, and `Handheld` updates all charts accurately.

## 4. End-to-End Verification

- [x] 4.1 Serve the static site locally (`python3 -m http.server 8000`) and verify all 4 tabs (`Hardware Benchmark`, `Software Benchmark`, `Desktop Landscape`, `Community Insights`), `Normalize all`, and `Leaderboard` modal render with zero JavaScript console errors.
