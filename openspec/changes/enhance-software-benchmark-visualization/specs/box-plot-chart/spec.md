## ADDED Requirements

### Requirement: Box Plot renderer for OS vs Hardware
The system SHALL render a box plot chart for OS vs Hardware when "Box Plot" is selected in the Chart Type control. It SHALL replace the scatter chart in the same canvas area.

#### Scenario: Box plot shows statistical summary per OS per hardware
- **WHEN** the user selects "Box Plot" mode
- **THEN** for each hardware column, the system SHALL compute and render per OS: median (line), Q1-Q3 (colored box), min-max (whiskers), and outliers (dots beyond 1.5×IQR)

#### Scenario: Tooltip shows statistics
- **WHEN** user hovers over a box plot element
- **THEN** the tooltip SHALL display: OS name, hardware label, median, Q1, Q3, min, max, and sample count

#### Scenario: Colors match OS scatter palette
- **WHEN** rendering box plots
- **THEN** each OS SHALL use the same color assigned in the scatter chart mode for consistency
