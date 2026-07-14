## Context

Efficiency by Clock section currently has 2 charts: CPU Efficiency and GPU Efficiency (overall, all device types). Mobile and Handheld categories have very different efficiency profiles — handhelds optimize for battery life, notebooks for sustained performance. Users need per-segment comparison.

Existing functions `computeCpuEfficiency(data)` and `computeGpuEfficiency(data)` are pure — they take any data array and return efficiency results. Reusing them with filtered input avoids duplication.

## Goals / Non-Goals

**Goals:**
- Add 4 new efficiency charts: Mobile CPU, Handheld CPU, Mobile GPU, Handheld GPU
- Each chart shows top 10 entries with score/MHz ratio, freq, and score
- Each chart has its own top-contributor label
- Overall charts remain untouched
- Grid `efficiency-charts-grid` accommodates 6 items as 3 rows × 2 columns

**Non-Goals:**
- No changes to Bottleneck Ratio or Thermal Efficiency sections
- No changes to CSS grid properties (current 2-column grid works)
- No new data model changes

## Decisions

**1. Reuse computeCpuEfficiency / computeGpuEfficiency with filtered data**
- Both functions take any data array and return sorted efficiency results
- Filter `benchmarkData` by `classifyDevice()` before passing: much simpler than creating 4 new functions
- Example: `computeCpuEfficiency(bm.filter(r => classifyDevice(r) === 'Handheld'))`

**2. Top contributor labels**
- Each chart gets a `<span class="top-contributor">` with unique ID
- Updated in JS after `makeChartScrollable` call, same pattern as `cpuEffTop`/`gpuEffTop`
- Format: `1º <hardware name>` or `—` if no data

**3. chartNorm entries**
- Each new chart canvas ID needs a `chartNorm` entry for the normalize toggle to work
- `chartNorm` entries initialized in `initChartNorm()` alongside existing ones

## Risks / Trade-offs

- **Duplicate entries**: Same hardware may appear in both overall and segment charts. Acceptable — users want to compare the segments, not deduplicate.
- **Chart scroll state**: Each chart has independent scroll state. No cross-chart interaction issues.
