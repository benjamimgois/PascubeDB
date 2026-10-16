# Spec Delta

## ADDED Requirements

### Requirement: User drilldown filter

The leaderboard SHALL support a user filter that matches benchmark runs whose username equals a given name, compared case-insensitively. The filter SHALL be set from a username click, SHALL participate in the leaderboard's multi-criteria filtering, SHALL be shown as a removable active-filter indicator, and SHALL be cleared when the leaderboard modal closes.

#### Scenario: Filter set from a username

- **WHEN** a named contributor's username is clicked
- **THEN** the leaderboard's user filter is set to that username and only that user's runs are listed

#### Scenario: Removable indicator

- **WHEN** the user filter is active
- **THEN** an active-filter indicator is shown and removing it clears the filter

#### Scenario: Cleared on close

- **WHEN** the leaderboard modal closes
- **THEN** the user filter is cleared so the next open is unfiltered
