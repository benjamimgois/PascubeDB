# Spec Delta

## ADDED Requirements

### Requirement: Inline Baseline Pinning and Direct Row Compare
Each Leaderboard row SHALL directly expose a `Pin as Baseline` control and a `Compare` selection control without requiring a separate modal dialog.

#### Scenario: Pinning a baseline row
- **WHEN** the user clicks `Pin as Baseline` on any Leaderboard row
- **THEN** that row is highlighted as the baseline and all other visible rows display signed percentage deltas (`+X.X%` / `-X.X%`) next to their `Main`, `CPU 1T`, `CPU MT`, and `GPU` scores

#### Scenario: Unpinning the baseline row
- **WHEN** the user clicks `Unpin` on the pinned baseline row or clears the baseline
- **THEN** inline percentage deltas are removed from the table rows
