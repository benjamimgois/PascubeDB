# benchmark-comparison

## Purpose
Lets users select benchmark runs from the leaderboard and compare each run's scores against a chosen baseline using signed percentage deltas.

## Requirements

### Requirement: Compare mode activation

The leaderboard SHALL provide a Compare control that switches the table into a selection mode. In compare mode, each row SHALL expose a selection control and rows SHALL remain sortable and filterable.

#### Scenario: Entering compare mode
- **WHEN** the user activates the Compare control
- **THEN** the leaderboard enters compare mode and each visible row exposes a selection control

#### Scenario: Leaving compare mode
- **WHEN** the user exits compare mode
- **THEN** the selection is cleared and the table returns to its normal state

### Requirement: Benchmark run selection

In compare mode, users SHALL be able to select between 2 and 5 benchmark runs. Selection SHALL persist across search, filter, and sort changes and SHALL be cleared when the leaderboard modal closes or benchmark data is refreshed. A compare bar SHALL show the selected count and the current baseline.

#### Scenario: Selecting runs across filters
- **WHEN** the user selects a run, changes a filter, and selects another run
- **THEN** both runs remain selected and the compare bar reports the combined count

#### Scenario: Maximum selection reached
- **WHEN** five runs are selected and the user attempts to select a sixth
- **THEN** the sixth run is not added and the interface indicates the five-run limit

#### Scenario: Compare action availability
- **WHEN** fewer than two runs are selected
- **THEN** the Compare action is unavailable

#### Scenario: State clears on close or refresh
- **WHEN** the leaderboard modal closes or benchmark data is refreshed
- **THEN** the compare selection and baseline are cleared

### Requirement: Baseline selection

The first selected run SHALL be the default baseline. Users SHALL be able to change the baseline to any other selected run, and the baseline SHALL be visually identified in the compare bar and results view.

#### Scenario: First selection becomes baseline
- **WHEN** the user selects the first run
- **THEN** that run is marked as the baseline

#### Scenario: Changing the baseline
- **WHEN** the user chooses another selected run as baseline
- **THEN** all deltas are recalculated relative to the new baseline

#### Scenario: Removing the baseline
- **WHEN** the current baseline is deselected
- **THEN** the next selected run becomes the baseline

### Requirement: Percentage delta computation

For each selected run, the system SHALL compare Main Score, CPU Single, CPU Multi, and GPU Score against the baseline. Each delta SHALL be computed as `(value - baseline) / baseline × 100`, rounded for display. A positive delta SHALL mean the selected run is higher than the baseline.

#### Scenario: Delta is computed
- **WHEN** a selected run and the baseline both have a numeric score
- **THEN** the comparison shows the selected run's absolute value and its signed percentage difference from the baseline

#### Scenario: Zero or missing baseline value
- **WHEN** the baseline value is zero or unavailable for a metric
- **THEN** that metric's delta is shown as `N/D`

#### Scenario: Missing selected value
- **WHEN** a selected run has no value for a metric
- **THEN** that run's value and delta for the metric are shown as `N/D`

### Requirement: Comparison results view

The comparison view SHALL show a baseline selector, a per-run summary with contributor and hardware context, and a metric table containing absolute values and signed deltas for each selected run. The view SHALL indicate when all selected runs share the baseline's normalized CPU and GPU, and SHALL warn when hardware differs.

#### Scenario: Results render for selected runs
- **WHEN** the user starts a comparison with at least two selected runs
- **THEN** the results view shows the baseline, every selected run, and Main/CPU Single/CPU Multi/GPU values with deltas

#### Scenario: Same hardware is indicated
- **WHEN** every selected run has the same normalized CPU and GPU as the baseline
- **THEN** the results view shows a same-hardware indicator

#### Scenario: Different hardware is disclosed
- **WHEN** any selected run differs from the baseline in normalized CPU or GPU
- **THEN** the results view warns that deltas include hardware differences

#### Scenario: Return to leaderboard
- **WHEN** the user leaves the comparison results view
- **THEN** the leaderboard returns with the existing selection intact

### Requirement: Comparison accessibility

Compare selection and results SHALL be keyboard operable and screen-reader friendly. Selected state and baseline state SHALL be exposed programmatically, and delta values SHALL include a sign or text so meaning is not conveyed by color alone.

#### Scenario: Keyboard selection
- **WHEN** a row's selection control is focused and the user presses Enter or Space
- **THEN** the run is selected or deselected

#### Scenario: Delta is announced without color
- **WHEN** a screen reader reads a delta value
- **THEN** the value includes its sign and percentage, such as `-7.1%`, independently of color

### Requirement: Inline Baseline Pinning and Direct Row Compare
Each Leaderboard row SHALL directly expose a `Pin as Baseline` control and a `Compare` selection control without requiring a separate modal dialog.

#### Scenario: Pinning a baseline row
- **WHEN** the user clicks `Pin as Baseline` on any Leaderboard row
- **THEN** that row is highlighted as the baseline and all other visible rows display signed percentage deltas (`+X.X%` / `-X.X%`) next to their `Main`, `CPU 1T`, `CPU MT`, and `GPU` scores

#### Scenario: Unpinning the baseline row
- **WHEN** the user clicks `Unpin` on the pinned baseline row or clears the baseline
- **THEN** inline percentage deltas are removed from the table rows
