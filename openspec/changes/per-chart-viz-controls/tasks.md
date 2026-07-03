## 1. Per-chart state and helpers

- [x] 1.1 Replace `vizState` with `chartVizState = { mesa: {mode, normalize}, nvidia: {...}, kernel: {...} }`
- [x] 1.2 Add per-chart mode segmented control IDs and toggle IDs to baseline/driver chart map constants
- [x] 1.3 Update `computeDeltaData(data, baseline, normalize)` — accept normalize as parameter instead of reading vizState

## 2. Remove global viz controls

- [x] 2.1 Remove global viz-controls div from index.html (Mode + Normalize toolbar)
- [x] 2.2 Remove `setupVizControls()` and all references to `#seg-mode`, `#toggle-normalize` in app.js
- [x] 2.3 Remove `.viz-controls` CSS rules from style.css

## 3. Add per-chart controls HTML + JS

- [x] 3.1 Add Mode (Absolute / Delta %) segmented control + Normalize toggle to Mesa chart header
- [x] 3.2 Add Mode (Absolute / Delta %) segmented control + Normalize toggle to NVIDIA chart header
- [x] 3.3 Add Mode (Absolute / Delta %) segmented control + Normalize toggle to Kernel chart header
- [x] 3.4 Add `setupChartVizControls()` — per-chart event listeners that only re-render that chart
- [x] 3.5 Wire `setupChartVizControls()` into DOMContentLoaded init

## 4. Update render paths

- [x] 4.1 Update `renderCharts()` software section to use `chartVizState[type]` instead of `vizState`
- [x] 4.2 Update `renderSoftwareCharts()` to use `chartVizState[type]` and pass normalize param to computeDeltaData
- [x] 4.3 Update `setupBaselineListeners` to use `chartVizState[type].normalize`

## 5. CSS

- [x] 5.1 Add `.chart-viz-row` layout styles for in-chart controls
- [x] 5.2 Ensure per-chart mode buttons and toggle match existing design system
- [x] 5.3 Remove old `.viz-controls` styles

## 6. Verify

- [x] 6.1 Syntax check: brace balance + Node.js parse
- [ ] 6.2 Each chart renders independently when its controls change
