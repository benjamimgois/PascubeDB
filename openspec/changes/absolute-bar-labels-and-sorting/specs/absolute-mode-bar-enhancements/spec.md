## ADDED Requirements

### Requirement: Hardware sorted by average score descending

In Absolute mode, software comparison charts (Mesa Driver vs GPU, NVIDIA Driver vs GPU, OS vs Hardware, Kernel vs CPU Score) SHALL sort hardware models on the Y-axis by their average score across all driver/OS/kernel versions, with the highest-scoring hardware at the top.

#### Scenario: Mesa chart sorted by GPU score
- **WHEN** the Mesa Driver vs GPU chart renders in Absolute mode
- **THEN** GPU models are ordered by descending average GPU Score across all Mesa versions

#### Scenario: NVIDIA chart sorted by GPU score
- **WHEN** the NVIDIA Driver vs GPU chart renders in Absolute mode
- **THEN** GPU models are ordered by descending average GPU Score across all NVIDIA driver versions

#### Scenario: Kernel chart sorted by CPU score
- **WHEN** the Kernel vs CPU Score chart renders in Absolute mode
- **THEN** CPU models are ordered by descending average CPU Single score across all kernel versions

#### Scenario: OS chart sorted by main score
- **WHEN** the OS vs Hardware chart renders in Absolute mode
- **THEN** hardware combos are ordered by descending average Main Score across all operating systems

### Requirement: Bar labels with version, sample count, and confidence indicator

Each bar segment in Absolute mode SHALL display a label showing the driver/OS/kernel version, sample count, and a confidence arrow. The label SHALL be drawn inside the bar if the bar width is at least 70px, otherwise at the end of the bar.

#### Scenario: Label inside bar when wide enough
- **WHEN** a bar segment is at least 70px wide
- **THEN** the label is drawn centered inside the bar showing `{version} n={count} {arrow}`

#### Scenario: Label outside bar when too narrow
- **WHEN** a bar segment is less than 70px wide
- **THEN** the label is drawn at the right edge of the bar (outside)

#### Scenario: Confidence arrow thresholds
- **WHEN** a bar segment has 10 or more samples
- **THEN** the arrow SHALL be `↑` (green)
- **WHEN** a bar segment has fewer than 10 samples
- **THEN** the arrow SHALL be `↓` (red)

### Requirement: Legend removed

The color legend at the bottom of Absolute mode charts SHALL be removed, as version information is displayed inline on each bar.

#### Scenario: No legend in Absolute mode
- **WHEN** any software comparison chart renders in Absolute mode
- **THEN** no legend is displayed
