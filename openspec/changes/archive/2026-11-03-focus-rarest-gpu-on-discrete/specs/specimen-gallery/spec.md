# Spec Delta

## MODIFIED Requirements

### Requirement: Curated rare-hardware lists

The system SHALL maintain ordered `RARE_CPUS` and `RARE_GPUS` lists of model signatures, each entry carrying a short reason. Signatures SHALL match hardware by family so newly submitted exotic hardware is caught without editing the list. Entries SHALL be ordered by editorial rarity and interest, highest first, not by sample count. `RARE_CPUS` SHALL be exotica-first: engineering samples, console and custom APUs, exotic architectures, embedded hardware, server/HEDT, then legacy and rare SKUs. `RARE_GPUS` SHALL prioritize discrete and professional graphics, and SHALL NOT include APU, SoC, or console parts already represented in `RARE_CPUS`. Mainstream curiosities such as `BC-250`, `Steam Deck`, and `Steam Deck OLED` SHALL NOT be listed as rare. A family whose members differ materially in rarity SHALL be split into separate entries so ordering is explicit rather than alphabetical.

#### Scenario: Curated lists are ranked

- **WHEN** the rare-hardware lists are defined
- **THEN** each list is ordered by editorial rank with the most notable entry first

#### Scenario: Family signature catches new hardware

- **WHEN** a new model belonging to an existing curated family is submitted
- **THEN** the matching entry resolves to it without editing the list

#### Scenario: Mainstream handhelds are excluded

- **WHEN** the dataset contains `BC-250`, `Steam Deck`, or `Steam Deck OLED`
- **THEN** those models are not selected by the Rarest CPU or Rarest GPU card

#### Scenario: Compound family is split

- **WHEN** one family contains models with materially different rarity, such as multiple Quadro generations or GRE SKUs
- **THEN** the curated list separates them into distinct entries so editorial order, not alphabetical tie-breaking, decides the podium

#### Scenario: Rarest GPU complements Rarest CPU

- **WHEN** an APU, SoC, or console part is present in both the CPU and GPU datasets
- **THEN** `RARE_GPUS` does not select it for the Rarest GPU card, leaving that hardware to the Rarest CPU card

#### Scenario: Discrete graphics precede legacy and rare SKUs

- **WHEN** discrete or professional GPU hardware is present in the dataset
- **THEN** the Rarest GPU card ranks that hardware ahead of legacy flagships and rare-SKU entries
