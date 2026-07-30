## MODIFIED Requirements

### Requirement: Software Winner Comparison Computation
The system SHALL group benchmark runs by hardware family (GPU family for driver comparisons, CPU model for kernel/OS comparisons) and software version, compute the average score per version per hardware family using mean-of-means aggregation, and count wins: for each hardware family with 2+ software versions, the version with the highest average score gets a win. The winner is the version with the most wins across all compared hardware families. Driver categorization for Mesa and NVIDIA versions SHALL be based on the driver string content ("Mesa" or "NVRM"/"NVIDIA") instead of GPU model names, ensuring GTX and MX GPUs are correctly grouped under the NVIDIA comparison. GPUs that do not belong to any classified family SHALL be excluded from the winner computation. Normalized GPU model names that resolve to empty strings SHALL be excluded.

#### Scenario: Computing the OS winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by CPU+GPU hardware, computes the OS with the most per-hardware wins, and displays it as the winner

#### Scenario: Computing the Mesa driver winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by GPU family, computes average GPU Score per Mesa version using mean-of-means per family, counts wins, and elects the version with the most wins

#### Scenario: Computing the NVIDIA driver winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by GPU family, computes average GPU Score per NVIDIA driver version using mean-of-means per family, counts wins, and elects the version with the most wins

#### Scenario: Computing the Kernel winner
- **WHEN** the dashboard page finishes loading the benchmark data
- **THEN** the system groups runs by CPU model, computes average CPU Single score per kernel version, counts wins, and elects the version with the most wins

### Requirement: GPU Driver Comparison Bars — Family Level
The system SHALL render the Mesa and NVIDIA driver comparison charts (`renderHardwareComparisonBars`) using GPU families as Y-axis labels instead of individual GPU models. Each bar SHALL represent the aggregated family score for a specific driver version. GPUs that cannot be classified into a family SHALL be excluded from the dataset. The tooltip SHALL display the contributing GPU models and their sample counts.

#### Scenario: Rendering Mesa driver chart by family
- **WHEN** the dashboard page finishes loading benchmark data
- **THEN** the Mesa Driver vs. GPU chart displays GPU families (RX 6000, RX 7000, RX 9000, etc.) on the Y-axis with grouped bars per Mesa version

#### Scenario: Rendering NVIDIA driver chart by family
- **WHEN** the dashboard page finishes loading benchmark data
- **THEN** the NVIDIA Driver vs. GPU chart displays GPU families (RTX 30, RTX 40, RTX 50, etc.) on the Y-axis with grouped bars per NVIDIA driver version

#### Scenario: Excluding unclassified GPUs
- **WHEN** the benchmark data contains GPUs like "Steam Deck", "Mali G610", or "VideoCore VII"
- **THEN** these GPUs are excluded from both the Mesa and NVIDIA driver comparison charts

#### Scenario: Tooltip shows model composition
- **WHEN** the user hovers over a family bar
- **THEN** the tooltip displays the family name, driver version, score, and a list of contributing GPU models with sample counts
