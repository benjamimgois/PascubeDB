## MODIFIED Requirements

### Requirement: Top 10 Mobile GPU - Performance Chart (replaces Notebook + SBC)

The system SHALL filter the dataset to Mobile devices (Notebook + SBC), group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. Desktop-class GPUs SHALL be excluded from Mobile averages. When a user hovers over a data point, the tooltip SHALL display the client-id of the best-performing run.

#### Scenario: Rendering the Top 10 Mobile GPU Performance chart

- **WHEN** the dashboard loads
- **THEN** a horizontal bar chart is rendered displaying the top 10 Mobile GPU models and their average GPU scores

## REMOVED Requirements

### Requirement: Top 10 Notebook GPU - Performance Chart
**Reason**: Replaced by Top 10 Mobile GPU
### Requirement: Top 10 SBC GPU - Performance Chart
**Reason**: Replaced by Top 10 Mobile GPU
