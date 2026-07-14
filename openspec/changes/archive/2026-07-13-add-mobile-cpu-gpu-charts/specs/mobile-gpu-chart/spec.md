## ADDED Requirements

### Requirement: Mobile GPU Performance chart
The system SHALL render a "Top 10 Mobile GPU - Performance" horizontal bar chart in the Mobile Devices section, showing the best GPU score per normalized GPU model for Notebook and SBC devices combined. Desktop GPUs SHALL be excluded for Notebook-classified devices.

#### Scenario: Chart renders top 10 Mobile GPUs by score
- **WHEN** the Mobile section is visible
- **THEN** a horizontal bar chart displays 10 bars, one per GPU model sorted descending by gpuScore
- **THEN** each bar shows the GPU name as Y-axis label, the gpuScore as bar length
- **THEN** each bar shows `gpuMaxFreq / gpuMaxPower` as center text inside the bar
- **THEN** the chart color uses the gpu color palette

#### Scenario: Desktop GPUs excluded for Notebook
- **WHEN** a Notebook device has a desktop-class GPU (e.g., RTX 4090 without "laptop" or "mobile" in name)
- **THEN** that device SHALL be excluded from the chart data

#### Scenario: No mobile GPU data
- **WHEN** there are no Notebook or SBC devices with gpuScore data
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
