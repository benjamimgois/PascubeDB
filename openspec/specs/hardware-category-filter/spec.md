# hardware-category-filter Specification

## Purpose

Provides a unified Device Category filter (`All`, `Desktop`, `Mobile / SBC`, `Handheld`) on the Hardware Benchmark tab so users can scope performance, clock efficiency, bottleneck, and thermal charts to a specific form factor without duplicating chart cards.

## Requirements

### Requirement: Hardware Device Category Filter Control
The Hardware Benchmark tab SHALL provide a segmented Device Category filter with options `All`, `Desktop`, `Mobile / SBC`, and `Handheld`, defaulting to `All`.

#### Scenario: Switching the active device category
- **WHEN** the user selects `Handheld` in the Device Category filter
- **THEN** the `Handheld` option becomes active and all Performance and Efficiency charts in the Hardware Benchmark tab re-render using only runs classified as `Handheld`

#### Scenario: Filtering by Desktop form factor
- **WHEN** the user selects `Desktop` in the Device Category filter
- **THEN** all Performance and Efficiency charts in the Hardware Benchmark tab re-render using only runs not classified as `Notebook`, `SBC`, or `Handheld`

### Requirement: Unified Hardware Chart Cards
The Hardware Benchmark tab SHALL render a single set of Performance and Efficiency chart cards (Main Score, CPU Single, CPU Multi, GPU Raster, GPU RT, CPU Efficiency by MHz, GPU Efficiency by MHz, Bottleneck Ratio, and Thermal Efficiency) that adapt to the selected Device Category rather than rendering separate Mobile and Handheld chart grids.

#### Scenario: Viewing Performance charts across categories
- **WHEN** the user views the Performance pill under any Device Category
- **THEN** only one set of Top 10 performance charts is displayed, scoped to the active category

#### Scenario: Viewing Efficiency charts across categories
- **WHEN** the user switches to the Efficiency pill under any Device Category
- **THEN** only one set of Clock Efficiency, Bottleneck Ratio, and Thermal Efficiency charts is displayed, scoped to the active category

### Requirement: Mobile GPU Desktop Exclusion When Scoped to Mobile
When the Device Category filter is set to `Mobile / SBC`, GPU performance charts SHALL continue to exclude known desktop-class discrete GPUs (unless explicitly labeled Laptop/Mobile) so laptop/SBC rankings are not skewed by eGPUs.

#### Scenario: Filtering GPU rankings in Mobile / SBC view
- **WHEN** the user selects `Mobile / SBC` in the Device Category filter
- **THEN** desktop discrete GPUs without a Laptop or Mobile suffix are excluded from the GPU Performance and Efficiency charts
