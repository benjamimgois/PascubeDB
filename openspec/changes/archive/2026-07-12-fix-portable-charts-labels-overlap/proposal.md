## Why

In horizontal bar charts for portable devices (Top 10 Notebook, Handheld, and SBC runs), when the bar width is wide enough to draw the main score inside the bar, but not wide enough to fit both the score and the center-aligned frequency label, they overlap and become unreadable.

## What Changes

- Modify `renderHorizontalBarChart` in `app.js` to perform collision detection for the frequency label (`centerText`) inside the bar.
- If the frequency label does not fit inside the bar without overlapping the score, dynamically render it outside the bar using the `nextX` cursor.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-mobile-charts`: Add legibility requirement for portable/mobile horizontal bar charts.

## Impact

- `app.js`: Updates layout positioning logic inside the custom Chart.js plugin `barLabels`.
