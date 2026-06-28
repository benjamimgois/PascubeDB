## MODIFIED Requirements

### Requirement: Top 10 Notebook GPU Models by Average Score
The system SHALL filter the dataset to Notebook devices only, group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run. Desktop-class GPUs SHALL be excluded from Notebook averages.

#### Scenario: Rendering top 10 Notebook GPU average scores
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook GPU models and their average GPU scores, including the contributor display name of the top run in the tooltip on hover

### Requirement: Top 10 Handheld GPU Models by Average Score
The system SHALL filter the dataset to Handheld devices only, group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering top 10 Handheld GPU average scores
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld GPU models and their average GPU scores, including the contributor display name of the top run in the tooltip on hover

### Requirement: Top 10 SBC GPU Models by Average Score
The system SHALL filter the dataset to SBC devices only, group by GPU model, and render a horizontal bar chart of the top 10 models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering top 10 SBC GPU average scores
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC GPU models and their average GPU scores, including the contributor display name of the top run in the tooltip on hover
