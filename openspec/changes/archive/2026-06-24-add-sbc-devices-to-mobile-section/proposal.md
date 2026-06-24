## Why

A planilha de benchmarks agora inclui uma coluna "architecture" com valores como "x86_64" e "aarch64". Dispositivos aarch64 (SBCs como Raspberry Pi, Orange Pi, etc.) estao sendo ignorados. Precisamos incorpora-los a seção Mobile para dar visibilidade a esses resultados.

## What Changes

- Renomear seção "Mobile Devices" para "Mobile and SBC Devices"
- Adicionar campo `architecture` ao parse dos dados (JSONP + CSV fallback)
- Adicionar classificação "SBC" para dispositivos aarch64
- Incluir SBCs nos graficos "Mobile Device Type" e "Notebook vs. Handheld Averages"
- Adicionar grafico "SBCs Operating Systems" (donut)
- Adicionar grafico "Top 10 SBC - Overall" (horizontal bar)
- Fallback CSV atualizado com coluna architecture

## Capabilities

### New Capabilities
- `sbc-devices`: Detecção de dispositivos SBC (aarch64), charts de SO e top performance para SBCs

### Modified Capabilities
- `dashboard-mobile-charts`: Adicionar categoria "SBC" aos graficos de distribuição de tipo de dispositivo e medias; adicionar grafico "Top 10 SBC - Overall"
- `mobile-os-charts`: Adicionar grafico "SBCs Operating Systems"

## Impact

- `app.js`: parser (JSONP + CSV), `classifyDevice()`, `renderCharts()`, `FALLBACK_CSV`
- `index.html`: titulo da seção, novos canvases para SBC charts
- `style.css`: possivel ajuste de grid se necessario
