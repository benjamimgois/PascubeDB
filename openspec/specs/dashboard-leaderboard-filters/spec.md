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
- The default option "All RAM Sizes" SHALL apply no RAM size filtering.

#### Scenario: Selecting a RAM Size filter with numeric sorting
- **WHEN** the RAM size filter dropdown options are populated and sorted numerically
- **THEN** options appear in correct numeric order and selecting a specific RAM size displays only matching runs

### Requirement: Leaderboard VRAM Size Filter
The system SHALL display a VRAM Size select dropdown in the leaderboard filters.
- The options SHALL be sorted numerically by capacity in GB (e.g. 4GB < 6GB < 8GB < 24GB).
- Selecting a specific VRAM size SHALL display only benchmark runs matching that VRAM size.
- The default option "All VRAM Sizes" SHALL apply no VRAM size filtering.

#### Scenario: Selecting a VRAM Size filter with numeric sorting
- **WHEN** the VRAM size filter dropdown options are populated and sorted numerically
- **THEN** options appear in correct numeric order and selecting a specific VRAM size displays only matching runs

### Requirement: Multi-criteria Filtering
The system SHALL combine all active filters (search text query, OS filter, CPU filter, GPU filter, RAM filter, and VRAM filter) using a logical AND operation when resolving the leaderboard rows display.

#### Scenario: Filtering by multiple active criteria simultaneously
- **WHEN** multiple filters are active at the same time
- **THEN** only benchmark runs satisfying all selected conditions are displayed

