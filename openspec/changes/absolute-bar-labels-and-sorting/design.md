## Context

4 software comparison charts (Mesa/NVIDIA/OS/Kernel) render grouped horizontal bars in Absolute mode. Current sorting is by run count; bars show no inline labels. A custom `afterDraw` plugin pattern already exists (`freqLabels` in `renderHorizontalBarChart`) — this change follows the same approach.

## Goals / Non-Goals

**Goals:**
- Sort hardware Y-axis by average score descending across all driver/OS/kernel versions
- Show `{driverVer} n={count} {↑/↓}` inside each bar; if bar is too short (<70px), place label at end of bar
- Replace legend with inline labels (legend removed)
- Apply to all 4 charts: Mesa, NVIDIA, OS, Kernel

**Non-Goals:**
- Not changing Delta mode (labels irrelevant there — diverging bars show ±%)
- Not adding new external dependencies
- Not changing the tooltip (tooltip still shows dataset label + samples)

## Decisions

### 1. Sorting by score instead of count

**Where:** `getDriverScatterData` (~line 3858), `getKernelScatterData` (~line 3798), `getOSvsHardwareScatterData` (~line 3708)

**How:** Before sorting, compute the average `y` across all versions for each hardware group:

```
sort((a, b) => {
  const avgA = avgOf(a[1].map(r => r.gpuScore))  // or cpuSingle/os-relevant field
  const avgB = avgOf(b[1].map(r => r.gpuScore))
  return avgB - avgA
})
```

Mesa/NVIDIA → `gpuScore`, Kernel → `cpuSingle`, OS → `mainScore` (already uses `y` in points).

**Alternative considered:** Sorting inside `renderHardwareComparisonBars` instead. Rejected because it would need to re-slice `points` and `hwLabels` together, and changing the data source is cleaner.

### 2. Bar label plugin

**Pattern:** Custom `id: 'barLabels'` plugin in `renderHardwareComparisonBars`, appended to the Chart.js `plugins` array — same pattern as `freqLabels`.

**Logic per bar segment:**

```
label = `${ver} n=${count} ${confidence}`
confidence = count >= 10 ? '↑' : '↓'

se bar.x - bar.base >= 70px:
  └─ textAlign = 'center', x = (bar.base + bar.x) / 2
  └─ fillStyle = 'rgba(255,255,255,0.9)'
senão:
  └─ textAlign = 'left', x = bar.x + 4
  └─ fillStyle = 'rgba(255,255,255,0.9)'
```

**Positioning challenge:** In a grouped bar chart (`indexAxis: 'y'`), the `bar` element's `.x` and `.base` represent the bar's horizontal extent. The `bar.y` is the center of the bar vertically. However, each `bar` element in a grouped chart may have different internal properties depending on the Chart.js version.

**Alternative considered:** `chartjs-plugin-datalabels`. Rejected to avoid a new CDN dependency. The custom plugin pattern is already proven.

### 3. Removing the legend

Set `legend.display: false` in the chart options — trivial one-line change.

### 4. Confidence threshold

| n samples | Symbol | Color  |
|-----------|--------|--------|
| >= 10     | ↑      | #22c55e (green) |
| < 10      | ↓      | #ef4444 (red)   |

The arrow is prepended to the label text; color applied via `c.fillStyle`.

## Risks / Trade-offs

- **[Grouped bar positioning]** `bar.base` may be `undefined` in some Chart.js builds (same issue as `freqLabels`). **Mitigation:** Use `chart.scales.x` to compute pixel positions from values, same as the fix applied to `freqLabels`.
- **[Overlapping labels]** If multiple versions per hardware group produce scores close together, labels on adjacent thin bars could overlap. **Mitigation:** Rare in practice — typical scores differ by >5%. If it occurs, the "outside" placement prevents clipping.
- **[Performance]** Adding `afterDraw` that iterates all bars adds ~0.5ms per render — negligible.
