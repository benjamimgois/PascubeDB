## ADDED Requirements

### Requirement: Mobile GPU Efficiency chart
The system SHALL render a "Mobile GPU Efficiency by MHz" scrollable chart in the Efficiency by Clock section, showing GPU Score per MHz for Notebook and SBC devices combined. Desktop GPUs SHALL be excluded for Notebook-classified devices.

#### Scenario: Chart renders top entries by efficiency ratio
- **WHEN** the Efficiency tab is visible
- **THEN** a scrollable efficiency chart displays entries sorted descending by gpuScore / gpuMaxFreq ratio
- **THEN** each entry shows the GPU name, efficiency ratio (pts/MHz), frequency, and raw score
- **THEN** a top-contributor label shows `1º <best GPU name>` or `—` if no data

#### Scenario: Desktop GPUs excluded for Notebook
- **WHEN** a Notebook device has a desktop-class GPU (e.g., RTX 4090 without "laptop" or "mobile")
- **THEN** that device SHALL be excluded from the chart data

#### Scenario: No mobile GPU efficiency data
- **WHEN** there are no Notebook or SBC devices with valid gpuScore and gpuMaxFreq
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
