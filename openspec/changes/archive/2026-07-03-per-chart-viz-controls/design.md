## Context

Three software comparison charts (Mesa Driver vs. GPU, NVIDIA Driver vs. GPU, Kernel vs. CPU Score) currently share a global `vizState = { mode: 'absolute'|'delta', normalize: bool }`. Changing mode or normalize affects all three charts at once.

Each chart uses `getDriverScatterData()` or `getKernelScatterData()` to produce raw scatter data, then depending on mode renders via:
- `computeDeltaData()` → `renderDivergingBarChart()` for delta mode
- `computeNormalizedData()` → `renderDivergingBarChart()` for normalize-only mode
- `renderHardwareComparisonBars()` for absolute mode

The baseline dropdown already exists per chart from a previous change. It has its own per-chart state (`baselineState`) and event listeners.

## Goals / Non-Goals

**Goals:**
- Each of the 3 software comparison charts has its own Mode (Absolute / Delta %) and Normalize Scale control
- Changing controls on one chart does NOT affect the others
- Baseline dropdown stays per-chart (already done)
- Block out the global viz-controls toolbar

**Non-Goals:**
- Adding delta/normalize to the OS scatter chart or hardware tab charts
- Changing how `computeDeltaData`, `computeNormalizedData`, or `renderDivergingBarChart` work internally (only how they receive parameters)

## Decisions

| Decision | Rationale |
|---|---|
| Per-chart state object instead of global | `chartVizState = { mesa: {mode, normalize}, nvidia: {...}, kernel: {...} }`. Each chart reads its own state, no cross-chart interference |
| Controls live in chart-header div | Placing controls inside each chart's header keeps them visually close to the chart they affect |
| Reuse existing segmented-control and toggle styles | Minimizes CSS changes; only needed: make the control row layout (`.chart-viz-row`) |
| `computeDeltaData(data, baseline, normalize)` | Instead of reading `vizState.normalize` internally, receive it as a parameter. Pure function, no global dependency |
| One event listener per chart control | Each mode button group and toggle switch has its own handler that only re-renders that chart |

## Risks / Trade-offs

- The controls add ~30px of height to each chart header. On 768px screens the chart canvas shrinks further → Mitigation: smaller font/padding on the in-chart controls via responsive CSS
- The `renderCharts()` initial render path and `renderSoftwareCharts()` interactive path both need updating → Mitigation: both paths updated simultaneously, same pattern
