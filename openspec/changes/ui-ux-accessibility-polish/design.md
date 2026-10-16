# Design

## Context

See `proposal.md - Why`. Current state that shapes the approach:

- `style.css` is a single 3162-line stylesheet with a token block in `:root` and per-component rules. Two regions contain syntax errors (orphan `}`), and `.viz-info-tooltip` is defined twice with conflicting positioning.
- Tooltips exist twice conceptually: CSS-only hover tooltips on `.viz-info-wrap`, plus a JS-injected `.viz-info-tooltip-global` (`app.js:initVizTooltips`) that copies the same text. Both can show at once.
- The main tab bar (`index.html:51-69`) and sub-tab bar (`index.html:93-98`) are plain `<button>`s; the underline is positioned by JS (`app.js:switchTab`, `initPillNav`).
- Live data and fallback are indistinguishable to the user (`app.js:1126-1128`).
- No build step; CDN-only. All changes must be plain CSS/HTML/vanilla JS.

## Goals / Non-Goals

**Goals:**
- Remove the CSS syntax errors and the duplicated tooltip without changing the visual language.
- Bring text, controls, and badges to WCAG AA contrast using existing token architecture (add tokens, don't hardcode).
- Make navigation, filters, and charts operable/announceable by keyboard and assistive tech.
- Give users explicit feedback for data-source health and async actions.
- Keep the Goverlay dark aesthetic intact.

**Non-Goals:**
- No redesign of layout, grid structure, or chart types.
- No new dependencies (no a11y widget library, no toast library).
- No ARIA retrofit of every chart point (canvas gets a summary label, not a data table).
- Not expanding the palette beyond the tokens needed for contrast.

## Decisions

### 1. Contrast tokens: lighten muted, add on-accent

Measured ratios (contrast against `--card-bg #161d2b`):
- `#64748b` (current `--text-muted`) = **3.55:1** → fails AA.
- `#8b9cb3` (proposed) = **6.03:1** → passes AA.
- White on primary `#0ea5e9` = **2.77:1** → fails; `#06263a` on `#0ea5e9` = **5.63:1** → passes.

Add `--text-muted: #8b9cb3` and `--on-accent: #06263a`. Badge foreground uses a dark token (`#0b0f19`) which passes on all three badge colors (red 5.09, green 7.55, blue 5.21).

**Alternative considered:** darkening the accent instead of changing text color. Rejected — it would desaturate the Goverlay cyan across buttons, toggles, underlines, and chart lines; changing the foreground is lower blast radius.

### 2. Single tooltip mechanism

Keep the JS global tooltip (`initVizTooltips`), which already positions against `getBoundingClientRect()` and survives overflow containers. Neutralize the CSS hover tooltip so only the global element is visible.

```
.viz-info-wrap:hover .viz-info-tooltip { opacity: 0; visibility: hidden; }
```

Also remove the stale second `.viz-info-tooltip` block's conflicting `top`/`bottom` so the remaining CSS rule is not over-constrained, and delete the orphan `}` and stray `pointer-events` declarations.

**Alternative considered:** deleting the JS tooltip and keeping pure CSS. Rejected — CSS tooltips break inside `overflow: hidden` card/canvas areas, which is why the JS version exists.

### 3. Focus visibility via `:focus-visible`

Add one global rule instead of per-component edits:

```
:where(a, button, [role="tab"], input, select, textarea, .chip, .curiosity-chip):focus-visible {
  outline: 2px solid #7dd3fc;
  outline-offset: 2px;
}
```

This restores keyboard focus without adding mouse-click outlines. Component rules that set `outline: none` remain but their `:focus` border styles gain a companion `:focus-visible` ring.

**Alternative considered:** `:focus` for all. Rejected — shows rings on mouse clicks, which reads as buggy.

### 4. Reduced motion

One media query disabling continuous/decorative animation (shimmer, pulse, view transitions, scroll reveal) while keeping state changes instant rather than animated.

### 5. ARIA pattern for tabs

Follow the WAI-ARIA Tabs pattern: `role="tablist"` on the container, `role="tab"` + `aria-selected` + `aria-controls` on each button, `role="tabpanel"` + `aria-labelledby` on each panel. Arrow-key handling added in the existing `setupTabNavigation` / `initPillNav` handlers (roving `tabindex`). JS toggles `aria-selected` alongside the existing `.active` class so visual and semantic state cannot drift.

**Alternative considered:** leave buttons as plain buttons with `aria-current`. Rejected — the panels are real tabpanels and the pattern is well supported.

### 6. Feedback architecture

Two reusable primitives, both with `role="status"` + `aria-live="polite"`:

- **Status banner** (`showStatusBanner(message, level)`): rendered inside the app container, reuses `.blog-highlight-banner` visual styling for the "live data unavailable" case.
- **Toast** (`showToast(message, level)`): a single fixed-position element, reused for copy/sync/comment results, auto-dismissing.

The existing `.client-id-badge.copied` state stays; the toast supplements it with an announced message.

Result counts reuse the existing `.submissions-empty` / `aria-live` pattern (a counter element updated on filter change).

**Alternative considered:** `alert()` for errors. Rejected — blocking and inaccessible.

### 7. Token drift

Replace indigo `rgba(99,102,241,…)` hover/focus values with the cyan `--primary` family so interactive states match the primary accent. Mechanical, no behavior change.

## Risks / Trade-offs

- **[Dark-on-cyan buttons diverge from Goverlay look]** → Mitigation: apply only to the primary CTA label; keep the same cyan surface and hover glow. Re-evaluate with a screenshot before merging.
- **[Neutralizing CSS tooltips could hide a tooltip some component relies on]** → Mitigation: the JS global tooltip reads the same `.viz-info-tooltip` text, so content is preserved; verify each `.viz-info-wrap` after change.
- **[Roving tabindex can break existing click + URL-sync behavior]** → Mitigation: keep click handlers; add keyboard handling alongside, and assert `aria-selected` mirrors the `.active` class in `switchTab`/`switchPill`.
- **[Contrast change alters many muted labels at once]** → Mitigation: single token edit; visually diff one representative screen per tab.
- **[`aria-live` chattiness]** → Mitigation: `polite` only, debounce result counts so rapid keystrokes don't spam announcements.

## Migration Plan

Static assets — no migration. Deploy as a normal `git push` to GitHub Pages. Rollback = revert the commit. No data/schema changes.

## Open Questions

- Exact wording of the fallback notice and stat microcopy (e.g. "live data unavailable") can be finalized during implementation without affecting the spec or approach.
- Whether the "Normalize" toggle should become global is out of scope here and tracked separately.
