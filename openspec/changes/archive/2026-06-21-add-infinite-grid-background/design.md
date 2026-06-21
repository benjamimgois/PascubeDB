## Context

The Pascube DB dashboard features a modern, glowing dark glassmorphism aesthetic. The core Pascube benchmark application features a signature 3D perspective infinite grid background. We want to bring this iconic grid background into the dashboard while maintaining page legibility and the premium indigo/purple/cyan theme.

## Goals / Non-Goals

**Goals:**
- Implement a hardware-accelerated, animated 3D perspective grid in the page background.
- Integrate the grid smoothly behind all active dashboard content without affecting text readability or accessibility.
- Fade out the grid near the horizon to seamlessly blend into the slate background.

**Non-Goals:**
- Interactive 3D graphics (WebGL/Three.js) or user-steered camera angles.
- Heavy JavaScript render loops that increase CPU/GPU usage.

## Decisions

### 1. Implementation Method: CSS 3D Transforms vs. HTML Canvas
- **Decision**: Use a CSS background grid generated with `linear-gradient` patterns on a transformed container (`perspective` and `rotateX`).
- **Rationale**: CSS 3D transforms are hardware-accelerated, lightweight, and require zero JS calculation. A Canvas rendering loop would introduce CPU overhead, impacting browser scroll and input performance.
- **Alternatives Considered**: Canvas-based drawing (rejected due to JS overhead) and static SVG (rejected due to lack of dynamic perspective scaling and animations).

### 2. Fade Out Method: CSS Mask-Image
- **Decision**: Apply `mask-image` (and `-webkit-mask-image`) linear-gradients to the grid container.
- **Rationale**: Masking fades the grid lines organically into the solid `#0b0f19` background. This mimics atmospheric perspective and makes the grid disappear cleanly before reaching the dashboard's headers and charts.
- **Alternatives Considered**: Semi-transparent overlay block elements (rejected due to potential color banding and layout complexity).

### 3. DOM Placement
- **Decision**: Add a single fixed-position background wrapper at the top of `index.html`'s `<body>`.
- **Rationale**: Setting `position: fixed; pointer-events: none; z-index: -1` isolates the grid layout from the rest of the dashboard DOM, ensuring no interaction conflicts.

## Risks / Trade-offs

- **[Risk] Motion Sickness / Distraction** → *Mitigation*: Set a very slow animation speed (e.g. 25-30s per loop cycle) and use a highly transparent color (`rgba(99, 102, 241, 0.05)`) so the grid remains a subtle background element.
- **[Risk] Browser Compatibility for mask-image** → *Mitigation*: Provide vendor prefix `-webkit-mask-image` alongside the standard property to cover all major web engines (Chromium, Safari, Firefox).
