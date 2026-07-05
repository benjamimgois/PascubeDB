# os-delta-chart Specification

## Purpose
TBD - created by archiving change redesign-os-delta-chart. Update Purpose after archive.
## Requirements
### Requirement: Hardware combobox in Delta % mode

In Delta % mode, a combobox labeled "Hardware" SHALL be visible in the OS chart header. It SHALL list all hardware labels from the dataset. Selecting a hardware SHALL update the chart to show only that hardware's OS scores as diverging bars.

#### Scenario: Hardware combobox populated on Delta % activation

- **WHEN** user selects Delta % mode on the OS chart
- **THEN** the Hardware combobox SHALL be visible AND populated with normalized hardware labels from the dataset

#### Scenario: Single hardware selection renders its OS comparison

- **WHEN** user selects "Ryzen 7 7800X3D + Radeon RX 7900 XTX" in the Hardware combobox
- **THEN** the chart SHALL render diverging bars showing each OS score as percentage difference from the baseline OS, for that hardware only

### Requirement: Baseline combobox scoped to selected hardware

When a hardware is selected, the Baseline combobox SHALL show only the OS versions available for that hardware. Changing the hardware SHALL update the Baseline combobox options and auto-select the first OS.

#### Scenario: Baseline updates on hardware change

- **WHEN** user selects a different hardware from the Hardware combobox
- **THEN** the Baseline combobox SHALL repopulate with OS names available on that hardware AND auto-select the first OS

### Requirement: No modal for OS chart

When Delta % is clicked on the OS chart, the model selector modal SHALL NOT open. Instead, the Hardware combobox SHALL appear and await user selection. If no hardware is selected, no delta chart SHALL be rendered (the chart area remains empty or shows placeholder).

#### Scenario: Delta % without hardware selection

- **WHEN** user clicks Delta % on the OS chart
- **THEN** the Hardware combobox SHALL be visible AND focused AND the previous chart SHALL be destroyed (no stale chart left)

