## ADDED Requirements

### Requirement: Deduplicate runs by client-id
The system SHALL provide a helper that, given a list of benchmark runs, returns only the most recent run per `client-id`, preserving all fields of the selected run.

#### Scenario: Multiple runs from the same client
- **WHEN** the helper receives two or more runs with the same `client-id`
- **THEN** it returns exactly one run per `client-id`, specifically the one with the most recent `Date/Time`

#### Scenario: Single run per client
- **WHEN** the helper receives runs where each `client-id` appears only once
- **THEN** it returns all runs unchanged

#### Scenario: Invalid or missing date
- **WHEN** a run has no parseable `Date/Time`
- **THEN** it is treated as older than any run with a valid date for the same `client-id`
