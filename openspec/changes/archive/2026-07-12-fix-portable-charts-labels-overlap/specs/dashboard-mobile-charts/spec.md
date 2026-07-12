## ADDED Requirements

### Requirement: Portable Chart Label Legibility
The system SHALL ensure that text labels on portable device charts (including Main Score, CPU Max Freq, and contributor names) are fully readable. If the CPU Max Freq label overlaps with the Main Score label inside the bar, it MUST be drawn outside the bar dynamically.

#### Scenario: Rendering labels on a narrow portable device bar
- **WHEN** the portable horizontal bar chart is rendered and the CPU frequency label would overlap the score
- **THEN** the CPU frequency label is rendered outside to the right of the bar dynamically
