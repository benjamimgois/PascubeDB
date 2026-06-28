## MODIFIED Requirements

### Requirement: Mesa and Kernel Version Distribution
The system SHALL deduplicate benchmark runs by `client-id` keeping only the most recent run, then extract and clean version numbers from video driver (Mesa) and kernel version strings, and render a distribution chart of the most popular versions.

#### Scenario: Rendering Mesa and Kernel version distribution charts
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** doughnut charts are rendered displaying the distribution of Mesa versions and Kernel major versions (e.g. 7.0, 7.1, 6.1), counting at most one run per `client-id`
