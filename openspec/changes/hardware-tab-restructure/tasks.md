## 1. HTML Structure — Pills & Container Reorganization

- [x] 1.1 Add pill nav bar markup in `index.html` inside Hardware tab, above stats cards
- [x] 1.2 Wrap existing charts in `<div class="pill-content" data-pill="performance">` containers
- [x] 1.3 Add empty pill-content containers for `data-pill="efficiency"` and `data-pill="thermals"`
- [x] 1.4 Remove the standalone "Portable Devices" section markup (charts redistribute)
- [x] 1.5 Remove the standalone "Thermal Performance" section markup (moves to Thermals pill)
- [x] 1.6 Remove the standalone "Advanced Performance & Versions" section markup (moves to Performance)
- [x] 1.7 Add `id`s to remaining section wrappers for pill targeting
- [x] 1.8 Move Mobile Device Type donut chart container into Demographics area markup

## 2. CSS — Pill Styles & Layout

- [x] 2.1 Add `.pill-nav` styles: horizontal flex row, gap, pill buttons with glassmorphism
- [x] 2.2 Add `.pill-btn` and `.pill-btn.active` styles with hover/active transitions
- [x] 2.3 Add `.pill-content` display toggling: show active, hide inactive

## 3. JS — Pill Navigation System

- [x] 3.1 Implement `PILL_STATE` object: `{ active: 'performance', rendered: { performance: true, efficiency: false, thermals: false } }`
- [x] 3.2 Implement `switchPill(name)` function: update active pill, toggle content visibility, call lazy render if needed
- [x] 3.3 Implement `initPillNav()`: read `?subtab=` from URL, attach click listeners to pill buttons
- [x] 3.4 Implement `updateURLParam(key, value)` using `history.replaceState`
- [x] 3.5 Wire pill switch to call `renderStats(pill)` context switch

## 4. JS — Stats Cards Context Switch

- [x] 4.1 Define `STATS_PILL_MAP` object mapping each pill to its 4 stats card configurations
- [x] 4.2 Implement `renderStats(pill)`: populate existing stat-card DOM nodes with pill-specific data
- [x] 4.3 Performance stats: existing top scores logic (already works)
- [x] 4.4 Efficiency stats: "Most Efficient CPU by MHz", "Most Efficient GPU by MHz", "Best Bottleneck", "Top Thermal Efficiency"
- [x] 4.5 Thermals stats: "Best Thermal Efficiency (°C)", "Hottest Run", "Coolest GPU", "Avg Temp Delta"

## 5. JS — Efficiency Chart Computations

- [x] 5.1 Implement `computeCpuEfficiency(data)`: `cpuSingle / cpuMaxFreq`, filter zero/null, sort top 10
- [x] 5.2 Implement `computeGpuEfficiency(data)`: `gpuScore / gpuMaxFreq`, filter zero/null, sort top 10
- [x] 5.3 Implement `computeBottleneckRatio(data)`: `cpuMulti / gpuScore`, return as scatter dataset with device class labels
- [x] 5.4 Implement `prepareCpuVsGpuScatter(data)`: scatter dataset with GPU brand coloring
- [x] 5.5 Implement `prepareVramVsGpuScatter(data)`: scatter dataset with GPU brand coloring
- [x] 5.6 Implement `renderEfficiencyCharts()`: orchestrate all efficiency chart renders

## 6. JS — Thermal Efficiency Charts

- [x] 6.1 Implement `computeThermalEfficiency(data)`: `mainScore / gpuTempDelta`, filter zero/null, sort top 10
- [x] 6.2 Implement `renderThermalEfficiencyChart()`: horizontal bar chart of score/°C per contributor
- [x] 6.3 Move existing GPU temp chart renders (AMD/NVIDIA/Intel) into `renderThermalsCharts()`
- [x] 6.4 Move portable thermal chart renders into `renderThermalsCharts()`

## 7. JS — Lazy Render Integration

- [x] 7.1 Add lazy render check in `switchPill()`: if `!PILL_STATE.rendered[name]`, call the pill's render function, mark as rendered
- [x] 7.2 Ensure existing Performance charts render immediately on load (backward compat)
- [x] 7.3 Wire filtered data change events to re-render all pills when filters change

## 8. Cleanup

- [x] 8.1 Remove any dead `renderPortableDevicesCharts()` or `renderThermalCharts()` calls that are now superseded
- [x] 8.2 Verify `renderCharts()` only triggers Performance pill charts on initial load
- [ ] 8.3 Test all 3 pills cycle through without chart instance leaks
- [ ] 8.4 Test `?subtab=efficiency` URL param on page load
