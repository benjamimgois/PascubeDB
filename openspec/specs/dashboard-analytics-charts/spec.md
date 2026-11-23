# dashboard-analytics-charts

## Purpose
Specifies the capability to render new distribution charts and hardware usage statistics on the benchmark dashboard.

## Requirements

### Requirement: Top 10 CPU Most Used Chart
The system SHALL aggregate the benchmark data to identify the top 10 most frequently occurring CPU models and render a horizontal bar chart displaying their frequency counts.

#### Scenario: Rendering Top 10 CPU usage chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 CPU models sorted by occurrence count in descending order

### Requirement: Top 10 GPU Most Used Chart
The system SHALL aggregate the benchmark data to identify the top 10 most frequently occurring GPU models and render a horizontal bar chart displaying their frequency counts.

#### Scenario: Rendering Top 10 GPU usage chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 GPU models sorted by occurrence count in descending order

### Requirement: Operating Systems Distribution Chart
The system SHALL aggregate the count of each unique operating system name present in the benchmark data, keep the top 5 most frequent operating systems, group any remaining operating systems into an `Others` slice, and render a doughnut chart displaying their percentage distribution.

#### Scenario: Rendering Operating Systems distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing up to the top 5 operating systems sorted by frequency descending plus an `Others` slice when more than 5 operating systems exist

### Requirement: CPU Brands Distribution Chart
The system SHALL categorize CPU models into Intel, AMD, or Other brands and render a pie or doughnut chart showing their distribution.

#### Scenario: Rendering CPU Brands distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the distribution of CPU brands (Intel, AMD, Other)

### Requirement: GPU Brands Distribution Chart
The system SHALL categorize GPU models into NVIDIA, AMD, Intel, or Other brands and render a pie or doughnut chart showing their distribution.

#### Scenario: Rendering GPU Brands distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the distribution of GPU brands (Nvidia, AMD, Intel, Other)

### Requirement: Video Driver Distribution Chart
The system SHALL categorize video drivers from the dataset (such as Mesa, NVIDIA Proprietary, or Other) and render a pie or doughnut chart showing their distribution.

#### Scenario: Rendering Video Driver distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the distribution of video drivers (Mesa, NVIDIA, Other)

### Requirement: High-Cardinality Doughnut Top 5 Cap
High-cardinality distribution doughnut charts (`Kernel Versions`, `GOverlay Versions`, `Mesa Versions`, `NVIDIA Driver Versions`, `General Operating Systems`, and `Handheld Operating Systems`) SHALL sort entries by count descending, display at most the top 5 entries as individual slices, and aggregate all remaining entries into a single `Others` slice.

#### Scenario: Distribution has more than 5 unique values
- **WHEN** a high-cardinality distribution (such as Kernel or GOverlay versions) contains more than 5 unique entries
- **THEN** the chart renders exactly 6 slices (Top 5 sorted descending + `Others`) using 6 distinct non-repeating colors, with neutral gray reserved for `Others`

#### Scenario: Inspecting the Others slice tooltip
- **WHEN** the user hovers over the `Others` slice of a capped doughnut chart
- **THEN** the tooltip displays the total count and percentage for `Others` along with a summary breakdown of the top grouped entries inside `Others`
