## Why

To improve readability and clarity in the dashboard's "Efficiency" tab, we need to show units of measurement on the stats cards: "Pts / MHz" for CPU and GPU efficiency, and "Pts / ºC" for thermal efficiency. In addition, we need to rename "Major CPU Bottleneck" to "TOP CPU Bottleneck".

## What Changes

- Update `app.js`'s `STATS_PILL_LABELS.efficiency` to change "Major CPU Bottleneck" to "TOP CPU Bottleneck".
- Update `app.js`'s card rendering logic inside the `efficiency` pill block to append "Pts / MHz" to CPU/GPU efficiency values, and "Pts / ºC" to thermal efficiency values.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Rename bottleneck card and append units of measurement to Efficiency tab cards.

## Impact

- `app.js`: Updates `STATS_PILL_LABELS` and card text mapping for the Efficiency tab.
