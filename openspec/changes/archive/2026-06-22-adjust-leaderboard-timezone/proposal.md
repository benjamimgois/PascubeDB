## Why

The current timezone conversion in the dashboard (`convertUTCToGMT3`) shifts the displayed date/time values, which can lead to confusion. The user wants to revert the dashboard's timezone conversion completely and display the raw date/time values directly as they are recorded in the Google Sheet / CSV source.

## What Changes

- Remove the `convertUTCToGMT3` helper function in `app.js`.
- Update the Google Sheets Viz API parser (`processGvizData`) to assign the `Date/Time` column value directly as-is without any timezone conversion.
- Update the offline fallback CSV data parser (`processCSVData`) to also assign the `Date/Time` column value directly as-is.

## Capabilities

### New Capabilities

- `leaderboard-raw-datetime`: Displays the raw `Date/Time` column values directly from the data source without any timezone conversion or offset calculations.

### Modified Capabilities

<!-- None -->

## Impact

- [app.js](file:///mnt/NVME/Software/PascubeDB/app.js): Remove `convertUTCToGMT3` and stop converting date/time values.
