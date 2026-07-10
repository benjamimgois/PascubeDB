## Why

Hardware Benchmark tab has 27 charts stacked vertically — wall of text, user scroll fatigue, no way to jump to what matters. New charts (efficiency, bottleneck, thermal efficiency) would make it worse without restructuring. Pill-based sub-navigation splits content into Performance / Efficiency / Thermals, each focused and browsable.

## What Changes

- Add 3 pill tabs above the stats cards: **Performance**, **Efficiency**, **Thermals**
- Stats cards change context per pill (Performance: existing top scores; Efficiency: most efficient by MHz; Thermals: top thermal efficiency)
- Move existing charts under appropriate pills; add new charts in Efficiency and Thermals
- Portable Devices section dissolves — run/CPU/GPU charts → Performance, thermal charts → Thermals, device-type donut → Performance
- Demographics stays in Performance
- Sub-tab state in URL (`?subtab=efficiency`) for shareable links
- Lazy render charts on pill activation (save memory, no flash)
- New spec capabilities: `subtab-pills`, `efficiency-charts`, `thermal-efficiency-charts`

## Capabilities

### New Capabilities
- `subtab-pills`: horizontal pill navigation for Performance/Efficiency/Thermals, URL state sync, lazy render
- `efficiency-charts`: CPU score/MHz, GPU score/MHz, bottleneck ratio scatter, CPU Single×GPU scatter, VRAM×GPU scatter
- `thermal-efficiency-charts`: score/°C bar chart, restructured thermal section under Thermals pill

### Modified Capabilities
- `dashboard-advanced-charts`: avg charts move from standalone section into Performance subtab
- `dashboard-mobile-charts`: portable section dissolved, charts redistributed to Performance and Thermals
- `dashboard-analytics-charts`: community insights section unaffected (stays in Community tab)

## Impact

- `index.html`: add pill nav markup, remove Portable Devices section, restructure chart containers
- `app.js`: subtab state management, lazy render logic, new chart rendering functions, stats card context switch
- `style.css`: pill styles, active state, transitions
