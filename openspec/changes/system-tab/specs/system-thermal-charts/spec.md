## ADDED Requirements

### Requirement: Hottest GPU bar chart

The system SHALL render a horizontal bar chart ranking the top 10 GPU models by average maximum temperature (GPU Max Temp). Higher temperature SHALL rank first. The chart SHALL show the GPU name and the average max temperature in °C.

#### Scenario: Hottest GPU chart rendered

- **WHEN** the System tab loads and GPU temperature data exists for at least 2 submissions per GPU
- **THEN** a horizontal bar chart SHALL display the top 10 hottest GPUs by average max temperature

#### Scenario: Minimum sample filter

- **WHEN** aggregating GPU temperatures
- **THEN** the system SHALL only include GPU models with 2 or more submissions

#### Scenario: No temperature data

- **WHEN** no GPU temperature data exists
- **THEN** the chart SHALL display "No data" state

### Requirement: Best Cooling bar chart

The system SHALL render a horizontal bar chart ranking the top 10 GPU models by smallest temperature delta (GPU Temp Delta). A smaller delta indicates better cooling efficiency. The chart SHALL show the GPU name and the average temperature delta in °C.

#### Scenario: Best Cooling chart rendered

- **WHEN** the System tab loads and GPU temp delta data exists for at least 2 submissions per GPU
- **THEN** a horizontal bar chart SHALL display the top 10 GPU models with best cooling (lowest average delta)

#### Scenario: Minimum sample filter

- **WHEN** aggregating GPU temperature deltas
- **THEN** the system SHALL only include GPU models with 2 or more submissions

### Requirement: Thermal stats card

The System tab stats grid SHALL display a card showing the GPU model with the highest average max temperature and its temperature value.

#### Scenario: Thermal stat rendered

- **WHEN** the System tab loads and temperature data exists
- **THEN** a stat card SHALL display the hottest GPU and its temperature
