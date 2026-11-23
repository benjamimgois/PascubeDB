# Spec Delta

## Purpose

Lets users select their CPU and/or GPU at the top of the primary Leaderboard tab to see their standing (`Top X%`) against the community across Main, CPU 1T, CPU MT, and GPU scores, and optionally filter the table to matching hardware.

## ADDED Requirements

### Requirement: Compare Your Hardware Selector Card
The primary Leaderboard tab SHALL display a "Compare Your Hardware" card with searchable/selectable CPU and GPU dropdowns populated from normalized hardware models in the dataset.

#### Scenario: Selecting CPU and GPU models
- **WHEN** the user selects a CPU and/or GPU in the "Compare Your Hardware" card
- **THEN** the card displays the community percentile standing (`Top X%`) and best recorded score vs. community median for `Main Score`, `CPU 1T`, `CPU MT`, and `GPU Score`

### Requirement: One-Click Hardware Table Filter
The "Compare Your Hardware" card SHALL provide an action to filter the Leaderboard table to the selected CPU and/or GPU so users can compare OS, kernel, and driver variations on that hardware.

#### Scenario: Filtering table from hardware summary
- **WHEN** the user clicks "Filter table to my hardware" with a CPU or GPU selected
- **THEN** the Leaderboard table filters to matching runs and updates the result count
