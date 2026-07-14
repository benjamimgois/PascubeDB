## Context

Mobile section currently has: distribution donut, Mobile runs chart, Handheld runs chart, Average Performance cards, thermal charts. CPU/GPU performance charts never existed — `renderCategoryCharts` targeted canvas IDs that were never in HTML, silently failing. The section has room for 6 more charts in the existing 2-column `mobile-runs-grid`.

## Goals / Non-Goals

**Goals:**
- Add paired Mobile | Handheld charts for CPU Single, CPU Multi, and GPU
- Each bar shows score + center text `freq / power`
- Reuse existing `renderHorizontalBarChart` with freq/power params
- Keep HTML grid changes minimal (add canvas containers, reuse grid)

**Non-Goals:**
- No new CSS classes or layout restructuring
- No changes to desktop (Overview) section charts
- No changes to classifyDevice() or data model

## Decisions

**1. Explicit renderHorizontalBarChart calls vs renderCategoryCharts**
- renderCategoryCharts is too rigid (fixed 4-chart layout with OS donut baked in)
- Explicit calls give per-chart control over labels, colors, data source
- Simpler to add/remove individual charts later

**2. Data functions: new helpers vs generic getTopCategoryCPUs/GPUs**
- Create `getTopHandheldCPUs()`, `getTopHandheldGPUs()`, `getTopMobileCPUMulti()`, `getTopHandheldCPUMulti()`
- Consistent with existing `getTopMobileCPUs()` / `getTopMobileGPUs()` signature (`{name, score, displayName, cpuMaxFreq, cpuMaxPower}`)
- `getTopCategoryCPUs`/`getTopCategoryGPUs` are fine for Handheld single but don't support CPU Multi

**3. Chart placement within mobile-runs-grid**
- Add new containers between runs charts and average performance section
- Order: Runs → CPU Single → CPU Multi → GPU → Average Performance → Thermal
- Each pair occupies one 2-column row (Mobile left, Handheld right)

**4. Freq/power display**
- CPU charts pass `cpuMaxFreq` + `cpuMaxPower` to renderHorizontalBarChart
- GPU charts pass `gpuMaxFreq` + `gpuMaxPower`
- Existing center-text logic at app.js:5803-5806 handles `freq / power` format automatically

**5. Remove stale renderCategoryCharts call**
- `renderCategoryCharts('Mobile', ...)` at line 4056 targets non-existent canvases
- Remove it entirely — all its work is replaced by the new explicit render calls

## Risks / Trade-offs

- **Chart volume**: 6 more charts means 6 more Chart.js instances. Existing dashboard already handles ~20 charts; 6 more is acceptable.
- **Grid height**: mobile-runs-grid grows taller. User scrolls more. Acceptable — thermal section is already below the fold.
- **Data overlap**: CPU Single and CPU Multi for same hardware may highlight same CPUs twice. Acceptable — different metrics, valuable to see both.
