## Why

O dashboard tem dados de sistema (Display Server, Desktop, Storage, temperaturas) que não estão sendo visualizados. Criar uma aba "System" dedicada dá visibilidade a essas métricas sem poluir as abas existentes, e estabelece um lar pra futuros dados de configuração do sistema.

## What Changes

- **BREAKING**: Nova aba "System" na navegação (tab-nav), entre Software e Community
- **BREAKING**: Tab navigation passa de 3 pra 4 tabs
- 5 novos campos parseados do Google Sheets: `displayServer`, `desktop`, `storageType`, `gpuMaxTemp`, `gpuTempDelta`
- 5 novos gráficos na aba System, divididos em 2 seções:
  - System Environment: Display Server (donut), Desktop Environment (donut), Storage Type (donut)
  - Thermal Performance: Hottest GPU (bar), Best Cooling (bar)
- Stats grid com 4 cards: top display server, top desktop, top storage, hottest GPU

## Capabilities

### New Capabilities
- `system-environment-charts`: Gráficos de Display Server, Desktop e Storage type na aba System
- `system-thermal-charts`: Gráficos de Hottest GPU e Best Cooling na aba System
- `system-data-parser`: Parse dos 5 novos campos do Google Sheets e CSV fallback

### Modified Capabilities
- `tab-navigation`: Navegação passa de 3 tabs (Hardware, Software, Community) para 4 (Hardware, Software, System, Community)

## Impact

- `app.js`: +5 campos no parser (~20 linhas) + 3 funções de agregação (~60 linhas) + renderSystemCharts (~80 linhas)
- `index.html`: +1 botão tab + 1 tab-content com stats grid + 5 containers de gráficos (~80 linhas)
- `style.css`: ~30 linhas (reuso de classes existentes, poucos acréscimos)
- `openspec/specs/tab-navigation/`: delta spec atualizando requirements de navegação
