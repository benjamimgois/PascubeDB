# Tasks

## 1. CSS integrity fixes

- [x] 1.1 Remove orphan `}` at `style.css:1619` and the stray `pointer-events: none;` + `}` at `style.css:2759-2760`; verify with a CSS parse (no unexpected dropped-rule warning in devtools) and that tools/cards below those points still render
- [x] 1.2 Consolidate the duplicate `.viz-info-tooltip` rules: remove the over-constrained `top:100%; right:0` definition (`style.css:513`), keeping the single positioned definition
- [x] 1.3 Neutralize the local CSS tooltip so only the JS global tooltip shows (`.viz-info-wrap:hover .viz-info-tooltip { opacity:0; visibility:hidden }`); verify hovering any help icon shows exactly one tooltip

## 2. Contrast tokens (goverlay-theme)

- [x] 2.1 Add `--on-accent: #06263a` to `:root` and change `--text-muted` to `#8b9cb3`; verify muted labels (stat sub, chart unit, baseline label, table date) render legibly
- [x] 2.2 Apply the on-accent token to `.btn-primary` label color; verify the Leaderboard button label contrast is >= 4.5:1 (white-on-cyan was 2.77:1)
- [x] 2.3 Give `.bneck-badge` and `.blog-highlight-tag` a dark foreground; verify each badge label contrast is >= 4.5:1 against its background
- [x] 2.4 Align remaining indigo `rgba(99,102,241,…)` hover/focus states with the cyan `--primary` family; verify no indigo remnants remain via search

## 3. Keyboard focus and reduced motion

- [x] 3.1 Add a global `:focus-visible` outline rule for buttons, tabs, chips, inputs, and selects; verify Tab reaches each control with a visible ring and mouse clicks do not show a ring
- [x] 3.2 Add a `prefers-reduced-motion: reduce` media query disabling shimmer, pulse, view-transition, and reveal animations; verify via OS/browser "reduce motion" setting

## 4. ARIA semantics

- [x] 4.1 Add `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` to the main tab bar and `role="tabpanel"` + `aria-labelledby` to `#tab-*` panels in `index.html:51-69`
- [x] 4.2 Mirror `aria-selected` with the `.active` class in `setupTabNavigation` (`app.js:312-363`) and add arrow-key roving focus; verify arrow keys move tabs and panels switch
- [x] 4.3 Apply the same tab/panel ARIA + arrow-key behavior to the sub-tab (pill) bar (`index.html:93-98`, `initPillNav` in `app.js:237-267`)
- [x] 4.4 Add accessible names to leaderboard filter selects (`index.html:1320-1351`) via associated labels or `aria-label`; verify a screen-reader/value inspection reports a name per select
- [x] 4.5 Add `role="img"` + `aria-label` to each chart canvas; verify assistive tech announces a description per chart

## 5. Feedback states

- [x] 5.1 Add a status banner element + `showStatusBanner(message, level)` and call it in the fallback path (`app.js:1126-1128`); verify the banner appears when live fetch fails and is absent on success
- [x] 5.2 Add a reusable toast (`showToast(message, level)`) with `role="status"` / `aria-live="polite"`; wire it to copy client ID and other async actions; verify success and failure are both visible and announced
- [x] 5.3 Add a result-count element with `aria-live="polite"` to the leaderboard and submissions tables, updating on filter change; verify the count matches visible rows and announces without spamming on rapid input
- [x] 5.4 Add a per-chart empty state message shown when a chart has no data for the current selection; verify no blank canvas remains

## 6. Integration verification

- [ ] 6.1 Full keyboard-only pass across all four tabs and both modals: verify focus order, visible focus, and tab-panel switching *(needs browser)*
- [ ] 6.2 Run an automated contrast/a11y audit on the loaded page and verify zero AA contrast failures for text and controls *(needs browser)*
- [ ] 6.3 Verify with reduced-motion enabled that no continuous animation plays and no layout breakage occurs *(needs browser)*
- [ ] 6.4 Verify the fallback notice appears when the Sheets request is blocked, and disappears on a fresh successful load *(needs browser)*

## 7. Microcopy cleanup

- [x] 7.1 Replace Portuguese ordinal podium markers (`2º` / `3º`) with language-neutral markers (`#2` / `#3`) in `index.html` placeholders and `app.js` rendered labels; verify temperature unit `ºC` is untouched

## Workflow follow-up

- Archive the change after manual browser verification (group 6) is complete.
