# Design

## Context

See `proposal.md - Why`. Constraints that shape the approach:

- Static site: plain CSS + HTML + vanilla JS in `style.css` / `index.html` / `app.js`. No build step.
- Modal data-table sizing lives in `style.css` (`.modal-dialog th, .modal-dialog td { font-size: 0.72rem }`), shared by the leaderboard and specimen modals.
- The leaderboard search input has a focus rule that widens it: `#search-input:focus { width: 300px }` (base `260px`), plus a mobile override.
- Stat card values are rendered from JS (`renderStats` / `renderStatsImpl`) with `text-overflow: ellipsis` from `.stat-value`; the full name is known at render time but not attached.
- The main tab bar already has full-label `<span>`s and ARIA from the previous change.

## Goals / Non-Goals

**Goals:**
- Make modal tables legible without changing information density more than necessary.
- Remove the focus-triggered layout shift in the leaderboard filter row.
- Let users recover the full stat value when it is truncated.
- Keep tab labels on one line on mobile while preserving accessibility.

**Non-Goals:**
- Not redesigning tables, filters, stat cards, or the tab bar.
- Not changing filter behavior or results.
- Not touching the stat card values' actual computation.

## Decisions

### 1. Raise modal table font to `0.8rem`

Change the shared rule `.modal-dialog th, .modal-dialog td` from `0.72rem` to `0.8rem`. This targets every modal table at once (leaderboard + specimen) via the existing shared selector.

**Alternative considered:** per-table overrides. Rejected — the shared selector already exists and is the right seam.

### 2. Drop the focus-driven width change

Remove the `width: 300px` declaration from `#search-input:focus` (and its desktop/mobile equivalents), keeping the focus indication via the existing `box-shadow` ring and the global `:focus-visible` outline added previously. The base `260px` (220px inside the modal) stays.

**Alternative considered:** animate the width with a transition. Rejected — an animated reflow is still a moving target for clicks; a stable control is strictly better.

### 3. Attach full value as `title` + `aria-label`

Where stat values are set in JS, also set `element.title = fullValue` and `element.setAttribute('aria-label', fullValue)` so the untruncated name is recoverable on hover and by assistive tech. Only applied where a full value exists; values that are already complete are unaffected (the title simply matches the text).

**Alternative considered:** a custom tooltip element. Rejected — the native `title` is sufficient for this disclosure and adds no JS of its own; a custom popover is disproportionate for a secondary read.

### 4. Short labels via an extra span, toggled by CSS

Add a `<span class="tab-label-short">` inside each main tab next to the existing full `<span class="tab-label-full">`. On narrow viewports, CSS hides the full span and shows the short one. The full label remains the button's accessible name because the visible short span is `aria-hidden`-free but the button gets an explicit `aria-label` with the full text; alternatively the full span is kept for the AT name. Decision: set the full label as the button's `aria-label` so the accessible name is stable regardless of which span is visible.

**Alternative considered:** a CSS `content` swap or `text-overflow` on the full label. Rejected — attribute/content tricks make the accessible name unpredictable; an explicit `aria-label` is deterministic.

## Risks / Trade-offs

- **[0.8rem table text may wrap more columns]** → Mitigation: tables already scroll horizontally; verify no column becomes unreadable on desktop before/after.
- **[Removing the focus width may weaken focus affordance]** → Mitigation: the focus ring from the global `:focus-visible` rule and the existing `box-shadow` remain; verify visually.
- **[Native `title` is not usable on touch]** → Trade-off accepted: `aria-label` still covers AT, and the visual truncation is the primary cue. A future tap-to-reveal remains possible.
- **[Two spans per tab add markup]** → Mitigation: only the four main tabs; the pill bar is unchanged.

## Migration Plan

Static assets — no migration. Deploy via normal push; rollback = revert the commit.

## Open Questions

- Exact short label strings (e.g. "Hardware", "Software", "Desktop", "Community") can be finalized during implementation without affecting the spec or approach.
