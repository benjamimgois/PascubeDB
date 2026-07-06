## Context

`renderHorizontalBarChart()` in `app.js` has a custom `freqLabels` plugin that draws MHz labels on horizontal bar charts (CPU single, CPU multi, GPU top 10, and mobile variants). Currently draws at `(bar.x, bar.y)` — the right edge of each bar. For bars extending near the canvas border, the text is clipped.

Charts affected: `cpuSingleChart`, `cpuMultiChart`, `gpuChart`, `notebookCpuChart`, `notebookGpuChart`, `handheldCpuChart`, `handheldGpuChart`.

## Goals / Non-Goals

**Goals:**
- Frequency label centered horizontally within each bar
- Single-line change to `app.js`

**Non-Goals:**
- No data source changes
- No tooltip changes (already show freq correctly)
- No styling changes (font, color, size remain the same)

## Decisions

**Decision**: Replace `bar.x` with `(bar.base + bar.x) / 2`

`bar.base` is the pixel position of the bar's left edge (baseline/zero), `bar.x` is the right edge. The midpoint is the visual center of the bar.

Alternatives considered:
- `bar.x - bar.width / 2` — less reliable, `width` may not exist in all Chart.js v4 versions
- `chart.chartArea` midpoint — doesn't account for varying bar lengths

## Risks / Trade-offs

- [Low] Text may overlap with adjacent bar's tail if bars are very wide and labels are long. Mitigation: font is small (10px), labels are short (`"5700 MHz"` is ~55px).
- [None] No clipping — center positioning guarantees text stays within bar bounds for bars wider than the text.
