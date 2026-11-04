# Design

## Context

See `proposal.md` — Why. The Curiosity tab has two independent curations: the stat cards consume `RARE_CPUS`/`RARE_GPUS` through `resolveCuratedPodium()`, while the table/filter chips consume `classifySpecimen()` tags. The live data path canonicalizes `Custom APU 0405`/`0932` to `Steam Deck`/`Steam Deck OLED` before either curation runs, so the current handheld entry in `RARE_CPUS` is dead in production. `normalizeCPU()`/`normalizeGPU()` are display normalizers and are the right place to separate `DG1501` from the generic PlayStation 4 APU and to clean model names.

## Goals / Non-Goals

**Goals:**

- Make the rare cards and the specimen table curate the same hardware families.
- Rank exotica first and exclude mainstream curiosities from the rare cards.
- Make compound-family selection deterministic and editorial instead of alphabetical.
- Date the known legacy/current gaps that affect Fossil, Anachronism, and the Oldest cards.

**Non-Goals:**

- No new Curiosity UI, card slots, HTML, or CSS.
- No handheld, halo, or new-release tag (the taxonomy explicitly forbids them).
- No cross-card deduplication between Rarest CPU and Rarest GPU. The same APU may still appear in both cards; that is an accepted consequence of exotica-first ranking.
- No attempt to repair unrelated malformed data such as a CPU name stored in the GPU column.

## Decisions

### D1. Keep curated family signatures, add explicit rarity ordering

`RARE_CPUS`/`RARE_GPUS` remain ordered pattern lists. Sample count is only a tie-breaker inside one entry, never the primary ordering. This preserves the existing contract that a newly submitted model in a known family is caught without editing the list.

Alternative considered: rank purely by sample count. Rejected because hundreds of models tie at one submission, which makes results arbitrary and noisy.

Alternative considered: explicit model allowlist only. Rejected because new members of a curated family would silently disappear.

### D2. Exotica-first ordering, mainstream excluded

Order categories as: engineering samples → console/custom APUs → exotic architectures → embedded → server/HEDT → legacy and rare SKUs. Remove `Steam Deck`, `Steam Deck OLED`, and `BC-250` from the rare lists because their run counts are mainstream-scale (22, 2, and 76 in the current snapshot). They keep their existing `console`/handheld-adjacent classification where applicable, but never win a Rarest card.

Split compound entries when members have materially different interest:

- Engineering samples: one combined entry is acceptable to avoid a podium of three samples; the combined entry keeps the current rarest-first pick.
- Non-x86: split `Oryon`, `RK3588`, and `Cortex-A53` so the newest/most interesting ARM part can be ordered explicitly.
- FX: split `FX-8350`, `FX-8120`, and `FX-6300` so “Final FX flagship” cannot resolve to a six-core.
- Radeon Pro: split `AI PRO R9700` from the older `Pro VII`/`Pro W`/`Pro V`/`Pro WX` family.
- Quadro: split `Quadro RTX`, `Quadro K/P/M`, and `RTX A`/Ada families; split flagship `RTX 6000 Ada` from mobile Ada parts.
- GRE: split `RX 7650 GRE` from `RX 6750 GRE` variants.
- Legacy GCN: split `R9 Fury` from `R9 200`/`R9 300`/`HD 7900`.

### D3. Canonical display names in normalizers

Extend `normalizeCPU()` and `normalizeGPU()`:

- `^dg1501` → `PS4 Pro APU (AMD)` before the generic `^dg\d{3,}` PlayStation 4 mapping.
- Collapse repeated whitespace on every returned model name.
- AMD OPNs matching `^100-0000\d+` → `AMD Engineering Sample (<OPN>)`, preserving the OPN but adding a readable label.

The rare-list matching still runs against the raw row values, so pattern coverage is unaffected. This is display-only canonicalization.

Alternative considered: add friendly labels directly to the rare-list entries. Rejected because the table, chips, and modal also display normalized names and would remain ugly.

### D4. Extend the tag taxonomy rather than overload `exotic-gpu`

Add four tags to `SPECIMEN_TAG_META` and `classifySpecimen()`:

| Tag | Tier | Label | Detection summary |
|---|---|---|---|
| `custom-apu` | A | Custom APU | `Custom Zen 2`, custom identifiers not already console parts |
| `workstation` | B | Workstation | CPU Threadripper PRO, or GPU Quadro, TITAN, Radeon Pro/FirePro/Instinct, RTX A/Ada, Arc Pro, Tesla, T-series |
| `embedded` | B | Embedded | AMD GX SoC, embedded Radeon, E9170 |
| `rare-sku` | C | Rare SKU | GRE, OEM-only, `XT LP`, `LE`, mobile `S`/`M` curated variants |

Rationale: the Rarest GPU card promotes TITAN/Quadro/Radeon Pro hardware that currently has no tag, so it is invisible in the Curiosity table and filters. Overloading `exotic-gpu` would mislabel workstation hardware as legacy.

Alternative considered: create a single `rare-gpu` tag. Rejected because it collapses distinct stories (workstation, regional SKU, legacy) and loses filter value.

### D5. Fill year tables with confident entries only

Add CPU years for `i5 750` (2009), `Phenom II X4 965` (2009), `E2-7110` (2015), `DG1501` (2016), `Liverpool`/`Jaguar` (2013), `BC-250` (2021), `Oryon` (2024), `RK3588` (2022), and `Core 7 240H` (2025). Ambiguous generic identifiers (`Cortex-A53`, `Custom Zen 2`, bare engineering-sample OPNs) remain undated.

Add GPU years for `AMD Vega` (2017), `Steam Deck` (2022), `Steam Deck OLED` (2023), `R9 Fury` (2015), `Arc Pro B60` (2025), `Pro WX` (2016, `Pro WX 3200` 2019), `MX570` (2022), `T500`/`T600` (2021), `920A` (2016), `R2` (2014), `Ryzen Z1`/`Z1 Extreme` (2023), and RDNA iGPUs (`610M`/`660M`/`680M` 2022, `740M`/`760M`/`780M` 2023, `840M`/`860M`/`880M`/`890M` 2024, `8060S` 2025).

Ambiguous generic strings (`UHD`, `HD`, `Arc`, `R5`, `500 Series`, `RX`) remain undated rather than guessed.

### D6. Tag and card ordering remain separate

The card list order is editorial; the tag chips sort by count as they do today. The change aligns coverage, not ordering behavior.

## Risks / Trade-offs

- [Workstation regex catches a consumer part] → Keep the pattern explicit (`quadro`, `titan`, `radeon pro`, `firepro`, `instinct`, `rtx a\d{4}`, `rtx \d000 ada`, `arc pro`, `tesla`, `t[5-9]\d{2}`) and verify against the current model list.
- [`rare-sku` becomes a junk drawer] → Limit it to a curated pattern list (GRE, OEM, LP, LE, mobile S/M) and leave generic or malformed names untagged.
- [Exotica-first podium repeats categories] → Accepted by product decision; cross-card deduplication is a non-goal.
- [Fallback CSV and live gviz diverge] → Apply the same DG1501/OPN/whitespace normalizations in both `processGvizData()` and `processCSVData()` paths; verify both.
- [Year guesses create bad Fossil tags] → Only add dates for identifiable model families; leave generic identifiers undated.
- [No automated test suite] → Validate with `node --check`, a Node/Python data harness against the live CSV, and a browser check of `index.html?subtab=curiosity`.

## Migration Plan

1. Update normalizers and expected display output.
2. Refresh the rare lists and year tables.
3. Extend the tag metadata/classifier and reasons.
4. Validate cards, chips, filters, and Oldest podiums against the live dataset.
5. Rollback is a revert of `app.js`; there is no persistent data migration.

## Open Questions

None blocking. Cross-card deduplication can be considered as a separate change if the repeated APU in both cards becomes a UX complaint.
