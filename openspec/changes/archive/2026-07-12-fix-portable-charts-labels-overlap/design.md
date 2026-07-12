## Context

The custom `barLabels` plugin in `app.js` renders the main score inside the bar when `drawScoreInside` is true. It also tries to center the frequency label (`centerText`) inside the bar when `barW > 60`. However, if the bar width is small, the centered frequency label overlaps with the right-aligned score label.

## Goals / Non-Goals

**Goals:**
- Detect if the frequency label (`centerText`) overlaps with the right-aligned score label (`scoreText`) inside the bar.
- If it overlaps, dynamically render it outside to the right of the bar using the `nextX` cursor, and increment the cursor accordingly.

**Non-Goals:**
- Removing the frequency label altogether.

## Decisions

### 1. Collision Detection for Center Text
We will calculate the right edge of `centerText` (`centerX + ctWidth / 2`) and the left edge of `scoreText` (`bar.x - 8 - scoreWidth`). If the right edge of the center text (plus some padding) is greater than the left edge of the score, we consider it a collision and draw the frequency label outside at `nextX`.
- **Rationale**: This is a robust way to ensure both values are readable.
