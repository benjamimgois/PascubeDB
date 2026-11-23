# Spec Delta

## MODIFIED Requirements

### Requirement: Tab Navigation Toggle
The system SHALL render five tab buttons at the top of the dashboard: "Leaderboard & Compare", "Hardware Charts", "Software Benchmark", "Desktop Landscape", and "Community Insights". Clicking a tab SHALL show the sections belonging to that tab and hide the others.

#### Scenario: Switching to Leaderboard tab
- **WHEN** user clicks "Leaderboard & Compare" tab
- **THEN** the hardware percentile summary, filters, and leaderboard table are visible and all other tab panels are hidden

#### Scenario: Switching to Hardware tab
- **WHEN** user clicks "Hardware Charts" tab
- **THEN** hardware performance and efficiency charts are visible and all other tab panels are hidden

#### Scenario: Switching to Software tab
- **WHEN** user clicks "Software Benchmark" tab
- **THEN** software sections (Winner cards, Software Comparison) are visible and all other tab panels are hidden

### Requirement: Default Tab
The system SHALL activate the "Leaderboard & Compare" tab by default when the page loads.

#### Scenario: Page load
- **WHEN** the dashboard page loads
- **THEN** the "Leaderboard & Compare" tab is active and the primary comparison experience is displayed immediately
