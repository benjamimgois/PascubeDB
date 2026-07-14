## Why

Efficiency tab has overall CPU and GPU efficiency charts but no breakdown by device category. Users can't compare efficiency (score per MHz) between Mobile (Notebook+SBC) and Handheld segments, which have very different thermal/power profiles.

## What Changes

- Add 4 new efficiency charts to the Efficiency by Clock section in a 2-column grid
  - Mobile CPU Efficiency (pts/MHz for Notebook+SBC)
  - Handheld CPU Efficiency (pts/MHz for Handheld)
  - Mobile GPU Efficiency (pts/MHz for Notebook+SBC)
  - Handheld GPU Efficiency (pts/MHz for Handheld)
- Each chart gets its own top contributor label
- Overall CPU/GPU efficiency charts remain unchanged
- No breaking changes

## Capabilities

### New Capabilities
- `mobile-cpu-efficiency-chart`: Efficiency (CPU Single / MHz) for Notebook and SBC devices
- `handheld-cpu-efficiency-chart`: Efficiency (CPU Single / MHz) for Handheld devices
- `mobile-gpu-efficiency-chart`: Efficiency (GPU Score / MHz) for Notebook and SBC devices
- `handheld-gpu-efficiency-chart`: Efficiency (GPU Score / MHz) for Handheld devices

### Modified Capabilities
- (none)

## Impact

- `index.html`: 4 new chart containers + 4 new top-contributor spans in `efficiency-charts-grid`
- `style.css`: no changes needed (existing 2-column grid accommodates 6 items as 3 rows)
- `app.js`:
  - 4 new filtered efficiency computation wrappers (or inline filtering)
  - 4 new `makeChartScrollable` render calls with per-chart top contributor
  - 4 new chartNorm entries for normalize toggle support
