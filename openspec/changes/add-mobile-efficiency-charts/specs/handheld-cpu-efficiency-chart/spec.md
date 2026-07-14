## ADDED Requirements

### Requirement: Handheld CPU Efficiency chart
The system SHALL render a "Handheld CPU Efficiency by MHz" scrollable chart in the Efficiency by Clock section, showing CPU Single score per MHz for Handheld devices.

#### Scenario: Chart renders top entries by efficiency ratio
- **WHEN** the Efficiency tab is visible
- **THEN** a scrollable efficiency chart displays entries sorted descending by cpuSingle / cpuMaxFreq ratio
- **THEN** each entry shows the CPU name, efficiency ratio (pts/MHz), frequency, and raw score
- **THEN** a top-contributor label shows `1º <best CPU name>` or `—` if no data

#### Scenario: No handheld CPU efficiency data
- **WHEN** there are no Handheld devices with valid cpuSingle and cpuMaxFreq
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
