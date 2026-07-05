## MODIFIED Requirements

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
