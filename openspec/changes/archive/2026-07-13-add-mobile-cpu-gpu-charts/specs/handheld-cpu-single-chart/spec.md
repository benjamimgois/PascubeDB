## ADDED Requirements

### Requirement: Handheld CPU Single Thread chart
The system SHALL render a "Top 10 Handheld CPU - Single Thread" horizontal bar chart in the Mobile Devices section, showing the best CPU Single score per normalized CPU model for Handheld devices only.

#### Scenario: Chart renders top 10 Handheld CPUs by Single Thread score
- **WHEN** the Mobile section is visible
- **THEN** a horizontal bar chart displays 10 bars, one per CPU model sorted descending by cpuSingle score
- **THEN** each bar shows the CPU name as Y-axis label, the cpuSingle score as bar length
- **THEN** each bar shows `cpuMaxFreq / cpuMaxPower` as center text inside the bar
- **THEN** the chart color uses the cpuSingle color palette

#### Scenario: No handheld CPU data
- **WHEN** there are no Handheld devices with cpuSingle data
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
