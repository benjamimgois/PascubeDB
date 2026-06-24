# dashboard-mobile-charts

## MODIFIED Requirements

### Requirement: Mobile Device Type Distribution Chart
The system SHALL aggregate the counts of Handheld vs. Notebook vs. SBC devices and render a doughnut chart displaying their percentage distribution in the dataset. The section title SHALL read "Mobile and SBC Devices" instead of "Mobile Devices".

#### Scenario: Rendering the Mobile and SBC Device Type Distribution chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered showing the percentage of Handhelds, Notebooks, and SBCs among all identified non-desktop devices

### Requirement: Notebook vs Handheld Averages Chart
The system SHALL calculate the overall average benchmark scores (Main Score, CPU Single, CPU Multi, and GPU Score) for Notebooks, Handhelds, and SBCs, and render a grouped bar chart comparing these averages across all three categories.

#### Scenario: Rendering the Notebook vs Handheld vs SBC Averages comparison chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a grouped bar chart is rendered showing comparison bars for average Main Score, average CPU Single, average CPU Multi, and average GPU Score between the Handheld, SBC, and Notebook categories
