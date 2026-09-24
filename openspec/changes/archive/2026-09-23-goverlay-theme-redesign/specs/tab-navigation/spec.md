# Spec Delta

## ADDED Requirements

### Requirement: Goverlay Style Cyan Underline Navigation
The system SHALL style the main tab navigation bar with transparent button backgrounds and an active indicator rendered as an electric cyan sliding underline (`#0ea5e9`), replacing button fills and purple glowing shadows.
- Active tab text SHALL be crisp white (`#f8fafc`).
- Inactive tab text SHALL be slate gray (`#94a3b8`).
- The underline indicator SHALL smoothly transition its position and width when switching tabs.

#### Scenario: Switching active tab indicator
- **WHEN** user clicks a tab button
- **THEN** the active tab text changes to crisp white and the cyan underline translates to align under the newly selected tab
