## ADDED Requirements

### Requirement: Handheld GPU Efficiency chart
The system SHALL render a "Handheld GPU Efficiency by MHz" scrollable chart in the Efficiency by Clock section, showing GPU Score per MHz for Handheld devices.

#### Scenario: Chart renders top entries by efficiency ratio
- **WHEN** the Efficiency tab is visible
- **THEN** a scrollable efficiency chart displays entries sorted descending by gpuScore / gpuMaxFreq ratio
- **THEN** each entry shows the GPU name, efficiency ratio (pts/MHz), frequency, and raw score
- **THEN** a top-contributor label shows `1º <best GPU name>` or `—` if no data

#### Scenario: No handheld GPU efficiency data
- **WHEN** there are no Handheld devices with valid gpuScore and gpuMaxFreq
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
