# dashboard-advanced-charts

## Purpose
Specifies the capability to render advanced metrics, averages, and distribution histograms on the dashboard.

## Requirements

### Requirement: Average CPU Score by CPU Model
The system SHALL aggregate the average CPU Single score for each unique CPU model and render a horizontal bar chart of the top CPU models by average performance.

#### Scenario: Rendering average score by CPU chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 CPU models sorted by average CPU Single score descending is rendered

### Requirement: Average GPU Score by GPU Model
The system SHALL aggregate the average GPU score for each unique GPU model and render a horizontal bar chart of the top GPU models by average performance.

#### Scenario: Rendering average score by GPU chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 GPU models sorted by average GPU score descending is rendered

### Requirement: Average Performance by OS
The system SHALL aggregate the average Main Score for each unique operating system and render a horizontal bar chart comparing OS performance averages.

#### Scenario: Rendering average score by OS chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the average Main Score by OS descending is rendered

### Requirement: Mesa and Kernel Version Distribution
The system SHALL extract and clean version numbers from video driver (Mesa) and kernel version strings, and render a distribution chart of the most popular versions.

#### Scenario: Rendering Mesa and Kernel version distribution charts
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** doughnut charts are rendered displaying the distribution of Mesa versions and Kernel major versions (e.g. 7.0, 7.1, 6.1)

### Requirement: Score Distribution Histogram
The system SHALL bin all valid Main Scores into range buckets (e.g., 0-999, 1000-1999, etc.) and render a vertical bar chart histogram showing score density.

#### Scenario: Rendering score histogram chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a vertical bar chart histogram displaying the count of runs in each score bin is rendered
