## Why

OS vs. Hardware Delta % atual exibe todos hardwares no eixo Y e todos OS como barras coloridas — 60+ barras simultâneas, ilegível. A baseline não atualiza corretamente e o modal de checkboxes é desnecessário para seleção única.

## What Changes

- Remover o modal de seleção múltipla para OS chart
- Adicionar **combobox "Hardware"** no chart header (visível apenas em Delta %)
- Usuário seleciona **1 hardware** → gráfico mostra todos OS rodados naquele hardware como barras divergentes
- Combobox "Baseline" filtra OS para mostrar apenas OS disponíveis no hardware selecionado
- Baseline auto-selecionado para o primeiro OS do hardware
- Em Absolute mode: manter comportamento atual (normalize toggle visível, hardware/baseline ocultos)

## Capabilities

### New Capabilities
- `os-delta-chart`: Single-hardware OS comparison with combobox selection

### Modified Capabilities
- None

## Impact

- `app.js`: Modificar `renderSoftwareDeltaChart` para tratar OS como seleção única; adicionar event listener do combobox hardware; modificar `setupChartVizControls` para OS; adicionar `osHardware` state
- `index.html`: Adicionar combobox "Hardware" ao OS chart header; remover baseline-row separado
- `style.css`: Ajustes mínimos (reusa `.baseline-select` existente)
