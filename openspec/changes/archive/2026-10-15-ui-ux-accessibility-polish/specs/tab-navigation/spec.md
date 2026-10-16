# Spec Delta

## ADDED Requirements

### Requirement: Keyboard Operable Tab Navigation
The main tab bar SHALL be operable entirely by keyboard, and its active state SHALL be reflected through ARIA rather than only through visual styling.

#### Scenario: Screen reader announces selected tab
- **WHEN** assistive technology inspects the tab bar
- **THEN** each tab button exposes a tab role, an accessible name, and a selected state that tracks the visible panel

#### Scenario: Arrow key moves between tabs
- **WHEN** keyboard focus is on a tab button and the user presses an arrow key
- **THEN** focus moves to the adjacent tab button and the corresponding panel is shown

### Requirement: Tab Panel Association
Each tab SHALL be programmatically associated with the content region it controls.

#### Scenario: Tab controls a panel
- **WHEN** a tab button is selected
- **THEN** its controlled panel is exposed with a tabpanel role and the tab references it by id
