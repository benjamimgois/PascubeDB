# chart-drilldown Specification

## Purpose
Let users drill from a chart bar into the leaderboard, filtered to the exact hardware of the benchmark run behind that bar.

## Requirements

### Requirement: Clickable chart bars

The system SHALL make a chart's data bars clickable only when each bar maps to a single, identifiable benchmark run, and SHALL NOT make charts whose bars are averages, counts, or other aggregates clickable. Clicking a clickable bar SHALL open the leaderboard filtered to that run's exact hardware, identified by its normalized CPU model and normalized GPU model.

#### Scenario: Model chart bar opens the run's hardware history

- **WHEN** the user clicks a bar in a model bar chart such as Top CPU Single-Thread
- **THEN** the leaderboard opens filtered to the normalized CPU and normalized GPU of the run behind that bar

#### Scenario: Aggregated charts are not clickable

- **WHEN** a chart's bars are averages, counts, or distributions (for example a popularity chart, an average-score chart, or a brand donut)
- **THEN** clicking those bars does not open the leaderboard

### Requirement: Bar hover affordance

The system SHALL show a pointer cursor while the pointer is over a clickable chart bar so the drilldown is discoverable.

#### Scenario: Pointer over a clickable bar

- **WHEN** the pointer hovers a clickable bar
- **THEN** the cursor is displayed as a pointer
