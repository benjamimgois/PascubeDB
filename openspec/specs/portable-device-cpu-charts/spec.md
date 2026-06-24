# portable-device-cpu-charts

## Purpose
Specifies the capability to render Top 10 CPU Performance charts filtered by portable device category (Notebook, Handheld, SBC) in the Portable Devices section.

## Requirements

### Requirement: Top 10 Notebook CPU - Performance Chart
The system SHALL filter the dataset to Notebook devices only, group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run.

#### Scenario: Rendering the Top 10 Notebook CPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook CPU models and their average CPU Single scores, including the client-id of the top run in the tooltip on hover

### Requirement: Top 10 Handheld CPU - Performance Chart
The system SHALL filter the dataset to Handheld devices only, group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run.

#### Scenario: Rendering the Top 10 Handheld CPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld CPU models and their average CPU Single scores, including the client-id of the top run in the tooltip on hover

### Requirement: Top 10 SBC CPU - Performance Chart
The system SHALL filter the dataset to SBC devices only, group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run.

#### Scenario: Rendering the Top 10 SBC CPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC CPU models and their average CPU Single scores, including the client-id of the top run in the tooltip on hover
