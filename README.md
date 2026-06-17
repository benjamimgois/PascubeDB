# PascubeDB

**PascubeDB** is a modern, responsive web dashboard for **The Community-Driven Linux Gaming Benchmark**. It dynamically fetches performance data in real time from Google Sheets, visualizing CPU and GPU results through interactive charts and a searchable leaderboard.

## Features

- **Real-time Synchronization:** Dynamic fetching directly from Google Sheets via the CSV export endpoint.
- **Robust Parsing:** Cleans up numbers with embedded comma separators (e.g., `"3,909"` $\rightarrow$ `3909`) and handles missing data (`N/D`).
- **Interactive Visualizations:**
  - Top 8 CPU Single-Thread Score Chart (Chart.js)
  - Top 8 CPU Multi-Thread Score Chart (Chart.js)
  - Top 8 GPU Performance Chart (Chart.js)
- **Community Leaderboard:** Fully searchable, sortable, and filterable data table of all benchmark runs.
- **Responsive Layout:** Beautiful dark mode themed with glassmorphism cards, optimizing for desktop, tablet, and mobile screens.
- **Offline / CORS Fallback:** Built-in cached database that loads automatically if network connection fails or if CORS limits are hit.

## Live Demo

Access the live dashboard here: [https://benjamimgois.github.io/PascubeDB/](https://benjamimgois.github.io/PascubeDB/)
