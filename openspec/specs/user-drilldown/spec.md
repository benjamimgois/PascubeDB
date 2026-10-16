# user-drilldown Specification

## Purpose
Let users drill from a contributor's username into the leaderboard, filtered to every benchmark run that username submitted.

## Requirements

### Requirement: Clickable contributor usernames

The system SHALL make a named contributor's username clickable and, when clicked, open or filter the leaderboard to that username's benchmark runs, grouping runs by username compared case-insensitively. Anonymous contributors SHALL NOT be clickable. Clicking a username SHALL NOT copy it. Usernames SHALL be clickable from the leaderboard contributor badge and from the Top Contributors chart bars.

#### Scenario: Username in the leaderboard table

- **WHEN** the user clicks a named contributor's username in the leaderboard table
- **THEN** the leaderboard is filtered to that username's benchmark runs

#### Scenario: Top Contributors chart bar

- **WHEN** the user clicks a named contributor's bar in the Top Contributors chart
- **THEN** the leaderboard opens filtered to that username's benchmark runs

#### Scenario: Anonymous contributor is not clickable

- **WHEN** the contributor is anonymous
- **THEN** the username is not clickable and no user filter is applied

#### Scenario: Same name across devices

- **WHEN** the same username submitted from more than one device
- **THEN** the filter lists runs from all of that username's devices together
