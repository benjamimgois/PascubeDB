## Context

Hardware Benchmark tab currently renders all 27 charts at once, vertically stacked. Adding efficiency and thermal charts pushes it past reasonable scroll length. The tab uses a flat section structure (Highest Scores → Demographics → Advanced → Thermals → Portable). No client-side routing, no lazy rendering — all charts created during `renderCharts()`.

## Goals / Non-Goals

**Goals:**
- Sub-tab pill navigation (Performance / Efficiency / Thermals) in the Hardware tab
- Context-switching stats cards per pill
- Lazy render: create charts only when pill is activated, destroy on switch
- URL sync: `?subtab=efficiency` persistable and shareable
- Efficiency charts: score/MHz, bottleneck ratio, scatter CPU*GPU, VRAM*GPU
- Thermal efficiency chart: score/°C per contributor/brand
- Dissolve Portable Devices section, redistribute charts
- Demographics stays in Performance

**Non-Goals:**
- Community Insights tab changes (stays as-is)
- Software Benchmark tab changes
- Mobile responsive breakpoint redesign (existing breakpoints adapt)
- CSV export / search feature changes

## Decisions

### Decision 1: URL state via query param, not hash
`?subtab=efficiency` instead of `#efficiency`. Backward compat with existing `tab=hardware` tracking. `URLSearchParams` reads on load, `history.replaceState` on pill click.

### Decision 2: Lazy render via lifecycle object
Each pill has a `renderState = { rendered: false, chartIds: [] }`. On pill activate:
- If not rendered → call `renderEfficiencyCharts()` etc, store chart IDs, mark rendered
- If already rendered → just show container (no re-render)
- On pill deactivate → hide container (no destroy) — keeps Chart.js instances alive but off-screen

Alternative considered: destroy on switch (save memory, but re-render flash). Chose keep-alive for UX smoothness, destroy only when explicitly needed.

### Decision 3: Stats cards via reactive context function
A single `renderStats(pill)` function reads a map:
```
STATS_PILL_MAP = {
  performance: { /* existing: cpuSingle, cpuMulti, gpu, mostHumble */ },
  efficiency:   { cpuSingle: "Most Efficient CPU", gpu: "Most Efficient GPU", ... },
  thermals:     { gpu: "Top Thermal Efficiency", mostHumble: "Hottest Run" }
}
```
Populates the same 4 stat-card slots. No DOM structure change — just swap content.

### Decision 4: Efficiency chart formulas
- **CPU Efficiency**: `cpuSingle / cpuMaxFreq` (score per MHz). Top 10 bar chart.
- **GPU Efficiency**: `gpuScore / gpuMaxFreq` (score per MHz). Top 10 bar chart.
- **Bottleneck Ratio**: `cpuMulti / gpuScore`. Scatter chart, x=CPU Multi, y=GPU Score, color by device class (Handheld/Notebook/Desktop).
- **CPU Single × GPU Scatter**: x=CPU Single, y=GPU Score, color by GPU brand.
- **VRAM × GPU Scatter**: x=VRAM GB, y=GPU Score, color by GPU brand.

Filters: exclude rows where `cpuMaxFreq` or `gpuMaxFreq` is 0/N/D for efficiency calcs.

### Decision 5: Chart redistribution

```
Performance pill (14 charts):
  Stats: Top CPU 1T / Top CPU MT / Top GPU / Most Humble
  ├─ Highest Scores (4: mainOverall, cpuSingle, cpuMulti, gpu)
  ├─ Demographics (6: cpuPopular, gpuPopular, cpuBrand, gpuBrand, ram, vram)
  ├─ Avg Performance (2: cpuAvg, gpuAvg)
  └─ Portable charts — runs/CPU/GPU only (9: 3 categ × 3 each)
     (moved from Portable Devices section)

Efficiency pill (5 charts):
  Stats: Most Efficient CPU by MHz / Most Efficient GPU by MHz / Best Bottleneck / ...
  ├─ CPU Efficiency by MHz (bar)
  ├─ GPU Efficiency by MHz (bar)
  ├─ Bottleneck Ratio Scatter (cpuMulti vs gpuScore)
  ├─ CPU Single × GPU Scatter
  └─ VRAM × GPU Score Scatter

Thermals pill (7 charts):
  Stats: Best Thermal Efficiency / Hottest Run / Coolest GPU / ...
  ├─ AMD GPU Temps (existing)
  ├─ NVIDIA GPU Temps (existing)
  ├─ Intel GPU Temps (existing)
  ├─ Thermal Efficiency score/°C (new bar)
  ├─ Notebook Temps (existing, moved from Portable)
  ├─ Handheld Temps (existing, moved from Portable)
  └─ SBC Temps (existing, moved from Portable)
```

Note: Portable charts (runs/CPU/GPU) go to Performance, portable temps go to Thermals. Portable Device Type donut goes to Performance Demographics area.

### Decision 6: Filtered data for efficiency
Efficiency charts reuse `filteredData` (same search/filter context as Performance). User can filter by OS/CPU/GPU and efficiency charts respect the filter. This keeps the UI consistent — no separate filter state per pill.

## Risks / Trade-offs

- **Lazy render flash**: First activation of Efficiency/Thermals pills requires data computation + chart creation. Mitigation: compute on first data load (not on pill click), store computed values; chart rendering is fast (~50ms).
- **URL state complexity**: Pill + tab + filters coexisting. Mitigation: pill is the only new URL param; it's independent from existing tab param and filter state.
- **Efficiency data gaps**: Rows without `cpuMaxFreq`/`gpuMaxFreq` are excluded from efficiency charts, potentially small sample. Mitigation: show count of excluded rows in chart subtitle so user understands sample size.
- **Chart instance memory**: 26 chart instances kept alive across 3 pills. Mitigation: Chart.js instances are ~2KB each, negligible impact. Destroy only if user explicitly requests.

## Open Questions

- Should efficiency charts default to top N or show all (paginated)? Proposing top 10 bar + pagination arrows (same pattern as existing charts).
- Scatter charts: use Chart.js scatter or HTML5 Canvas overlay? Chart.js scatter is simpler but slow above 200 points. Dataset is ~130 rows — Chart.js scatter is fine.
- Stats cards in Efficiency pill: what exactly to show? "Most Efficient CPU: Ryzen 7 9800X3D — 0.73 score/MHz" format?
