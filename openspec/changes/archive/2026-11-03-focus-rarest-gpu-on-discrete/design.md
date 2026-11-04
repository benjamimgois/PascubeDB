# Design

## Context

See `proposal.md` — Why. The current `RARE_GPUS` starts with the same APU/SoC families as `RARE_CPUS`, so `resolveCuratedPodium()` produces the same trio for both cards. The resolver, card layout, tags, and year tables do not need to change; this is a curation-order and list-membership change plus a tooltip update.

## Goals / Non-Goals

**Goals:**

- Make Rarest GPU show discrete/professional graphics distinct from Rarest CPU.
- Preserve the existing resolver and card behavior.
- Keep APU/SoC/console coverage in `RARE_CPUS`.

**Non-Goals:**

- No cross-card deduplication algorithm.
- No tag-taxonomy, year-table, HTML, or CSS changes.
- No new UI or card slots.

## Decisions

### D1. Remove APU/SoC/console entries from `RARE_GPUS`

Remove these entries:

- `100-000000891` engineering sample
- `DG1501` PS4 Pro APU
- `Liverpool` / `Jaguar` PS4 APU
- `Custom Zen 2`
- `Adreno X1`
- `Mali-G610`
- `Mali-G31`

They remain in `RARE_CPUS` (the OPN, DG1501, PS4, Custom Zen 2, Oryon, RK3588, Cortex-A53 entries). This removes duplication without adding cross-card state.

Alternative considered: cross-card deduplication in `resolveCuratedPodium()`. Rejected because with the current list order it would fall through to `Custom Zen 2`, Adreno, and Mali — still APU/SoC hardware — and it adds coupling between the two cards.

Alternative considered: keep APUs at the bottom of `RARE_GPUS` as fallback. Rejected because the user chose GPU-only discrete curation; keeping them adds dead entries and makes the list semantics muddier.

### D2. Modern workstation first

Order the discrete list to produce the agreed podium:

1. `AI PRO R9700` — Radeon AI Pro workstation
2. `RTX 6000 Ada` — NVIDIA Ada flagship workstation
3. `Arc Pro B60` — Intel Arc Pro workstation
4. `TITAN Xp` / `TITAN RTX` — NVIDIA TITAN
5. Radeon Pro (`Pro VII`, `Pro V620`, `Pro W5500`, `Pro W7500`, `Pro WX`)
6. `Radeon VII` halo flagship
7. RTX 4000/2000 Ada mobile workstation
8. Quadro RTX
9. RTX A-series
10. Quadro K/P/M
11. T500/T600
12. Embedded Radeon E9170
13. R9 Fury
14. R9 200/300/HD 7900
15. RX 7650 GRE
16. RX 6750 GRE
17. Rare OEM/low-power SKUs
18. Rare mobile RDNA

Resulting podium: `AI PRO R9700 → RTX 6000 Ada Generation → Arc Pro B60`.

Alternative considered: TITAN-first or legacy-first ordering. Rejected in favor of current-generation rare workstation/AI graphics, which makes the GPU card clearly distinct from the CPU card.

### D3. Update the Rarest GPU tooltip

Replace the current tooltip's "engineering samples, console APUs" language with discrete/professional graphics: TITAN, Radeon Pro/AI Pro, Quadro/RTX Ada, Arc Pro, legacy flagships, and rare SKUs. State that APUs and console parts are covered by Rarest CPU.

### D4. Keep the resolver unchanged

`resolveCuratedPodium()` still walks entries in order, chooses the rarest model within a family, and dedupes within the card. No cross-card state or new API.

## Risks / Trade-offs

- [Rarest GPU no longer shows integrated GPUs] → Accepted; integrated/APU hardware remains visible in Rarest CPU and in the Curiosity table via tags.
- [Top entries are modern but not the lowest sample count] → Accepted editorial choice; the card is curated rarity, not a pure count ranking.
- [If all three modern workstation families disappear from the dataset] → The list falls through to TITAN/Radeon Pro/legacy entries, still discrete.
- [Tooltip and list drift] → Update both in the same change and verify the rendered card help text.

## Migration Plan

1. Reorder and trim `RARE_GPUS`.
2. Update the Curiosity GPU tooltip.
3. Verify the podium and that no APU/SoC names remain in `RARE_GPUS`.
4. Rollback is a revert of `app.js`; no persistent migration.

## Open Questions

None blocking.
