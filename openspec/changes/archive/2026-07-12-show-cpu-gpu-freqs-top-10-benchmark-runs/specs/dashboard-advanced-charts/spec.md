## ADDED Requirements

### Requirement: Top 10 Runs CPU and GPU Max Frequencies Display
For the Top 10 Benchmark Runs horizontal bar chart, the system SHALL render both the CPU Max Frequency and the GPU Max Frequency centered inside the bar (or outside if it overlaps the score) in the format "CPU_FREQ / GPU_FREQ MHz" using a small, normal-weight (non-bold) font.

#### Scenario: Rendering CPU and GPU Max Frequencies on Top 10 Runs Chart
- **WHEN** the Top 10 Benchmark Runs chart is rendered and both CPU and GPU frequencies are available
- **THEN** both frequencies are shown in the center of the bar formatted as "CPU_FREQ / GPU_FREQ MHz" in a non-bold 10px font
