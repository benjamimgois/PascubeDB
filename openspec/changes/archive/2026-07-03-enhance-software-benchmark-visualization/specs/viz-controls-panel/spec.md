## ADDED Requirements

### Requirement: Visualization Controls Panel
The system SHALL render a controls panel below the stats summary cards with interactive controls that affect the Software Comparison charts.

#### Scenario: Panel renders with default state
- **WHEN** the dashboard finishes loading
- **THEN** a controls panel SHALL appear with a "Mode" segmented button (Absolute/Delta), a "Chart Type" segmented button (Scatter/Box Plot), and a "Normalize Scale" switch, all set to defaults (Absolute, Scatter, OFF)

#### Scenario: Mode toggle changes chart rendering
- **WHEN** user clicks "Delta" in the Mode segment
- **THEN** the driver/kernel charts SHALL re-render in Delta mode with diverging bars showing percentage change

#### Scenario: Chart Type toggle switches OS chart
- **WHEN** user clicks "Box Plot" in the Chart Type segment
- **THEN** the OS vs Hardware scatter SHALL re-render as box plots showing median, quartiles, and whiskers

#### Scenario: Normalize switch affects driver/kernel charts
- **WHEN** user toggles Normalize Scale ON
- **THEN** the driver/kernel charts Y-axis SHALL show percentage (0%-100%) with best per hardware = 100%

### Requirement: Controls affect only Software Comparison section
The system SHALL scope all controls to the Software Comparison charts only. Other dashboard sections SHALL remain unchanged.
