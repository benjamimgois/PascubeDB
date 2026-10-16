# Spec Delta

## Purpose

Keeps the leaderboard table's pinned columns aligned with their cells regardless of how wide the first column renders.

## ADDED Requirements

### Requirement: Stable Pinned Column Alignment
Pinned table columns SHALL remain horizontally aligned with their cells regardless of the rendered width of the pinned columns.

#### Scenario: First column width varies
- **WHEN** the leaderboard table renders with rank content of a different width
- **THEN** the second pinned column stays flush against the first with no gap or overlap

#### Scenario: Horizontal scroll
- **WHEN** the user scrolls the table horizontally
- **THEN** the pinned columns keep their alignment and remain pinned
