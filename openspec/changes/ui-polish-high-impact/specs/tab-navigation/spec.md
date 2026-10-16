# Spec Delta

## ADDED Requirements

### Requirement: Responsive Tab Labels
On narrow viewports the main tab bar SHALL display a shortened visible label for each tab while retaining the full label as the accessible name.

#### Scenario: Narrow viewport shows short labels
- **WHEN** the dashboard is viewed on a narrow viewport
- **THEN** each main tab shows a short visible label that fits on a single line

#### Scenario: Accessible name stays complete
- **WHEN** assistive technology reads a tab that shows a short visible label
- **THEN** its accessible name is the full, untruncated label
