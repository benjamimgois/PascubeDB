# Tasks

## 1. Active filter indicators + clear all

- [x] 1.1 Add a chip container and a Clear all control to the leaderboard filter area in `index.html`; verify both are hidden when no filter is active
- [x] 1.2 In `app.js`, derive the list of active filters from the same state `handleFilterChange()` reads and render a removable chip per active filter; verify selecting a dropdown or typing shows a matching chip
- [x] 1.3 Wire each chip's remove control to reset that one filter and re-run `handleFilterChange()`; verify the table updates and the chip disappears
- [x] 1.4 Wire Clear all to reset the search input and all selects then call `handleFilterChange()`; verify all rows return and chips clear
- [x] 1.5 Add chip/clear styles in `style.css` reusing the `.curiosity-chip` language; verify they match the existing chip look

## 2. Pinned column alignment

- [x] 2.1 Replace the hardcoded `left: 42px` rule in `style.css` with `left: var(--pin-col1-width, 42px)`; verify the default still renders correctly before JS runs
- [x] 2.2 In `app.js`, measure the first pinned cell after `renderTable()` and set `--pin-col1-width`; verify rank + contributor stay flush with no gap/overlap at desktop and mobile widths
- [x] 2.3 Verify horizontal scrolling keeps both pinned columns aligned

## 3. Shared chart tooltip style

- [x] 3.1 Define a single `CHART_TOOLTIP_STYLE` constant in `app.js` holding bg, border, borderWidth, padding, cornerRadius, titleFont, bodyFont, and displayColors
- [x] 3.2 Spread it into every chart's `tooltip` config, keeping only per-chart `callbacks`; verify each chart still shows correct title/label text
- [x] 3.3 Verify no chart config still contains the repeated tooltip style literals (search for the old literals)

## 4. Stat label rename

- [x] 4.1 Update the performance pill's fourth stat label in `STATS_PILL_LABELS` (`app.js`) and the static default in `index.html`; verify the card shows the new wording on the Performance pill

## 5. Integration verification

- [x] 5.1 Full manual pass: add/remove several filters and use Clear all, scroll the table horizontally, hover tooltips on at least three different charts, and check the renamed stat card
