# Spec Delta

## MODIFIED Requirements

### Requirement: Multi-criteria Filtering

The system SHALL combine all active filters (search text query, OS filter, CPU filter, GPU filter, RAM filter, VRAM filter, and the hardware-combo drilldown filter) using a logical AND operation when resolving the leaderboard rows display.

#### Scenario: Filtering by multiple active criteria simultaneously

- **WHEN** multiple filters are active at the same time
- **THEN** only benchmark runs satisfying all selected conditions are displayed

## ADDED Requirements

### Requirement: Hardware-combo drilldown filter

The leaderboard SHALL support a hardware-combo filter that matches benchmark runs whose normalized CPU model AND normalized GPU model both equal a given pair. The filter SHALL be set from a chart-bar click, SHALL participate in multi-criteria filtering, SHALL be shown as a removable active-filter indicator, and SHALL be cleared when the leaderboard modal closes.

#### Scenario: Filter set from a chart bar

- **WHEN** a chart bar is clicked
- **THEN** the leaderboard's hardware-combo filter is set to that run's normalized CPU and GPU and the leaderboard lists every run sharing both

#### Scenario: Removable indicator

- **WHEN** the hardware-combo filter is active
- **THEN** an active-filter indicator is shown and removing it clears the filter

#### Scenario: Cleared on close

- **WHEN** the leaderboard modal closes
- **THEN** the hardware-combo filter is cleared so the next open is unfiltered
