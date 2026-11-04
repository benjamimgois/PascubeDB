# Proposal

## Why

The Curiosity tab's curation is stale and partially disconnected. The Rarest CPU/GPU lists contain a handheld entry that can never match on live data (rows are rewritten to `Steam Deck`/`Steam Deck OLED` before curation), compound entries pick models alphabetically instead of editorially, and several genuinely rare families present in the dataset are missing. The tag taxonomy also does not recognize most workstation and rare-SKU GPUs that the Rarest GPU card promotes, and the year tables leave known legacy hardware undated.

## What Changes

- Refresh `RARE_CPUS` and `RARE_GPUS` around real rarity and exotica: engineering samples, console APUs, exotic architectures, custom/embedded silicon, workstation HEDT, and rare SKU families.
- Remove mainstream curiosities from the rare lists: `BC-250` (76 runs), `Steam Deck`, and `Steam Deck OLED` no longer qualify as curated rare hardware.
- Split compound curated entries where alphabetical tie-breaking currently picks the wrong model (for example non-x86 silicon, TITAN vs Radeon Pro, Quadro generations, GRE SKUs, FX models).
- Canonicalize `DG1501SML87LB` as PS4 Pro APU, distinct from the Liverpool/Jaguar PlayStation 4 APU, and collapse repeated whitespace in displayed model names.
- Extend the specimen taxonomy with curated `workstation`, `rare-sku`, `custom-apu`, and `embedded` tags so the Curiosity table and filters cover the same hardware families as the Rarest cards. The taxonomy still excludes handheld, halo, and new-release tags.
- Fill confident gaps in `CPU_YEARS` and `GPU_YEARS` so legacy and current rare hardware participates in Fossil, Anachronism, Oldest CPU, and Oldest GPU behavior.
- Keep the existing Curiosity UI and card layout; no HTML/CSS restructure.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `specimen-gallery`: taxonomy requirements add workstation, rare-SKU, custom-APU, and embedded tags; the curated rare-hardware requirement changes its ranking criteria and family coverage; the year-lookup requirement gains the currently missing generations and canonicalization rules.

## Impact

- `app.js`: `RARE_CPUS`, `RARE_GPUS`, `SPECIMEN_TAG_META`, `classifySpecimen()`, `CPU_YEARS`, `GPU_YEARS`, `normalizeCPU()`, `normalizeGPU()`, and Curiosity tooltip text.
- `openspec/specs/specimen-gallery/spec.md`: taxonomy, curated rare-hardware, and year-lookup requirements.
- No API, dependency, build-step, or HTML/CSS changes.
