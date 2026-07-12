## Why

To improve user experience, the "GPU vs CPU Bottleneck" chart should default to displaying the most used GPU model, the "RX 9070 XT", upon loading or rendering the page, rather than defaulting to the first sorted element.

## What Changes

- Modify `app.js`'s initialization logic for the bottleneck GPU selection dropdown.
- Check if "RX 9070 XT" is an available option in the dropdown and set it as the default selected option.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-advanced-charts`: Set RX 9070 XT as the default selected GPU for the bottleneck chart.

## Impact

- `app.js`: Updates dropdown initialization code for `bottleneckGpuSelect`.
