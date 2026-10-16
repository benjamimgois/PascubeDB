# Spec Delta

## ADDED Requirements

### Requirement: Active Filter Indicators
The leaderboard SHALL display a removable indicator for each currently active filter.

#### Scenario: A filter becomes active
- **WHEN** the user selects a value in any filter or types a search query
- **THEN** an indicator for that filter appears

#### Scenario: Removing an indicator
- **WHEN** the user activates the remove control on an indicator
- **THEN** that filter is cleared and the table updates

### Requirement: Clear All Filters
The leaderboard SHALL provide a single control that clears every active filter at once.

#### Scenario: Clearing all filters
- **WHEN** the user activates the clear-all control
- **THEN** the search query and all filter selections are reset and the table shows all rows

#### Scenario: No active filters
- **WHEN** no filter is active
- **THEN** the clear-all control and the indicator area are not shown
