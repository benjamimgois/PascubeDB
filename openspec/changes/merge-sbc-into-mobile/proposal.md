## Why

Submissões de SBC são residualmente baixas (sub-representadas nos charts). Manter SBC como categoria separada adiciona complexidade visual sem dados significativos. Unificar Notebook + SBC como "Mobile" simplifica a seção e elimina charts vazios.

## What Changes

- Renomear seção "Portable Devices" → "Mobile Devices" (HTML heading + description)
- Unificar categorias Notebook e SBC numa única categoria "Mobile" nos charts de runs, CPU, GPU, OS distribution e temperaturas
- Remover charts específicos de SBC (runs, CPU, GPU, temperatura, OS)
- Manter Handheld como categoria separada
- Atualizar donut de distribuição: "Handheld vs SBC vs Notebook" → "Handheld vs Mobile"

## Capabilities

### New Capabilities
- `mobile-device-category`: Unified Mobile category combining Notebook + SBC data

### Modified Capabilities
- `dashboard-mobile-charts`: Section heading changes from "Portable" to "Mobile"; SBC charts removed; distribution categories changed
- `portable-device-cpu-charts`: CPU chart grouping changes from per-category to Handheld + Mobile
- `portable-device-gpu-charts`: GPU chart grouping changes from per-category to Handheld + Mobile
- `sbc-devices`: SBC-specific charts removed (spec retired or reduced to a note)
- `mobile-os-charts`: OS distribution categories change to Handheld + Mobile

## Impact

- `index.html`: section headings, remove SBC chart containers, update grid layout
- `app.js`: `getMobileDistribution()`, `renderCategoryCharts()`, `classifyDevice()` or new filter helper, thermal chart calls
- `style.css`: `.portable-runs-grid` / `.portable-thermals-grid` may need grid adjustment for 2 columns instead of 3
