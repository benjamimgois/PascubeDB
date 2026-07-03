## ADDED Requirements

### Requirement: Delta mode for driver/kernel scatter charts
The system SHALL transform driver/kernel scatter charts into diverging bar charts showing percentage change from a baseline when Delta mode is active.

#### Scenario: Oldest version becomes baseline
- **WHEN** Delta mode is active for a driver/kernel chart
- **THEN** the oldest driver/kernel version in the dataset SHALL be set as the baseline (0%), shown as a transparent or subtle reference line

#### Scenario: Bars diverge from 0% center
- **WHEN** rendering Delta mode
- **THEN** for each hardware group, newer versions SHALL show a green bar extending right (gain %) and regressions SHALL show a red bar extending left (regression %)

#### Scenario: Labels on extreme bars
- **WHEN** a bar represents a gain or regression larger than 5%
- **THEN** a text label SHALL appear at the bar end showing the exact percentage (e.g., "+12.1%" or "-5.1%")

#### Scenario: Chart title updates to reflect mode
- **WHEN** Delta mode is active
- **THEN** the chart title SHALL update to include "DELTA ANALYSIS" and the baseline version name
