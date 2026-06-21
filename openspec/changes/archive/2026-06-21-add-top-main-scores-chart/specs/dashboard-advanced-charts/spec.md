## ADDED Requirements

### Requirement: Top 10 Main Scores Chart
The system SHALL identify the top 10 highest individual Main Scores recorded in the dataset and render a horizontal bar chart of these runs. This chart SHALL be positioned as the first chart in the main charts section of the dashboard. When hovering over a data point, the tooltip SHALL display the Main Score, the CPU, the GPU, and the client-id (first 8 characters) of the run. The X-axis of this chart SHALL use an adaptive minimum scale based on 90% of the lowest score in the top 10.

#### Scenario: Rendering the Top 10 Main Scores chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart displaying the top 10 runs by Main Score is rendered at the top of the charts section, showing Client ID, CPU, and GPU in the tooltips on hover, and utilizing an adaptive X-axis minimum.
