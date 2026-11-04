# Tasks

## 1. Compare UI Scaffolding

- [x] 1.1 Add a Compare toggle next to the leaderboard Filters control, a compare bar, and a compare results container inside the leaderboard modal; verify the elements exist and the results container is hidden by default.
- [x] 1.2 Add styles for the compare checkbox control, selected/baseline row states, sticky compare bar, results summary cards, metric table, delta indicators, and responsive behavior; verify layout at desktop and mobile widths.

## 2. Selection State

- [x] 2.1 Add compare state (active, selection, baseline, view) with helpers to enter/exit compare mode, toggle a run, enforce the five-run limit, promote a baseline after deselection, and reset all state; verify helper behavior with a small harness.
- [x] 2.2 Render a selection checkbox inside the rank cell in compare mode and make row clicks toggle selection except on interactive cells; verify selecting and deselecting updates row styling and the compare bar.
- [x] 2.3 Keep selection stable across search, filter, and sort changes; verify a run selected before filtering remains selected after the filter changes.
- [x] 2.4 Clear compare state when the leaderboard modal closes or benchmark data is refreshed; verify reopening the leaderboard starts with no selection.

## 3. Delta Computation

- [x] 3.1 Implement a pure comparison function for Main Score, CPU Single, CPU Multi, and GPU Score using `(value - baseline) / baseline × 100`; verify normal, zero-baseline, and missing-value cases with a harness.
- [x] 3.2 Format deltas with an explicit sign and one decimal (`+4.1%`, `-7.1%`, `0.0%`) and render `N/D` for unavailable values; verify the rendered values match the harness output.

## 4. Comparison Results View

- [x] 4.1 Render the results view with a baseline selector, per-run summary/context (contributor, CPU, GPU, RAM, VRAM, OS, kernel, driver, rank), and the metric table; verify every selected run appears with absolute values and deltas.
- [x] 4.2 Show a same-hardware indicator when all selected runs share the baseline's normalized CPU+GPU and a hardware-differences warning otherwise; verify both cases with selected runs from different hardware.
- [x] 4.3 Wire baseline changes and baseline deselection to recalculate the deltas; verify the results update immediately and the new baseline is visually marked.
- [x] 4.4 Add a Back action that returns to the leaderboard with the selection intact; verify the compare bar still reflects the selection.

## 5. Accessibility

- [x] 5.1 Use real checkbox inputs with accessible labels, `aria-pressed` on the Compare toggle, an `aria-live` compare bar, and scoped table headers; verify the accessibility attributes in the rendered DOM.
- [x] 5.2 Make selection keyboard operable with Enter/Space and ensure delta text includes its sign independently of color; verify with a keyboard-only headless flow.

## 6. Integration Verification

- [x] 6.1 Run `node --check app.js`; verify no syntax errors.
- [x] 6.2 Run a headless browser flow: enter compare mode, select runs across filters, start comparison, change baseline, return, and close/reopen; verify the full flow and reset behavior.
- [x] 6.3 Verify the existing leaderboard filters, sorting, username drilldown, and table rendering still work with compare mode inactive.
- [x] 6.4 Run `openspec validate add-benchmark-comparison --strict`; verify the change validates.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
