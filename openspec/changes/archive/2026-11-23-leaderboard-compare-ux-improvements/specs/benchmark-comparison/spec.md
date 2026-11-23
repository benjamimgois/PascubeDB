# Spec Delta

## REMOVED Requirements

### Requirement: Compare mode activation
**Reason**: Replaced by always-accessible row selection checkboxes and automatic floating compare bar, eliminating the extra mode-toggle step.
**Migration**: Users select runs directly via row checkboxes in the `#` column or click `Compare` on any row.

## MODIFIED Requirements

### Requirement: Inline Baseline Pinning and Direct Row Compare
Each Leaderboard row SHALL directly expose a `Pin as Baseline` control and a `Compare` control without requiring a separate modal dialog. When a pinned baseline is active, clicking `Compare` on another row SHALL pre-select the pinned baseline and that row and open the comparison view immediately.

#### Scenario: Pinning a baseline row
- **WHEN** the user clicks `Pin as Baseline` on any Leaderboard row
- **THEN** that row is highlighted as the baseline and all other visible rows display signed percentage deltas (`+X.X%` / `-X.X%`) next to their `Main`, `CPU 1T`, `CPU MT`, and `GPU` scores

#### Scenario: Unpinning the baseline row
- **WHEN** the user clicks `Unpin` on the pinned baseline row or clears the baseline
- **THEN** inline percentage deltas are removed from the table rows

#### Scenario: One-click compare against pinned baseline
- **WHEN** a pinned baseline is active and the user clicks `Compare` on a non-baseline row
- **THEN** the system selects the pinned baseline and the clicked row and opens the Benchmark comparison view directly

#### Scenario: Row compare without pinned baseline
- **WHEN** no pinned baseline is active and the user clicks `Compare` on a row
- **THEN** the system toggles that row in the compare selection and updates the compare bar

### Requirement: Comparison results view

The comparison view SHALL show a baseline selector, a per-run summary with contributor and hardware context, toggleable comparative charts, and a grouped metric table containing absolute values and signed deltas for each selected run. The view SHALL indicate when all selected runs share the baseline's normalized CPU and GPU, and SHALL warn when hardware differs.

#### Scenario: Results render for selected runs
- **WHEN** the user starts a comparison with at least two selected runs
- **THEN** the results view shows the baseline, every selected run, comparative charts (when enabled), and the grouped metric table with values and deltas

#### Scenario: Same hardware is indicated
- **WHEN** every selected run has the same normalized CPU and GPU as the baseline
- **THEN** the results view shows a same-hardware indicator

#### Scenario: Different hardware is disclosed
- **WHEN** any selected run differs from the baseline in normalized CPU or GPU
- **THEN** the results view warns that deltas include hardware differences

#### Scenario: Return to leaderboard
- **WHEN** the user leaves the comparison results view
- **THEN** the leaderboard returns with the existing selection intact

## ADDED Requirements

### Requirement: Direct Row Selection Without Mode Toggle
The leaderboard SHALL keep row selection controls accessible directly in each row without requiring a separate toolbar mode toggle, and SHALL automatically reveal the floating compare bar when one or more runs are selected.

#### Scenario: Direct row selection without mode toggle
- **WHEN** the leaderboard table renders
- **THEN** each visible row exposes a subtle selection checkbox in the rank column and the toolbar does not require a separate Compare mode toggle button

#### Scenario: Auto-showing the floating compare bar
- **WHEN** the user checks one or more row selection checkboxes
- **THEN** the sticky compare bar appears automatically showing the selected count and a `Compare (N)` action

### Requirement: Comparative Visual Charts in Comparison View
The Benchmark comparison view SHALL provide a toggleable comparative charts section featuring a normalized radar chart across key performance/efficiency axes and normalized horizontal comparison bars for selected runs.

#### Scenario: Toggling comparative charts
- **WHEN** the user toggles the `Show Charts` control in the comparison view
- **THEN** the radar and normalized bar charts show or hide immediately without losing the selected runs or baseline

### Requirement: Grouped Comparison Metric Sections and Best-Value Highlight
The comparison metric table SHALL group metrics into four sections (`Performance`, `Efficiency`, `Clocks & Power`, `Thermals`), constrain the metric label column width for comfortable scanning, and highlight the best valid value per metric row.

#### Scenario: Grouped metric sections render
- **WHEN** the comparison table renders
- **THEN** metrics are organized under `Performance`, `Efficiency`, `Clocks & Power`, and `Thermals` section headers with best-value highlighting on each metric row
