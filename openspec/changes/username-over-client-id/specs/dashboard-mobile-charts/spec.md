## MODIFIED Requirements

### Requirement: Top 10 Notebook Main Scores Chart
The system SHALL filter the dataset to Notebook devices only, identify the top 10 highest Main Score runs, and render a horizontal bar chart. When hovering over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName`.

#### Scenario: Rendering top 10 Notebook Main Scores chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook runs sorted by Main Score in descending order, with contributor display name shown on hover

### Requirement: Top 10 Handheld Main Scores Chart
The system SHALL filter the dataset to Handheld devices only, identify the top 10 highest Main Score runs, and render a horizontal bar chart. When hovering over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName`.

#### Scenario: Rendering top 10 Handheld Main Scores chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld runs sorted by Main Score in descending order, with contributor display name shown on hover
