# subtab-pills

## Purpose
Defines the pill-based sub-navigation within the Hardware Benchmark tab, enabling users to switch between Performance, Efficiency, and Thermals views.

## ADDED Requirements

### Requirement: Pill navigation bar
The system SHALL render a horizontal pill navigation bar below the section header and above the stats cards in the Hardware Benchmark tab. The pills SHALL be: "Performance" (default), "Efficiency", and "Thermals". The active pill SHALL have a distinct visual style (filled/highlighted).

#### Scenario: Rendering the pill bar
- **WHEN** the Hardware Benchmark tab is active
- **THEN** a pill navigation bar is displayed with three pills, "Performance" is active

#### Scenario: Switching pills
- **WHEN** user clicks a pill that is not currently active
- **THEN** that pill becomes active, the previous pill deactivates, and the corresponding chart section is displayed

### Requirement: URL state synchronization
The system SHALL synchronize the active pill with the `subtab` query parameter in the URL. On page load, if `?subtab=efficiency` is present, the Efficiency pill SHALL be activated. When a pill is clicked, `history.replaceState` SHALL update the URL without a page reload.

#### Scenario: URL state on pill click
- **WHEN** user clicks the "Efficiency" pill
- **THEN** the URL updates to `?subtab=efficiency` without reloading

#### Scenario: URL state on page load with parameter
- **WHEN** the page loads with `?subtab=efficiency` in the URL
- **THEN** the Efficiency pill is activated on render

### Requirement: Lazy render on pill activation
The system SHALL defer chart rendering until a pill is activated. On first activation, charts are created from the current dataset. On subsequent activations of the same pill, the existing chart instances are shown (not re-rendered). On pill switch, the previous pill's chart containers are hidden (not destroyed).

#### Scenario: First activation renders charts
- **WHEN** user opens the Efficiency pill for the first time
- **THEN** the efficiency charts are rendered and displayed

#### Scenario: Re-activation shows cached charts
- **WHEN** user switches from Efficiency to Performance and back to Efficiency
- **THEN** the efficiency charts are shown without re-rendering

### Requirement: Filtered data shared across pills
The system SHALL apply the current search query and filter dropdowns to all pills. Changing a filter while on the Efficiency pill SHALL update the efficiency charts to reflect the filtered dataset.

#### Scenario: Filter applies to efficiency charts
- **WHEN** user applies a CPU filter while on the Efficiency pill
- **THEN** the efficiency charts update to show only data matching the filter
