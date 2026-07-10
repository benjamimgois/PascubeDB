# dashboard-mobile-charts

## MODIFIED Requirements

### Requirement: Mobile Device Detection Logic
**Change**: Portable detection logic is unchanged. The requirement remains as-is — Handheld/Notebook/SBC classification still runs across the whole dataset.

### Requirement: Mobile Device Type Distribution Chart
**Change**: This doughnut chart moves into the Performance pill of the subtab system, positioned within the Demographics area.

The system SHALL aggregate the counts of Handheld vs. Notebook vs. SBC devices and render a doughnut chart displaying their percentage distribution. The chart title SHALL read "Portable device type".

#### Scenario: Rendering the Portable device type chart
- **WHEN** the Hardware tab loads and the Performance pill is active
- **THEN** a doughnut chart is rendered showing the percentage of Handhelds, Notebooks, and SBCs among all identified non-desktop devices

### Requirement: Top 10 Notebook Benchmark Runs
**Change**: This chart moves from the standalone "Portable Devices" section into the Performance pill of the subtab system.

#### Scenario: Rendering the Top 10 Notebook Benchmark Runs chart (moved to Performance)
- **WHEN** the Performance pill is active and the dataset is available
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 Handheld Benchmark Runs
**Change**: This chart moves from the standalone "Portable Devices" section into the Performance pill.

#### Scenario: Rendering the Top 10 Handheld Benchmark Runs chart (moved to Performance)
- **WHEN** the Performance pill is active and the dataset is available
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 SBC Benchmark Runs
**Change**: This chart moves from the standalone "Portable Devices" section into the Performance pill.

#### Scenario: Rendering the Top 10 SBC Benchmark Runs with product name (moved to Performance)
- **WHEN** the Performance pill is active and the dataset is available
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC runs sorted by Main Score, where each bar label shows the product name when available, falling back to the CPU model name

## REMOVED Requirements

### Requirement: Top 10 Notebook CPU Model - Performance
**Reason**: CPU-only and GPU-only top performance charts for portables are being removed to reduce redundancy. The device-type scatter plot better shows device class impact.
**Migration**: Users can view the Bottleneck Ratio scatter in the Efficiency pill, which includes device class color coding.

### Requirement: Top 10 Notebook GPU Model - Performance
**Reason**: Same as above.
**Migration**: See above.

### Requirement: Top 10 Handheld CPU Model - Performance
**Reason**: Same as above.
**Migration**: See above.

### Requirement: Top 10 Handheld GPU Model - Performance
**Reason**: Same as above.
**Migration**: See above.

### Requirement: Top 10 SBC CPU Model - Performance
**Reason**: Same as above.
**Migration**: See above.

### Requirement: Top 10 SBC GPU Model - Performance
**Reason**: Same as above.
**Migration**: See above.

### Requirement: Notebook Thermal Load
**Reason**: Portable thermal charts move to the Thermals pill and are consolidated under the existing per-brand temperature charts.
**Migration**: See table below.

### Requirement: Handheld Thermal Load
**Reason**: Same as above.
**Migration**: See below.

### Requirement: SBC Thermal Load
**Reason**: Same as above.
**Migration**: See below.
