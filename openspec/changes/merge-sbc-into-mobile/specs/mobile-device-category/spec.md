## ADDED Requirements

### Requirement: Unified "Mobile" category

The system SHALL classify devices that are either Notebook or SBC as "Mobile" for section charts. This category combines both form factors under a single label.

#### Scenario: Classifying Notebook as Mobile

- **WHEN** a device is classified as Notebook by `classifyDevice()`
- **THEN** it SHALL be grouped under "Mobile" in distribution, runs, CPU, GPU, and OS charts

#### Scenario: Classifying SBC as Mobile

- **WHEN** a device is classified as SBC by `classifyDevice()`
- **THEN** it SHALL be grouped under "Mobile" in distribution, runs, CPU, GPU, and OS charts

### Requirement: Mobile device distribution chart

The system SHALL render a doughnut chart showing Handheld vs Mobile distribution, replacing the previous Handheld vs Notebook vs SBC chart.

#### Scenario: Rendering Mobile distribution chart

- **WHEN** the dashboard loads
- **THEN** a doughnut chart SHALL display the percentage of Handheld and Mobile devices among all non-desktop devices
