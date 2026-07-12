## Context

The system renders horizontal bar charts inside the custom `barLabels` plugin in `app.js`. For charts displaying multiple metrics (such as the GPU Thermal Efficiency chart with score/temperature ratios), labels overlap on the right of the bar when the bar width is too narrow to contain them.

## Goals / Non-Goals

**Goals:**
- Dynamically position labels (`scoreText`, `stText`, and `contributorText`) horizontally to prevent overlapping when drawn outside of narrow bars.
- Retain the existing center/inside alignment when the bars are wide enough to fit the labels.

**Non-Goals:**
- Changing the chart colors, data loading logic, or other tabs/charts not affected by overlapping labels.
- Moving the labels to a separate tooltip or popover (they must remain inline in the canvas).

## Decisions

### 1. Dynamic Cursor-Based Positioning Outside the Bar
Instead of drawing labels at fixed offsets like `bar.x + 6` or using hardcoded offsets, we will compute a `nextX` starting at `bar.x + 6`. Each element drawn outside the bar will increment `nextX` by its measured text width plus a padding offset (e.g., `8px`).

- **Rationale**: This naturally supports arbitrary label lengths and keeps labels readable sequentially.
- **Alternatives Considered**: 
  - *Drawing text stacked vertically*: Fails because of the line height constraints in the horizontal bar layout.
  - *Hiding secondary labels if they don't fit*: Not ideal since the user wants to see the data (e.g., scores and temperatures).

## Risks / Trade-offs

- **Risk**: Long contributor names or values could push the labels past the canvas right margin.
- **Mitigation**: The layout already includes right padding (up to 120px) specifically for these labels. Contributor names are also truncated to 16 characters (`substring(0, 16)`), capping their maximum width.
