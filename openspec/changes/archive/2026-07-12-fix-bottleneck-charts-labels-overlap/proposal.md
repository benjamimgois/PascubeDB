## Why

In the CPU vs GPU Bottleneck charts (both the ratio chart and top bottlenecks chart), text labels (ratio value, CPU/GPU scores, and contributor names) overlap or look messy when the bar width is too narrow.

## What Changes

- Modify the custom `ratioPlugin` in `app.js` to calculate text placement dynamically using an accumulating horizontal cursor (`nextX`) for elements drawn outside the bar.
- Perform collision detection for the center text (`cpuMulti / gpuScore`) to render it outside if it doesn't fit inside the bar.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Add legibility requirement for CPU vs GPU Bottleneck charts.

## Impact

- `app.js`: Updates layout positioning logic inside the custom `ratioPlugin`.
