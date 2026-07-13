## ADDED Requirements

### Requirement: Parse cpuMaxPower and gpuMaxPower from spreadsheet

The system SHALL parse `cpuMaxPower` from column AD (index 29) and `gpuMaxPower` from column AE (index 30) in both JSONP (Google Sheets) and CSV fallback data sources.

#### Scenario: JSONP parsing includes power fields
- **WHEN** `fetchGoogleSheetDataJSONP()` processes a row containing column AD and AE values
- **THEN** the resulting object SHALL include `cpuMaxPower` and `gpuMaxPower` as cleaned numbers

#### Scenario: CSV parsing includes power fields
- **WHEN** `processCSVData()` processes a CSV row with 31+ columns
- **THEN** the resulting object SHALL include `cpuMaxPower` from column 29 and `gpuMaxPower` from column 30

#### Scenario: Missing power values
- **WHEN** column AD or AE is empty/null in a row
- **THEN** the corresponding field SHALL be `null` (not `N/D` or `0`)

### Requirement: Display power alongside frequency in bar center

The system SHALL render `freq MHz / power W` in the center of horizontal bar chart bars for charts that display CPU or GPU frequency, when power data is available.

#### Scenario: CPU chart with power data
- **WHEN** a CPU chart (e.g., cpuSingleChart) has both `cpuMaxFreq` and `cpuMaxPower` for a data point
- **THEN** the bar center SHALL display `<freq> MHz / <power> W`

#### Scenario: GPU chart with power data
- **WHEN** a GPU chart (e.g., gpuChart) has both `gpuMaxFreq` and `gpuMaxPower` for a data point
- **THEN** the bar center SHALL display `<freq> MHz / <power> W`

#### Scenario: Missing power falls back to freq only
- **WHEN** `cpuMaxPower` or `gpuMaxPower` is null for a given data point
- **THEN** the bar center SHALL display only `<freq> MHz` (current behavior)

### Requirement: Power data in all frequency-displaying charts

The system SHALL pass power data to all horizontal bar charts that currently display frequency information, covering CPU single/multi, GPU, Main Score, and all category charts (Notebook, Handheld, SBC).

#### Scenario: All charts receive power
- **WHEN** any chart displaying `cpuMaxFreq` or `gpuMaxFreq` is rendered
- **THEN** the corresponding `cpuMaxPower` or `gpuMaxPower` SHALL be passed to the render function

#### Scenario: Tooltip includes power
- **WHEN** user hovers over a bar in any affected chart and power data is available
- **THEN** the tooltip SHALL display `CPU/GPU Max Power: <value> W`
