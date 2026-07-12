## ADDED Requirements

### Requirement: GPU Performance Chart Frequency Display
For the Top 10 GPU Model Performance horizontal bar chart, the system SHALL render the GPU Max Frequency centered inside the bar (or outside if it overlaps the score) formatted as "FREQ MHz" using a small, normal-weight (non-bold) font.

#### Scenario: Rendering GPU Max Frequency on GPU Performance Chart
- **WHEN** the Top 10 GPU Model Performance chart is rendered and the GPU frequency is available
- **THEN** the frequency is shown in the center of the bar formatted as "FREQ MHz" in a non-bold 10px font
