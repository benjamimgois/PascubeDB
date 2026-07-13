## 1. Data Model — Parse power columns

- [x] 1.1 Add `cpuMaxPower: cleanNumber(getVal(29))` and `gpuMaxPower: cleanNumber(getVal(30))` to JSONP parser return object (app.js:~1006-1031)
- [x] 1.2 Add `cpuMaxPower: cleanNumber(row[29])` and `gpuMaxPower: cleanNumber(row[30])` to CSV parser return object (app.js:~1194-1219)

## 2. Render function — power parameters and center logic

- [x] 2.1 Add `power` and `gpuPower` params to `renderHorizontalBarChart()` signature, after existing `gpuFreqs` param (app.js:5561)
- [x] 2.2 Store `power` and `gpuPower` in dataset object alongside existing `freqs`/`gpuFreqs`
- [x] 2.3 Modify center text logic: render `freq MHz / power W` when power exists, mixed `cpuFreq / cpuPower  |  gpuFreq / gpuPower` when both CPU+GPU, fallback to freq-only when power missing
- [x] 2.4 Add tooltip lines for power: `CPU Max Power: <value> W` and `GPU Max Power: <value> W`

## 3. makeChartScrollable — propagate power params

- [x] 3.1 Add `power`/`gpuPower` params to `makeChartScrollable()` signature
- [x] 3.2 Pass through to `renderHorizontalBarChart()` call
- [x] 3.3 Sync on scroll: update `power`/`gpuPower` in dataset when slicing

## 4. Wire power data to all chart callers (CPU charts)

- [x] 4.1 cpuSingleChart: pass `cpuMaxPower` as `power`
- [x] 4.2 cpuMultiChart: pass `cpuMaxPower` as `power`
- [x] 4.3 mainOverallChart: pass `cpuMaxPower` as `power`, `gpuMaxPower` as `gpuPower`

## 5. Wire power data to category charts

- [x] 5.1 Add `cpuMaxPower` to return object of `getTopCategoryCPUs()`
- [x] 5.2 Add `gpuMaxPower` to return object of `getTopCategoryGPUs()`
- [x] 5.3 Add `cpuMaxPower` to return object of `getTopHandheldRuns()`
- [x] 5.4 Add `cpuMaxPower` to return object of `getTopNotebookRuns()`
- [x] 5.5 `renderCategoryCharts()`: pass `cpuMaxPower` as `power` in runs/cpu charts, `gpuMaxPower` as `gpuPower` in GPU charts

## 6. Wire power data to GPU charts

- [x] 6.1 gpuChart: pass `gpuMaxPower` as `gpuPower`

## 7. Verify

- [ ] 7.1 Open dashboard in browser and confirm center text shows `freq MHz / power W` in all affected charts
- [ ] 7.2 Confirm fallback to `freq MHz` when power data is missing
- [ ] 7.3 Confirm tooltip includes power line
- [ ] 7.4 Confirm scrollable charts (cpuAverage, gpuAverage) unaffected (no freq/power passed)
