# Design

## Context

See `proposal.md` — Why. Current state:

- The leaderboard row badge (`app.js:2348`) shows `getDisplayName(row)` and has `onclick="copyToClipboard(...)"` plus a copy icon; `window.copyToClipboard` (`app.js:2384`) is only used there.
- `getTopContributors` (`app.js:4203`) groups named contributors by `r.user` and anonymous ones by `r.clientId`; returns `{ labels, counts, clientIds }` where `labels[i]` is the username (or `Anonymous`).
- The chart-bar drilldown (`chart-drilldown`) already added a `clickRows` parameter to `renderHorizontalBarChart` and an `onClick` that calls `openLeaderboardForHardware`; `topContributorsChart` was intentionally left unwired.
- The leaderboard combines filters in `handleFilterChange` (`app.js:1781`) and shows removable active-filter chips.

## Goals / Non-Goals

**Goals:**
- Clicking a named username (leaderboard badge or Top Contributors bar) shows that username's runs.
- Group strictly by username (case-insensitive), across devices.
- Reuse the leaderboard modal, table, chips, and drilldown plumbing; remove the copy behavior.

**Non-Goals:**
- No anonymous filtering, no client-id grouping.
- No wiring of aggregate charts (user appears only in tooltips).
- No new modal.

## Decisions

### D1. Identity = username, case-insensitive; anonymous is not clickable

A contributor is "named" when `row.user` is present and not `anonymous` (same test as `getDisplayName`). The filter matches `(row.user || '').toLowerCase() === name.toLowerCase()`. Anonymous rows are not clickable anywhere.

### D2. The leaderboard badge stops copying and becomes a filter trigger

Remove `onclick="copyToClipboard(...)"` and the copy icon from the badge. For a named row the badge becomes a button-like target (pointer cursor, `title="Show all tests from <name>"`) that sets the user filter in place; for an anonymous row it is plain text. `window.copyToClipboard` becomes unused and is removed.

### D3. User filter reuses the leaderboard machinery

Add `leaderboardUserFilter` (a name string or null). `handleFilterChange` includes it via AND. `openLeaderboardForUser(name)` sets it, calls `handleFilterChange(false)`, then opens the modal. It is surfaced as a removable chip (`User · <name>`) through the existing active-filter renderer and cleared in the modal `close` handler, exactly like `leaderboardHardwareFilter`.

### D4. A second drilldown descriptor for user bars

Generalize the builder's drilldown: `renderHorizontalBarChart` gains a parallel `clickUsers` array (username or `null` per bar). In `onClick`, if the clicked bar has a `clickUsers` value it calls `openLeaderboardForUser(value)`, otherwise it falls back to the existing `clickRows` hardware behavior. Only `topContributorsChart` passes `clickUsers` (`labels.map(l => l === 'Anonymous' ? null : l)`); anonymous bars stay inert. Other user-bearing charts are not wired because their bars represent hardware, not a user.

### D5. A new drilldown replaces the previous drilldown

`openLeaderboardForUser` clears `leaderboardHardwareFilter` and vice-versa, so a fresh drilldown never ANDs a stale hardware filter with a user filter into an empty result. Non-drilldown filters (search, dropdowns) are untouched.

## Risks / Trade-offs

- **Copy removal**: contributors can no longer copy a name from the badge → intended; the user explicitly asked to drop copying.
- **Case-insensitive grouping** merges names that differ only in case → intended ("group by username").
- **Badge is a `<div>` (not keyboard-focusable)** → click-only, consistent with the hardware drilldown; a11y is out of scope here as agreed earlier.
- **Stale drilldown filters** → mitigated by D5 and by clearing on modal close.
- **Chart re-renders** → the `onClick`/`clickUsers` closure lives in chart `options`, so handlers survive rebuilds.

## Migration Plan

Static site, no migration. Deploy via GitHub Pages; rollback = revert the `app.js` commit.
