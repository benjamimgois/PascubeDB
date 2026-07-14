## 1. HTML — Bottleneck Containers + Dropdowns

- [x] 1.1 Add chart container with GPU dropdown for Mobile Bottleneck (`mobileBottleneckChart` + `mobileBottleneckGpuSelect`)
- [x] 1.2 Add chart container with GPU dropdown for Handheld Bottleneck (`handheldBottleneckChart` + `handheldBottleneckGpuSelect`)
- [x] 1.3 Add chart container for Mobile Top 10 CPU Bottleneck (`mobileTopCpuBottleneckChart`)
- [x] 1.4 Add chart container for Handheld Top 10 CPU Bottleneck (`handheldTopCpuBottleneckChart`)

## 2. HTML — Thermal Efficiency Containers

- [x] 2.1 Repurpose thermal section to 3-column grid (add CSS class)
- [x] 2.2 Add chart container for Mobile Thermal Efficiency (`mobileThermalEffChart` + top-contributor)
- [x] 2.3 Add chart container for Handheld Thermal Efficiency (`handheldThermalEffChart` + top-contributor)

## 3. CSS — Thermal Grid

- [x] 3.1 Add `.thermal-eff-grid` class (3 equal columns, gap, responsive breakpoints)

## 4. JS — Bottleneck Rendering

- [x] 4.1 Populate `mobileBottleneckGpuSelect` dropdown from Mobile GPUs
- [x] 4.2 Populate `handheldBottleneckGpuSelect` dropdown from Handheld GPUs
- [x] 4.3 Render Mobile Bottleneck chart using `renderBottleneckChart(bm.filter(...Mobile...), mobileGpuSelect.value)`
- [x] 4.4 Render Handheld Bottleneck chart using `renderBottleneckChart(bm.filter(...Handheld...), handheldGpuSelect.value)`
- [x] 4.5 Render Mobile Top 10 CPU Bottlenecks using `renderTopCpuBottlenecks(bm.filter(...Mobile...))` with new canvas ID
- [x] 4.6 Render Handheld Top 10 CPU Bottlenecks using `renderTopCpuBottlenecks(bm.filter(...Handheld...))` with new canvas ID

## 5. JS — Thermal Efficiency Rendering

- [x] 5.1 Render Mobile Thermal Efficiency using `computeThermalEfficiency(bm.filter(...Mobile...))` with top-contributor label
- [x] 5.2 Render Handheld Thermal Efficiency using `computeThermalEfficiency(bm.filter(...Handheld...))` with top-contributor label
- [x] 5.3 Update overall Thermal Efficiency to render in 3-col grid context

## 6. Verify

- [ ] 6.1 Open browser and verify all bottleneck charts render with correct dropdowns
- [ ] 6.2 Verify thermal efficiency 3-column layout
- [ ] 6.3 Verify top-contributor labels
