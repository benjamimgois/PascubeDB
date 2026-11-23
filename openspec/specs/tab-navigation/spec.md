# tab-navigation

## Purpose
Specifies the two-tab navigation system (Hardware Benchmark / Software Benchmark) that organizes dashboard sections by category.

## Requirements

### Requirement: Tab Navigation Toggle
The system SHALL render five tab buttons at the top of the dashboard: "Leaderboard & Compare", "Hardware Charts", "Software Benchmark", "Desktop Landscape", and "Community Insights". Clicking a tab SHALL show the sections belonging to that tab and hide the others.

#### Scenario: Switching to Leaderboard tab
- **WHEN** user clicks "Leaderboard & Compare" tab
- **THEN** the hardware percentile summary, filters, and leaderboard table are visible and all other tab panels are hidden

#### Scenario: Switching to Hardware tab
- **WHEN** user clicks "Hardware Charts" tab
- **THEN** hardware performance and efficiency charts are visible and all other tab panels are hidden

#### Scenario: Switching to Software tab
- **WHEN** user clicks "Software Benchmark" tab
- **THEN** software sections (Winner cards, Software Comparison) are visible and all other tab panels are hidden

### Requirement: Default Tab
The system SHALL activate the "Leaderboard & Compare" tab by default when the page loads.

#### Scenario: Page load
- **WHEN** the dashboard page loads
- **THEN** the "Leaderboard & Compare" tab is active and the primary comparison experience is displayed immediately

### Requirement: Goverlay Style Cyan Underline Navigation
The system SHALL style the main tab navigation bar with transparent button backgrounds and an active indicator rendered as an electric cyan sliding underline (`#0ea5e9`), replacing button fills and purple glowing shadows.
- Active tab text SHALL be crisp white (`#f8fafc`).
- Inactive tab text SHALL be slate gray (`#94a3b8`).
- The underline indicator SHALL smoothly transition its position and width when switching tabs.

#### Scenario: Switching active tab indicator
- **WHEN** user clicks a tab button
- **THEN** the active tab text changes to crisp white and the cyan underline translates to align under the newly selected tab

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

### Requirement: Responsive Tab Labels
On narrow viewports the main tab bar SHALL display a shortened visible label for each tab while retaining the full label as the accessible name.

#### Scenario: Narrow viewport shows short labels
- **WHEN** the dashboard is viewed on a narrow viewport
- **THEN** each main tab shows a short visible label that fits on a single line

#### Scenario: Accessible name stays complete
- **WHEN** assistive technology reads a tab that shows a short visible label
- **THEN** its accessible name is the full, untruncated label
