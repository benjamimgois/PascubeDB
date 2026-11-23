# Spec Delta

## ADDED Requirements

### Requirement: Unified Software Comparison Mode Selector
Each software comparison chart card (`OS vs. Hardware`, `Mesa Driver vs. GPU`, `NVIDIA Driver vs. GPU`, `Kernel vs. CPU Score`) SHALL replace separate `Normalize` and `Absolute | Delta %` controls with a single 3-mode selector offering `Absolute`, `Normalized %`, and `Delta %`.

#### Scenario: Switching visualization mode to Normalized %
- **WHEN** the user selects `Normalized %` on a software comparison card
- **THEN** the card renders scores scaled 0–100% per hardware group without displaying a separate `Normalize` toggle

#### Scenario: Syncing with global Normalize all toggle
- **WHEN** the user toggles the global `Normalize all` control in the dashboard header
- **THEN** software comparison cards switch between `Absolute` and `Normalized %` accordingly

### Requirement: Conditional Baseline Selector Visibility
The `Baseline` selector row on each software comparison card SHALL be visible only when the card is in `Delta %` mode, and hidden in `Absolute` and `Normalized %` modes.

#### Scenario: Hiding Baseline in Absolute or Normalized % mode
- **WHEN** a software comparison card is in `Absolute` or `Normalized %` mode
- **THEN** its `Baseline` dropdown control is hidden from the card header

#### Scenario: Showing Baseline in Delta % mode
- **WHEN** the user switches a software comparison card to `Delta %` mode
- **THEN** its `Baseline` dropdown control becomes visible in the card header
