## ADDED Requirements

### Requirement: Bottleneck Chart Label Legibility
The system SHALL ensure that all text labels rendered on the CPU vs GPU Bottleneck horizontal bar charts (including ratio values, raw CPU/GPU scores, and contributor names) are fully readable and do not overlap. If the bar is too narrow to fit these labels inside, they MUST be positioned outside to the right of the bar dynamically using a sequential layout.

#### Scenario: Rendering labels on a narrow bottleneck bar chart
- **WHEN** the CPU vs GPU Bottleneck chart is rendered and a bar's width is narrower than the width of the labels
- **THEN** the labels are positioned dynamically outside to the right of the bar in a non-overlapping sequence
