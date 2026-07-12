## ADDED Requirements

### Requirement: Bottleneck Chart Threshold Label Position
In the CPU vs GPU Bottleneck horizontal bar charts:
- The "Balanced" label on the vertical threshold line SHALL be rendered above the chart area to prevent overlap with the first horizontal bar.

#### Scenario: Displaying threshold label above chart area
- **WHEN** the CPU vs GPU Bottleneck chart is rendered
- **THEN** the "Balanced" text label is displayed above the top line of the chart area
