## ADDED Requirements

### Requirement: Normalized scale for driver/kernel charts
The system SHALL normalize scores per hardware group to a 0%-100% scale when Normalize Scale is ON.

#### Scenario: Best score per hardware set to 100%
- **WHEN** Normalize Scale is active
- **THEN** for each hardware group, the best driver/kernel version score SHALL be set to 100%, and all others SHALL be displayed as a relative percentage

#### Scenario: Y-axis shows percentage
- **WHEN** Normalize Scale is active
- **THEN** the Y-axis SHALL display "0%" to "100%" scale instead of absolute scores

#### Scenario: Tooltip shows both percentage and absolute
- **WHEN** user hovers over a normalized bar
- **THEN** the tooltip SHALL display both the relative percentage and the absolute original score

### Requirement: Combined Delta + Normalized mode
The system SHALL support both Delta mode and Normalize Scale active simultaneously.

#### Scenario: Combined mode
- **WHEN** both Delta mode and Normalize Scale are active
- **THEN** the chart SHALL show normalized delta percentages, with each hardware group's relative improvement/regression compared to its own baseline
