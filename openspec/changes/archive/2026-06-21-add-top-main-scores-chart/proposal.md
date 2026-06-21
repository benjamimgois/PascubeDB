## Why

The benchmark dashboard currently lacks a general "Top 10 Main Scores" performance chart showing the overall highest benchmark runs (it only has CPU Single, CPU Multi, and GPU-specific charts, and a Handheld-specific chart). Adding this chart as the first visual element of the dashboard will give users an immediate view of the highest overall benchmark scores, displaying the associated Client ID, CPU, and GPU.

## What Changes

- Add a new horizontal bar chart canvas (`mainOverallChart`) at the top of the main charts section in `index.html`.
- Render the top 10 benchmark runs sorted by overall Main Score using an adaptive minimum scale (`mainXMin`).
- Show the Client ID (first 8 characters), CPU, and GPU in the chart hover tooltips.

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `dashboard-advanced-charts`: Add specification requirements for the overall Top 10 Main Scores performance chart.

## Impact

- `index.html`: Add a new canvas card for the Top 10 Main Scores chart at the top of the charts section.
- `app.js`: Implement the data sorting, adaptive minimum calculation, and chart rendering logic for the new chart. Update the tooltip formatting to support showing CPU and GPU.
