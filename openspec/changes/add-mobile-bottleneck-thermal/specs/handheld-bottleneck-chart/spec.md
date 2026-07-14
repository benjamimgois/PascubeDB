## ADDED Requirements

### Requirement: Handheld GPU vs CPU Bottleneck chart
The system SHALL render an interactive bottleneck ratio chart for Handheld devices, with its own GPU dropdown populated from Handheld-classified submissions.

#### Scenario: Chart renders with GPU dropdown
- **WHEN** the Efficiency tab is visible
- **THEN** a bottleneck ratio chart displays bars for GPUs from Handheld devices
- **THEN** a dropdown lists GPUs present in Handheld data
- **WHEN** user selects a GPU from the dropdown
- **THEN** the chart switches to show CPU models paired with that GPU

#### Scenario: No handheld bottleneck data
- **WHEN** there are no Handheld devices with valid cpuMulti and gpuScore
- **THEN** the chart canvas SHALL remain empty
