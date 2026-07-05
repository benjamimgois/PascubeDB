## 1. Core Implementation

- [x] 1.1 Modify `getDriverScatterData` in `app.js` to classify Mesa runs based on the driver string containing Mesa instead of excluding GPU model name keywords.
- [x] 1.2 Modify `getDriverScatterData` in `app.js` to classify NVIDIA runs based on the driver string containing NVRM or NVIDIA instead of checking GPU model name keywords.
- [x] 1.3 Add validation to filter out empty or whitespace-only normalized GPU model names in `getDriverScatterData` before grouping.
- [x] 1.4 Increase default `maxHardware` to 40 in `getDriverScatterData`, `getKernelScatterData`, and `getOSvsHardwareScatterData`.
- [x] 1.5 Slice labels in `renderHardwareComparisonBars` to top 15 for OS and top 12 for others to avoid clutter on absolute charts.

## 2. Verification

- [x] 2.1 Verify that Mesa and NVIDIA Driver vs. GPU charts render correctly with the correct number of GPUs (including GTX and MX cards under NVIDIA).
- [x] 2.2 Verify that empty GPU labels do not appear on the charts.
- [x] 2.3 Verify that the Delta % dropdowns show all eligible hardware models (up to 40).
