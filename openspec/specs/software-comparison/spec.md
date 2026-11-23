# software-comparison

## Purpose
Specifies the capability to compare software versions (OS, Mesa driver, NVIDIA driver, Kernel) by head-to-head wins across hardware groups and display the winner for each category.

## Requirements

### Requirement: Software Winner Comparison Computation
The system SHALL group benchmark runs by hardware (CPU for kernel/OS, GPU for drivers) and software version, compute the average score per version per hardware group, and count wins: for each hardware group with 2+ software versions, the version with the highest average score gets a win. The winner is the version with the most wins across all compared hardware groups. Driver categorization for Mesa and NVIDIA versions SHALL be based on the driver string content ("Mesa" or "NVRM"/"NVIDIA") instead of GPU model names, ensuring GTX and MX GPUs are correctly grouped under the NVIDIA comparison. Normalized GPU model names that resolve to empty strings SHALL be excluded.

#### Scenario: Computing the OS winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by CPU+GPU hardware, computes the OS with the most per-hardware wins, and displays it as the winner

#### Scenario: Computing the Mesa driver winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by GPU model, computes average GPU Score per Mesa version, counts wins, and elects the version with the most wins

#### Scenario: Computing the NVIDIA driver winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by GPU model, computes average GPU Score per NVIDIA driver version, counts wins, and elects the version with the most wins

#### Scenario: Computing the Kernel winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by CPU model, computes average CPU Single score per kernel version, counts wins, and elects the version with the most wins

### Requirement: Software Comparison Display
The system SHALL render a "Software Comparison" section with 4 cards. Each card SHALL display a category icon, label, WINNER badge with version name, and statistics showing wins/compared hardware count and improvement over 2nd/3rd place.

#### Scenario: Displaying the Software Comparison cards
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** four comparison cards are rendered showing the WINNER and improvement for OS, Mesa driver, NVIDIA driver, and Kernel

### Requirement: Delta Diverging Bars Visual Indicator
For delta charts rendered using diverging bars, the system SHALL ensure that any non-baseline dataset has a visible bar (minimum length of 3 pixels) even when its percentage delta from the baseline is 0% (or very close to it). The baseline dataset itself SHALL NOT have a minimum bar length.

#### Scenario: Rendering non-baseline 0% delta bar
- **WHEN** a delta chart is rendered in Delta % mode
- **THEN** non-baseline datasets with 0% delta are rendered with a 3px bar, while the baseline dataset has no bar

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
