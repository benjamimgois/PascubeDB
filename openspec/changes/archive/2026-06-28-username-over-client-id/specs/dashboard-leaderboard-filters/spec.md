## MODIFIED Requirements

### Requirement: Leaderboard Table Renders Contributor Column
The system SHALL render a leaderboard table displaying all benchmark runs. The contributor identification column SHALL display the contributor display name resolved via `getDisplayName` instead of only the raw client-id.

#### Scenario: Leaderboard shows username when available
- **WHEN** the leaderboard is rendered with runs that have non-anonymous usernames
- **THEN** the contributor column shows the username for those runs and truncated client-id for anonymous runs

### Requirement: Leaderboard Search Includes Username
The system SHALL include the `user` field in leaderboard text search so contributors can be found by typing their username.

#### Scenario: Searching by username
- **WHEN** user types a username in the leaderboard search field
- **THEN** runs matching that username are displayed
