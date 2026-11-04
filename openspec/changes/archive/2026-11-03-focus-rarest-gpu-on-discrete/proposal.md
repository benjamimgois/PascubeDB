# Proposal

## Why

The Rarest CPU and Rarest GPU cards currently show the same three models because the top of `RARE_GPUS` is dominated by console/custom APUs and integrated SoCs, which are already represented by the Rarest CPU card. The GPU card should complement the CPU card and highlight genuinely rare discrete/professional graphics instead of repeating the same APU package.

## What Changes

- Reorder `RARE_GPUS` so discrete/professional graphics come first: `AI PRO R9700`, `RTX 6000 Ada`, `Arc Pro B60`, then TITAN, Radeon Pro, Quadro/RTX Ada, legacy and rare SKUs.
- Remove APU/SoC/console entries from `RARE_GPUS`: `100-000000891`, `DG1501`, Liverpool/Jaguar, `Custom Zen 2`, Adreno X1, Mali-G610, and Mali-G31. Those families remain covered by `RARE_CPUS`.
- Update the Rarest GPU tooltip to describe discrete/professional graphics rather than engineering samples and console APUs.
- Keep the existing card layout, resolver, tags, and year tables unchanged.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `specimen-gallery`: the curated rare-hardware requirement changes so `RARE_GPUS` excludes APU/SoC/console parts already covered by `RARE_CPUS` and prioritizes discrete/professional GPUs.

## Impact

- `app.js`: `RARE_GPUS` ordering/removals and `STAT_TOOLTIPS.curiosity` GPU text.
- `openspec/specs/specimen-gallery/spec.md`: curated rare-hardware requirement.
- No API, dependency, build-step, HTML/CSS, tag-taxonomy, or year-table changes.
