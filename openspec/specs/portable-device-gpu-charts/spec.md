# portable-device-gpu-charts

## Purpose
Specifies the capability to render Top 10 GPU Performance charts filtered by portable device category (Notebook, Handheld, SBC) in the Portable Devices section.

## Requirements

### Requirement: Top 10 Notebook GPU - Performance Chart
The system SHALL filter the dataset to Notebook devices only, group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run. Desktop-class GPUs (e.g., RTX 4090, RX 7900 XTX without "Laptop"/"Mobile" suffix) SHALL be excluded from Notebook averages.

#### Scenario: Rendering the Top 10 Notebook GPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook GPU models and their average GPU scores, including the client-id of the top run in the tooltip on hover

### Requirement: Top 10 Handheld GPU - Performance Chart
The system SHALL filter the dataset to Handheld devices only, group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run.

#### Scenario: Rendering the Top 10 Handheld GPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld GPU models and their average GPU scores, including the client-id of the top run in the tooltip on hover

### Requirement: Top 10 SBC GPU - Performance Chart
The system SHALL filter the dataset to SBC devices only, group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run.

#### Scenario: Rendering the Top 10 SBC GPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC GPU models and their average GPU scores, including the client-id of the top run in the tooltip on hover
