# Tasks

## 1. Modal data-table legibility

- [x] 1.1 Change the shared rule `.modal-dialog th, .modal-dialog td` from `font-size: 0.72rem` to `0.8rem` in `style.css`; verify the leaderboard and specimen modal tables render larger text with no column clipping introduced
- [x] 1.2 Spot-check the widest leaderboard columns (CPU/GPU name) at desktop and mobile widths; verify rows stay readable and horizontal scroll still works

## 2. Stable filter control sizing

- [x] 2.1 Remove the `width: 300px` declaration from `#search-input:focus` and any equivalent mobile focus rule in `style.css`; verify the search input keeps `220px` (in-modal) on focus and adjacent filter selects do not move
- [x] 2.2 Verify focus is still clearly indicated via the existing `box-shadow` ring and global `:focus-visible` outline

## 3. Truncated stat value disclosure

- [x] 3.1 In the stat-card rendering path in `app.js`, set `title` and `aria-label` on each stat value element using the full untruncated string; verify values that fit are unchanged
- [x] 3.2 Hover a stat card with a long CPU/GPU name and verify the native tooltip shows the full value; inspect the element and verify its accessible name is the full value

## 4. Responsive tab labels

- [x] 4.1 Add a short-label `<span>` (e.g. `tab-label-short`) alongside the existing full label in each of the four main tab buttons in `index.html`, and set the button `aria-label` to the full label
- [x] 4.2 Add CSS so the short label is shown and the full label hidden only on narrow viewports (<=768px); verify no double labels appear at any width
- [x] 4.3 Verify at <=768px each main tab shows a single-line short label, and assistive tech still reports the full accessible name

## 5. Integration verification

- [x] 5.1 Full manual pass: leaderboard modal table legibility, filter focus stability, stat value tooltip, and mobile tab labels together; verify nothing else regressed
