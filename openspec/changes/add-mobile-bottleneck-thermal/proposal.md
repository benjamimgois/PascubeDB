## Why

Bottleneck Ratio and Thermal Efficiency sections only show overall (all-device) data. Users can't compare CPU/GPU bottleneck balance or thermal efficiency between Mobile (Notebook+SBC) and Handheld segments.

## What Changes

- Bottleneck Ratio section expanded to 3 rows × 2 columns:
  - Row 1: GPU vs CPU (Overall) + Top 10 CPU (Overall) — existing
  - Row 2: GPU vs CPU (Mobile) + Top 10 CPU (Mobile) — new
  - Row 3: GPU vs CPU (Handheld) + Top 10 CPU (Handheld) — new
- Each new interactive bottleneck chart gets its own GPU dropdown filtered by category
- Thermal Efficiency section changed from 1 full-width chart to 3-column grid:
  - GPU Thermal Efficiency (Overall) — existing, moved from full-width
  - Mobile GPU Thermal Efficiency (Notebook+SBC) — new
  - Handheld GPU Thermal Efficiency — new
- No breaking changes

## Capabilities

### New Capabilities
- `mobile-bottleneck-chart`: Interactive GPU vs CPU bottleneck ratio chart for Notebook and SBC devices
- `handheld-bottleneck-chart`: Interactive GPU vs CPU bottleneck ratio chart for Handheld devices
- `mobile-cpu-bottleneck-chart`: Top 10 CPU bottlenecks for Notebook and SBC devices
- `handheld-cpu-bottleneck-chart`: Top 10 CPU bottlenecks for Handheld devices
- `mobile-thermal-efficiency-chart`: GPU thermal efficiency (score/°C) for Notebook and SBC devices
- `handheld-thermal-efficiency-chart`: GPU thermal efficiency (score/°C) for Handheld devices

### Modified Capabilities
- (none)

## Impact

- `index.html`: 6 new chart containers + 3 new dropdowns + 2 new top-contributor labels; Thermal Efficiency grid from full-width to 3-column layout
- `style.css`: new 3-column grid class for thermal efficiency section
- `app.js`: 6 new render calls using existing `renderBottleneckChart`/`renderTopCpuBottlenecks`/`computeThermalEfficiency` with filtered data; 3 new GPU select populations for category-filtered dropdowns
