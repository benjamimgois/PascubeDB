## Why

The Community Leaderboard contains all benchmark results but currently only supports filtering by Operating System and searching by a text query. Adding dropdown filters for CPU Model, GPU Model, RAM size, and VRAM size will make it significantly easier for users to narrow down benchmark results to specific hardware specifications.

## What Changes

- Add select dropdowns for CPU Model, GPU Model, RAM size, and VRAM size inside the leaderboard filters container in `index.html`.
- Refactor select styling to a generic class in `style.css` so all dropdowns align correctly and look identical.
- Implement dynamic population and numeric sorting for RAM/VRAM sizes in `app.js`.
- Update `handleFilterChange` in `app.js` to combine all filters.

## Capabilities

### New Capabilities

- `dashboard-leaderboard-filters`: Specifies the select controls and filter operations for the Community Leaderboard popup.

### Modified Capabilities

<!-- None -->

## Impact

- `index.html`: Add select controls to the modal body wrapper.
- `app.js`: Implement filter change handlers, options loading, size sorting, and multi-criteria row filtering.
- `style.css`: Clean up select wrapper styles to make them generic.
