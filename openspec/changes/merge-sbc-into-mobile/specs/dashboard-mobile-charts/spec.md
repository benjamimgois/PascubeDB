## MODIFIED Requirements

### Requirement: Mobile Device Detection Logic (modified)

The system SHALL scan and analyze the benchmark dataset to identify rows representing mobile devices. Each mobile record MUST be classified as "Handheld" or "Mobile". "Mobile" replaces the previous "Notebook" + "SBC" split.

- "Handheld" signature unchanged
- "Mobile" signature includes all rows matching Notebook OR SBC classification

#### Scenario: Categorizing a row as Handheld or Mobile

- **WHEN** the benchmark data is processed
- **THEN** rows matching Handheld criteria are labeled "Handheld", rows matching Notebook or SBC criteria are labeled "Mobile"

### Requirement: Mobile Device Type Distribution Chart (modified)

The doughnut chart SHALL display Handheld vs Mobile distribution instead of Handheld vs Notebook vs SBC.

#### Scenario: Rendering the Mobile device type chart

- **WHEN** the dashboard loads
- **THEN** a doughnut chart shows the percentage of Handheld vs Mobile devices

### Requirement: Top 10 Mobile Benchmark Runs (replaces Notebook + SBC)

The system SHALL identify Mobile devices (Notebook + SBC combined) and render a horizontal bar chart of the top 10 highest individual Main Scores.

#### Scenario: Rendering the Top 10 Mobile Benchmark Runs chart

- **WHEN** the dashboard loads
- **THEN** a horizontal bar chart displays the top 10 Mobile runs sorted by Main Score in descending order

## REMOVED Requirements

### Requirement: Top 10 SBC Benchmark Runs

**Reason**: Replaced by unified Top 10 Mobile Benchmark Runs
**Migration**: SBC runs now appear in the Mobile chart alongside Notebook runs
