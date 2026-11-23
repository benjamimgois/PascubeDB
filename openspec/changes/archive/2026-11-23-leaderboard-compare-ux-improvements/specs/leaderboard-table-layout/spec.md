# Spec Delta

## ADDED Requirements

### Requirement: Compact Horizontal Hardware Summary Split
On desktop viewports, the `Compare Your Hardware` card SHALL use a horizontal split layout placing the title, run search input, and `Filter table to my runs` action on the left and the four percentile summary cards (`Main Score`, `CPU 1T`, `CPU MT`, `GPU Score`) in a single row on the right. On narrower viewports, the layout SHALL stack cleanly without horizontal overflow.

#### Scenario: Desktop horizontal split layout
- **WHEN** the Leaderboard & Compare tab is viewed on a desktop viewport
- **THEN** the `Compare Your Hardware` search controls and the four percentile cards render side-by-side in a compact horizontal layout

#### Scenario: Mobile stacked fallback
- **WHEN** the Leaderboard & Compare tab is viewed on a narrow mobile or tablet viewport
- **THEN** the percentile cards stack below the search controls without clipping or horizontal overflow

### Requirement: Unified Leaderboard Toolbar and Expandable Search Filter
The Leaderboard toolbar SHALL display the result count (`#leaderboard-count`) aligned on the left and the grouping/baseline controls (`Best per Contributor | All Runs`, pinned baseline indicator) aligned on the right on a single row. The filter bar's search input SHALL expand to fill available horizontal space alongside the dropdown filters.

#### Scenario: Unified toolbar row
- **WHEN** the Leaderboard loads with benchmark data
- **THEN** the contributor/run count appears on the left of the toolbar row opposite the grouping and baseline controls

#### Scenario: Flexible search input width
- **WHEN** the filter bar renders on wide desktop viewports
- **THEN** the search input expands to use remaining horizontal space without truncating its placeholder text prematurely
