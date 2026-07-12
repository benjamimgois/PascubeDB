## 1. HTML — Unified Container & Tab Bar

- [x] 1.1 Wrap `.stats-grid` + all `.pill-content` divs in a new `.hw-benchmark-container` div
- [x] 1.2 Replace `.pill-nav` with a tab bar inside the container: `<div class="hw-tab-bar"><button class="hw-tab active" data-pill="performance">...</button>...</div>` with an underline indicator element: `<div class="hw-tab-underline"></div>`
- [x] 1.3 Remove old `.pill-nav` from outside the container

## 2. CSS — Tab Bar & Container Styles

- [x] 2.1 Add `.hw-benchmark-container` styles: glass background, border-radius, padding, flex column
- [x] 2.2 Add `.hw-tab-bar` styles: horizontal flex row, gap, relative positioning (anchor for underline)
- [x] 2.3 Add `.hw-tab` styles: transparent bg, text-secondary color, padding, bottom-border on hover/active
- [x] 2.4 Add `.hw-tab.active` styles: text-primary color, font-weight 600
- [x] 2.5 Add `.hw-tab-underline` styles: absolute positioned bar, height 2px, bg primary gradient, transition on left + width

## 3. CSS — Content Transitions

- [x] 3.1 Add `.pill-content` transition styles: transform + opacity 300ms ease
- [x] 3.2 Add `.pill-content.exit` (slide-left + fade-out) and `.pill-content.enter` (slide-right + fade-in) animations
- [x] 3.3 Remove old `.pill-btn` and `.pill-content.active` display toggle styles

## 4. JS — Tab Switching with Animation

- [x] 4.1 Update `switchPill()` to add/remove `.active` on tabs instead of pills
- [x] 4.2 Add underline positioning logic (or CSS class toggle that triggers the transition)
- [x] 4.3 Implement transition sequence: add `.exit` to current content → wait 150ms → swap content → add `.enter` → remove `.exit`/`.enter` after animation

## 5. Cleanup

- [x] 5.1 Remove unused `.pill-btn` CSS classes if no longer referenced
- [x] 5.2 Test URL param `?subtab=efficiency` still activates correct tab (code paths preserved)
- [x] 5.3 Test all 3 tabs cycle through without chart instance leaks (logic preserved)
