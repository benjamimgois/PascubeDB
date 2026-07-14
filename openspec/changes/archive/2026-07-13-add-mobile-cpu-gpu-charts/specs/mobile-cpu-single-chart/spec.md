## ADDED Requirements

### Requirement: Mobile CPU Single Thread chart
The system SHALL render a "Top 10 Mobile CPU - Single Thread" horizontal bar chart in the Mobile Devices section, showing the best CPU Single score per normalized CPU model for Notebook and SBC devices combined.

#### Scenario: Chart renders top 10 Mobile CPUs by Single Thread score
- **WHEN** the Mobile section is visible
- **THEN** a horizontal bar chart displays 10 bars, one per CPU model sorted descending by cpuSingle score
- **THEN** each bar shows the CPU name as Y-axis label, the cpuSingle score as bar length
- **THEN** each bar shows `cpuMaxFreq / cpuMaxPower` as center text inside the bar
- **THEN** the chart color uses the cpuSingle color palette

#### Scenario: No mobile CPU data
- **WHEN** there are no Notebook or SBC devices with cpuSingle data
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
