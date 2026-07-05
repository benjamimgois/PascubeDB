## ADDED Requirements

### Requirement: Delta Diverging Bars Visual Indicator
For delta charts rendered using diverging bars, the system SHALL ensure that any non-baseline dataset has a visible bar (minimum length of 3 pixels) even when its percentage delta from the baseline is 0% (or very close to it). The baseline dataset itself SHALL NOT have a minimum bar length.

#### Scenario: Rendering non-baseline 0% delta bar
- **WHEN** a delta chart is rendered in Delta % mode
- **THEN** non-baseline datasets with 0% delta are rendered with a 3px bar, while the baseline dataset has no bar
