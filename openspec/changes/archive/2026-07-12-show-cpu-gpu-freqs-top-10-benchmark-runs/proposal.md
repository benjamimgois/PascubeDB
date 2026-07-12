## Why

In the "Top 10 Benchmark Runs - Main Score" chart (overall main scores chart), users want to see both CPU Max Frequency and GPU Max Frequency centered inside the bar (if it fits) or next to the bar, formatted as "CPUMAXFREQ / GPUMAXFREQ" with a small, non-bold font for better comparison and analysis.

## What Changes

- Modify `app.js`'s horizontal bar chart rendering logic to detect if both CPU and GPU frequencies are present.
- If both are present, construct a combined label like "CPUMAXFREQ / GPUMAXFREQ" or "CPUMAXFREQ / GPUMAXFREQ MHz".
- Render the text centered inside the bar (or outside if it collides) using a non-bold, small font (e.g. `10px Inter, sans-serif`).

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Add CPU/GPU frequency rendering requirements for the Top 10 Main Scores chart.

## Impact

- `app.js`: Modifies horizontal chart labels rendering logic in the `barLabels` plugin.
