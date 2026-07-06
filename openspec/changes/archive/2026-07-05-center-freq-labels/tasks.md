## 1. Center frequency labels on horizontal bar charts

- [x] 1.1 In `app.js:4439`, change `c.fillText(...)` x-coordinate from `bar.x` to `(bar.base + bar.x) / 2`
- [x] 1.2 Add `estimateFreq()` function and use as fallback in `processGvizData` and `processCSVData` when sheet col 27/28 are null
- [x] 1.3 Verify labels appear centered on CPU single, CPU multi, and GPU top 10 charts
