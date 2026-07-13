## MODIFIED Requirements

### Requirement: Top 10 Mobile CPU - Performance Chart (replaces Notebook + SBC)

The system SHALL filter the dataset to Mobile devices (Notebook + SBC), group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id of the best-performing run.

#### Scenario: Rendering the Top 10 Mobile CPU Performance chart

- **WHEN** the dashboard loads
- **THEN** a horizontal bar chart is rendered displaying the top 10 Mobile CPU models and their average CPU Single scores

## REMOVED Requirements

### Requirement: Top 10 Notebook CPU - Performance Chart
**Reason**: Replaced by Top 10 Mobile CPU
### Requirement: Top 10 SBC CPU - Performance Chart
**Reason**: Replaced by Top 10 Mobile CPU
