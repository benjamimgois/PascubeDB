## MODIFIED Requirements

### Requirement: Package Distribution Chart
The system SHALL deduplicate benchmark runs by `client-id` keeping only the most recent run, then read the "package" field from each deduplicated row, aggregate the count of each unique package type (e.g., native, flatpak, appimage), and render a doughnut chart displaying their distribution below the Submission Activity chart in the Community Insights section.

#### Scenario: Rendering the Package Distribution chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the percentage distribution of package types among all benchmark submissions, with empty/missing values grouped as "Unknown", counting at most one run per `client-id`
