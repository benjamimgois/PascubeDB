# Spec Delta

## MODIFIED Requirements

### Requirement: Goverlay Color Palette & Tokens
The system SHALL adopt a dark-slate color scheme matching Goverlay 1.9.3.
- The background color SHALL be deep navy slate (`#111622`).
- Card and surface containers SHALL use `#161d2b` with a 1px subtle border in `#232d3f`.
- The primary accent color SHALL be electric cyan (`#0ea5e9` / `#00a8e8`).
- The active/success color SHALL be vibrant lime green (`#22c55e`).
- The metric/version accent color SHALL be soft magenta/lavender (`#e879f9`).
- Primary text SHALL be crisp white (`#f8fafc`) and secondary text SHALL be slate gray (`#94a3b8`).
- Muted text SHALL use a token whose contrast against card surfaces is at least 4.5:1 (replacing `#64748b`, which measures ~3.55:1).
- The palette SHALL define an on-accent foreground token for text placed on accent/colored surfaces.

#### Scenario: Background and surface colors applied
- **WHEN** the dashboard is loaded
- **THEN** the main viewport renders with the `#111622` background and cards render with `#161d2b` and border `#232d3f`

#### Scenario: Muted text token contrast
- **WHEN** a muted label is rendered on a card surface
- **THEN** the muted text token yields a contrast ratio of at least 4.5:1

### Requirement: Technical Button Hierarchy
The system SHALL style action buttons according to Goverlay's desktop controls.
- The primary action button (Leaderboard) SHALL use a solid cyan background (`#0ea5e9`) with clean rounded corners.
- The primary action button label SHALL use the on-accent foreground token so the label meets at least 4.5:1 contrast against the cyan background.
- Secondary utility buttons (Blog, Refresh) SHALL use a dark slate background with a 1px border (`#253046`).

#### Scenario: Clicking primary button
- **WHEN** user hovers over the primary button
- **THEN** the button exhibits a clean brightness elevation without heavy glowing purple shadows

#### Scenario: Primary button label contrast
- **WHEN** the primary action button is rendered
- **THEN** its label has a contrast ratio of at least 4.5:1 against the cyan background
