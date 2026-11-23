# Spec Delta

## MODIFIED Requirements

### Requirement: Operating Systems Distribution Chart
The system SHALL aggregate the count of each unique operating system name present in the benchmark data, keep the top 5 most frequent operating systems, group any remaining operating systems into an `Others` slice, and render a doughnut chart displaying their percentage distribution.

#### Scenario: Rendering Operating Systems distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing up to the top 5 operating systems sorted by frequency descending plus an `Others` slice when more than 5 operating systems exist

## ADDED Requirements

### Requirement: High-Cardinality Doughnut Top 5 Cap
High-cardinality distribution doughnut charts (`Kernel Versions`, `GOverlay Versions`, `Mesa Versions`, `NVIDIA Driver Versions`, `General Operating Systems`, and `Handheld Operating Systems`) SHALL sort entries by count descending, display at most the top 5 entries as individual slices, and aggregate all remaining entries into a single `Others` slice.

#### Scenario: Distribution has more than 5 unique values
- **WHEN** a high-cardinality distribution (such as Kernel or GOverlay versions) contains more than 5 unique entries
- **THEN** the chart renders exactly 6 slices (Top 5 sorted descending + `Others`) using 6 distinct non-repeating colors, with neutral gray reserved for `Others`

#### Scenario: Inspecting the Others slice tooltip
- **WHEN** the user hovers over the `Others` slice of a capped doughnut chart
- **THEN** the tooltip displays the total count and percentage for `Others` along with a summary breakdown of the top grouped entries inside `Others`
