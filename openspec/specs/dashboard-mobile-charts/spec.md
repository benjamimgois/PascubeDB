# dashboard-mobile-charts

## Purpose
Specifies the capability to render performance comparison charts and distribution metrics for mobile form factors (laptops/notebooks and handheld gaming PCs) on the benchmark dashboard.
## Requirements
### Requirement: Mobile Device Detection Logic
The system SHALL scan and analyze the benchmark dataset to identify rows representing mobile devices. Each mobile record MUST be classified as either "Handheld" or "Notebook" based on CPU, GPU, OS, and Kernel signatures.
- "Handheld" signature includes: CPU/GPU containing "Steam Deck", "Z1 Extreme", "Z1", "Custom APU 0405", or "AMD Custom GPU 0405"; or OS/Kernel containing "Bazzite (ROG Ally", "Steam Deck", "Ally", or "Legion Go".
- "Notebook" signature includes: GPU containing "Laptop", "Mobile", or "Geforce MX"; CPU containing Intel mobile suffixes like `H`, `HX`, `HK`, `U` or AMD mobile suffixes like `H`, `HS`, `HX`, `U`, or Ryzen AI processors (excluding those already classified as Handhelds).

#### Scenario: Categorizing a row as Handheld or Notebook
- **WHEN** the benchmark data is processed
- **THEN** rows matching Handheld criteria are labeled as "Handheld", rows matching Notebook criteria are labeled as "Notebook", and all other rows are ignored for the mobile section charts

### Requirement: Mobile Device Type Distribution Chart
The system SHALL aggregate the counts of Handheld vs. Notebook vs. SBC devices and render a doughnut chart displaying their percentage distribution. The chart title SHALL read "Portable device type".

#### Scenario: Rendering the Portable device type chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing the percentage of Handhelds, Notebooks, and SBCs among all identified non-desktop devices

### Requirement: Top 10 Notebook Benchmark Runs
The system SHALL identify Notebook devices and render a horizontal bar chart of the top 10 highest individual Main Scores.

#### Scenario: Rendering the Top 10 Notebook Benchmark Runs chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Notebook runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 Handheld Benchmark Runs
The system SHALL identify Handheld devices and render a horizontal bar chart of the top 10 highest individual Main Scores.

#### Scenario: Rendering the Top 10 Handheld Benchmark Runs chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 Handheld runs sorted by Main Score in descending order, with client-id (first 8 characters) shown on hover

### Requirement: Top 10 SBC Benchmark Runs
The system SHALL parse the "product name" field from each benchmark row. When rendering the Top 10 SBC Benchmark Runs chart, the label SHALL display the product name (if available and not "N/D") instead of the normalized CPU name.

#### Scenario: Rendering the Top 10 SBC Benchmark Runs with product name
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 SBC runs sorted by Main Score, where each bar label shows the product name (e.g., "Raspberry Pi 5 Rev 1.0") when available, falling back to the CPU model name

### Requirement: Portable Chart Label Legibility
The system SHALL ensure that text labels on portable device charts (including Main Score, CPU Max Freq, and contributor names) are fully readable. If the CPU Max Freq label overlaps with the Main Score label inside the bar, it MUST be drawn outside the bar dynamically.

#### Scenario: Rendering labels on a narrow portable device bar
- **WHEN** the portable horizontal bar chart is rendered and the CPU frequency label would overlap the score
- **THEN** the CPU frequency label is rendered outside to the right of the bar dynamically

