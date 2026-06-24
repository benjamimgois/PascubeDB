# sbc-devices

## MODIFIED Requirements

### Requirement: Top 10 SBC Benchmark Runs
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC Benchmark Runs chart, the label SHALL display the product name (if available and not "N/D") instead of the normalized CPU name.

#### Scenario: Rendering the Top 10 SBC Benchmark Runs with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC runs sorted by Main Score, where each bar label shows the product name (e.g., "Raspberry Pi 5 Rev 1.0") when available, falling back to the CPU model name

### Requirement: Top 10 SBC CPU - Performance Chart
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC CPU Performance chart, the label SHALL display the product name (if available) followed by the CPU model in parentheses.

#### Scenario: Rendering the Top 10 SBC CPU Performance with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC CPU models, where each bar label shows the product name plus CPU model (e.g., "Raspberry Pi 5 (BCM2712)") when product name is available

### Requirement: Top 10 SBC GPU - Performance Chart
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC GPU Performance chart, the label SHALL display the product name (if available) followed by the GPU model in parentheses.

#### Scenario: Rendering the Top 10 SBC GPU Performance with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC GPU models, where each bar label shows the product name plus GPU model (e.g., "Raspberry Pi 5 (VideoCore VII)") when product name is available
