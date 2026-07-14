## 1. HTML — Chart Containers + Top Contributor Labels

- [x] 1.1 Add chart container for Mobile CPU Efficiency (`mobileCpuEffChart`) with toggle and top-contributor span
- [x] 1.2 Add chart container for Handheld CPU Efficiency (`handheldCpuEffChart`) with toggle and top-contributor span
- [x] 1.3 Add chart container for Mobile GPU Efficiency (`mobileGpuEffChart`) with toggle and top-contributor span
- [x] 1.4 Add chart container for Handheld GPU Efficiency (`handheldGpuEffChart`) with toggle and top-contributor span

## 2. JS — Chart Rendering

- [x] 2.1 Render Mobile CPU Efficiency using `computeCpuEfficiency(bm.filter(r => ['Notebook','SBC'].includes(classifyDevice(r))))`
- [x] 2.2 Render Handheld CPU Efficiency using `computeCpuEfficiency(bm.filter(r => classifyDevice(r) === 'Handheld'))`
- [x] 2.3 Render Mobile GPU Efficiency using `computeGpuEfficiency(bm.filter(r => ['Notebook','SBC'].includes(classifyDevice(r))))`
- [x] 2.4 Render Handheld GPU Efficiency using `computeGpuEfficiency(bm.filter(r => classifyDevice(r) === 'Handheld'))`
- [x] 2.5 Update top-contributor labels for all 4 new charts

## 3. Verify

- [ ] 3.1 Open browser and verify all 4 new efficiency charts render in the Efficiency tab
- [ ] 3.2 Verify normalize toggle works on each new chart
- [ ] 3.3 Verify top-contributor labels show correct data
