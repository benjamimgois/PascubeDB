## 1. Sort data functions by average score

- [x] 1.1 In `getDriverScatterData` (~line 3908), replace `.sort((a, b) => b[1].length - a[1].length)` with sort by average `gpuScore` across all versions for that GPU model
- [x] 1.2 In `getKernelScatterData` (~line 3844), same change — sort by average `cpuSingle` score
- [x] 1.3 In `getOSvsHardwareScatterData` (~line 3785), same change — sort by average `mainScore`

## 2. Add bar label plugin to `renderHardwareComparisonBars`

- [x] 2.1 Add an `afterDraw` plugin (id: `barLabels`) to the Chart.js config in `renderHardwareComparisonBars`
- [x] 2.2 For each bar segment, generate label: `{driverVer} n={count} {↑/↓}` (confidence: ≥10 → ↑, <10 → ↓)
- [x] 2.3 Position label inside bar (centered) if bar width >= 70px, otherwise at right edge (outside)
- [x] 2.4 Set label color: green (`#22c55e`) for ↑, red (`#ef4444`) for ↓ — use rgba-based fillStyle for readability

## 3. Remove legend + clean up

- [x] 3.1 Set `legend.display: false` in `renderHardwareComparisonBars`
- [x] 3.2 Verify pagination still works and interacts correctly with new bar labels (pagination recreates chart, plugin stateless — works)

## 4. Verify

- [ ] 4.1 Load page with FALLBACK_CSV, check Mesa chart: GPUs sorted by score desc, labels inside bars *(needs browser)*
- [ ] 4.2 Check NVIDIA chart: same as Mesa *(needs browser)*
- [ ] 4.3 Check OS chart: hardware combos sorted by main score desc *(needs browser)*
- [ ] 4.4 Check Kernel chart: CPUs sorted by cpuSingle desc *(needs browser)*
- [ ] 4.5 Toggle Delta % → Absolute: labels appear, legend hidden, sorting correct *(needs browser)*
- [ ] 4.6 Resize window: labels reposition correctly (inside/outside logic adapts) *(needs browser)*
