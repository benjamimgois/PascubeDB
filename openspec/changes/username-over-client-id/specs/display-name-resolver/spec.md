## ADDED Requirements

### Requirement: Display name resolver
The system SHALL provide a helper `getDisplayName(run)` that returns the contributor's display name: the `user` field if it is non-empty and not equal to "Anonymous" (case-insensitive), otherwise the first 8 characters of `client-id`.

#### Scenario: Username is present and not anonymous
- **WHEN** a run has `user` = "benjamim" and `client-id` = "2648f98e23067317"
- **THEN** `getDisplayName` returns "benjamim"

#### Scenario: Username is "Anonymous"
- **WHEN** a run has `user` = "Anonymous" and `client-id` = "2648f98e23067317"
- **THEN** `getDisplayName` returns "2648f98e"

#### Scenario: Username is empty
- **WHEN** a run has `user` = "" and `client-id` = "2648f98e23067317"
- **THEN** `getDisplayName` returns "2648f98e"

#### Scenario: Client-id is N/D
- **WHEN** a run has `user` = "Anonymous" and `client-id` = "N/D"
- **THEN** `getDisplayName` returns "N/D"
