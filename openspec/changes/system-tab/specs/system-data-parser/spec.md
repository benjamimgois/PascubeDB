## ADDED Requirements

### Requirement: Parse Display Server field

The system SHALL parse the Display Server column from Google Sheets and CSV at index 29. The value SHALL be stored in `benchmarkData[].displayServer`. Missing values SHALL default to `'N/D'`.

#### Scenario: Display Server parsed from Gviz

- **WHEN** data is loaded from Google Sheets via JSONP
- **THEN** the displayServer field SHALL be populated from column index 29

#### Scenario: Display Server parsed from CSV

- **WHEN** data is loaded via CSV fallback
- **THEN** the displayServer field SHALL be populated from column index 29

### Requirement: Parse Desktop field

The system SHALL parse the Desktop column at index 30. Stored as `benchmarkData[].desktop`. Missing → `'N/D'`.

#### Scenario: Desktop parsed

- **WHEN** data is loaded from any source
- **THEN** the desktop field SHALL be populated from column index 30

### Requirement: Parse Storage Type field

The system SHALL parse the Storage Type column at index 31. Stored as `benchmarkData[].storageType`. Missing → `'N/D'`.

#### Scenario: Storage type parsed

- **WHEN** data is loaded from any source
- **THEN** the storageType field SHALL be populated from column index 31

### Requirement: Parse GPU Max Temp field

The system SHALL parse the GPU Max Temp column at index 32. The value SHALL be cleaned with `cleanNumber()`. Stored as `benchmarkData[].gpuMaxTemp`. Missing → `null`.

#### Scenario: GPU Max Temp parsed

- **WHEN** data is loaded from any source
- **THEN** the gpuMaxTemp field SHALL be populated with a numeric value from column index 32

### Requirement: Parse GPU Temp Delta field

The system SHALL parse the GPU Temp Delta column at index 33. The value SHALL be cleaned with `cleanNumber()`. Stored as `benchmarkData[].gpuTempDelta`. Missing → `null`.

#### Scenario: GPU Temp Delta parsed

- **WHEN** data is loaded from any source
- **THEN** the gpuTempDelta field SHALL be populated with a numeric value from column index 33
