# Tasks

## 1. Leaderboard user filter

- [x] 1.1 Add `leaderboardUserFilter` state and include it in `handleFilterChange` (case-insensitive username equality); verify the leaderboard lists only that user's runs when it is set.
- [x] 1.2 Add `openLeaderboardForUser(name)` that sets the filter, clears any hardware drilldown filter, re-filters, and opens the modal; verify the modal opens filtered to the user.
- [x] 1.3 Surface the filter as a removable active-filter chip and clear it in the modal `close` handler; verify removing the chip unfilters and reopening via the header button is unfiltered.

## 2. Username click targets

- [x] 2.1 Remove the copy behavior from the leaderboard badge (drop the inline copy `onclick` and the copy icon, and remove the now-unused `copyToClipboard`); make the badge a click target only for named rows (pointer cursor, title), filtering in place.
- [x] 2.2 Add a `clickUsers` array to `renderHorizontalBarChart` and dispatch it in `onClick` (user drilldown when present, else the existing hardware drilldown); verify aggregate charts are unaffected.
- [x] 2.3 Pass `clickUsers` from the Top Contributors chart (`labels.map(l => l === 'Anonymous' ? null : l)`) and verify a named bar opens the leaderboard filtered to that user while an anonymous bar does nothing.

## 3. Integration verification

- [x] 3.1 Headless browser: click a named username in the leaderboard and assert the table lists only that user's runs; click a Top Contributors bar and assert the same.
- [x] 3.2 Verify an anonymous badge/bar is inert, that a user drilldown after a hardware drilldown does not AND into an empty result, and that closing the modal clears the user filter.
- [x] 3.3 Confirm no HTML/CSS change was needed, `node --check app.js` passes, and `openspec validate user-click-drilldown` passes.

## Workflow follow-up

- Archive the change after browser verification and review.
