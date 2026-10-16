# Spec Delta

## ADDED Requirements

### Requirement: Stable Filter Control Sizing
Gaining focus SHALL NOT change the rendered size of a leaderboard filter control or shift the position of adjacent controls.

#### Scenario: Focusing the search input
- **WHEN** the user focuses the leaderboard search input
- **THEN** the input keeps the same width and the other filter controls do not move

#### Scenario: Blurring the search input
- **WHEN** the search input loses focus
- **THEN** the filter row layout is unchanged
