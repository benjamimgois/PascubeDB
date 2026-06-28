## MODIFIED Requirements

### Requirement: Top 10 Notebook CPU Models by Average Score
The system SHALL filter the dataset to Notebook devices only, group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering top 10 Notebook CPU average scores
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook CPU models and their average CPU Single scores, including the contributor display name of the top run in the tooltip on hover

### Requirement: Top 10 Handheld CPU Models by Average Score
The system SHALL filter the dataset to Handheld devices only, group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering top 10 Handheld CPU average scores
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld CPU models and their average CPU Single scores, including the contributor display name of the top run in the tooltip on hover

### Requirement: Top 10 SBC CPU Models by Average Score
The system SHALL filter the dataset to SBC devices only, group by CPU model, and render a horizontal bar chart of the top 10 models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the contributor display name resolved via `getDisplayName` of the best-performing run.

#### Scenario: Rendering top 10 SBC CPU average scores
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC CPU models and their average CPU Single scores, including the contributor display name of the top run in the tooltip on hover
