## Context

The bottleneck charts render labels via the custom `ratioPlugin` in `app.js`. It draws the ratio, the CPU/GPU scores, and the contributor name without checking if the bar is wide enough, resulting in overlaps when the bar width is short.

## Goals / Non-Goals

**Goals:**
- Apply the same dynamic horizontal positioning logic using `nextX` and collision detection for the center text (`cpuMulti / gpuScore`) in the custom `ratioPlugin`.
- Ensure all text elements are readable on any bar width.

## Decisions

### 1. Update ratioPlugin to Use nextX
We will rewrite the label drawing loop in `ratioPlugin` using `nextX` cursor logic.
- We will measure text widths for the score, the center ratio values, and the contributor name.
- Draw score inside if space allows; otherwise draw outside and advance `nextX`.
- Draw center text inside if space allows; otherwise draw outside and advance `nextX`.
- Draw contributor text outside at `nextX`.
- Skip rendering entirely only if `barW < 12` (instead of 30) to support extremely narrow bars.
