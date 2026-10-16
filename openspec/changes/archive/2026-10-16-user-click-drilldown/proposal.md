# Proposal

## Why

Contributor names in the dashboard are dead text that happens to copy the name on click. The useful action is to see everything that person submitted. Each sheet row is one test, so a username should be a doorway to that user's full submission history — mirroring the chart-bar hardware drilldown that already opens the leaderboard filtered.

## What Changes

- Clicking a **named contributor's username** opens/filters the leaderboard to that user's benchmark runs, grouped by **username** (case-insensitive), not by device.
- Clicking a **Top Contributors chart bar** opens the leaderboard filtered to that username.
- **Stop copying** the username on click (the copy behavior and the copy icon are removed from the leaderboard badge).
- **Anonymous** contributors are not clickable (filtering by "Anonymous" adds nothing).
- Add a **user filter** to the leaderboard (normalized username equality), shown as a removable active-filter indicator and cleared when the modal closes.

### Non-goals

- No clickable username on aggregate charts where the bar is hardware and a user appears only in the tooltip (efficiency, bottleneck, runs charts) — a bar there does not identify one user.
- No change to the hardware drilldown, the chart filters, or the leaderboard columns.
- No grouping by device/client-id.

## Capabilities

### New Capabilities

- `user-drilldown`: clicking a named contributor's username (in the leaderboard badge or the Top Contributors chart) opens the leaderboard filtered to that user's benchmark runs.

### Modified Capabilities

- `dashboard-leaderboard-filters`: adds a user filter (username equality) that participates in multi-criteria filtering, shows a removable indicator, and is cleared on modal close.

## Impact

- `app.js`: leaderboard row badge loses `copyToClipboard` and becomes a click filter target for named users; `topContributorsChart` becomes clickable via a username-per-bar descriptor; new `leaderboardUserFilter` state + predicate in `handleFilterChange`; active-filter chip; new `openLeaderboardForUser()`; clear on close. `window.copyToClipboard` becomes unused.
- `openspec/specs/dashboard-leaderboard-filters/spec.md` and a new `openspec/specs/user-drilldown/spec.md`.
- No new dependencies; no HTML/CSS changes expected (reuses the leaderboard modal).
