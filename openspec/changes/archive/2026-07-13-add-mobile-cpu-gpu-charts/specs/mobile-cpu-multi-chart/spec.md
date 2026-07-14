## ADDED Requirements

### Requirement: Mobile CPU Multi Thread chart
The system SHALL render a "Top 10 Mobile CPU - Multi Thread" horizontal bar chart in the Mobile Devices section, showing the best CPU Multi score per normalized CPU model for Notebook and SBC devices combined.

#### Scenario: Chart renders top 10 Mobile CPUs by Multi Thread score
- **WHEN** the Mobile section is visible
- **THEN** a horizontal bar chart displays 10 bars, one per CPU model sorted descending by cpuMulti score
- **THEN** each bar shows the CPU name as Y-axis label, the cpuMulti score as bar length
- **THEN** each bar shows `cpuMaxFreq / cpuMaxPower` as center text inside the bar
- **THEN** the chart color uses the cpuMulti color palette

#### Scenario: No mobile CPU data
- **WHEN** there are no Notebook or SBC devices with cpuMulti data
- **THEN** the chart canvas SHALL remain empty (no crash, no render)
