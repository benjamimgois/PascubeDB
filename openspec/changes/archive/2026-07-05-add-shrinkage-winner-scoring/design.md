# Design: Shrinkage Winner Scoring

## Algorithm

### Before (current)

```
for each hardware:
  for each version:
    avg = total_score / count        // raw arithmetic mean
  winner = version with max(avg)    // pure max
```

### After

```
K = 5   // prior strength constant

for each hardware:
  // compute per-hardware pooled mean across all versions
  n_total = sum(count_i)
  pooled = sum(total_i) / n_total

  for each version:
    n = count
    raw_mean = total / n
    shrinkage = K / (K + n)
    adjusted = raw_mean * (1 - shrinkage) + pooled * shrinkage

  winner = version with max(adjusted)   // shrinkage winner
```

## Data flow

```
benchmarkData[]
    │
    ▼
getAbsoluteWinners(data, type)
    │
    ├── groups[hw][version] = { total, count }
    │       │
    │       ▼
    │   per-hw: pooled_mean = Σ(total) / Σ(count)
    │       │
    │       ▼
    │   per-version: adjusted = raw × (1-K/(K+n)) + pooled × K/(K+n)
    │       │
    │       ▼
    │   winner = max(adjusted)  → versionStats[winner].wins++
    │
    ▼
entries[] = { name, wins, avg: raw_global_avg, runs: total_runs }
    │
    ▼
renderWinnerCard() → DOM
```

Key: `versionStats[ver].total` and `.count` still accumulate **raw** values, so the displayed `avg` is the raw global average. Only the winner determination uses adjusted means.

## UI: Info tooltip

```
┌────────────────────────────────────────────┐
│  🖥 Faster Mesa Driver                [?]  │
│  ┌────────────────────────────────────────┐│
│  │ 26.1                                   ││
│  │ 8/12 hw wins at 28,500 avg             ││
│  │ 2º mesa-git (5 samples)                ││
│  │ 3º 25.0                                ││
│  └────────────────────────────────────────┘│
└────────────────────────────────────────────┘
        │
        ▼ hover
  ┌──────────────────────────────────────┐
  │ ℹ️ Winner determined using shrinkage │
  │    estimator. Small-sample versions  │
  │    are pulled toward the hardware's  │
  │    pooled mean. α = 5/(5+n).        │
  └──────────────────────────────────────┘
```

### Implementation

1. Add `<span class="winner-info-trigger" data-lucide="help-circle">` to each stat-card in HTML (after `stat-label`)
2. Add CSS for `.winner-info-trigger` (positioned top-right of card, opacity 0.5, hover→1.0)
3. Add CSS for `.winner-info-tooltip` (absolutely positioned, appears on hover via sibling selector or JS)
4. In `renderWinnerCard`, no changes needed — the icon is static HTML
5. Tooltip text is hardcoded in HTML via a `data-tooltip` attribute or sibling `<div>`
6. Pure CSS tooltip via `:hover` + `::after` pseudo-element or adjacent sibling

### Tooltip CSS approach (pure CSS, no JS)

```css
.winner-info-trigger {
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 0.4;
    cursor: help;
    transition: opacity 0.2s;
}
.winner-info-trigger:hover { opacity: 1; }

.winner-info-tooltip {
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(15, 23, 42, 0.97);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12px;
    color: #e2e8f0;
    max-width: 280px;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    pointer-events: none;
}
.winner-info-trigger:hover + .winner-info-tooltip,
.winner-info-tooltip:hover {
    opacity: 1;
    visibility: visible;
}
```

Note: CSS-only approach has `pointer-events: none` on tooltip so it doesn't flicker. The `+` sibling selector requires the tooltip to be immediately after the trigger in DOM.

## Files changed

| File | Change |
|---|---|
| `app.js` | `getAbsoluteWinners()` — add shrinkage, ~20 lines |
| `index.html` | Add trigger icon + tooltip div to each of 4 stat-cards |
| `style.css` | Style `.winner-info-trigger` and `.winner-info-tooltip`, ~30 lines |
