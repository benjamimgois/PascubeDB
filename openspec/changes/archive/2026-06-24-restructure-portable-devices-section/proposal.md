## Why

Seção atual "Mobile and SBC Devices" mistura charts comparativos (Handheld vs Notebook vs SBC) com charts de performance e SO em um layout confuso. Precisamos reorganizar em subsections claras por categoria de dispositivo, cada uma com seus proprios charts de top runs, OS e performance CPU/GPU.

## What Changes

- Renomear seção "Mobile and SBC Devices" para "Portable devices"
- Renomear "Mobile Device Type" para "Portable device type"
- Remover charts comparativos antigos (Mobile distribution, Notebook vs Handheld vs SBC averages, Mobile CPU/GPU general)
- Adicionar subsections "Notebook", "Handheld", "SBC" cada uma com:
  - Top 10 `<categoria> Benchmark Runs - Main Score`
  - `<categoria> Operating Systems`
  - Top 10 `<categoria> CPU - Performance`
  - Top 10 `<categoria> GPU - Performance`
- Manter charts existentes de Mobile OS e Handheld OS (mover para dentro da subsection respectiva)

## Capabilities

### New Capabilities
- `portable-device-cpu-charts`: Charts de performance CPU por categoria (Notebook/Handheld/SBC)
- `portable-device-gpu-charts`: Charts de performance GPU por categoria (Notebook/Handheld/SBC)

### Modified Capabilities
- `dashboard-mobile-charts`: Remover charts comparativos antigos, adicionar charts de top runs por categoria
- `mobile-os-charts`: Remover charts de SO genericos, manter charts de SO por categoria
- `sbc-devices`: Adicionar charts de top runs SBC, SO SBC, CPU/GPU SBC

## Impact

- `app.js`: `renderCharts()` — remover charts antigos, adicionar novos charts agrupados por categoria
- `app.js`: novas funções de dados para top runs por categoria + CPU/GPU averages por categoria
- `index.html`: reestruturar seção com 3 subsections (Notebook/Handheld/SBC)
- `style.css`: possivel ajuste de grid para novas subsections
