# dashboard-mobile-charts

## REMOVED Requirements

### Requirement: Top 10 Mobile CPU Performance Chart
**Reason**: Replaced by per-category CPU charts in portable-device-cpu-charts spec

### Requirement: Top 10 Mobile GPU Performance Chart
**Reason**: Replaced by per-category GPU charts in portable-device-gpu-charts spec

### Requirement: Notebook vs Handheld vs SBC Averages Chart
**Reason**: Removed in favor of per-category top runs and dedicated CPU/GPU charts

### Requirement: Top 10 Handheld Performance Chart
**Reason**: Replaced by dedicated "Top 10 Handheld Benchmark Runs - Main Score" in this spec

## MODIFIED Requirements

### Requirement: Mobile Device Type Distribution Chart
The system SHALL aggregate the counts of Handheld vs. Notebook vs. SBC devices and render a doughnut chart displaying their percentage distribution. The chart title SHALL read "Portable device type".

#### Scenario: Rendering the Portable device type chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing the percentage of Handhelds, Notebooks, and SBCs among all identified non-desktop devices

## ADDED Requirements

### Requirement: Top 10 Notebook Benchmark Runs
The system SHALL identify Notebook devices and render a horizontal bar chart of the top 10 highest individual Main Scores.

#### Scenario: Rendering the Top 10 Notebook Benchmark Runs chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 Handheld Benchmark Runs
The system SHALL identify Handheld devices and render a horizontal bar chart of the top 10 highest individual Main Scores.

#### Scenario: Rendering the Top 10 Handheld Benchmark Runs chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 SBC Benchmark Runs
The system SHALL identify SBC devices and render a horizontal bar chart of the top 10 highest individual Main Scores.

#### Scenario: Rendering the Top 10 SBC Benchmark Runs chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover
