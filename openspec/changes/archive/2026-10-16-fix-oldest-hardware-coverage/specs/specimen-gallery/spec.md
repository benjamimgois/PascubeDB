# Spec Delta

## MODIFIED Requirements

### Requirement: Curated hardware release-year lookup

The system SHALL maintain curated `CPU_YEARS` and `GPU_YEARS` lookup tables mapping known hardware families/models to release years, used to compute the `fossil` and `anachronism` tags and the Oldest CPU / Oldest GPU cards. The tables SHALL cover every hardware generation present in the dataset, including legacy CPUs released before 2011 and legacy GPUs released before 2015, so that no datable model is silently excluded from year-based behavior. When a model is absent from a table, year-based tags SHALL NOT be applied for that model.

#### Scenario: Fossil detected from table

- **WHEN** a CPU model maps to a release year at least 10 years before the current year
- **THEN** the row receives the `fossil` tag

#### Scenario: Unknown model skips year tags

- **WHEN** a CPU model is not present in `CPU_YEARS`
- **THEN** the `fossil` and `anachronism` tags are not applied based on that CPU

#### Scenario: Legacy silicon is covered

- **WHEN** the dataset contains a CPU released before 2011 (for example a Xeon X5450 or Core2 Quad Q9550) or a GPU released before 2015 (for example an `R9 200 / HD 7900 Series` or `GT 730`)
- **THEN** the lookup returns that model's curated release year and the model is eligible for its Oldest CPU / Oldest GPU ranking

### Requirement: Curiosity stat cards

The system SHALL render four Curiosity stat cards, in order, when the Curiosity pill is active: Rarest Specimen (highest-tier specimen present), Oldest CPU (lowest curated CPU year), Oldest GPU (lowest curated GPU year), and Console APU (most-submitted console-derived APU). Each card SHALL deduplicate its podium listings so the same hardware model is not shown more than once within the card. The Oldest CPU and Oldest GPU cards SHALL rank by curated release year ascending and SHALL break year ties deterministically by a stable hardware-specific key rather than by plain alphabetical model name. Switching to the Curiosity pill SHALL cancel any in-flight Performance counter animation so it cannot overwrite the Curiosity values.

#### Scenario: Curiosity stats render

- **WHEN** the Curiosity pill is activated
- **THEN** the four cards show Rarest Specimen, Oldest CPU, Oldest GPU, and Console APU values

#### Scenario: Pending counter animation is cancelled

- **WHEN** the Performance stat-grid counter animation is still running and the user switches to the Curiosity pill
- **THEN** the animation is cancelled and the Curiosity values are not overwritten by it

#### Scenario: No repeated hardware in a podium

- **WHEN** multiple qualifying rows share the same normalized CPU model
- **THEN** the Rarest Specimen card lists that model only once across its first, second, and third positions

#### Scenario: No specimens present

- **WHEN** the dataset contains no qualifying specimens
- **THEN** the Curiosity cards display placeholders instead of values

#### Scenario: Oldest GPU reflects legacy hardware

- **WHEN** the dataset contains GPUs with curated years lower than the model currently shown as oldest
- **THEN** the Oldest GPU card shows the model with the lowest curated year, not a model floored by missing table coverage

#### Scenario: Oldest ranking ties are deterministic

- **WHEN** two models share the same curated release year
- **THEN** the oldest podium orders them by a stable hardware-specific key, so the displayed order does not change with alphabetical coincidence
