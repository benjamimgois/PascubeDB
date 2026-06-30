## ADDED Requirements

### Requirement: Interactive chart re-rendering on control change
The system SHALL re-render the Software Comparison charts when visualization controls change, without reloading the page.

#### Scenario: Chart updates on mode switch
- **WHEN** user changes Mode, Chart Type, or Normalize switch
- **THEN** the affected charts SHALL re-render immediately with the new visualization settings

## MODIFIED Requirements

### Requirement: Software Comparison Display
The system SHALL render a "Software Comparison" section with 4 charts. When controls are changed, the chart type SHALL adapt between scatter, box plot, and diverging bars depending on the active controls. Each chart SHALL reflect the current visualization mode and normalization setting.

#### Scenario: Displaying in default mode
- **WHEN** the dashboard finishes loading with default controls (Absolute, Scatter, OFF)
- **THEN** four scatter charts are rendered as before

#### Scenario: Displaying in Box Plot mode
- **WHEN** the user selects Box Plot and the OS vs Hardware chart re-renders
- **THEN** a box plot chart showing median, quartiles, and whiskers per OS per hardware is rendered

#### Scenario: Displaying in Delta mode
- **WHEN** the user selects Delta mode
- **THEN** driver/kernel charts render as diverging bar charts showing percentage change with baseline
