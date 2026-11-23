# leaderboard-table-layout Specification

## Purpose
Keeps the leaderboard table's pinned columns aligned with their cells regardless of how wide th

## Requirements

### Requirement: Stable Pinned Column Alignment
Pinned table columns SHALL remain horizontally aligned with their cells regardless of the rendered width of the pinned columns.

#### Scenario: First column width varies
- **WHEN** the leaderboard table renders with rank content of a different width
- **THEN** the second pinned column stays flush against the first with no gap or overlap

#### Scenario: Horizontal scroll
- **WHEN** the user scrolls the table horizontally
- **THEN** the pinned columns keep their alignment and remain pinned

### Requirement: Spacious 7-Column Leaderboard Table
The Leaderboard table SHALL display 7 primary columns (`#`, `Hardware`, `OS`, `Main Score`, `CPU 1T / MT`, `GPU Score`, `Actions`) with inline proportional score bars so users can scan and compare runs without horizontal cramping.

#### Scenario: Rendering primary leaderboard columns
- **WHEN** the Leaderboard table renders benchmark runs
- **THEN** each row displays rank, normalized CPU + GPU with contributor/form-factor/RAM subtitle, OS, Main Score with proportional bar, CPU 1T / MT, GPU Score, and row actions

### Requirement: Expandable Row Technical Details
Clicking a Leaderboard row SHALL toggle an inline detail panel displaying secondary technical metadata (`CPU Freq`, `GPU Freq`, `VRAM`, `Kernel`, `Driver`, `GOverlay`, `Client ID`, `Date`).

#### Scenario: Expanding a row for full specs
- **WHEN** the user clicks on a Leaderboard row (outside action buttons)
- **THEN** an inline detail panel expands beneath the row showing full frequency, VRAM, kernel, driver, and submission metadata

### Requirement: Best per Contributor Default Toggle
The Leaderboard toolbar SHALL provide a `Best per Contributor` | `All Runs` toggle defaulting to `Best per Contributor`, deduplicating repeated runs by the same contributor unless `All Runs` is selected.

#### Scenario: Default deduplicated ranking
- **WHEN** the Leaderboard loads with `Best per Contributor` active
- **THEN** only the highest-scoring matching run per contributor is displayed

#### Scenario: Viewing all individual runs
- **WHEN** the user switches the toggle to `All Runs`
- **THEN** all matching individual benchmark submissions are displayed

### Requirement: Paginated Leaderboard Rendering
The Leaderboard table SHALL paginate rendered rows (e.g. 50 rows per page) with page navigation controls so filtering and sorting remain responsive across thousands of runs.

#### Scenario: Navigating leaderboard pages
- **WHEN** the filtered result set exceeds the page size
- **THEN** pagination controls allow moving between pages and show the current slice of total results
