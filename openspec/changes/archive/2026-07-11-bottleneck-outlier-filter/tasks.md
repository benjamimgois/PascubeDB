## 1. Core Implementation

- [x] 1.1 Add ratio sanity check in `renderBottleneckChart()`: filter entries with ratio < 0.1 or > 10
- [x] 1.2 Add ratio sanity check in `renderTopCpuBottlenecks()`: same filter
- [x] 1.3 Add ratio sanity check in `renderTopGpuBottlenecks()`: same filter

## 2. Verification

- [x] 2.1 Confirm all 3 filter calls use same bounds [0.1, 10]
- [x] 2.2 Confirm `benchmarkData` / `filteredData` unchanged
- [x] 2.3 Run `node --check app.js` for syntax
