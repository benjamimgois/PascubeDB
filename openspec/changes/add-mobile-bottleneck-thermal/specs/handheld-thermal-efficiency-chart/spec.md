## ADDED Requirements

### Requirement: Handheld GPU Thermal Efficiency chart
The system SHALL render a scrollable thermal efficiency chart for Handheld devices, showing GPU Score per °C temperature delta.

#### Scenario: Chart renders entries by thermal efficiency
- **WHEN** the Efficiency tab is visible
- **THEN** a scrollable chart displays entries from Handheld devices sorted by gpuScore / gpuTempDelta ratio
- **THEN** each entry shows GPU name, efficiency ratio, score, and temperature delta
- **THEN** a top-contributor label shows `1º <user> — <gpu> — <ratio> (<score> / <temp>ºC)`

#### Scenario: No handheld thermal data
- **WHEN** there are no Handheld devices with valid gpuScore and gpuTempDelta
- **THEN** the chart canvas SHALL remain empty
