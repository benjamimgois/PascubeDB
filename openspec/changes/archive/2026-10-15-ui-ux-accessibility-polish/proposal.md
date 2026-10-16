# Proposal

## Why

A UI/UX review of the dashboard found two classes of defects that affect every screen: (1) active CSS syntax errors and a duplicate tooltip implementation, and (2) accessibility failures — secondary/muted text and colored CTAs/badges fall below WCAG AA contrast, keyboard focus is invisible, and the tab nav + data tables expose no ARIA semantics. Additionally, when live Google Sheets data fails, the app silently swaps to the static fallback dataset with no user indication.

## What Changes

- **Fix CSS parsing errors**: remove the orphan `}` at `style.css:1619` and the stray `pointer-events: none;` + `}` at `style.css:2759-2760`.
- **Fix duplicate tooltip**: the local `.viz-info-tooltip` (`style.css:513` vs `:1563`) is over-constrained (`top` AND `bottom`) and renders simultaneously with the JS global tooltip (`app.js:269`). Consolidate on a single tooltip mechanism.
- **Contrast compliance (WCAG AA)**: lighten `--text-muted` so muted labels pass 4.5:1; introduce an on-accent foreground token so white-on-cyan CTAs and white-on-colored badges pass; give bottleneck badges a legible foreground.
- **Keyboard & focus**: add a global `:focus-visible` ring for interactive controls; stop hiding focus via `outline: none` without an equivalent visible indicator.
- **Reduced motion**: honor `prefers-reduced-motion` to disable shimmer/pulse/view-transition animations.
- **ARIA semantics**: tab nav becomes a proper `tablist`/`tab`/`tabpanel`; filter selects get accessible labels; chart canvases get `role="img"` + `aria-label`; dynamic counts/status use `aria-live`.
- **Fallback/error feedback**: show a non-blocking status banner when live data fails and the JSONP fallback CSV is used.
- **Microcopy cleanup**: replace Portuguese ordinals (`2º`) with neutral ranking markers and clarify ambiguous stat labels.
- **Token drift**: align remaining indigo `rgba(99,102,241,…)` hover/focus states with the cyan primary token.

## Capabilities

### New Capabilities
- `ui-accessibility`: keyboard focus visibility, WCAG AA contrast for text/controls, reduced-motion support, and ARIA semantics for navigation, filters, charts, and live regions.
- `ui-feedback-states`: user-visible feedback for data-source fallback, async actions, result counts, and empty chart states.

### Modified Capabilities
- `goverlay-theme`: color palette tokens gain contrast-safe muted text and on-accent foreground; badge foreground rule changes for legibility.
- `tab-navigation`: tab bar gains keyboard operability and ARIA roles/attributes in addition to its existing visual behavior.

## Impact

- `style.css`: token block (`:root`), tooltip rules, focus-visible, reduced-motion, badge/button foregrounds, indigo→cyan token drift.
- `app.js`: `initVizTooltips` (tooltip consolidation), `switchTab`/`setupTabNavigation` (ARIA state), data fetch error path (`processCSVData(FALLBACK_CSV)`), submissions rendering (live result count), status banner helper.
- `index.html`: tab nav roles, filter `label`s, canvas `aria-label`s, status banner markup, stat microcopy.
- No new dependencies. No build step.
