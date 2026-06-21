## Context

The Community Leaderboard supports searching and OS filtering. We need to introduce dropdown select filters for CPU Model, GPU Model, RAM size, and VRAM size.

## Goals / Non-Goals

**Goals:**
- Add four dropdown select elements to the filters container in `index.html`.
- Style selects generically in `style.css` so they match exactly.
- Retrieve unique values dynamically and populate the dropdowns in `app.js`.
- Sort RAM and VRAM capacities numerically by parsing GB/GiB values.
- Apply compound multi-criteria filtering on leaderboard rows.

**Non-Goals:**
- Hiding columns on desktop or mobile.

## Decisions

### 1. General Select Wrapper Styles
- **Decision:** Change `#os-filter` CSS styling to `.select-wrapper select` to style all leaderboard select elements identically.
- **Rationale:** Keeps CSS DRY and ensures visual consistency.

### 2. Numerical Sort for Capacities
- **Decision:** Implement `parseGB` to convert size strings to floats for correct sorting of RAM and VRAM capacities.
- **Rationale:** Alphabetical sorting puts e.g. "16GB" before "8GB", which is incorrect. Numerical sorting solves this.
