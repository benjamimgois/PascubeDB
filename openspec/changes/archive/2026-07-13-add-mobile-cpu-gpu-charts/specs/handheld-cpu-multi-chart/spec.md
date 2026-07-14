## ADDED Requirements

### Requirement: Handheld CPU Multi Thread chart
The system SHALL render a "Top 10 Handheld CPU - Multi Thread" horizontal bar chart in the Mobile Devices section, showing the best CPU Multi score per normalized CPU model for Handheld devices only.

#### Scenario: Chart renders top 10 Handheld CPUs by Multi Thread score
- **WHEN** the Mobile section is visible
- **THEN** a horizontal bar chart displays 10 bars, one per CPU model sorted descending by cpuMulti score
- **THEN** each bar shows the CPU name as Y-axis label, the cpuMulti score as bar length
- **THEN** each bar shows `cpuMaxFreq / cpuMaxPower` as center text inside the bar
- **THEN** the chart color uses the cpuMulti color palette

#### Scenario: No handheld CPU data
- **WHEN** there are no Handheld devices with cpuMulti data
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
