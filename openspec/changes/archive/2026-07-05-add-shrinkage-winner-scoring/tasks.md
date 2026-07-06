# Tasks: Add Shrinkage Winner Scoring

## 1. Modify `getAbsoluteWinners` — shrinkage estimator
- [x] Compute per-hardware pooled mean from all versions
- [x] Apply shrinkage: `adjusted = raw_mean * (1 - K/(K+n)) + pooled * K/(K+n)`
- [x] Use adjusted mean for winner determination
- [x] Keep raw total/count for display stats (versionStats unchanged)
- [x] K = 5 constant

## 2. Add info icon + tooltip to stat cards HTML
- [x] Add `<i data-lucide="help-circle" class="winner-info-trigger"></i>` to each of 4 stat-cards
- [x] Add `<div class="winner-info-tooltip">` with methodology explanation
- [x] Ensure `lucide.createIcons()` picks up new icons

## 3. Style info icon and tooltip
- [x] `.winner-info-trigger` — absolute top-right, subtle opacity, cursor:help
- [x] `.winner-info-tooltip` — hidden by default, shown on trigger hover via CSS sibling selector
- [x] Responsive: ensure tooltip doesn't overflow card on small screens
- [x] Dark theme: glassmorphism background matching design system

## 4. Verify
- [x] Test with FALLBACK_CSV data: shrinkage should not change winner when all versions have similar sample counts
- [ ] Manual test: confirm tooltip appears on hover for all 4 cards
- [ ] Check mobile: tooltip touch behavior ok
