# Spec Delta

## ADDED Requirements

### Requirement: Curiosity display canonicalization

Curiosity cards and specimen tags SHALL display canonical hardware names. Engineering samples identified only by an OPN SHALL show a human-readable label with the OPN in parentheses. The PS4 Pro `DG1501` part SHALL be shown as a PS4 Pro APU distinct from the Liverpool/Jaguar PlayStation 4 APU, and repeated whitespace in model names SHALL be collapsed.

#### Scenario: OPN engineering sample is readable
- **WHEN** a rare CPU or GPU is identified only by an AMD OPN such as `100-000000891`
- **THEN** the Curiosity card shows a human-readable engineering-sample label with that OPN in parentheses

#### Scenario: PS4 Pro is distinct from PS4
- **WHEN** the dataset contains both `DG1501SML87LB` and `Liverpool`/`Jaguar` hardware
- **THEN** Curiosity shows the DG1501 hardware as a PS4 Pro APU and does not merge it with the PlayStation 4 APU

#### Scenario: Whitespace is normalized
- **WHEN** a model name contains repeated spaces such as `Xeon           X3440`
- **THEN** Curiosity displays it with single spaces

### Requirement: Workstation hardware tag

The system SHALL classify professional and workstation GPUs into a `workstation` specimen tag. Detection SHALL cover Quadro, TITAN, Radeon Pro, FirePro, Instinct, RTX A, RTX Ada, Arc Pro, Tesla, and T-series professional graphics.

#### Scenario: Workstation GPU is tagged
- **WHEN** a row's GPU is a Quadro, TITAN, Radeon Pro, RTX A/Ada, or Arc Pro model
- **THEN** the row receives the `workstation` tag

### Requirement: Rare-SKU tag

The system SHALL classify curated regional, OEM-only, low-power, and low-volume GPU variants into a `rare-sku` specimen tag.

#### Scenario: Rare SKU is tagged
- **WHEN** a row's GPU is a curated regional, OEM-only, low-power, or low-volume SKU
- **THEN** the row receives the `rare-sku` tag

### Requirement: Custom-APU tag

The system SHALL classify custom APU identifiers that are not recognized console parts into a `custom-apu` specimen tag.

#### Scenario: Custom APU is tagged
- **WHEN** a row's CPU or GPU identifies a custom APU such as `Custom Zen 2`
- **THEN** the row receives the `custom-apu` tag

### Requirement: Embedded hardware tag

The system SHALL classify embedded AMD SoCs and embedded Radeon parts into an `embedded` specimen tag.

#### Scenario: Embedded hardware is tagged
- **WHEN** a row's CPU or GPU is an embedded AMD SoC or embedded Radeon part
- **THEN** the row receives the `embedded` tag

## MODIFIED Requirements

### Requirement: Specimen classification taxonomy

The system SHALL classify each benchmark row into zero or more specimen tags and assign the row the highest (rarest) tier among its tags. Tags and their detection signals SHALL be:

- `es` (Engineering Sample, tier S): CPU or GPU name matches an engineering-sample pattern such as `eng sample`, `genuine intel ... 0000`, a bare `0000` model identifier, or an AMD OPN (`100-0000` followed by digits).
- `console` (tier S): CPU or GPU name identifies a game-console APU. Detection SHALL recognize a `dg` part number (`dg` followed by at least three digits, e.g. `DG1501SML87LB`), the PS5-derived `BC-250`, and the console codenames `liverpool` and `jaguar` (PlayStation 4), `oberon` and `ariel` (PlayStation 5), `durango` and `scarlett` (Xbox), and `grizzly`, in addition to a curated console name list. A `dg` followed by a single digit (e.g. the Intel Arc `(DG2)` codename) SHALL NOT be treated as a console. Console APU models SHALL be canonicalized: `DG1501` to "PS4 Pro APU (AMD)", `BC-250` to "PS5 APU (BC-250)", and `Liverpool`/`Jaguar` to "PlayStation 4 APU (AMD)".
- `exotic-arch` (tier S): the `architecture` field is a non-x86 architecture other than aarch64 (for example `riscv64`, `ppc64le`, `loongarch`).
- `custom-apu` (tier A): the CPU or GPU matches a custom APU identifier that is not a recognized console part, such as `Custom Zen 2`.
- `vm` (tier A): the OS or kernel field indicates virtualization (`vm`, `virtual`, `qemu`, `kvm`).
- `sbc` (tier A): the `architecture` field is `aarch64`, or the CPU/GPU matches an embedded-board signal (Broadcom `VideoCore`, ARM `Mali`, Rockchip) or a curated board list (Raspberry Pi, Orange Pi, Banana Pi, Rock).
- `server` (tier B): the CPU name matches Xeon, EPYC, or Threadripper.
- `embedded` (tier B): the CPU or GPU matches an embedded part such as an AMD GX SoC or embedded Radeon.
- `workstation` (tier B): the CPU matches a workstation HEDT part, or the GPU matches a professional/workstation family such as Quadro, TITAN, Radeon Pro, FirePro, Instinct, RTX A/Ada, Arc Pro, Tesla, or T-series.
- `fossil` (tier B): the CPU model's curated release year is at least 10 years before the current year.
- `anachronism` (tier B): the curated GPU release year minus the curated CPU release year is 8 or more years.
- `exotic-gpu` (tier C): the GPU matches a curated legacy GPU list.
- `rare-sku` (tier C): the GPU matches a curated regional, OEM-only, low-power, or low-volume SKU list.

Tags not listed above SHALL NOT be produced. In particular the taxonomy SHALL NOT include a halo/new-release tag, an open-driver tag, or a handheld tag.

Detection SHALL tolerate false positives: a row whose CPU model is unresolvable (`0000`) SHALL still receive the `es` tag.

#### Scenario: aarch64 board is classified as an embedded specimen

- **WHEN** a benchmark row has `architecture` equal to `aarch64` and a Broadcom `VideoCore` GPU
- **THEN** the row receives the `sbc` tag with tier A

#### Scenario: Engineering sample is classified

- **WHEN** a benchmark row's CPU name matches `eng sample`
- **THEN** the row receives the `es` tag with tier S

#### Scenario: Server CPU is classified

- **WHEN** a benchmark row's CPU name contains `Xeon`, `EPYC`, or `Threadripper`
- **THEN** the row receives the `server` tag with tier B

#### Scenario: Mismatched pairing is classified

- **WHEN** a row's curated CPU year and curated GPU year differ by at least 8 years
- **THEN** the row receives the `anachronism` tag with tier B

#### Scenario: Multiple tags resolve to the rarest tier

- **WHEN** a row matches both `fossil` (tier B) and `console` (tier S)
- **THEN** the row's tier is S and all matched tags are retained

#### Scenario: Row with no specimen signals

- **WHEN** a row matches no specimen tag
- **THEN** the row is excluded from the gallery and receives no leaderboard chips

#### Scenario: PS4 Pro console part is canonicalized

- **WHEN** a row's CPU or GPU contains a `DG1501` part number
- **THEN** the row receives the `console` tag and the hardware is shown as a PS4 Pro APU

#### Scenario: Custom APU is classified

- **WHEN** a row's CPU or GPU is `Custom Zen 2`
- **THEN** the row receives the `custom-apu` tag

### Requirement: Curated hardware release-year lookup

The system SHALL maintain curated `CPU_YEARS` and `GPU_YEARS` lookup tables mapping known hardware families/models to release years, used to compute the `fossil` and `anachronism` tags and the Oldest CPU / Oldest GPU cards. The tables SHALL cover every hardware generation present in the dataset, including legacy CPUs released before 2011 and legacy GPUs released before 2015, so that no datable model is silently excluded from year-based behavior. When a model is absent from a table, year-based tags SHALL NOT be applied for that model.

#### Scenario: Fossil detected from table

- **WHEN** a CPU model maps to a release year at least 10 years before the current year
- **THEN** the row receives the `fossil` tag

#### Scenario: Unknown model skips year tags

- **WHEN** a CPU model is not present in `CPU_YEARS`
- **THEN** the `fossil` and `anachronism` tags are not applied based on that CPU

#### Scenario: Legacy silicon is covered

- **WHEN** the dataset contains a CPU released before 2011 (for example a Xeon X5450, Core2 Quad Q9550, i5 750, or Phenom II X4 965) or a GPU released before 2015 (for example an `R9 200 / HD 7900 Series`, `R9 Fury Series`, or `GT 730`)
- **THEN** the lookup returns that model's curated release year and the model is eligible for its Oldest CPU / Oldest GPU ranking

#### Scenario: Modern rare GPU is dated

- **WHEN** the dataset contains a current low-volume GPU such as an `Arc Pro B60`, `Radeon Pro WX`, or `MX570`
- **THEN** the lookup returns its curated release year instead of silently skipping year-based behavior

#### Scenario: Console APUs are dated

- **WHEN** the dataset contains a PlayStation 4, PS4 Pro, or PS5-derived APU
- **THEN** the lookup returns the generation-specific release year for that APU

### Requirement: Curated rare-hardware lists

The system SHALL maintain ordered `RARE_CPUS` and `RARE_GPUS` lists of model signatures, each entry carrying a short reason. Signatures SHALL match hardware by family so newly submitted exotic hardware is caught without editing the list. Entries SHALL be ordered by editorial rarity and interest, highest first, not by sample count. The ranking SHALL be exotica-first: engineering samples, console and custom APUs, exotic architectures, embedded hardware, server/HEDT, then legacy and rare SKUs. Mainstream curiosities such as `BC-250`, `Steam Deck`, and `Steam Deck OLED` SHALL NOT be listed as rare. A family whose members differ materially in rarity SHALL be split into separate entries so ordering is explicit rather than alphabetical.

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
