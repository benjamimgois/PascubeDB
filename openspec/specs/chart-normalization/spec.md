# chart-normalization Specification

## Purpose
Lets users normalize every chart's scale to a common 0-100% basis with one action, while keeping the ability to o

## Requirements

### Requirement: Global Normalize Control
The dashboard SHALL provide a single control that toggles normalization for all charts at once.

#### Scenario: Enabling global normalize
- **WHEN** the user activates the global normalize control
- **THEN** every chart renders on its normalized scale

#### Scenario: Disabling global normalize
- **WHEN** the user deactivates the global normalize control
- **THEN** every chart renders on its absolute scale

### Requirement: Per-Chart Normalize Override
Toggling an individual chart's normalize control SHALL affect only that chart.

#### Scenario: Overriding one chart after global normalize
- **WHEN** global normalize is active and the user turns off one chart's own toggle
- **THEN** only that chart reverts to absolute while the others stay normalized
