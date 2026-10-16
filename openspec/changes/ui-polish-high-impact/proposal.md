# Proposal

## Why

A follow-up UI/UX pass identified four high-impact, low-cost issues left over after the accessibility change: the leaderboard modal table renders text too small to read comfortably, focusing the leaderboard search input resizes it and shifts the other filters, truncated stat values hide the full hardware name with no way to recover it, and the main tab labels wrap to two uneven lines on mobile. Each is small and independent, and together they remove the most common friction points in daily use.

## What Changes

- Raise data-table text in modals from `0.72rem` to at least `0.8rem` so the leaderboard and specimen tables are comfortably legible.
- Stop the leaderboard search input from growing on focus (currently `260px` → `300px`), eliminating the layout shift that can cause mis-clicks on adjacent filters.
- Expose the full, untruncated value behind any stat card value that is visually truncated (via a native `title` and an accessible name).
- Show a shortened visible label for the main tab bar on narrow viewports while keeping the full label as the accessible name.

## Capabilities

### New Capabilities
- `ui-readability`: minimum legible text size for data tables and disclosure of full values when a value is visually truncated.

### Modified Capabilities
- `dashboard-leaderboard-filters`: filter control sizing becomes stable on focus (no reflow).
- `tab-navigation`: the main tab bar renders a short visible label on narrow viewports while preserving the full accessible name.

## Impact

- `style.css`: modal table font size, `#search-input` focus rule, mobile tab label rules.
- `index.html`: tab buttons gain a short-label element; stat values get the full-name attribute set at render time.
- `app.js`: stat card rendering sets `title`/`aria-label` on truncated values.
- No new dependencies, no build step, no data changes.
