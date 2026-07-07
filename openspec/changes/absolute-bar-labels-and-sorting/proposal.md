## Why

In Absolute mode, hardware (GPU/CPU) on the Y-axis is sorted by run count, not by performance — making it harder to compare powerful vs entry-level hardware at a glance. Bar segments also lack inline context (driver version, sample count, confidence), forcing users to hover each bar for basic info.

## What Changes

- Sort hardware by **average score descending** (most powerful first) in all 4 software comparison charts (Mesa, NVIDIA, OS, Kernel)
- Draw **driver version + sample count + confidence arrow** inside each bar segment in Absolute mode
- Remove the legend (version info moves inside the bar, making legend redundant)
- Hide pagination in Delta mode (already done); pagination continues working in Absolute mode with the new sorting

## Capabilities

### New Capabilities
- `absolute-mode-bar-enhancements`: Controls how hardware bars are sorted and labeled in Absolute mode for software comparison charts (Mesa Driver vs GPU, NVIDIA Driver vs GPU, OS vs Hardware, Kernel vs CPU Score)

### Modified Capabilities

(none — existing specs don't cover bar-level visual behavior)

## Impact

- `app.js`: `getDriverScatterData`, `getKernelScatterData`, `getOSvsHardwareScatterData` — change `sort()` from run-count to average-score
- `app.js`: `renderHardwareComparisonBars` — add `afterDraw` plugin for bar labels, remove legend, wire confidence indicator
- No new dependencies; Chart.js custom plugin pattern already established (`freqLabels`)
