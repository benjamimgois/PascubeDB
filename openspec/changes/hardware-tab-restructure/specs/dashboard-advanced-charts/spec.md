# dashboard-advanced-charts

## MODIFIED Requirements

### Requirement: Average CPU Score by CPU Model
**Change**: This chart moves from its own standalone "Advanced Performance" section into the Performance pill of the subtab system. The requirement itself is unchanged.

The system SHALL aggregate the average CPU Single score for each unique CPU model and render a horizontal bar chart of the top CPU models by average performance.

#### Scenario: Rendering average score by CPU chart
- **WHEN** the Hardware tab loads and the Performance pill is active
- **THEN** a horizontal bar chart displaying the top 10 CPU models sorted by average CPU Single score descending is rendered

### Requirement: Average GPU Score by GPU Model
**Change**: This chart moves from its own standalone "Advanced Performance" section into the Performance pill of the subtab system. The requirement itself is unchanged.

The system SHALL aggregate the average GPU score for each unique GPU model and render a horizontal bar chart of the top GPU models by average performance.

#### Scenario: Rendering average score by GPU chart
- **WHEN** the Hardware tab loads and the Performance pill is active
- **THEN** a horizontal bar chart displaying the top 10 GPU models sorted by average GPU score descending is rendered
