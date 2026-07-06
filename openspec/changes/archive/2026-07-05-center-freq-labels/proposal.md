## Why

CPU/GPU max frequency labels are drawn at the right edge of each horizontal bar, causing text to be partially or fully clipped off-canvas for top-scoring entries. User requested centered alignment.

## What Changes

- `renderHorizontalBarChart()` in `app.js`: change `freqLabels` plugin `afterDraw` to position text at `(bar.base + bar.x) / 2` (horizontal center of bar) instead of `bar.x` (right edge)

## Capabilities

### New Capabilities
- `chart-freq-labels`: Rendering of frequency labels on horizontal bar charts (CPU single, CPU multi, GPU top 10)

### Modified Capabilities
- (none)

## Impact

Single-line change in `app.js:4439` — only affects the freqLabels afterDraw plugin. No data flow, no API, no dependency changes.
