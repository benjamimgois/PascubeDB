## ADDED Requirements

### Requirement: Mobile GPU vs CPU Bottleneck chart
The system SHALL render an interactive bottleneck ratio chart for Notebook and SBC devices, with its own GPU dropdown populated from Mobile-classified submissions.

#### Scenario: Chart renders with GPU dropdown
- **WHEN** the Efficiency tab is visible
- **THEN** a bottleneck ratio chart displays bars for GPUs from Notebook and SBC devices
- **THEN** a dropdown lists GPUs present in Mobile data
- **WHEN** user selects a GPU from the dropdown
- **THEN** the chart switches to show CPU models paired with that GPU

#### Scenario: No mobile bottleneck data
- **WHEN** there are no Notebook or SBC devices with valid cpuMulti and gpuScore
- **THEN** the chart canvas SHALL remain empty
