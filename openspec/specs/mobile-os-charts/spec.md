# mobile-os-charts

## Purpose
Specifies the capability to render Operating System distribution statistics for all mobile devices and specifically for handheld gaming PCs in the Mobile Devices section of the dashboard.

## Requirements

### Requirement: Mobile OS Distribution Chart
The system SHALL aggregate the count of each unique operating system name for all mobile devices (Handheld and Notebook) present in the benchmark data and render a doughnut chart displaying their distribution.

#### Scenario: Rendering the Mobile OS Distribution chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the OS distribution of all mobile devices

### Requirement: Handheld OS Distribution Chart
The system SHALL aggregate the count of each unique operating system name for Handheld devices present in the benchmark data and render a doughnut chart displaying their distribution.

#### Scenario: Rendering the Handheld OS Distribution chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the OS distribution specifically for Handheld devices

### Requirement: SBCs Operating Systems Chart
The system SHALL aggregate the count of each unique operating system name for SBC devices present in the benchmark data and render a doughnut chart displaying their distribution.

#### Scenario: Rendering the SBCs Operating Systems chart
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** a doughnut chart is rendered displaying the OS distribution specifically for SBC devices
