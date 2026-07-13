## Why

Chart bars mostram apenas frequência (`4200 MHz`) no centro. Com `cpuMaxPower` e `gpuMaxPower` agora disponíveis na planilha (colunas AD/AE), podemos exibir `4200 MHz / 28 W` — dando visibilidade imediata da relação frequência vs potência. Útil pra comparar eficiência entre hardware num relance.

## What Changes

- Adicionar `cpuMaxPower` (col AD) e `gpuMaxPower` (col AE) ao modelo de dados
- Exibir `freq MHz / power W` no centro das barras dos charts que já mostram frequência
- Fallback: se power for null, mostra apenas a frequência (comportamento atual)
- Charts afetados: Top 10 CPU Single/Multi Thread, Top 10 GPU, Top 10 Main Score, Top 10 Notebook/Handheld/SBC Runs, Category CPU/GPU charts

## Capabilities

### New Capabilities
- `hardware-power-display`: Parse and display CPU/GPU max power (TDP) alongside clock frequency in horizontal bar charts

### Modified Capabilities
<!-- Nenhuma — requisitos dos charts existentes não mudam, apenas a renderização -->

## Impact

- `app.js`: data model (2 parsers) + rendering function + 10+ chart callers
- `index.html`: nenhuma mudança estrutural
- `style.css`: nenhuma mudança
