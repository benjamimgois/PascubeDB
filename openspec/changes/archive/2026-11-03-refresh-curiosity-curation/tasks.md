# Tasks

## 1. Display Canonicalization

- [x] 1.1 In `normalizeCPU()` and `normalizeGPU()`, map `^dg1501` to `PS4 Pro APU (AMD)` before the generic PlayStation 4 mapping; verify with `DG1501SML87LB` and `Jaguar`/`Liverpool` rows that PS4 Pro and PS4 display as distinct names.
- [x] 1.2 Add AMD OPN display canonicalization for `^100-0000\d+` in both normalizers, producing `AMD Engineering Sample (<OPN>)`; verify `100-000000891` displays with the readable label and the original OPN.
- [x] 1.3 Collapse repeated whitespace in `normalizeCPU()`/`normalizeGPU()`; verify `Xeon           X3440` renders as `Xeon X3440`.
- [x] 1.4 Apply the same canonicalization after both live and fallback ingestion paths; verify `processGvizData()` and `processCSVData()` produce the same Curiosity card labels for the same hardware.
- [x] 1.5 Run `node --check app.js`; verify it exits cleanly.

## 2. Rare-Hardware Lists

- [x] 2.1 Remove `custom apu 0932|custom apu 0405` from `RARE_CPUS` and confirm `Steam Deck`/`Steam Deck OLED` no longer appear in the Rarest CPU card.
- [x] 2.2 Add exotica-first CPU entries and split compound families in `RARE_CPUS`: DG1501 PS4 Pro, Custom Zen 2, separate Oryon/RK3588/Cortex-A53, separate FX-8350/FX-8120/FX-6300, and add Phenom II X4 965 and E2-7110; verify by running the podium harness against the live CSV and confirming each entry resolves to the intended model.
- [x] 2.3 Refresh `RARE_GPUS` with real-rare present families: AI PRO R9700, RTX 6000 Ada, RTX 4000/2000 Ada, Quadro RTX, Quadro K/P/M, RTX A, T500/T600, Arc Pro B60, R9 Fury, RX 9060 XT LP, RX 6600 LE, RX 5500/5600 OEM, and RTX 3050 OEM; verify no entry is absent when matching hardware exists in the dataset.
- [x] 2.4 Split compound GPU entries whose alphabetical pick is wrong (Radeon Pro vs AI PRO R9700, Quadro generations vs RTX Ada, GRE variants, R9 Fury vs R9 200/300); verify the podium harness selects the editorial model, not the alphabetical one.
- [x] 2.5 Confirm mainstream hardware is excluded from both cards: `BC-250`, `Steam Deck`, and `Steam Deck OLED` must not be selected by `resolveCuratedPodium()`; verify with the live dataset.
- [x] 2.6 Update `STAT_TOOLTIPS.curiosity` to describe real rarity, exotica-first ordering, and the exclusion of mainstream curiosities; verify the rendered card help text matches the new curation.

## 3. Specimen Tags

- [x] 3.1 Add `custom-apu` (tier A, label `Custom APU`), `workstation` (tier B, label `Workstation`), `embedded` (tier B, label `Embedded`), and `rare-sku` (tier C, label `Rare SKU`) to `SPECIMEN_TAG_META`; verify each tag renders a chip with the expected label and tier color.
- [x] 3.2 Extend `classifySpecimen()` with `custom-apu` detection (`Custom Zen 2`, custom identifiers not already console); verify a `Custom Zen 2` row receives the tag.
- [x] 3.3 Extend `classifySpecimen()` with `workstation` detection (Threadripper PRO CPU or Quadro/TITAN/Radeon Pro/FirePro/Instinct/RTX A/Ada/Arc Pro/Tesla/T-series GPU); verify Quadro RTX, TITAN RTX, AI PRO R9700, and Arc Pro B60 rows receive the tag.
- [x] 3.4 Extend `classifySpecimen()` with `embedded` detection (AMD GX SoC, embedded Radeon, E9170) and `rare-sku` detection (GRE, OEM, XT LP, LE, curated mobile S/M variants); verify GX-420CA/E9170 rows and RX 7650 GRE/RX 9060 XT LP/OEM rows receive the expected tags.
- [x] 3.5 Add `reasonFor()` strings for the four new tags; verify the Curiosity modal reason line is non-empty for each.
- [x] 3.6 Verify the Curiosity filter chips include the new tags with correct unique-specimen counts and that selecting each chip filters the submissions table.

## 4. Year Tables

- [x] 4.1 Add confident CPU years for `i5 750`, `Phenom II X4 965`, `E2-7110`, `DG1501`, `Liverpool`/`Jaguar`, `BC-250`, `Oryon`, `RK3588`, and `Core 7 240H`; verify each matching live row resolves a year and the Oldest CPU podium remains correct.
- [x] 4.2 Add confident GPU years for `AMD Vega`, `Steam Deck`, `Steam Deck OLED`, `R9 Fury`, `Arc Pro B60`, `Pro WX`/`Pro WX 3200`, `MX570`, `T500`/`T600`, `920A`, `R2`, `Ryzen Z1`, and RDNA iGPUs (`610M`/`660M`/`680M`/`740M`/`760M`/`780M`/`840M`/`860M`/`880M`/`890M`/`8060S`); verify each matching live row resolves a year.
- [x] 4.3 Leave ambiguous identifiers (`UHD`, `HD`, `Arc`, `R5`, `500 Series`, `RX`, `Cortex-A53`, `Custom Zen 2`, bare engineering OPNs) undated; verify they still skip Fossil/Anachronism rather than guessing.
- [x] 4.4 Verify newly dated legacy models receive `fossil` and that the Oldest CPU/GPU card values are unchanged unless a newly dated model is genuinely older.

## 5. Integration Verification

- [x] 5.1 Run `node --check app.js`; verify no syntax errors.
- [x] 5.2 Run a data harness against the current Google Sheets CSV using the live normalization/curation rules; verify the Rarest CPU and Rarest GPU podiums contain only real-rare curated hardware and no mainstream handhelds.
- [x] 5.3 Serve locally with `python3 -m http.server 8000` and open `index.html?subtab=curiosity`; verify the four cards, new chips, filters, and submissions table render with real data.
- [x] 5.4 Verify the leaderboard table still displays at most three specimen chips per row and the new tags do not break row rendering or modal opening.
- [x] 5.5 Run `openspec validate refresh-curiosity-curation`; verify the change validates.
- [x] 5.6 Ensure direct `?subtab=curiosity` links render the chips and submissions table, not only the stat cards; verify via headless Chrome.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
