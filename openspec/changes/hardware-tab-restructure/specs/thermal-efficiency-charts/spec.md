# thermal-efficiency-charts

## Purpose
Defines the thermal-related charts under the Thermals pill, including the existing GPU temperature charts and the new thermal efficiency chart.

## ADDED Requirements

### Requirement: Thermal efficiency bar chart (score per °C)
The system SHALL compute `mainScore / gpuTempDelta` for each benchmark row where both values are present and `gpuTempDelta > 0`. It SHALL render a horizontal bar chart of the top 10 contributors by highest thermal efficiency. Tooltip SHALL show client ID, main score, GPU temp delta, and efficiency ratio.

#### Scenario: Rendering thermal efficiency chart
- **WHEN** the Thermals pill is activated
- **THEN** a bar chart of the top 10 contributors by score/°C is rendered

#### Scenario: Zero-temp rows excluded
- **WHEN** a row has gpuTempDelta = 0 or "N/D"
- **THEN** that row is excluded from thermal efficiency calculations
