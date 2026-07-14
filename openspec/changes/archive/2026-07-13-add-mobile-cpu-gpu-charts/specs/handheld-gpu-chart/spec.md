## ADDED Requirements

### Requirement: Handheld GPU Performance chart
The system SHALL render a "Top 10 Handheld GPU - Performance" horizontal bar chart in the Mobile Devices section, showing the best GPU score per normalized GPU model for Handheld devices only. No desktop GPU filtering is applied (Handheld devices never have desktop GPUs).

#### Scenario: Chart renders top 10 Handheld GPUs by score
- **WHEN** the Mobile section is visible
- **THEN** a horizontal bar chart displays 10 bars, one per GPU model sorted descending by gpuScore
- **THEN** each bar shows the GPU name as Y-axis label, the gpuScore as bar length
- **THEN** each bar shows `gpuMaxFreq / gpuMaxPower` as center text inside the bar
- **THEN** the chart color uses the gpu color palette

#### Scenario: No handheld GPU data
- **WHEN** there are no Handheld devices with gpuScore data
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
