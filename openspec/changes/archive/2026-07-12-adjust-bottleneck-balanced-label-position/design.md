## Context

In `app.js`'s custom `ratioPlugin`, the "Balanced" threshold text is drawn at `chart.chartArea.top + 8` with `ctx.textBaseline = 'top'`. This puts it directly inside the first data bar.

## Goals / Non-Goals

**Goals:**
- Move the "Balanced" label above the chart area (specifically, using `chart.chartArea.top - 14` with a baseline of `'top'` or using a combination of top coordinates to make it sit cleanly above the top line).

## Decisions

### 1. Shift Balanced Text Vertically
We will update `ratioPlugin`:
- Change: `ctx.fillText('Balanced', bx + 6, chart.chartArea.top + 8);`
- To: `ctx.fillText('Balanced', bx + 6, chart.chartArea.top - 14);`
This draws the text exactly 14px above the top chart line, aligned next to the threshold dashed line.
- Rationale: It keeps the label close to the line but completely removes it from the chart's data rendering area, avoiding overlaps.
