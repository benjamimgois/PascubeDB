## ADDED Requirements

### Requirement: Handheld Top 10 CPU Bottlenecks chart
The system SHALL render a "Top 10 CPU Bottlenecks" chart for Handheld devices, showing the worst CPU-limited combinations.

#### Scenario: Chart renders top 10 worst CPU bottlenecks
- **WHEN** the Efficiency tab is visible
- **THEN** a bottleneck chart displays 10 entries with lowest cpuMulti/gpuScore ratio from Handheld devices
- **THEN** each entry shows CPU+GPU label with ratio color coding

#### Scenario: No handheld bottleneck data
- **WHEN** there are no Handheld devices with valid cpuMulti and gpuScore
- **THEN** the chart canvas SHALL remain empty
