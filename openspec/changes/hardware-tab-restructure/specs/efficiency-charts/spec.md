# efficiency-charts

## Purpose
Defines the efficiency-focused charts shown under the Efficiency pill: score per MHz, bottleneck ratio, and score scatter plots.

## ADDED Requirements

### Requirement: CPU efficiency by MHz — score per MHz
The system SHALL compute `cpuSingle / cpuMaxFreq` for each benchmark row where both values are present and greater than zero. It SHALL render a horizontal bar chart of the top 10 CPU models by highest efficiency score. Label SHALL show the CPU model name. Tooltip SHALL show the CPU model, CPU Max Freq (MHz), CPU Single score, and efficiency ratio.

#### Scenario: Rendering CPU efficiency chart
- **WHEN** the Efficiency pill is activated
- **THEN** a bar chart of the top 10 CPU models by cpuSingle/MHz is rendered

#### Scenario: Zero-freq rows excluded
- **WHEN** a row has cpuMaxFreq = 0 or "N/D"
- **THEN** that row is excluded from CPU efficiency calculations

### Requirement: GPU efficiency by MHz — score per MHz
The system SHALL compute `gpuScore / gpuMaxFreq` for each benchmark row where both values are present and greater than zero. It SHALL render a horizontal bar chart of the top 10 GPU models by highest efficiency score. Tooltip SHALL show GPU model, GPU Max Freq (MHz), GPU score, and efficiency ratio.

#### Scenario: Rendering GPU efficiency chart
- **WHEN** the Efficiency pill is activated
- **THEN** a bar chart of the top 10 GPU models by gpuScore/MHz is rendered

### Requirement: Bottleneck ratio scatter
The system SHALL compute `cpuMulti / gpuScore` for each benchmark row where both values are present. It SHALL render a scatter chart with x = CPU Multi score, y = GPU score, each point colored by device type (Handheld/Notebook/Desktop/SBC). A legend SHALL show which device types are present. Clicking a point SHALL show the client ID and device type in the tooltip.

#### Scenario: Rendering bottleneck scatter
- **WHEN** the Efficiency pill is activated
- **THEN** a scatter chart of CPU Multi vs GPU Score, colored by device class, is rendered

### Requirement: CPU Single × GPU Score scatter
The system SHALL render a scatter chart with x = CPU Single score, y = GPU score, each point colored by GPU brand (NVIDIA, AMD, Intel, ARM). Tooltip SHALL show CPU model, GPU model, both scores, and client ID.

#### Scenario: Rendering CPU×GPU scatter
- **WHEN** the Efficiency pill is activated
- **THEN** a scatter chart of CPU Single vs GPU Score, colored by GPU brand, is rendered

### Requirement: VRAM × GPU Score scatter
The system SHALL render a scatter chart with x = VRAM (in GB), y = GPU score, each point colored by GPU brand. Tooltip SHALL show GPU model, VRAM amount, GPU score, and client ID.

#### Scenario: Rendering VRAM×GPU scatter
- **WHEN** the Efficiency pill is activated
- **THEN** a scatter chart of VRAM vs GPU Score, colored by GPU brand, is rendered
