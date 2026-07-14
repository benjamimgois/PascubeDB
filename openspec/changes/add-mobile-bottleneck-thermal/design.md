## Context

Bottleneck Ratio section has 2 charts in a `driver-comparison-grid` (2 cols): GPU vs CPU (interactive dropdown) + Top 10 CPU. Thermal Efficiency is a single full-width chart. Both only use all-device data.

Existing functions:
- `renderBottleneckChart(data, selectedGpu)` — accepts any data array and GPU selection
- `renderTopCpuBottlenecks(data)` — accepts any data array
- `computeThermalEfficiency(data)` — accepts any data array

All three are reusable with filtered input, no modifications needed.

## Goals / Non-Goals

**Goals:**
- Add Mobile and Handheld variants for both Bottleneck charts and Thermal Efficiency
- 3 independent GPU dropdowns (overall, mobile, handheld) for the interactive bottleneck chart
- Thermal Efficiency in 3-column grid

**Non-Goals:**
- No changes to overall charts (they stay as-is)
- No changes to data model or helper functions

## Decisions

**1. Grid layout changes**
- Bottleneck section: change `driver-comparison-grid` layout to accommodate 3 rows (overall, mobile, handheld) × 2 columns
- Each row has the interactive chart (left) and top 10 (right)
- Thermal section: add new CSS grid class `thermal-eff-grid` with 3 equal columns

**2. GPU dropdowns per category**
- Each interactive bottleneck chart needs its own `<select>` populated with GPUs from that category
- Overall: all GPUs (existing)
- Mobile: GPUs from Notebook+SBC devices only
- Handheld: GPUs from Handheld devices only
- Selection state per dropdown is independent

**3. Thermal Efficiency top contributor**
- Overall keeps existing `thermalEffTop` label
- Mobile and Handheld get their own labels with same format

## Risks / Trade-offs

- **Dropdown complexity**: 3 independent selects, each triggers re-render of its own chart. Existing `renderBottleneckChart` pattern reused 3 times.
- **Grid height**: 3-row bottleneck section is tall. Section is already below the fold, acceptable.
- **CSS**: New 3-col grid class needed for thermal section. Minimal addition.
