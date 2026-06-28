## MODIFIED Requirements

### Requirement: Operating Systems Distribution Chart
The system SHALL deduplicate benchmark runs by `client-id` keeping only the most recent run, then aggregate the count of each unique operating system name present in the deduplicated data and render a pie or doughnut chart displaying their percentage distribution.

#### Scenario: Rendering Operating Systems distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing the distribution of operating systems in the dataset, counting at most one run per `client-id`

### Requirement: CPU Brands Distribution Chart
The system SHALL deduplicate benchmark runs by `client-id` keeping only the most recent run, then categorize CPU models into Intel, AMD, or Other brands and render a pie or doughnut chart showing their distribution.

#### Scenario: Rendering CPU Brands distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the distribution of CPU brands (Intel, AMD, Other), counting at most one run per `client-id`

### Requirement: GPU Brands Distribution Chart
The system SHALL deduplicate benchmark runs by `client-id` keeping only the most recent run, then categorize GPU models into NVIDIA, AMD, Intel, or Other brands and render a pie or doughnut chart showing their distribution.

#### Scenario: Rendering GPU Brands distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the distribution of GPU brands (Nvidia, AMD, Intel, Other), counting at most one run per `client-id`

### Requirement: Video Driver Distribution Chart
The system SHALL deduplicate benchmark runs by `client-id` keeping only the most recent run, then categorize video drivers from the dataset (such as Mesa, NVIDIA Proprietary, or Other) and render a pie or doughnut chart showing their distribution.

#### Scenario: Rendering Video Driver distribution pie chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the distribution of video drivers (Mesa, NVIDIA, Other), counting at most one run per `client-id`
