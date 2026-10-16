# Spec Delta

## Purpose

Keeps data-dense and truncated text legible: a minimum readable size for tables shown in modals and full-value disclosure wherever a value is visually shortened.

## ADDED Requirements

### Requirement: Minimum Table Text Size
Data tables rendered inside modals SHALL use a text size of at least `0.8rem` so rows remain comfortably legible on dark surfaces.

#### Scenario: Leaderboard table legibility
- **WHEN** the leaderboard modal table is rendered
- **THEN** its header and cell text is at least `0.8rem`

#### Scenario: Specimen/submissions table legibility
- **WHEN** a modal data table is rendered
- **THEN** its text is at least `0.8rem`

### Requirement: Truncated Value Disclosure
When a value is visually truncated with an ellipsis, the system SHALL expose the full untruncated value to pointer users and to assistive technology.

#### Scenario: Hovering a truncated stat value
- **WHEN** a stat card value is visually truncated and the user hovers it
- **THEN** the full value is available via a native tooltip

#### Scenario: Assistive technology reads a truncated stat value
- **WHEN** assistive technology reaches a stat card whose value is truncated
- **THEN** it exposes the full value rather than only the visible fragment
