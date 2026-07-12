## Context

The "Top 10 GPU Model - Performance" chart already passes `gpuRuns.map(r => r.gpuMaxFreq)` to `renderHorizontalBarChart`. However, we want to make sure the labels are fully visible and styled correctly (`10px Inter, sans-serif` without bold).

## Goals / Non-Goals

**Goals:**
- Ensure the center label renders the GPU frequency (e.g. `2200 MHz`) in the center of the bar (or outside using the dynamic `nextX` cursor if it doesn't fit).
- Style it with `10px Inter, sans-serif` normal weight.

## Decisions

### 1. Verification of Argument Alignment and Rendering
No new code changes are strictly required in the rendering logic because `gpuFreqs` is already passed and the `barLabels` plugin renders it with the correct styles and collision avoidance. We will verify the rendering is active and correct.
