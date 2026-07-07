## MODIFIED Requirements

### Requirement: Tab Navigation Toggle

The system SHALL render three tab buttons at the top of the dashboard: "Hardware benchmark", "Software benchmark", and "Community Insights". Clicking a tab SHALL show the sections belonging to that category and hide the others.

→ MODIFIED TO:

The system SHALL render **four** tab buttons at the top of the dashboard: "Hardware benchmark", "Software benchmark", **"System"**, and "Community Insights". Clicking a tab SHALL show the sections belonging to that category and hide the others.

#### Scenario: Switching to Hardware tab
- **WHEN** user clicks "Hardware benchmark" tab
- **THEN** all hardware sections are visible and other sections are hidden

#### Scenario: Switching to Software tab
- **WHEN** user clicks "Software benchmark" tab
- **THEN** software sections are visible and other sections are hidden

#### Scenario: Switching to System tab
- **WHEN** user clicks "System" tab
- **THEN** system sections (System Environment, Thermal Performance) are visible and other sections are hidden

#### Scenario: Switching to Community tab
- **WHEN** user clicks "Community Insights" tab
- **THEN** community sections (daily activity, top contributors, package distribution) are visible and other sections are hidden

### Requirement: Default Tab

The system SHALL activate the "Hardware benchmark" tab by default when the page loads.

→ MODIFIED: No change — Hardware remains the default tab.

#### Scenario: Page load
- **WHEN** the dashboard page loads
- **THEN** the "Hardware benchmark" tab is active and hardware sections are displayed
