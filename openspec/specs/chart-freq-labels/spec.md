# Chart Frequency Labels

## Purpose

Display CPU and GPU max frequency labels on horizontal bar charts so users can assess clock speeds at a glance.

## Requirements

### Requirement: Frequency labels centered within bar

Horizontal bar charts SHALL display CPU/GPU max frequency labels centered horizontally within each bar, not at the right edge.

#### Scenario: Label centered on long bar
- **WHEN** a bar occupies >50% of chart width
- **THEN** the frequency label SHALL be fully visible within the bar area

#### Scenario: Label centered on short bar
- **WHEN** a bar occupies <20% of chart width
- **THEN** the frequency label SHALL be horizontally centered within that bar

#### Scenario: No frequency data
- **WHEN** `cpuMaxFreq` or `gpuMaxFreq` is null/undefined
- **THEN** the text "MHz" SHALL be drawn as a placeholder for that bar
