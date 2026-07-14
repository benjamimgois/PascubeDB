## 1. Data Helpers

- [x] 1.1 Create `getTopHandheldCPUs(data, limit)` — best cpuSingle per normalized CPU for Handheld devices
- [x] 1.2 Create `getTopMobileCPUMulti(data, limit)` — best cpuMulti per normalized CPU for Mobile (Notebook+SBC)
- [x] 1.3 Create `getTopHandheldCPUMulti(data, limit)` — best cpuMulti per normalized CPU for Handheld
- [x] 1.4 Create `getTopHandheldGPUs(data, limit)` — best gpuScore per normalized GPU for Handheld (no desktop filter needed)

## 2. HTML — Chart Containers

- [x] 2.1 Add chart container for Mobile CPU Single (`mobileCpuSingChart`)
- [x] 2.2 Add chart container for Handheld CPU Single (`handheldCpuSingChart`)
- [x] 2.3 Add chart container for Mobile CPU Multi (`mobileCpuMultiChart`)
- [x] 2.4 Add chart container for Handheld CPU Multi (`handheldCpuMultiChart`)
- [x] 2.5 Add chart container for Mobile GPU Performance (`mobileGpuChart`)
- [x] 2.6 Add chart container for Handheld GPU Performance (`handheldGpuChart`)

## 3. JS — Chart Rendering

- [x] 3.1 Render Mobile CPU Single chart using `getTopMobileCPUs()` with freq/power center text
- [x] 3.2 Render Handheld CPU Single chart using `getTopHandheldCPUs()` with freq/power center text
- [x] 3.3 Render Mobile CPU Multi chart using `getTopMobileCPUMulti()` with freq/power center text
- [x] 3.4 Render Handheld CPU Multi chart using `getTopHandheldCPUMulti()` with freq/power center text
- [x] 3.5 Render Mobile GPU chart using `getTopMobileGPUs()` with freq/power center text
- [x] 3.6 Render Handheld GPU chart using `getTopHandheldGPUs()` with freq/power center text

## 4. Cleanup

- [x] 4.1 Remove stale `renderCategoryCharts` calls (replaced with explicit render calls)

## 5. Verify

- [ ] 5.1 Open browser and verify all 8 charts (2 runs + 6 new) render in the Mobile section
- [ ] 5.2 Verify freq/power center text shows correctly on each bar
