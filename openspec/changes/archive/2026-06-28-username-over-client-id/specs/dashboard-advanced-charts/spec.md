## MODIFIED Requirements

### Requirement: Top 10 Main Scores Chart
The system SHALL identify the top 10 highest individual Main Scores recorded in the dataset and render a horizontal bar chart of these runs. This chart SHALL be positioned as the first chart in the main charts section of the dashboard. When hovering over a data point, the tooltip SHALL display the Main Score, the CPU, the GPU, and the contributor display name resolved via `getDisplayName`. The X-axis of this chart SHALL use an adaptive minimum scale based on 90% of the lowest score in the top 10.

#### Scenario: Rendering the Top 10 Main Scores chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 runs by Main Score is rendered at the top of the charts section, showing contributor display name, CPU, and GPU in the tooltips on hover, and utilizing an adaptive X-axis minimum.

### Requirement: CPU Single-Thread Top 10 Chart with Client ID
The system SHALL render a horizontal bar chart displaying the top 10 CPU models sorted by CPU Single score in descending order. When hovering over a bar in the chart, the tooltip SHALL display the score and the contributor display name resolved via `getDisplayName`.

#### Scenario: Rendering CPU Single Thread Top 10 Chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the top 10 CPU Single-Thread chart is rendered and displays the contributor display name in the tooltip on hover

### Requirement: CPU Multi-Thread Top 10 Chart with Client ID
The system SHALL render a horizontal bar chart displaying the top 10 CPU models sorted by CPU Multi score in descending order. When hovering over a bar in the chart, the tooltip SHALL display the score and the contributor display name resolved via `getDisplayName`.

#### Scenario: Rendering CPU Multi Thread Top 10 Chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the top 10 CPU Multi-Thread chart is rendered and displays the contributor display name in the tooltip on hover

### Requirement: GPU Performance Top 10 Chart with Client ID
The system SHALL render a horizontal bar chart displaying the top 10 GPU models sorted by GPU score in descending order. When hovering over a bar in the chart, the tooltip SHALL display the score and the contributor display name resolved via `getDisplayName`.

#### Scenario: Rendering GPU Performance Top 10 Chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the top 10 GPU Performance chart is rendered and displays the contributor display name in the tooltip on hover

### Requirement: Average CPU Score by CPU Model
The system SHALL aggregate the average CPU Single score for each unique CPU model and render a horizontal bar chart of the top CPU models by average performance. When hovering over a bar, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering average score by CPU chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 CPU models sorted by average CPU Single score descending is rendered with contributor display name on hover

### Requirement: Average GPU Score by GPU Model
The system SHALL aggregate the average GPU score for each unique GPU model and render a horizontal bar chart of the top GPU models by average performance. When hovering over a bar, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering average score by GPU chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 GPU models sorted by average GPU score descending is rendered with contributor display name on hover
