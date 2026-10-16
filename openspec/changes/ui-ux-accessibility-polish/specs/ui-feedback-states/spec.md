# Spec Delta

## Purpose

Defines how the dashboard communicates data-source health, asynchronous action results, and empty/loading states so users always know whether data is live, stale, or unavailable and whether their actions succeeded.

## ADDED Requirements

### Requirement: Data Source Fallback Notice
When live data cannot be retrieved and the static fallback dataset is used instead, the system SHALL display a non-blocking notice informing the user that live data is unavailable.

#### Scenario: Live fetch fails
- **WHEN** the live data request fails and the fallback dataset is loaded
- **THEN** a visible status notice indicates that cached/fallback data is being shown

#### Scenario: Live fetch succeeds
- **WHEN** live data loads successfully
- **THEN** no fallback notice is displayed

### Requirement: Action Result Feedback
Asynchronous user actions (for example copying a client ID, syncing, or submitting a comment) SHALL provide a visible confirmation on success and a visible error indication on failure.

#### Scenario: Copy action succeeds
- **WHEN** the user copies a client ID
- **THEN** a visible confirmation is shown and announced to assistive technology

#### Scenario: Action fails
- **WHEN** an asynchronous action fails
- **THEN** a visible error indication is shown and announced to assistive technology

### Requirement: Result Count Feedback
Filterable collections (leaderboard table, submissions table) SHALL display the number of matching results and update it as filters change.

#### Scenario: Filter changes result set
- **WHEN** the user changes a filter or search query
- **THEN** the displayed result count updates to reflect the current number of matches

#### Scenario: No matches
- **WHEN** the active filters produce no matches
- **THEN** an empty state message is displayed instead of a blank table

### Requirement: Per-Chart Empty State
A chart with no data for the current selection SHALL display an empty state message rather than an unlabeled blank canvas.

#### Scenario: Chart has no data
- **WHEN** a chart has no data points for the current filters
- **THEN** an empty state message is shown in place of the chart
