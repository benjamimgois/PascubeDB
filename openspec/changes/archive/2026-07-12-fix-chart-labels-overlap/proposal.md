## Why

In horizontal bar charts (like GPU Thermal Efficiency), when a bar's width is narrow, the rendered text labels (such as the main score value and the secondary temperature details) collapse and overlap at the right edge of the bar (`bar.x + 6`). This makes the numbers unreadable.

## What Changes

- Modify `renderHorizontalBarChart` in `app.js` to calculate text placement dynamically using an accumulating horizontal cursor (`nextX`) for elements drawn outside the bar.
- Prevent overlapping of `scoreText`, `stText`, and `contributorText` when the bar width is too narrow to hold them.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Add legibility requirement for horizontal bar charts to prevent overlapping labels.

## Impact

- `app.js`: Updates layout positioning logic inside the custom Chart.js plugin `barLabels`.
