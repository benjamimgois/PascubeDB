# Tasks

## 1. Discrete GPU Curation

- [x] 1.1 Remove the APU/SoC/console entries from `RARE_GPUS`: `100-000000891`, `dg1501`, `liverpool|jaguar`, `custom zen 2`, `adreno x1`, `mali-g610`, and `mali-g31`; verify no APU/SoC/console pattern remains in `RARE_GPUS`.
- [x] 1.2 Reorder `RARE_GPUS` with the modern workstation trio first: `AI PRO R9700`, `RTX 6000 Ada`, `Arc Pro B60`, then TITAN, Radeon Pro, Radeon VII, Ada mobile, Quadro RTX, RTX A, Quadro K/P/M, T-series, E9170, R9 Fury, R9 200/300/HD 7900, GRE variants, rare OEM/low-power, and mobile RDNA; verify the curated list order matches the design.
- [x] 1.3 Run the podium harness against the live CSV; verify Rarest GPU resolves to `AI PRO R9700`, `RTX 6000 Ada Generation`, and `Arc Pro B60`, and that Rarest CPU remains `AMD Engineering Sample (100-000000891)`, `PS4 Pro APU`, `PlayStation 4 APU`.

## 2. Tooltip

- [x] 2.1 Update `STAT_TOOLTIPS.curiosity` Rarest GPU text to describe discrete/professional graphics and state that APUs/console parts are covered by Rarest CPU; verify the rendered card help text matches the new list.

## 3. Integration Verification

- [x] 3.1 Run `node --check app.js`; verify no syntax errors.
- [x] 3.2 Serve locally and load `index.html?subtab=curiosity` in headless Chrome; verify the Rarest GPU card shows the new discrete trio and the Rarest CPU card is unchanged.
- [x] 3.3 Verify the Curiosity table still renders and the workstation/rare-SKU tags remain intact; confirm no tag-taxonomy or year-table regression.
- [x] 3.4 Run `openspec validate focus-rarest-gpu-on-discrete --strict`; verify the change validates.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
