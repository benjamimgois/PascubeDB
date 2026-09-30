# Spec Delta

## Purpose

Surface genuinely curious Linux hardware — embedded boards, consoles, handhelds, engineering samples, server silicon, fossils, and mismatched pairings — as a curated Specimens gallery and detail modal inside a dedicated Curiosity pill, with specimen chips in the leaderboard table.

## ADDED Requirements

### Requirement: Specimen classification taxonomy

The system SHALL classify each benchmark row into zero or more specimen tags and assign the row the highest (rarest) tier among its tags. Tags and their detection signals SHALL be:

- `es` (Engineering Sample, tier S): CPU or GPU name matches an engineering-sample pattern such as `eng sample`, `genuine intel ... 0000`, a bare `0000` model identifier, or an AMD OPN (`100-0000` followed by digits).
- `console` (tier S): CPU or GPU name identifies a game-console APU. Detection SHALL recognize a `dg` part number (`dg` followed by at least three digits, e.g. `DG1501SML87LB`), the PS5-derived `BC-250`, and the console codenames `liverpool` and `jaguar` (PlayStation 4), `oberon` and `ariel` (PlayStation 5), `durango` and `scarlett` (Xbox), and `grizzly`, in addition to a curated console name list. A `dg` followed by a single digit (e.g. the Intel Arc `(DG2)` codename) SHALL NOT be treated as a console. Console APU models SHALL be canonicalized: `BC-250` to "PS5 APU (BC-250)" and `Liverpool`/`Jaguar` to "PlayStation 4 APU (AMD)".
- `exotic-arch` (tier S): the `architecture` field is a non-x86 architecture other than aarch64 (for example `riscv64`, `ppc64le`, `loongarch`).
- `vm` (tier A): the OS or kernel field indicates virtualization (`vm`, `virtual`, `qemu`, `kvm`).
- `sbc` (tier A): the `architecture` field is `aarch64`, or the CPU/GPU matches an embedded-board signal (Broadcom `VideoCore`, ARM `Mali`, Rockchip) or a curated board list (Raspberry Pi, Orange Pi, Banana Pi, Rock).
- `server` (tier B): the CPU name matches Xeon, EPYC, or Threadripper.
- `fossil` (tier B): the CPU model's curated release year is at least 10 years before the current year.
- `anachronism` (tier B): the curated GPU release year minus the curated CPU release year is 8 or more years.
- `exotic-gpu` (tier C): the GPU matches a curated legacy GPU list.

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

### Requirement: Curated hardware release-year lookup

The system SHALL maintain curated `CPU_YEARS` and `GPU_YEARS` lookup tables mapping known hardware families/models to release years, used to compute the `fossil` and `anachronism` tags. When a model is absent from a table, year-based tags SHALL NOT be applied for that model.

#### Scenario: Fossil detected from table

- **WHEN** a CPU model maps to a release year at least 10 years before the current year
- **THEN** the row receives the `fossil` tag

#### Scenario: Unknown model skips year tags

- **WHEN** a CPU model is not present in `CPU_YEARS`
- **THEN** the `fossil` and `anachronism` tags are not applied based on that CPU

### Requirement: Curiosity pill hosts filters and submissions

The system SHALL render a dedicated "Curiosity" pill inside the Hardware tab, replacing the former Thermals pill. The pill SHALL contain the tag filter bar, the live summary, and the submitted-benchmarks table. The pill SHALL NOT render a separate Specimens card gallery, and no Curiosity content SHALL be rendered inside the Performance pill. Specimens SHALL be de-duplicated by normalized CPU model so the same hardware is never counted or listed more than once.

#### Scenario: Curiosity pill shows filters and submissions

- **WHEN** the user activates the Curiosity pill
- **THEN** the filter bar and the submitted-benchmarks table are rendered inside it

#### Scenario: No card gallery

- **WHEN** the Curiosity pill is active
- **THEN** no Specimens card gallery is present

#### Scenario: Performance pill no longer hosts specimens

- **WHEN** the user activates the Performance pill
- **THEN** no Curiosity content is present in that pill

### Requirement: Specimen detail modal

The system SHALL open a detail modal when a submissions-table row is clicked. The modal SHALL display that run's full performance profile: main score, CPU single, CPU multi, GPU score, GPU RT score, CPU and GPU max frequency, CPU and GPU max power, GPU max temperature and temperature delta, and the device context (OS, kernel, driver, architecture, product name, date, contributor). The modal SHALL be closable via a close control and by clicking the backdrop.

#### Scenario: Opening a run detail

- **WHEN** the user clicks a row in the submissions table
- **THEN** the modal opens showing that run's scores and device context

#### Scenario: Closing the modal

- **WHEN** the user clicks the modal close control or the backdrop
- **THEN** the modal closes

### Requirement: Curiosity stat cards

The system SHALL render four Curiosity stat cards, in order, when the Curiosity pill is active: Rarest Specimen (highest-tier specimen present), Oldest CPU (lowest curated CPU year), Oldest GPU (lowest curated GPU year), and Console APU (most-submitted console-derived APU). Each card SHALL deduplicate its podium listings so the same hardware model is not shown more than once within the card. Switching to the Curiosity pill SHALL cancel any in-flight Performance counter animation so it cannot overwrite the Curiosity values.

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

### Requirement: Specimen chips in the leaderboard table

The system SHALL render up to three specimen tag chips per leaderboard table row for tagged rows, using the same classifier as the Curiosity pill. Rows without tags SHALL render no chips.

#### Scenario: Leaderboard row shows tags

- **WHEN** a leaderboard row's hardware carries the `server` and `fossil` tags
- **THEN** the row displays chips for `server` and `fossil`

#### Scenario: Leaderboard row without tags

- **WHEN** a leaderboard row's hardware carries no tags
- **THEN** the row displays no specimen chips

### Requirement: Removal of rarity-by-sample-count charts

The system SHALL remove the `Rarest CPUs` and `Rarest GPUs` charts that ranked hardware by sample count.

#### Scenario: Rarest charts no longer rendered

- **WHEN** the dashboard renders
- **THEN** no `Rarest CPUs` or `Rarest GPUs` chart is displayed

### Requirement: Removal of the Thermals pill

The system SHALL remove the Thermals pill, its pill button, its temperature charts (AMD/NVIDIA/Intel GPU temperatures and mobile/handheld thermal load), and its four temperature stat cards, and SHALL NOT render thermal charts from the System tab into Hardware-tab canvases.

#### Scenario: Thermals pill absent

- **WHEN** the user views the Hardware tab pill bar
- **THEN** no Thermals pill button is present

#### Scenario: Thermal canvases absent

- **WHEN** the dashboard renders
- **THEN** the temperature charts are not rendered and their canvas elements are not present

### Requirement: Curiosity filtering by tag

The system SHALL render a filter bar of chips inside the Curiosity pill, one chip per specimen tag present in the data plus an "All" chip, each showing the count of unique specimens carrying that tag. Selecting a chip SHALL filter the submitted-benchmarks table to runs whose hardware carries the selected tag, reset any device selection, and update the summary. The active chip SHALL be visually distinct and each chip SHALL use its tag tier color.

#### Scenario: Selecting a tag chip filters the submissions

- **WHEN** the user selects the "SBC" chip
- **THEN** only benchmark runs whose hardware carries the `sbc` tag are listed and the active chip is highlighted

#### Scenario: Returning to all

- **WHEN** the user selects the "All" chip
- **THEN** every curious benchmark run is listed again

#### Scenario: Chip counts

- **WHEN** the filter bar is rendered
- **THEN** each chip displays the number of unique specimens carrying that tag

### Requirement: Submitted benchmarks table

The system SHALL render a table of the actual benchmark runs associated with the current curiosity selection. Each row SHALL show the contributor, CPU, GPU, a **Type** column of the run's specimen tags, main score, CPU single, CPU multi, GPU score, and date. The main score SHALL be accompanied by a proportional inline bar. The table SHALL be limited to a fixed number of top rows with a count indicating the total. The system SHALL provide a device selector (restricted to specimens matching the active tag) and a sort control (main score, CPU single, CPU multi, GPU score, newest). When no run matches, the table SHALL show an empty state.

#### Scenario: Type column shows specimen tags

- **WHEN** a row's hardware carries tags such as `server` and `fossil`
- **THEN** the Type column for that row displays those tags as chips

#### Scenario: Table lists runs for the active filter

- **WHEN** a tag chip is active
- **THEN** the table lists the benchmark runs whose hardware carries that tag, sorted by the selected sort

#### Scenario: Filtering by a single device

- **WHEN** the user selects a device in the device selector
- **THEN** the table shows only that device's benchmark runs

#### Scenario: Empty submissions

- **WHEN** no benchmark run matches the current selection
- **THEN** the table shows an empty state instead of rows

### Requirement: Curiosity live summary

The system SHALL display a summary line inside the Curiosity pill describing the active filter, the number of matching unique specimens, and the number of matching submitted benchmarks, updated whenever the filter changes.

#### Scenario: Summary updates on filter change

- **WHEN** the user selects a tag chip
- **THEN** the summary shows the tag label, the matching specimen count, and the matching benchmark count
