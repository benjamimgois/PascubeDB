# Proposal

## Why

Several dashboard views in PascubeDB currently suffer from visual clutter and redundant layouts:
1. High-cardinality doughnut charts (such as `Kernel Versions`, `GOverlay Versions`, `Mesa Versions`, and `OS Distribution`) render 10–17+ slices while cycling through only 5 colors, making slices indistinguishable and legends multi-line.
2. Each comparison card in the **Software Benchmark** tab exposes 5 separate header controls (`Normalize`, `Absolute | Delta %`, `Family | Model`, `Hardware`, `Baseline`) where `Normalize` and `Delta %` overlap conceptually, and `Baseline` remains visible even in `Absolute` mode.
3. The **Hardware Benchmark** tab repeats the same metrics (Main, CPU Single/Multi, GPU Raster/RT, Clock Efficiency, Bottleneck, Thermal Efficiency) across separate General, Mobile, and Handheld card grids—producing 24+ charts and excessive vertical scrolling.

## What Changes

- **Standardize High-Cardinality Doughnut Charts (`Top 5 + Others`)**:
  - Sort distribution entries descending by count, keep the Top 5 items, and group remaining items into an `Others` slice with a distinct 6-color palette (5 distinct colors + neutral gray for `Others`) so no colors repeat.
  - Enhance the `Others` slice tooltip to list the grouped items and their counts (e.g., top items inside `Others` + remaining count).
  - Apply consistently to `kernelVersionChart`, `goverlayVersionChart`, `mesaVersionChart`, `nvidiaVersionChart`, `osDistChart`, and `handheldOsDistChart`.
- **Simplify Software Benchmark Card Headers**:
  - Replace the separate `Normalize` toggle and `Absolute | Delta %` button group on software comparison cards (`OS vs. Hardware`, `Mesa Driver vs. GPU`, `NVIDIA Driver vs. GPU`, `Kernel vs. CPU Score`) with a single 3-mode selector: `Absolute` | `Normalized %` | `Delta %`.
  - Hide the `Baseline` selector row whenever `Delta %` is not active.
  - Keep `Normalize all` synchronized with the unified 3-mode selector.
- **Consolidate Hardware Benchmark Charts with a Device Category Filter**:
  - **BREAKING** (DOM/layout consolidation): Remove the duplicated Mobile and Handheld chart cards in the `Performance` and `Efficiency` pills of the Hardware Benchmark tab, retaining a single unified set of charts (`Top 10 Main`, `CPU Single`, `CPU Multi`, `GPU Raster`, `GPU RT`, `CPU/GPU Efficiency by MHz`, `Bottleneck Ratio`, `Thermal Efficiency`).
  - Add a **Device Category** filter (`All` | `Desktop` | `Mobile / SBC` | `Handheld`) in the Hardware Benchmark tab bar that dynamically filters the dataset feeding those unified charts.
  - Keep the `Mobile Device Type` doughnut chart in System Demographics so the Handheld vs. Mobile breakdown remains visible at a glance.

## Capabilities

### New Capabilities
- `hardware-category-filter`: Unified Device Category filter (`All`, `Desktop`, `Mobile / SBC`, `Handheld`) for the Hardware Benchmark tab that scopes performance, efficiency, bottleneck, and thermal charts without duplicating chart cards.

### Modified Capabilities
- `dashboard-analytics-charts`: High-cardinality doughnut charts (Kernel, GOverlay, Mesa, NVIDIA, OS, Handheld OS) cap slices at Top 5 + `Others` using a non-repeating 6-color palette and itemized `Others` tooltip details.
- `software-comparison`: Consolidates `Normalize` and `Absolute | Delta %` controls into a single 3-mode selector (`Absolute`, `Normalized %`, `Delta %`) and shows the `Baseline` dropdown only in `Delta %` mode.
- `dashboard-mobile-charts`: Removes duplicated Mobile and Handheld performance/efficiency chart cards in favor of the unified Hardware Benchmark charts scoped by the Device Category filter, keeping `Mobile Device Type` distribution in Demographics.

## Impact

- **`index.html`**: Remove duplicated Mobile/Handheld chart wrappers in `#tab-hardware`; add the Device Category filter control; update `.chart-header` controls in `#tab-software` to use the 3-mode selector.
- **`app.js`**: Add `formatTopNWithOthers()` helper and update doughnut renderers + tooltips; update `chartVizState`, `VIZ_CHART_IDS`, and `normalize-all-cb` handlers for the 3-mode selector and conditional `Baseline` visibility; refactor Hardware Benchmark renderers to filter by the active Device Category instead of rendering separate Mobile/Handheld canvases.
- **`style.css`**: Add styles for the Device Category segmented control and ensure 3-button mode groups + conditional baseline rows wrap cleanly on mobile and desktop.
