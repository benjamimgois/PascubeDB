## Context

In `app.js` (lines 4618-4621), the dropdown `bottleneckGpuSelect` is initialized by setting `sel.selectedIndex = 0`.

## Goals / Non-Goals

**Goals:**
- Check if `"RX 9070 XT"` exists in the options.
- If it does, set `sel.value = "RX 9070 XT"`.
- Otherwise, fallback to `sel.selectedIndex = 0`.

## Decisions

### 1. Update Dropdown Value Selection on Load
We will update `app.js`:
- Replace:
  ```javascript
  if (sel.options.length) {
      sel.selectedIndex = 0;
      renderBottleneckChart(bm, sel.value);
  }
  ```
- With:
  ```javascript
  if (sel.options.length) {
      const hasTarget = Array.from(sel.options).some(opt => opt.value === 'RX 9070 XT');
      if (hasTarget) {
          sel.value = 'RX 9070 XT';
      } else {
          sel.selectedIndex = 0;
      }
      renderBottleneckChart(bm, sel.value);
  }
  ```
