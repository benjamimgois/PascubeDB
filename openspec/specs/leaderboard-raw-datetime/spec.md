# leaderboard-raw-datetime Specification

## Purpose
TBD - created by archiving change adjust-leaderboard-timezone. Update Purpose after archive.
## Requirements
### Requirement: Raw Date/Time Display
The system SHALL display the `Date/Time` column values fetched from Google Sheets or CSV directly as-is on the leaderboard, without any timezone conversion, offset calculations, or transformations.

#### Scenario: Display raw Google Sheet timestamp
- **WHEN** a record timestamp of "21/06/2026 18:42:54" is fetched from Google Sheets
- **THEN** the system SHALL display "21/06/2026 18:42:54" in the Leaderboard Date/Time column

#### Scenario: Display raw fallback CSV timestamp
- **WHEN** the offline fallback CSV is parsed and contains a timestamp of "16/06/2026 13:11:07"
- **THEN** the system SHALL display "16/06/2026 13:11:07" in the Leaderboard Date/Time column

