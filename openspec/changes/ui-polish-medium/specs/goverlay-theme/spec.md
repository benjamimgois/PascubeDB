# Spec Delta

## MODIFIED Requirements

### Requirement: Chart.js Palette Alignment
The system SHALL update data visualizations in Chart.js to harmonize with the Goverlay palette.
- CPU charts SHALL use electric cyan (`#0ea5e9` / `rgba(14, 165, 233, 0.85)`).
- GPU charts SHALL use vibrant green (`#22c55e` / `rgba(34, 197, 94, 0.85)`).
- Chart tooltips SHALL use dark slate backgrounds (`#111622`) with cyan borders (`rgba(14, 165, 233, 0.45)`).
- All Chart.js tooltips SHALL share one common style definition so their appearance cannot drift between charts.

#### Scenario: Hovering a chart bar
- **WHEN** user hovers over a chart bar
- **THEN** the tooltip is displayed in a dark slate box with cyan accent border

#### Scenario: Tooltip consistency across charts
- **WHEN** the user hovers bars in any two different charts
- **THEN** both tooltips share the same background, border, padding, and typography
