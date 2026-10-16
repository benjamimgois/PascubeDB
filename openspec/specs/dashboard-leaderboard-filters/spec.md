# dashboard-leaderboard-filters Specification

## Purpose
TBD - created by archiving change add-more-leaderboard-filters. Update Purpose after archive.

## Requirements

### Requirement: Leaderboard CPU Model Filter
The system SHALL display a CPU Model select dropdown in the leaderboard filters.
- Selecting a specific CPU Model SHALL display only benchmark runs matching that CPU.
- The default option "All CPU Models" SHALL apply no CPU filtering.

#### Scenario: Selecting a CPU Model filter
- **WHEN** the user selects a specific CPU Model from the CPU filter dropdown
- **THEN** only benchmark runs matching the selected CPU Model are displayed in the leaderboard table

### Requirement: Leaderboard GPU Model Filter
The system SHALL display a GPU Model select dropdown in the leaderboard filters.
- Selecting a specific GPU Model SHALL display only benchmark runs matching that GPU.
- The default option "All GPU Models" SHALL apply no GPU filtering.

#### Scenario: Selecting a GPU Model filter
- **WHEN** the user selects a specific GPU Model from the GPU filter dropdown
- **THEN** only benchmark runs matching the selected GPU Model are displayed in the leaderboard table

### Requirement: Leaderboard RAM Size Filter
The system SHALL display a RAM Size select dropdown in the leaderboard filters.
- The options SHALL be sorted numerically by capacity in GB (e.g. 8GB < 12GB < 16GB < 32GB).
- Selecting a specific RAM size SHALL display only benchmark runs matching that RAM size.
- The default option "ALL RAM" SHALL apply no RAM size filtering.

#### Scenario: Selecting a RAM Size filter with numeric sorting
- **WHEN** the RAM size filter dropdown options are populated and sorted numerically
- **THEN** options appear in correct numeric order and selecting a specific RAM size displays only matching runs

### Requirement: Leaderboard VRAM Size Filter
The system SHALL display a VRAM Size select dropdown in the leaderboard filters.
- The options SHALL be sorted numerically by capacity in GB (e.g. 4GB < 6GB < 8GB < 24GB).
- Selecting a specific VRAM size SHALL display only benchmark runs matching that VRAM size.
- The default option "ALL VRAM" SHALL apply no VRAM size filtering.

#### Scenario: Selecting a VRAM Size filter with numeric sorting
- **WHEN** the VRAM size filter dropdown options are populated and sorted numerically
- **THEN** options appear in correct numeric order and selecting a specific VRAM size displays only matching runs

### Requirement: Multi-criteria Filtering

The system SHALL combine all active filters (search text query, OS filter, CPU filter, GPU filter, RAM filter, VRAM filter, and the hardware-combo drilldown filter) using a logical AND operation when resolving the leaderboard rows display.

#### Scenario: Filtering by multiple active criteria simultaneously

- **WHEN** multiple filters are active at the same time
- **THEN** only benchmark runs satisfying all selected conditions are displayed

### Requirement: Stable Filter Control Sizing
Gaining focus SHALL NOT change the rendered size of a leaderboard filter control or shift the position of adjacent controls.

#### Scenario: Focusing the search input
- **WHEN** the user focuses the leaderboard search input
- **THEN** the input keeps the same width and the other filter controls do not move

#### Scenario: Blurring the search input
- **WHEN** the search input loses focus
- **THEN** the filter row layout is unchanged

### Requirement: Active Filter Indicators
The leaderboard SHALL display a removable indicator for each currently active filter.

#### Scenario: A filter becomes active
- **WHEN** the user selects a value in any filter or types a search query
- **THEN** an indicator for that filter appears

#### Scenario: Removing an indicator
- **WHEN** the user activates the remove control on an indicator
- **THEN** that filter is cleared and the table updates

### Requirement: Clear All Filters
The leaderboard SHALL provide a single control that clears every active filter at once.

#### Scenario: Clearing all filters
- **WHEN** the user activates the clear-all control
- **THEN** the search query and all filter selections are reset and the table shows all rows

#### Scenario: No active filters
- **WHEN** no filter is active
- **THEN** the clear-all control and the indicator area are not shown

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

### Requirement: User drilldown filter

The leaderboard SHALL support a user filter that matches benchmark runs whose username equals a given name, compared case-insensitively. The filter SHALL be set from a username click, SHALL participate in the leaderboard's multi-criteria filtering, SHALL be shown as a removable active-filter indicator, and SHALL be cleared when the leaderboard modal closes.

#### Scenario: Filter set from a username

- **WHEN** a named contributor's username is clicked
- **THEN** the leaderboard's user filter is set to that username and only that user's runs are listed

#### Scenario: Removable indicator

- **WHEN** the user filter is active
- **THEN** an active-filter indicator is shown and removing it clears the filter

#### Scenario: Cleared on close

- **WHEN** the leaderboard modal closes
- **THEN** the user filter is cleared so the next open is unfiltered
