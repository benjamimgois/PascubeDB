# Tasks

## 1. Leaderboard hardware-combo filter

- [x] 1.1 Add module state `leaderboardHardwareFilter` and include it in `handleFilterChange` (normalized CPU AND GPU equality); verify the leaderboard lists only runs matching the pair when it is set.
- [x] 1.2 Add `openLeaderboardForHardware(row)` that sets the filter from `normalizeCPU(row.cpu)` + `normalizeGPU(row.gpu)`, re-filters, and opens the modal; verify the modal opens filtered.
- [x] 1.3 Surface the filter in the active-filter chips with a remove control and clear the filter in the modal `close` handler; verify removing the chip unfilters and reopening via the header button is unfiltered.

## 2. Chart click plumbing

- [x] 2.1 Add an optional `clickRows` parameter to `renderHorizontalBarChart` and `makeChartScrollable`; wire `options.onClick` to resolve `clickRows[startIndex + dataIndex]` and call `openLeaderboardForHardware`, and `options.onHover` to toggle a pointer cursor. Verify no handler runs for charts built without `clickRows`.
- [x] 2.2 Pass the source rows from the in-scope call sites (mainOverall, cpuSingle, cpuMulti, gpu, gpuRt, mobile/handheld CPU/GPU/RT, notebook/handheld runs); verify each opens the leaderboard filtered to the clicked hardware.
- [x] 2.3 Attach the original row in `getTopMobileRuns` / `getTopHandheldRuns` (or return rows) so the runs charts are clickable; verify a notebook-runs bar click opens the filtered leaderboard.
- [x] 2.4 Confirm aggregated charts (popularity, topContributors, averages, efficiency/thermal, donuts) are not wired; verify clicking their bars does nothing.

## 3. Integration verification

- [x] 3.1 Headless browser: simulate clicks on a model chart bar and a combo bar and assert the leaderboard opens filtered to the expected normalized CPU+GPU and lists only matching runs.
- [x] 3.2 Verify the pointer cursor appears only over clickable bars, that a normalize toggle / resize re-render does not drop the click handlers, and that closing the modal clears the filter.
- [x] 3.3 Confirm no HTML/CSS change was needed, `node --check app.js` passes, and `openspec validate chart-drilldown` passes.

## Workflow follow-up

- Archive the change after browser verification and review.
