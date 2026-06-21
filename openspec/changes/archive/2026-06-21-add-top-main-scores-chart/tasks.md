## 1. Setup HTML Layout

- [x] 1.1 Add new canvas card for `mainOverallChart` at the top of the charts section in `index.html`.

## 2. Implement Chart logic

- [x] 2.1 Update `renderHorizontalBarChart` in `app.js` to accept `cpus` and `gpus` arrays and store them in dataset properties.
- [x] 2.2 Update `renderHorizontalBarChart` tooltip labels callback in `app.js` to display CPU and GPU if present.
- [x] 2.3 Calculate top 10 runs by Main Score with adaptive minimum scale in `renderCharts()` in `app.js`.
- [x] 2.4 Render the Top 10 Main Scores chart at the top of the charts section.

## 3. Verification

- [x] 3.1 Verify that the Top 10 Main Scores chart is rendered correctly as the first chart of the page.
- [x] 3.2 Verify that hovering over a bar in the Top 10 Main Scores chart displays Main Score, CPU, GPU, and truncated Client ID.
- [x] 3.3 Verify that the adaptive minimum scale works correctly for the overall main scores.
