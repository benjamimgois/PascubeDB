## Why

The Mode (Absolute / Delta %) and Normalize Scale controls currently sit in a global toolbar and apply to all three software comparison charts (Mesa, NVIDIA, Kernel) simultaneously. Users cannot view Mesa in Delta % while keeping Kernel in Absolute mode, or toggle Normalize independently per chart. This limits comparison flexibility and makes the UI less intuitive — the controls feel distant from the charts they affect.

## What Changes

- Remove the global viz-controls toolbar above the software comparison charts
- Add individual Mode (Absolute / Delta %) selector and Normalize Scale toggle to each chart header (Mesa Driver vs. GPU, NVIDIA Driver vs. GPU, Kernel vs. CPU Score)
- Each chart's controls only affect that chart's rendering
- Replace the shared `vizState` object with per-chart state (`chartVizState`)
- `computeDeltaData` accepts `normalize` as a parameter instead of reading a shared global

## Capabilities

### New Capabilities
- `per-chart-viz-controls`: Per-chart Mode (Absolute/Delta %) and Normalize Scale controls for software comparison charts

### Modified Capabilities
- None

## Impact

- `app.js`: Replace `vizState` with `chartVizState`, remove `setupVizControls()`, add `setupChartVizControls()`, update all render paths
- `index.html`: Remove global viz-controls div, add per-chart controls to Mesa, NVIDIA, Kernel chart headers
- `style.css`: Remove global viz-controls styles, add in-chart control styles
