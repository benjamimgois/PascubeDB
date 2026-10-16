# Spec Delta

## MODIFIED Requirements

### Requirement: Technical Button Hierarchy
The system SHALL style action buttons according to Goverlay's desktop controls.
- The primary action button (Leaderboard) SHALL use a solid cyan background (`#0ea5e9`) with clean rounded corners.
- The primary action button label SHALL use the on-accent foreground token so the label meets at least 4.5:1 contrast against the cyan background.
- Secondary utility buttons (Blog, Refresh) SHALL use a dark slate background with a 1px border (`#253046`).
- Each view SHALL present at most one primary-weight action, and secondary actions SHALL be visually subordinate to it.

#### Scenario: Clicking primary button
- **WHEN** user hovers over the primary button
- **THEN** the button exhibits a clean brightness elevation without heavy glowing purple shadows

#### Scenario: Primary button label contrast
- **WHEN** the primary action button is rendered
- **THEN** its label has a contrast ratio of at least 4.5:1 against the cyan background

#### Scenario: Header action hierarchy
- **WHEN** the header is rendered
- **THEN** exactly one action carries primary emphasis and the remaining actions read as secondary
