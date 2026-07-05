## Why

In Delta % mode, when a non-baseline version has a score equal or very close to the baseline score (resulting in a 0% delta), Chart.js does not render any bar (width of 0 pixels). This leaves a blank space in the chart which can confuse users, making them think the data did not load or the test failed. Drawing a very small bar for non-baseline 0% values provides visual confirmation that the test is indeed rendered and identical to the baseline.

## What Changes

* Modify `renderDivergingBarChart` in `app.js` to configure a `minBarLength` of 3 pixels (or similar minimal value) for datasets that are not the baseline.
* Keep `minBarLength: 0` for the baseline dataset so that the baseline remains a clean reference point with no bar.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `software-comparison`: The diverging bar charts used for delta comparison will draw a minimal bar for non-baseline datasets with 0% delta to indicate identical performance.
