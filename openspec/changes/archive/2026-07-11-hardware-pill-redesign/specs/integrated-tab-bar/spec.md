## ADDED Requirements

### Requirement: Tab bar with animated underline
The system SHALL render a horizontal tab bar with 3 tabs (Performance, Efficiency, Thermals) inside a unified glass container. The active tab SHALL have an underline indicator that animates horizontally when switching tabs.

#### Scenario: Tabs render with correct labels and icons
- **WHEN** the hardware benchmark section loads
- **THEN** a tab bar displays with 3 tabs labeled "Performance", "Efficiency", "Thermals", each preceded by its respective Lucide icon (cpu, bar-chart-3, thermometer)

#### Scenario: Underline slides to active tab on click
- **WHEN** user clicks the "Efficiency" tab
- **THEN** the underline indicator slides horizontally from the "Performance" position to the "Efficiency" position with a CSS transition

### Requirement: Unified container hosts tab bar, stats, and content
The system SHALL wrap the tab bar, stats grid, and pill content in a single `.hw-benchmark-container` element with glassmorphism styling.

#### Scenario: Container renders all sections
- **WHEN** the hardware benchmark section loads
- **THEN** a single glass container displays the tab bar at the top, the stats grid below it, and the active pill content below the stats

### Requirement: Content transition on tab switch
The system SHALL animate pill content transitions with a slide + fade effect when switching tabs.

#### Scenario: Content fades in on tab switch
- **WHEN** user switches from "Performance" to "Efficiency"
- **THEN** the Performance content fades out and slides left, and the Efficiency content fades in and slides right, over 300ms

#### Scenario: Transition does not affect chart rendering
- **WHEN** the transition completes
- **THEN** the chart canvases inside the new pill content are fully rendered and interactive
