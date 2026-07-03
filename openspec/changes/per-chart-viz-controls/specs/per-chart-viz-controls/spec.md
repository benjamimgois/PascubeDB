## ADDED Requirements

### Requirement: Per-chart Mode (Absolute / Delta %) selector

Each software comparison chart (Mesa Driver, NVIDIA Driver, Kernel vs CPU Score) SHALL have its own Mode selector with two options: Absolute and Delta %. Changing the mode on one chart MUST NOT affect the other charts.

#### Scenario: Mesa chart in Delta % while Kernel in Absolute

- **WHEN** user selects "Delta %" on Mesa chart and "Absolute" on Kernel chart
- **THEN** Mesa chart renders diverging bars showing percentage change from baseline AND Kernel chart renders raw hardware comparison bars

#### Scenario: Default mode is Delta %

- **WHEN** a chart loads for the first time
- **THEN** its Mode selector shows "Delta %" as the active option

### Requirement: Per-chart Normalize Scale toggle

Each software comparison chart SHALL have its own Normalize Scale toggle. Toggling it on one chart MUST NOT affect the others.

#### Scenario: Normalize toggled on Mesa only

- **WHEN** user enables Normalize on Mesa chart and disables it on NVIDIA chart
- **THEN** Mesa chart normalizes scores per hardware group (best=100%) AND NVIDIA chart shows raw scores

#### Scenario: Delta % + Normalize together

- **WHEN** user selects Delta % mode and enables Normalize on the same chart
- **THEN** the chart computes delta percentage from raw scores (not normalized) and shows x-axis title "Delta % (normalized)"

### Requirement: Controls render inside chart header

The Mode selector and Normalize toggle for each chart SHALL render inside that chart's `.chart-header` div, below the description and above the Baseline selector.

#### Scenario: Controls visible on page load

- **WHEN** the software comparison section renders
- **THEN** each chart header contains its own Mode buttons (Absolute / Delta %) and Normalize toggle
