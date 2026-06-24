# sbc-devices

## ADDED Requirements

### Requirement: Top 10 SBC CPU - Performance Chart
The system SHALL identify SBC devices and render a horizontal bar chart of the top 10 SBC CPU models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run for that SBC CPU model.

#### Scenario: Rendering the Top 10 SBC CPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC CPU models and their average CPU Single scores, including the client-id of the top run in the tooltip on hover

### Requirement: Top 10 SBC GPU - Performance Chart
The system SHALL identify SBC devices and render a horizontal bar chart of the top 10 SBC GPU models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run for that SBC GPU model.

#### Scenario: Rendering the Top 10 SBC GPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC GPU models and their average GPU scores, including the client-id of the top run in the tooltip on hover
