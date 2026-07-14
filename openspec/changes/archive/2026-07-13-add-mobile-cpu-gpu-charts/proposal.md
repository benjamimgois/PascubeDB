## Why

Mobile section currently shows only benchmark runs (Main Score) for Mobile and Handheld. Users can't compare CPU single/multi and GPU performance within these segments. Hardware-specific performance data with freq/power labels is missing.

## What Changes

- Add 6 new horizontal bar charts to the Mobile section in a 2-column Mobile | Handheld grid
  - CPU Single Thread: Mobile + Handheld
  - CPU Multi Thread: Mobile + Handheld (new capability, didn't exist anywhere)
  - GPU Performance: Mobile + Handheld
- Create 4 new data helper functions for Handheld CPUs, Handheld GPUs, and CPU Multi variants
- Display `freq / power` in chart bar centers (existing renderHorizontalBarChart already supports this)
- Remove stale `renderCategoryCharts` call for Mobile (was targeting non-existent canvas IDs)
- No breaking changes — all additions, no removals from existing functionality

## Capabilities

### New Capabilities
- `mobile-cpu-single-chart`: Top 10 Mobile CPU Single Thread bar chart with freq/power labels
- `handheld-cpu-single-chart`: Top 10 Handheld CPU Single Thread bar chart with freq/power labels
- `mobile-cpu-multi-chart`: Top 10 Mobile CPU Multi Thread bar chart with freq/power labels
- `handheld-cpu-multi-chart`: Top 10 Handheld CPU Multi Thread bar chart with freq/power labels
- `mobile-gpu-chart`: Top 10 Mobile GPU Performance bar chart with freq/power labels
- `handheld-gpu-chart`: Top 10 Handheld GPU Performance bar chart with freq/power labels

### Modified Capabilities
- (none)

## Impact

- `index.html`: 6 new canvas elements + chart containers in mobile-runs-grid
- `app.js`: 4 new helper functions, render calls for 6 charts, remove dead renderCategoryCharts call
- `style.css`: no changes needed (existing mobile-runs-grid 2-column layout already handles new charts)
