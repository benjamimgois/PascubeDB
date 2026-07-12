## ADDED Requirements

### Requirement: Horizontal Bar Chart Label Legibility
The system SHALL ensure that all text labels rendered on horizontal bar charts (including main score values, secondary details/temperatures, and contributor usernames) are completely legible and do not overlap, regardless of the width of the bars. If the bar is too narrow to contain any label inside, the label MUST be positioned outside to the right of the bar dynamically, preventing layout collisions.

#### Scenario: Rendering labels on a very narrow horizontal bar chart
- **WHEN** the chart is rendered and a bar's width is narrower than the width of the text labels
- **THEN** the labels are positioned dynamically outside to the right of the bar in a non-overlapping sequence
