# Proposal

## Why

The last four items from the dashboard review are presentation refinements rather than defects: normalization must be toggled chart by chart (17 separate controls, easy to leave inconsistent), the header gives the Blog and Leaderboard actions near-equal visual weight, the stat cards show a podium (#2/#3 lines) with no sense of how far ahead the winner is, and the tab underline pops into place on first paint instead of easing in. None is urgent, but together they are what separates a functional dashboard from a polished one.

## What Changes

- Add a single **Normalize all** control that turns normalization on/off for every chart at once, while individual chart toggles can still override it.
- Establish a clear header action hierarchy: exactly one primary action, with secondary actions visually subordinate.
- Add a subtle relative indicator behind the stat-card podium so the gap to #2/#3 is visible at a glance.
- Animate the main tab underline on its first appearance using `@starting-style`.

## Capabilities

### New Capabilities
- `chart-normalization`: a dashboard-wide normalize control with per-chart override.

### Modified Capabilities
- `goverlay-theme`: the button hierarchy requirement gains an explicit "one primary action per view" rule.

## Impact

- `index.html`: global normalize control; header action markup/state.
- `app.js`: global control handler updating `chartNorm` + `chartVizState`, then re-rendering; stat-card podium rendering.
- `style.css`: header action emphasis, podium indicator, `@starting-style` for the tab underline.
- No new dependencies, no build step, no data changes.
