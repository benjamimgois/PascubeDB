## Why

The current pill navigation (3 glass buttons) feels disconnected from the content below. The pills float above the stats grid with no visual anchor, each pill looks identical, and switching between them is a flat show/hide with no sense of place. Users don't feel which section they're in.

## What Changes

- Replace pill buttons (`.pill-btn`) with an integrated tab bar using an animated underline indicator
- Host the tab bar + stats grid + pill content inside a unified glass container
- Add subtle slide/fade transition when switching between tabs
- Remove the floating pill nav from above the stats grid

## Capabilities

### New Capabilities

- `integrated-tab-bar`: Tab bar with animated underline indicator for the 3 hardware sections (Performance, Efficiency, Thermals), integrated into a unified container with stats and content

### Modified Capabilities

<!-- No existing specs have requirement changes — this is a pure UI restructure -->

## Impact

- `index.html`: Remove `.pill-nav`, restructure stats + content into a unified container
- `style.css`: Replace `.pill-btn`/`.pill-content` styles with tab bar + underline + container styles; add slide/fade transitions
- `app.js`: Update `switchPill()` to animate the underline indicator position; minor CSS class changes
