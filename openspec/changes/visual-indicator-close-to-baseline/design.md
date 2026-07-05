## Context

In Delta % mode, the dashboard renders diverging bar charts using `renderDivergingBarChart`. When a version has a performance identical or extremely close to the baseline, the calculated delta is `0%`, resulting in no bar being drawn. This empty space can confuse users.

## Goals / Non-Goals

**Goals:**
- Render a thin visual indicator (bar) for non-baseline datasets even when the delta is `0%`.
- Keep the baseline dataset bar completely invisible (0 width).

**Non-Goals:**
- Changing the calculation of deltas.
- Modifying tooltips or textual labels.

## Decisions

### Decision: Use Chart.js `minBarLength` property
Instead of adding artificial small values (which would complicate tooltips and delta calculations), we will use Chart.js's built-in `minBarLength` option.
- For the baseline dataset (`lbl === data.baselineLabel`), set `minBarLength: 0`.
- For other datasets, set `minBarLength: 3` (pixels).
- **Alternatives considered:**
  - *Add tiny delta value (e.g. 0.05%):* Rejected because it would require modifying tooltips/labels to avoid showing false `+0.05%` or rounding errors, and it would change the true raw value.

## Risks / Trade-offs

- **Risk:** The 3px bar might look like a very minor positive/negative delta.
  - *Mitigation:* The bar is extremely thin and the numeric labels (e.g. `0%` or similar) make the true value clear.
