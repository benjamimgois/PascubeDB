## Context

The "Mesa Driver vs. GPU" and "NVIDIA Driver vs. GPU" comparison charts in `app.js` filter the benchmark runs using `getDriverScatterData()`. The current filters classify runs by looking at keywords in the GPU model name (`rtx`, `nvidia`, `geforce` for NVIDIA, and excluding them for Mesa). This excludes GTX and MX cards from the NVIDIA chart, and places them under the Mesa filter block where they are then dropped because they do not match the Mesa driver version regex. In addition, some normalized empty GPU names (e.g. from generic names like "Intel(R) Graphics" normalized to `""`) pass the filter and render as empty labels.

## Goals / Non-Goals

**Goals:**
- Correctly classify all NVIDIA GPUs (RTX, GTX, MX, etc.) under the NVIDIA Driver vs. GPU chart.
- Correctly classify AMD, Intel, and other Mesa-supported GPUs under the Mesa Driver vs. GPU chart.
- Prevent empty normalized GPU labels from rendering in the charts.

**Non-Goals:**
- Changing the layout or look of the charts.
- Altering the win-calculation logic.

## Decisions

### Decision: Filter by Driver String instead of GPU Model Name
Instead of inspecting `r.gpu` to determine if a run belongs in the Mesa or NVIDIA chart, we will inspect the `r.driver` string.
- A run is classified as **Mesa** if `r.driver` matches the Mesa pattern (`/Mesa\s+(\d+\.\d+)(?:\.(\d+))?/i`).
- A run is classified as **NVIDIA** if `r.driver` contains `"NVRM"` or `"NVIDIA"`, and matches the NVIDIA pattern (`/(?:NVRM|NVIDIA).*?(\d+\.\d+)/i`).
- **Rationale:** This is completely agnostic of GPU model naming schemes, automatically supporting GTX, MX, RTX, and any future/unusual GPU series (e.g., Quadro, Tesla, etc.). It is self-correcting and more maintainable.

### Decision: Exclude Empty Normalized GPU Names
- **Rationale:** If `normalizeGPU(r.gpu)` returns `""` (empty string) or is whitespace-only, the run is skipped. This prevents a blank/empty GPU category from appearing in the charts.

## Risks / Trade-offs

- **Risk:** An NVIDIA GPU running the open-source Mesa NVK driver might match the Mesa pattern.
  - *Mitigation:* This is actually a feature, not a risk! If an NVIDIA card runs NVK, its performance is governed by Mesa driver versions, so it makes perfect sense to compare it under the Mesa chart.
