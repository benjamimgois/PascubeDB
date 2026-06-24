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
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC Benchmark Runs chart, the label SHALL display the product name (if available and not "N/D") instead of the normalized CPU name.

#### Scenario: Rendering the Top 10 SBC Benchmark Runs with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC runs sorted by Main Score, where each bar label shows the product name (e.g., "Raspberry Pi 5 Rev 1.0") when available, falling back to the CPU model name

### Requirement: Top 10 SBC CPU - Performance Chart
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC CPU Performance chart, the label SHALL display the product name (if available) on a second line below the CPU model.

#### Scenario: Rendering the Top 10 SBC CPU Performance with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC CPU models, where each bar label shows the CPU model with the product name below it (e.g., "BCM2712\\nRaspberry Pi 5 Rev 1.0") when product name is available

### Requirement: Top 10 SBC GPU - Performance Chart
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC GPU Performance chart, the label SHALL display the product name (if available) on a second line below the GPU model.

#### Scenario: Rendering the Top 10 SBC GPU Performance with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC GPU models, where each bar label shows the GPU model with the product name below it (e.g., "VideoCore VII\\nRaspberry Pi 5 Rev 1.0") when product name is available
