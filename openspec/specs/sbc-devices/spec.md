# sbc-devices

## Purpose
Specifies the capability to detect and classify Single Board Computer (SBC) devices based on aarch64 architecture, and render dedicated performance and OS distribution charts for SBCs in the Mobile and SBC Devices section of the dashboard.

## Requirements

### Requirement: SBC Device Detection
The system SHALL read the "architecture" field from each benchmark row. If the architecture is "aarch64", the device SHALL be classified as "SBC". This classification SHALL take precedence over "Desktop" but yield to "Handheld" when both Handheld and aarch64 signatures match.

#### Scenario: Classifying aarch64 rows as SBC
- **WHEN** the benchmark data is processed
- **THEN** any row with architecture equal to "aarch64" is labeled as "SBC", unless it already matches Handheld criteria (e.g., Steam Deck)

### Requirement: SBCs Operating Systems Chart
The system SHALL aggregate the count of each unique operating system name for SBC devices present in the benchmark data and render a doughnut chart displaying their distribution.

#### Scenario: Rendering the SBCs Operating Systems chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the OS distribution specifically for SBC devices

### Requirement: Top 10 SBC Benchmark Runs
The system SHALL identify SBC devices and render a horizontal bar chart of the top 10 highest individual Main Scores recorded by SBC devices. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of that run.

#### Scenario: Rendering the Top 10 SBC Benchmark Runs chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 SBC CPU - Performance Chart
The system SHALL identify SBC devices and render a horizontal bar chart of the top 10 SBC CPU models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run for that SBC CPU model.

#### Scenario: Rendering the Top 10 SBC CPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC CPU models and their average CPU Single scores, including the client-id of the top run in the tooltip on hover

### Requirement: Top 10 SBC GPU - Performance Chart
The system SHALL identify SBC devices and render a horizontal bar chart of the top 10 SBC GPU models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run for that SBC GPU model.

#### Scenario: Rendering the Top 10 SBC GPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC GPU models and their average GPU scores, including the client-id of the top run in the tooltip on hover
