## Context

Currently, the horizontal chart rendering logic only renders a single frequency in the center label of the bar (either GPU frequency if available, or CPU frequency if not). For the Top 10 Benchmark Runs, both are available and valuable to the user.

## Goals / Non-Goals

**Goals:**
- Format the center frequency text as "CPU_FREQ / GPU_FREQ MHz" (or just "CPU_FREQ / GPU_FREQ" if MHz is omitted, but adding " MHz" or "MHz" is clear. We will format it as `CPU / GPU MHz` if both are defined, or fallback to the single frequency if only one is defined).
- Use `10px Inter, sans-serif` font, normal weight (not bold), to render the label.
- Keep the collision avoidance logic to ensure that if the combined label overlaps with the score, it is drawn outside using `nextX`.

## Decisions

### 1. Combined CPU/GPU Frequency String Construction
Inside the `barLabels` plugin in `app.js`, we will construct `centerText`:
```javascript
const gpuFreq = gpuFreqs && gpuFreqs[i];
const cpuFreq = chart.data.datasets[0].freqs && chart.data.datasets[0].freqs[i];

let centerText = '';
if (cpuFreq && gpuFreq) {
    centerText = `${cpuFreq.toLocaleString()} / ${gpuFreq.toLocaleString()} MHz`;
} else if (gpuFreq || cpuFreq) {
    const freqVal = gpuFreq || cpuFreq;
    centerText = `${freqVal.toLocaleString()} MHz`;
}
```
Then, we will use our existing rendering and collision detection logic for `centerText`.
- **Rationale**: This is clean, robust, and matches the user's request.
