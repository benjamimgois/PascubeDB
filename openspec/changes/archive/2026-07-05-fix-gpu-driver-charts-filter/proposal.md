## Why

The "Mesa Driver vs. GPU" and "NVIDIA Driver vs. GPU" comparison charts currently exclude NVIDIA GTX and MX series GPUs entirely, and can display "empty" GPU label names for normalized empty values (such as "Intel(R) Graphics" normalized to empty). This happens because the categorization filter relies on GPU name keyword matching (checking only for "nvidia", "rtx", "geforce") rather than examining the driver string directly. Fixing this ensures all eligible GPUs with multiple driver versions are correctly displayed in the charts.

## What Changes

* Modify the driver classification filter in `getDriverScatterData` to categorize runs based on the driver string content ("Mesa" vs "NVRM"/"NVIDIA") instead of GPU model names.
* Ensure GTX and MX series GPUs are correctly classified under NVIDIA driver charts and not Mesa charts.
* Filter out runs where the normalized GPU model name resolves to an empty or whitespace-only string to avoid displaying blank categories in the charts.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `software-comparison`: The GPU classification logic for NVIDIA and Mesa driver versions is updated to rely on driver strings, ensuring GTX and MX models are correctly grouped.
