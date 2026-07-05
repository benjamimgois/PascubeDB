## 1. Core Implementation

- [x] 1.1 Update `datasets` creation in `renderDivergingBarChart` to configure `minBarLength: 0` for the baseline dataset and `minBarLength: 3` for non-baseline datasets.

## 2. Verification

- [x] 2.1 Verify that the baseline dataset has no bar drawn (0px width).
- [x] 2.2 Verify that non-baseline datasets with 0% delta draw a thin 3px bar.
