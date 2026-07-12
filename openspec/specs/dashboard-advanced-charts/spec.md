# dashboard-advanced-charts

## Purpose
Specifies the capability to render advanced metrics, averages, and distribution histograms on the dashboard.
## Requirements
### Requirement: Top 10 Main Scores Chart
The system SHALL identify the top 10 highest individual Main Scores recorded in the dataset and render a horizontal bar chart of these runs. This chart SHALL be positioned as the first chart in the main charts section of the dashboard. When hovering over a data point, the tooltip SHALL display the Main Score, the CPU, the GPU, and the client-id (first 8 characters) of the run. The X-axis of this chart SHALL use an adaptive minimum scale based on 90% of the lowest score in the top 10.

#### Scenario: Rendering the Top 10 Main Scores chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 runs by Main Score is rendered at the top of the charts section, showing Client ID, CPU, and GPU in the tooltips on hover, and utilizing an adaptive X-axis minimum.

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
- **THEN** a vertical bar chart histogram displaying the percentage of runs in each score bin is rendered

### Requirement: CPU Single-Thread Top 10 Chart with Client ID
The system SHALL render a horizontal bar chart displaying the top 10 CPU models sorted by CPU Single score in descending order. When hovering over a bar in the chart, the tooltip SHALL display the score and the client-id (first 8 characters) of the run.

#### Scenario: Rendering CPU Single Thread Top 10 Chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the top 10 CPU Single-Thread chart is rendered and displays the client-id (first 8 characters) of the run in the tooltip on hover

### Requirement: CPU Multi-Thread Top 10 Chart with Client ID
The system SHALL render a horizontal bar chart displaying the top 10 CPU models sorted by CPU Multi score in descending order. When hovering over a bar in the chart, the tooltip SHALL display the score and the client-id (first 8 characters) of the run.

#### Scenario: Rendering CPU Multi Thread Top 10 Chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the top 10 CPU Multi-Thread chart is rendered and displays the client-id (first 8 characters) of the run in the tooltip on hover

### Requirement: GPU Performance Top 10 Chart with Client ID
The system SHALL render a horizontal bar chart displaying the top 10 GPU models sorted by GPU score in descending order. When hovering over a bar in the chart, the tooltip SHALL display the score and the client-id (first 8 characters) of the run.

#### Scenario: Rendering GPU Performance Top 10 Chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the top 10 GPU Performance chart is rendered and displays the client-id (first 8 characters) of the run in the tooltip on hover

### Requirement: Horizontal Bar Chart Label Legibility
The system SHALL ensure that all text labels rendered on horizontal bar charts (including main score values, secondary details/temperatures, and contributor usernames) are completely legible and do not overlap, regardless of the width of the bars. If the bar is too narrow to contain any label inside, the label MUST be positioned outside to the right of the bar dynamically, preventing layout collisions.

#### Scenario: Rendering labels on a very narrow horizontal bar chart
- **WHEN** the chart is rendered and a bar's width is narrower than the width of the text labels
- **THEN** the labels are positioned dynamically outside to the right of the bar in a non-overlapping sequence

