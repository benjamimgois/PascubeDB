# Spec Delta

## Purpose

Defines the visual design system, color tokens, ON/OFF toggle switches, status panel, and button styling inspired by Goverlay 1.9.3 for the Linux gaming dashboard.

## ADDED Requirements

### Requirement: Goverlay Color Palette & Tokens
The system SHALL adopt a dark-slate color scheme matching Goverlay 1.9.3.
- The background color SHALL be deep navy slate (`#111622`).
- Card and surface containers SHALL use `#161d2b` with a 1px subtle border in `#232d3f`.
- The primary accent color SHALL be electric cyan (`#0ea5e9` / `#00a8e8`).
- The active/success color SHALL be vibrant lime green (`#22c55e`).
- The metric/version accent color SHALL be soft magenta/lavender (`#e879f9`).
- Primary text SHALL be crisp white (`#f8fafc`) and secondary text SHALL be slate gray (`#94a3b8`).

#### Scenario: Background and surface colors applied
- **WHEN** the dashboard is loaded
- **THEN** the main viewport renders with the `#111622` background and cards render with `#161d2b` and border `#232d3f`

### Requirement: Toggle Switch Component (ON/OFF)
The system SHALL support Goverlay-style toggle switches for filters and boolean options.
- An active toggle switch SHALL display a vibrant lime green background (`#22c55e`) with bold "ON" white text or an activated pill.
- An inactive toggle switch SHALL display a dark slate background (`#253046`) with muted text or off state.
- Clicking a toggle switch SHALL toggle its active state smoothly without page reload.

#### Scenario: Activating a toggle
- **WHEN** user clicks on an inactive toggle switch
- **THEN** the toggle transitions to the active state with a green background and displays "ON"

#### Scenario: Deactivating a toggle
- **WHEN** user clicks on an active toggle switch
- **THEN** the toggle transitions to the dark slate inactive state

### Requirement: Database & Software Status Panel
The system SHALL render a telemetry/status panel inspired by Goverlay's "Software Status" card.
- The panel SHALL display status items featuring colored bullet indicators (`●`), muted slate labels, and version or metric values styled in soft magenta (`#e879f9`).
- Active metrics SHALL include validated runs, total hardware configurations, Mesa version, and kernel info.
- The panel SHALL include a channel selector and a refresh/update button with an icon.

#### Scenario: Rendering the status panel
- **WHEN** user views the dashboard
- **THEN** the status panel displays metrics with green status dots and soft magenta values

### Requirement: Technical Button Hierarchy
The system SHALL style action buttons according to Goverlay's desktop controls.
- The primary action button (Leaderboard) SHALL use a solid cyan background (`#0ea5e9`) with white text and clean rounded corners.
- Secondary utility buttons (Blog, Refresh) SHALL use a dark slate background with a 1px border (`#253046`).

#### Scenario: Clicking primary button
- **WHEN** user hovers over the primary button
- **THEN** the button exhibits a clean brightness elevation without heavy glowing purple shadows

### Requirement: Chart.js Palette Alignment
The system SHALL update data visualizations in Chart.js to harmonize with the Goverlay palette.
- CPU charts SHALL use electric cyan (`#0ea5e9` / `rgba(14, 165, 233, 0.85)`).
- GPU charts SHALL use vibrant green (`#22c55e` / `rgba(34, 197, 94, 0.85)`).
- Chart tooltips SHALL use dark slate backgrounds (`#111622`) with cyan borders (`rgba(14, 165, 233, 0.45)`).

#### Scenario: Hovering a chart bar
- **WHEN** user hovers over a chart bar
- **THEN** the tooltip is displayed in a dark slate box with cyan accent border
