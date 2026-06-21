## Context

The benchmark dashboard features various top performance rankings. We need to introduce an overall "Top 10 Benchmark Runs - Main Score" chart as the first chart on the page. The chart should display details including Client ID, CPU, and GPU in the tooltip, and utilize an adaptive X-axis minimum.

## Goals / Non-Goals

**Goals:**
- Position the new Top 10 Main Scores chart at the very beginning of the dashboard charts section.
- Calculate the X-axis adaptive minimum (90% of the minimum score in the top 10).
- Extend `renderHorizontalBarChart` tooltips to display CPU and GPU strings on hover, alongside Client ID.

**Non-Goals:**
- Modifying other existing charts.

## Decisions

### 1. Position in HTML Layout
- **Decision:** Place the new `<canvas id="mainOverallChart"></canvas>` card as the first item in the `.charts-section` of `index.html`.
- **Rationale:** Making it the first element provides immediate visibility of the overall peak scores.

### 2. Extend `renderHorizontalBarChart` for Metadata
- **Decision:** Update the signature to accept `cpus` and `gpus` arrays:
  `renderHorizontalBarChart(canvasId, labels, data, datasetLabel, barColor, borderColor, xMax, xMin, clientIds, cpus, gpus)`.
- **Rationale:** Storing `cpus` and `gpus` arrays directly in `datasets[0].cpus` and `datasets[0].gpus` lets the standard tooltip label callback read the values at the current data index.

### 3. Tooltip Formatting
- **Decision:** Format the tooltip as:
  - Main Score: `<score>`
  - CPU: `<cpu name>`
  - GPU: `<gpu name>`
  - Client ID: `<truncated client-id>`

## Risks / Trade-offs

- **[Risk]** Squeezing of the chart Y-axis labels.
  - *Mitigation:* The chart already has an automatic truncation callback configured for Y-axis labels, ensuring they are cut off clean if they exceed 25 characters.
