## ADDED Requirements

### Requirement: Filter outlier ratios from bottleneck charts
The system SHALL exclude benchmark entries with extreme bottleneck ratios from the three bottleneck visualization charts.

#### Scenario: Entries with ratio < 0.1 are excluded
- **WHEN** computing bottleneck data for any bottleneck chart
- **AND** an entry has `cpuMulti / gpuScore < 0.1`
- **THEN** that entry SHALL NOT appear in the chart data

#### Scenario: Entries with ratio > 10 are excluded
- **WHEN** computing bottleneck data for any bottleneck chart
- **AND** an entry has `cpuMulti / gpuScore > 10`
- **THEN** that entry SHALL NOT appear in the chart data

#### Scenario: Entries with ratio within [0.1, 10] are kept
- **WHEN** computing bottleneck data for any bottleneck chart
- **AND** an entry has `0.1 <= cpuMulti / gpuScore <= 10`
- **THEN** that entry SHALL appear in the chart data

### Requirement: Apply filter consistently across all bottleneck charts
The outlier filter SHALL be applied in all three render functions that compute bottleneck ratios.

#### Scenario: Main bottleneck chart uses filter
- **WHEN** `renderBottleneckChart()` processes data
- **THEN** entries outside [0.1, 10] are excluded before grouping by GPU

#### Scenario: Top CPU bottlenecks chart uses filter
- **WHEN** `renderTopCpuBottlenecks()` processes data
- **THEN** entries outside [0.1, 10] are excluded before sorting

#### Scenario: Top GPU bottlenecks chart uses filter
- **WHEN** `renderTopGpuBottlenecks()` processes data
- **THEN** entries outside [0.1, 10] are excluded before sorting

### Requirement: Raw data is preserved
The system SHALL NOT modify the original `benchmarkData` array. Outlier filtering SHALL only affect chart rendering.

#### Scenario: Original data unchanged after filter
- **WHEN** filter is applied to any chart
- **THEN** the `benchmarkData` and `filteredData` arrays SHALL contain all entries including those filtered out
- **AND** only the chart's internal data pipeline filters the entries
