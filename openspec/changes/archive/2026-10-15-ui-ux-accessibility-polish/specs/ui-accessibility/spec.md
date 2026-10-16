# Spec Delta

## Purpose

Ensures the dashboard is operable by keyboard and assistive technology: visible focus, WCAG AA text/control contrast, reduced-motion support, and ARIA semantics for navigation, filters, charts, and live announcements.

## ADDED Requirements

### Requirement: Visible Keyboard Focus
Every interactive control (buttons, tabs, chips, links, selects, text inputs) SHALL expose a visible focus indicator when focused via keyboard, and SHALL NOT remove the default focus outline without providing an equivalent visible indicator.

#### Scenario: Tabbing through tabs and buttons
- **WHEN** user presses Tab to move focus onto a tab, button, or chip
- **THEN** a visible focus ring is rendered around the focused element

#### Scenario: Focused select or text input
- **WHEN** a select or text input receives keyboard focus
- **THEN** its focus state is distinguishable from its unfocused state by more than a 1px border color change

### Requirement: WCAG AA Text Contrast
Muted/secondary text SHALL meet a contrast ratio of at least 4.5:1 against its rendered background at its actual font size.

#### Scenario: Muted labels on card surfaces
- **WHEN** a muted label such as a stat sub-line, chart unit, baseline label, or table date is rendered on a card background
- **THEN** its computed contrast ratio against the card background is at least 4.5:1

### Requirement: WCAG AA Control and Badge Contrast
Text rendered on colored surfaces (primary buttons, status badges, category tags) SHALL meet a contrast ratio of at least 4.5:1 against that surface color.

#### Scenario: Primary action button label
- **WHEN** the primary action button is rendered with its accent background
- **THEN** the button label has a contrast ratio of at least 4.5:1 against the button background

#### Scenario: Bottleneck legend badges
- **WHEN** the bottleneck legend badges (CPU bottleneck, balanced, GPU bottleneck) are rendered
- **THEN** each badge label has a contrast ratio of at least 4.5:1 against its badge background

### Requirement: Reduced Motion Support
The system SHALL respect the user's reduced-motion preference by disabling or minimizing non-essential animations (loading shimmer, pulsing indicators, view transitions, scroll-reveal) when reduced motion is requested.

#### Scenario: Reduced motion requested
- **WHEN** the operating system or browser reports a preference for reduced motion
- **THEN** decorative and continuous animations do not play

### Requirement: Accessible Tab Navigation
The main tab bar and the sub-tab (pill) bar SHALL expose ARIA tab semantics and SHALL be operable with the keyboard, including arrow keys to move between tabs.

#### Scenario: Screen reader reads the tab bar
- **WHEN** assistive technology inspects the tab bar
- **THEN** each tab exposes an accessible name, a selected state, and an association with its panel

#### Scenario: Arrow key navigation
- **WHEN** focus is on a tab and the user presses an arrow key
- **THEN** focus moves to the adjacent tab and its panel becomes active

### Requirement: Accessible Form Controls
Select and text inputs used for filtering SHALL have an accessible name, either via an associated label or an ARIA label.

#### Scenario: Leaderboard filter
- **WHEN** assistive technology inspects a leaderboard filter select
- **THEN** it exposes a descriptive accessible name (not just its current option)

### Requirement: Accessible Chart Canvases
Each chart canvas SHALL expose an alternative text description of the data it visualizes via `role="img"` and an `aria-label`.

#### Scenario: Chart inspected by assistive technology
- **WHEN** assistive technology reaches a chart canvas
- **THEN** it announces a description identifying the metric shown
