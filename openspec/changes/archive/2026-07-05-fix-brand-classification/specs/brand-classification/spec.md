## ADDED Requirements

### Requirement: CPU brands SHALL classify all known CPU vendors
The system SHALL classify CPUs into AMD, Intel, or ARM brands. Any CPU matching known AMD product lines (including Athlon) SHALL be classified as AMD, not "Other".

#### Scenario: Athlon CPU classified as AMD
- **WHEN** a benchmark has CPU "Athlon Gold 3150U"
- **THEN** it SHALL be counted under AMD brand, not "Other"

#### Scenario: Cortex-A CPU classified as ARM
- **WHEN** a benchmark has CPU "Cortex-A53" with architecture "aarch64"
- **THEN** it SHALL be counted under ARM brand

### Requirement: GPU brands SHALL classify all known GPU vendors
The system SHALL classify GPUs into NVIDIA, AMD, Intel, ARM, Broadcom brands. AMD Radeon Pro workstation GPUs SHALL be classified as AMD, not "Other".

#### Scenario: Radeon Pro GPU classified as AMD
- **WHEN** a benchmark has GPU "Pro V620" or "Pro VII"
- **THEN** it SHALL be counted under AMD brand, not "Other"
