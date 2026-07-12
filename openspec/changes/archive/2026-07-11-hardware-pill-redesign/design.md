## Context

Current hardware section has 3 pill buttons (`.pill-btn`) floating above a stats grid. The pills are glass buttons with `backdrop-filter`, active one gets gradient background. Below the stats, `pill-content` divs toggle `display: none/block` via JS. Switching between pills is instantaneous — no transition, no visual continuity.

```
┌──────┐  ┌──────┐  ┌──────┐    ← pills float, no anchor
│ Perf │  │ Eff  │  │ Therm│
└──────┘  └──────┘  └──────┘
┌─────────────────────────────┐
│        stats grid           │    ← 4 glass cards
├─────────────────────────────┤
│                             │
│   pill content (shown/hide) │    ← flat swap
│                             │
└─────────────────────────────┘
```

## Goals / Non-Goals

**Goals:**
- Replace floating pills with an integrated tab bar inside a unified glass container
- Animated underline indicator that slides horizontally to active tab
- Subtle slide/fade transition when switching content
- Stats grid stays visible, moves inside the unified container

**Non-Goals:**
- No changes to stats cards themselves (content is still context-switched by JS)
- No changes to chart rendering or data logic
- No responsive breakpoint redesign (existing breakpoints remain)

## Decisions

**1. CSS-only underline animation (no JS-driven positioning)**
The underline will use `transform: translateX()` with `transition` on the tab bar, driven by a class change. JS only sets the active class; CSS animates the position.

Alternatives considered: JS-calculated `left` + `width` on a sliding indicator. Rejected because CSS-only is simpler, fewer recalculations, and keeps the animation smooth without ResizeObserver.

**2. Unified container with `display: flex; flex-direction: column`**
A single `.hw-benchmark-container` div wraps the tab bar, stats grid, and pill content. This creates a visual "card" that binds the three sections together.

**3. Slide + fade transition via `transform` + `opacity`**
Active pill-content slides in from the right (or fades in) while the old one slides out left. Use CSS `transition` on `transform` and `opacity` with `pointer-events` toggling.

## Risks / Trade-offs

- **[Transition jank]** If chart instances are large, the slide transition might stutter while Chart.js re-renders → Mitigation: use `visibility` + `opacity` for the container, let charts render in the background before making visible
- **[Responsive]** The unified container might feel cramped on mobile if stats + tab bar + content are all in one glass card → Mitigation: reduce padding on smaller screens, stack stats vertically at 768px
