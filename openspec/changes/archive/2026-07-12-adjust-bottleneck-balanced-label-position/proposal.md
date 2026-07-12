## Why

In the CPU vs GPU Bottleneck charts, the "Balanced" label on the vertical threshold line is positioned inside the chart area (`chart.chartArea.top + 8`), which causes it to overlap or blend in with the first horizontal bar. Moving it higher (above the chart area) improves layout legibility.

## What Changes

- Modify the vertical text coordinate for the "Balanced" label inside `ratioPlugin` from `chart.chartArea.top + 8` to `chart.chartArea.top - 14`.
- Change text alignment and baseline to accommodate this position.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Adjust vertical position of the "Balanced" label in bottleneck charts.

## Impact

- `app.js`: Updates layout positioning logic for the "Balanced" label in `ratioPlugin`.
