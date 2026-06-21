## 1. HTML Layout

- [x] 1.1 Add the new CPU Model, GPU Model, RAM size, and VRAM size select elements to `#leaderboard-modal` in `index.html`.

## 2. JavaScript Implementation

- [x] 2.1 Update `setupEventListeners` in `app.js` to attach `handleFilterChange` to the new filter dropdown change events.
- [x] 2.2 Implement `populateCpuFilter`, `populateGpuFilter`, `populateRamFilter`, and `populateVramFilter` in `app.js`.
- [x] 2.3 Implement the `parseGB` utility function to extract numeric sizes from RAM/VRAM strings.
- [x] 2.4 Update `handleFilterChange` in `app.js` to filter by search query, OS, CPU, GPU, RAM, and VRAM.

## 3. CSS Styling

- [x] 3.1 Refactor `#os-filter` rules to `.select-wrapper select` in `style.css` so all dropdowns receive matching styles.
- [x] 3.2 Add custom width styles for `#ram-filter` and `#vram-filter` to optimize modal layouts.

## 4. Verification

- [x] 4.1 Verify that all dropdowns dynamically load unique sorted options.
- [x] 4.2 Verify that compound filtering resolves rows accurately.
