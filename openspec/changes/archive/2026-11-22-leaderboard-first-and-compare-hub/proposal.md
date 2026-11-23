# Proposal

## Why

Users visiting PascubeDB primarily want to know how their own hardware compares against the rest of the community. Currently, the **Leaderboard** is hidden behind a header button inside a modal dialog (`#leaderboard-modal`) with 15 cramped columns and 5,700+ rows rendered at once, making side-by-side comparison difficult. Meanwhile, the **Curiosity** pill adds secondary navigation weight in the Hardware Benchmark tab.

## What Changes

- **Promote Leaderboard to the Primary Default Tab** (**BREAKING** navigation/layout change):
  - Move the Leaderboard out of `#leaderboard-modal` into the first and default active tab (`Leaderboard & Compare`) in the main tab bar, removing the redundant `Leaderboard` button from the header.
  - Keep `Hardware Charts`, `Software Benchmark`, `Desktop Landscape`, and `Community Insights` as secondary tabs.
- **Add "Compare Your Hardware" Percentile Card**:
  - Provide CPU and GPU selectors at the top of the primary tab that compute the user's standing (`Top X%`) across `Main Score`, `CPU 1T`, `CPU MT`, and `GPU Score` against the community, with a quick button to filter the table to that hardware.
- **Redesign the Leaderboard Table for Readability & Instant Comparison**:
  - Replace the 15-column cramped table with a clean 7-column layout (`#`, `Hardware`, `OS`, `Main Score` with proportional bar, `CPU 1T / MT`, `GPU Score`, `Actions`).
  - Move secondary technical fields (`CPU Freq`, `GPU Freq`, `VRAM`, `Kernel`, `Driver`, `GOverlay`, `Client ID`, `Date`) into an expandable row detail panel on click.
  - Add a **`Best per Contributor` | `All Runs`** toggle in the toolbar (defaulting to `Best per Contributor`) and paginate rendered rows (e.g., 50 per page) for fast filtering and scrolling.
  - Add direct per-row **`Pin as Baseline`** (live signed `%` deltas displayed inline on all other rows) and **`Compare`** actions (2–5 runs side-by-side comparison view) without hiding them behind a separate Compare Mode toggle.
- **Remove the `Curiosity` Pill**:
  - **BREAKING**: Remove `#pill-btn-curiosity`, `#pill-curiosity`, `#specimen-modal`, and specimen gallery rendering from the Hardware Benchmark tab, leaving `Performance` and `Efficiency` as the two views under `Hardware Charts`.

## Capabilities

### New Capabilities
- `hardware-percentile-summary`: Top-of-tab "Compare Your Hardware" widget with CPU/GPU selectors, community percentile badges (`Top X%`), and one-click table filtering.

### Modified Capabilities
- `tab-navigation`: Makes `Leaderboard & Compare` the first and default active tab and moves `Hardware Charts`, `Software Benchmark`, `Desktop Landscape`, and `Community Insights` to secondary tabs.
- `leaderboard-table-layout`: Replaces the 15-column modal table with a 7-column layout, expandable row technical details, `Best per Contributor` / `All Runs` toggle (default `Best per Contributor`), and pagination.
- `benchmark-comparison`: Adds inline `Pin as Baseline` (live `%` deltas across table rows) and direct per-row `Compare` controls in the main Leaderboard tab.
- `specimen-gallery`: Removes the `Curiosity` pill, specimen gallery, and `#specimen-modal` from the dashboard UI.

## Impact

- **`index.html`**: Add `#tab-leaderboard` as the first active tab panel; remove `#leaderboard-modal`, `#leaderboard-btn`, `#pill-btn-curiosity`, `#pill-curiosity`, and `#specimen-modal`.
- **`app.js`**: Update `switchTab` / `initTabNavigation` default tab to `leaderboard`; add `hardware-percentile-summary` calculation, `Best per Contributor` grouping, pagination, expandable row details, inline baseline pinning, and remove Curiosity/Specimen gallery rendering.
- **`style.css`**: Style the Compare Your Hardware card, spacious 7-column table with inline score bars, delta badges, expandable detail rows, and pagination controls.
