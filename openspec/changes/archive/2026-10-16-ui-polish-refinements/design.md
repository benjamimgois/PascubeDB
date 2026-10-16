# Design

## Context

See `proposal.md - Why`. Constraints shaping the approach:

- Static site: `index.html` + `style.css` + vanilla `app.js`. No build step.
- Normalization is tracked in two places: `chartNorm[chartId]` (hardware + others, read directly by the chart renderers) and `chartVizState[type].normalize` (software comparison + average charts). A single document-level `change` listener on `.chart-toggle-cb` updates `chartNorm` and calls `renderCharts()`. There are 17 `data-chart` toggles in the markup.
- The header has two actions: `#blog-btn` (secondary) and `#leaderboard-btn` (primary).
- `.stat-value` / `.podium-sub` render the top-3 lines per stat card; there is no relative indicator.
- The tab underline is positioned by JS (`switchTab` / `initPillNav`) with a `transition` already defined.

## Goals / Non-Goals

**Goals:**
- One global normalize action that drives every chart, with per-chart override preserved.
- A header with a single unambiguous primary action.
- A glanceable sense of the winner's margin on stat cards.
- A smoother first paint for the tab underline.

**Non-Goals:**
- Not changing what "normalize" means (0-100% vs best) or its math.
- Not redesigning the header or stat cards.
- Not adding persistence (no localStorage) for normalize state.
- Not touching charts' data, colors, or callbacks.

## Decisions

### 1. Global normalize iterates the existing checkbox set

Add a control (e.g. `#normalize-all`) that, on change: sets every `.chart-toggle-cb` to the new state, updates `chartNorm[id]` for each `data-chart`, updates `chartVizState[type].normalize` for the software/average types, then calls `renderCharts()`. Because it operates through the same state the existing delegated listener uses, per-chart toggles keep working afterwards.

**Alternative considered:** a separate global flag consulted at render time. Rejected — it would need every renderer to check a second source of truth and would complicate the override semantics.

### 2. Header hierarchy through emphasis, not removal

Keep both actions; make the secondary one visually subordinate (muted border/background, smaller emphasis) and keep the primary as the only filled-cyan button. A `data-primary` style marker keeps the rule explicit.

**Alternative considered:** moving Blog into a menu. Rejected — it would hurt discoverability of the blog for a two-action header.

### 3. Podium relative indicator

Render a thin background bar behind the podium area whose length reflects the winner's score relative to #2 (or the field), giving an at-a-glance sense of dominance. Implemented in the stat-card render path; purely additive (`aria-hidden`, decorative).

**Alternative considered:** a numeric "% ahead" label. Rejected — more visual noise than a bar for a secondary cue.

### 4. `@starting-style` for the underline

Wrap the underline's entrance in `@starting-style` so it fades/positions in on first paint, complementing the existing `transition`. Degrades silently where `@starting-style` is unsupported.

**Alternative considered:** a JS-driven intro animation. Rejected — pure CSS is simpler and the element is already JS-positioned.

## Risks / Trade-offs

- **[Global normalize could desync from per-chart checkboxes]** → Mitigation: the global control sets each checkbox's `checked` property directly, so the DOM and state stay aligned; verify by toggling globally then one chart.
- **[Header emphasis change reduces Blog prominence]** → Trade-off accepted per the hierarchy goal; Blog stays visible and clickable.
- **[Podium bar could visually clash with the #2/#3 text]** → Mitigation: keep it low-opacity behind the content and gate on `aria-hidden`; verify readability.
- **[`@starting-style` support varies]** → Mitigation: progressive enhancement only; no functional dependency.

## Migration Plan

Static assets — no migration. Deploy via normal push; rollback = revert the commit.

## Open Questions

- Exact placement of the global normalize control (pill bar vs. a charts toolbar) can be settled during implementation without affecting the spec or approach.
