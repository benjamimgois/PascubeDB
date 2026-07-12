## Why

In the "Top 10 GPU Model - Performance" chart, users want to ensure that the GPU Max Frequency is rendered centered inside the bar (if it fits) or next to the bar, formatted in a small, non-bold font (e.g., `10px Inter, sans-serif`).

## What Changes

- Verify and ensure that `renderHorizontalBarChart` for `gpuChart` receives `gpuMaxFreq` correctly.
- Ensure that the center label rendering logic in `app.js` renders the GPU frequency centered inside the bar (or outside if it collides) using a non-bold, small font.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Ensure GPU frequency is displayed on the Top 10 GPU Model Performance chart.

## Impact

- `app.js`: Verify argument mapping and rendering in `renderHorizontalBarChart`.
