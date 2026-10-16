# Spec Delta

## MODIFIED Requirements

### Requirement: Curiosity stat cards

The system SHALL render four Curiosity stat cards, in order, when the Curiosity pill is active: Rarest CPU (highest-ranked rare CPU present), Rarest GPU (highest-ranked rare GPU present), Oldest CPU (lowest curated CPU year), and Oldest GPU (lowest curated GPU year). Each card SHALL deduplicate its podium listings so the same hardware model is not shown more than once within the card. The Oldest CPU and Oldest GPU cards SHALL rank by curated release year ascending and SHALL break year ties deterministically by a stable hardware-specific key rather than by plain alphabetical model name. Switching to the Curiosity pill SHALL cancel any in-flight Performance counter animation so it cannot overwrite the Curiosity values.

#### Scenario: Curiosity stats render

- **WHEN** the Curiosity pill is activated
- **THEN** the four cards appear in the order Rarest CPU, Rarest GPU, Oldest CPU, and Oldest GPU

#### Scenario: Pending counter animation is cancelled

- **WHEN** the Performance stat-grid counter animation is still running and the user switches to the Curiosity pill
- **THEN** the animation is cancelled and the Curiosity values are not overwritten by it

#### Scenario: No repeated hardware in a podium

- **WHEN** multiple qualifying runs share the same normalized CPU model
- **THEN** the Rarest CPU card lists that model only once across its first, second, and third positions

#### Scenario: No specimens present

- **WHEN** the dataset contains no qualifying specimens
- **THEN** the Curiosity cards display placeholders instead of values

#### Scenario: Oldest GPU reflects legacy hardware

- **WHEN** the dataset contains GPUs with curated years lower than the model currently shown as oldest
- **THEN** the Oldest GPU card shows the model with the lowest curated year, not a model floored by missing table coverage

#### Scenario: Oldest ranking ties are deterministic

- **WHEN** two models share the same curated release year
- **THEN** the oldest podium orders them by a stable hardware-specific key, so the displayed order does not change with alphabetical coincidence

## ADDED Requirements

### Requirement: Curated rare-hardware lists

The system SHALL maintain ordered `RARE_CPUS` and `RARE_GPUS` lists of model signatures, each entry carrying a short reason. Signatures SHALL match hardware by family so newly submitted exotic hardware is caught without editing the list. Entries SHALL be ordered by editorial rarity and interest, highest first, not by sample count.

#### Scenario: Curated lists are ranked

- **WHEN** the rare-hardware lists are defined
- **THEN** each list is ordered by editorial rank with the most notable entry first

#### Scenario: Family signature catches new hardware

- **WHEN** a new model belonging to an existing curated family is submitted
- **THEN** the matching entry resolves to it without editing the list

### Requirement: Rarest CPU and GPU card resolution

The Rarest CPU and Rarest GPU cards SHALL walk their curated list in order and surface the first entry whose hardware is present in the dataset, showing that hardware as the card value and the entry reason as the sub-label. Within an entry matching several present models the rarest model (fewest submissions) SHALL be chosen, then a stable normalized key. Hardware absent from the dataset SHALL NOT be shown, and the podium SHALL list at most three distinct models.

#### Scenario: Rarest CPU shows curated hardware

- **WHEN** the Curiosity pill is activated and a curated rare CPU entry has matching hardware in the dataset
- **THEN** the Rarest CPU card shows that hardware model as its value and the entry reason as its sub-label

#### Scenario: Absent curated entry is skipped

- **WHEN** the highest-ranked rare CPU entry has no matching hardware in the dataset but a lower-ranked entry does
- **THEN** the card shows the lower-ranked entry's hardware rather than a placeholder

#### Scenario: Rarest model chosen within an entry

- **WHEN** a single curated entry matches several models present in the dataset
- **THEN** the card shows the model with the fewest submissions

#### Scenario: Curated podium is deduplicated

- **WHEN** a curated entry resolves to a model already shown earlier in the same card
- **THEN** that model is not repeated in the second or third position
