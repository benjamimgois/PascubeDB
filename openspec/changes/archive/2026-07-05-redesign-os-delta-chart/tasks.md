## 1. HTML: Add Hardware combobox to OS chart header

- [x] 1.1 Add Hardware combobox row (`.baseline-row`) to OS chart header, between mode buttons and baseline row
- [x] 1.2 Ensure visibility toggles work: hardware combobox hidden in Absolute, visible in Delta %

## 2. JS: State and event wiring

- [x] 2.1 Add `osHardware` state variable (or reuse `modelSelection.os` as string)
- [x] 2.2 Add change listener for `#os-hardware` combobox: update state, repopulate baseline, re-render
- [x] 2.3 Modify `setupChartVizControls` OS delta branch to NOT open modal, instead show combobox
- [x] 2.4 If no hardware selected, destroy old chart and show nothing (no stale render)

## 3. JS: Render logic

- [x] 3.1 Modify OS delta render to filter points by selected hardware, compute deltas per OS
- [x] 3.2 Ensure `renderDivergingBarChart` receives proper data format with 1 hardware × multiple OS
- [x] 3.3 Baseline dropdown populated only with OSes available on the selected hardware

## 4. Verify

- [x] 4.1 Syntax check
- [ ] 4.2 Switching hardware updates chart correctly
- [ ] 4.3 Switching baseline within same hardware updates chart
- [ ] 4.4 Absolute/Delta toggle shows/hides correct controls
