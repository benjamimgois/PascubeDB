## Context

In `app.js`, the Efficiency tab displays cards for:
1. Most Efficient CPU
2. Most Efficient GPU
3. Major CPU Bottleneck
4. Best Thermal GPU

These cards currently display raw numbers without units, and card 3 is named "Major CPU Bottleneck".

## Goals / Non-Goals

**Goals:**
- Append `" Pts / MHz"` to the values in Card 1 and Card 2 (including second/third place podiums).
- Append `" Pts / ºC"` to the values in Card 4 (including second/third place podiums).
- Rename the label of Card 3 from `"Major CPU Bottleneck"` to `"TOP CPU Bottleneck"`.

## Decisions

### 1. Hardcode/Format Suffixes in renderStats
We will update `renderStats` in `app.js`:
- In `STATS_PILL_LABELS.efficiency`, change the 3rd index to `"TOP CPU Bottleneck"`.
- Modify the DOM updates for `stat-top-cpu-single`, `stat-top-cpu-multi`, `stat-most-humble-score`, and their corresponding second/third place elements (`stat-cpu-single-second`, `stat-cpu-single-third`, `stat-cpu-multi-second`, `stat-cpu-multi-third`, `stat-humble-second`, `stat-humble-third`) to append their respective unit suffixes.
