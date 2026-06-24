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
The system SHALL aggregate the counts of Handheld vs. Notebook vs. SBC devices and render a doughnut chart displaying their percentage distribution in the dataset. The section title SHALL read "Mobile and SBC Devices" instead of "Mobile Devices".

#### Scenario: Rendering the Mobile and SBC Device Type Distribution chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing the percentage of Handhelds, Notebooks, and SBCs among all identified non-desktop devices

### Requirement: Top 10 Mobile CPU Performance Chart
The system SHALL identify mobile CPUs in the dataset and render a horizontal bar chart displaying the top 10 mobile CPU models sorted by average CPU Single score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run for that mobile CPU model.

#### Scenario: Rendering the Top 10 Mobile CPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 mobile CPU models and their average CPU Single scores, including the client-id (first 8 characters) of the top run in the tooltip on hover

### Requirement: Top 10 Mobile GPU Performance Chart
The system SHALL identify mobile GPUs in the dataset and render a horizontal bar chart displaying the top 10 mobile GPU models sorted by average GPU score in descending order. When a user hovers over a data point, the tooltip SHALL display the client-id (first 8 characters) of the best-performing run for that mobile GPU model.

#### Scenario: Rendering the Top 10 Mobile GPU Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 mobile GPU models and their average GPU scores, including the client-id (first 8 characters) of the top run in the tooltip on hover

### Requirement: Top 10 Handheld Performance Chart
The system SHALL identify handheld gaming PC models in the dataset and render a horizontal bar chart displaying the top 10 highest individual Main Scores recorded by Handheld devices.

#### Scenario: Rendering the Top 10 Handheld Performance chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a horizontal bar chart is rendered displaying the top 10 highest handheld runs sorted by Main Score in descending order

### Requirement: Notebook vs Handheld vs SBC Averages Chart
The system SHALL calculate the overall average benchmark scores (Main Score, CPU Single, CPU Multi, and GPU Score) for Notebooks, Handhelds, and SBCs, and render a grouped bar chart comparing these averages across all three categories.

#### Scenario: Rendering the Notebook vs Handheld vs SBC Averages comparison chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a grouped bar chart is rendered showing comparison bars for average Main Score, average CPU Single, average CPU Multi, and average GPU Score between the Handheld, SBC, and Notebook categories
