## ADDED Requirements

### Requirement: Display Server donut chart

The system SHALL render a doughnut chart showing the distribution of Display Servers (Wayland, X11, XWayland) across all benchmark submissions. Each slice SHALL show the percentage and count.

#### Scenario: Display Server chart rendered

- **WHEN** the System tab loads and display server data exists
- **THEN** a doughnut chart with display server distribution SHALL be rendered

#### Scenario: No display server data

- **WHEN** no display server data exists
- **THEN** the chart SHALL display "No data" state

### Requirement: Desktop Environment donut chart

The system SHALL render a doughnut chart showing the distribution of Desktop Environments (KDE Plasma, GNOME, Hyprland, etc.) across all submissions.

#### Scenario: Desktop chart rendered

- **WHEN** the System tab loads and desktop data exists
- **THEN** a doughnut chart with desktop environment distribution SHALL be rendered

#### Scenario: Desktop names normalized

- **WHEN** desktop data contains version strings (e.g., "KDE Plasma 6.1")
- **THEN** the system SHALL normalize to base name (e.g., "KDE Plasma") before aggregating

### Requirement: Storage Type donut chart

The system SHALL render a doughnut chart showing the distribution of Storage Types (NVMe, SSD, HDD, eMMC) across all submissions.

#### Scenario: Storage chart rendered

- **WHEN** the System tab loads and storage data exists
- **THEN** a doughnut chart with storage type distribution SHALL be rendered

### Requirement: System Environment stats grid

The System tab SHALL display 3 stat cards in the stats grid showing: most common Display Server with percentage, most common Desktop with percentage, most common Storage Type with percentage.

#### Scenario: Stats cards rendered

- **WHEN** the System tab loads
- **THEN** 3 stat cards SHALL display the top value and percentage for Display Server, Desktop, and Storage Type
