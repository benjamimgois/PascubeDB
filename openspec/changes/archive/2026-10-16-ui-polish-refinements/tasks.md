# Tasks

## 1. Global normalize control

- [x] 1.1 Add the global normalize control to the markup (`index.html`) with an accessible label; verify it renders and is keyboard reachable
- [x] 1.2 In `app.js`, on change set every `.chart-toggle-cb` to the new state, update `chartNorm[id]` for each `data-chart`, and update `chartVizState[type].normalize`, then call `renderCharts()`; verify all charts switch together
- [x] 1.3 Verify per-chart override still works after a global toggle (turn one chart off, others stay on)

## 2. Header action hierarchy

- [x] 2.1 Make the secondary header action (`#blog-btn`) visually subordinate to the primary (`#leaderboard-btn`) in `style.css`; verify exactly one filled-cyan action is present
- [x] 2.2 Verify both actions remain keyboard reachable and the blog badge still renders

## 3. Stat card podium indicator

- [x] 3.1 Add a thin, low-opacity relative bar behind the podium in the stat-card render path; verify length reflects the winner's margin
- [x] 3.2 Mark the indicator decorative (`aria-hidden`) and verify it does not overlap the #2/#3 text

## 4. Tab underline entrance animation

- [x] 4.1 Add an `@starting-style` entrance for `.tab-nav-underline` and `.hw-tab-underline`; verify a smooth first-paint position and no layout jump
- [x] 4.2 Verify the existing tab-switch transition still works

## 5. Integration verification

- [x] 5.1 Full manual pass: global vs per-chart normalize, header emphasis, podium indicator readability, and underline animation across all tabs
