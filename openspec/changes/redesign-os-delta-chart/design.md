## Context

OS vs Hardware chart atualmente usa `getOSvsHardwareScatterData()` para gerar `{points, hwLabels}`. Em Delta %, exibe todos hardwares como eixo Y com OS como barras. O modelo de seleção múltipla (checkboxes) é inadequado porque o usuário precisa comparar OSes dentro de UM hardware, não entre vários.

## Goals / Non-Goals

**Goals:**
- Delta % no OS chart mostra 1 hardware por vez, todos OS como barras divergentes
- Combobox "Hardware" substitui modal de checkboxes
- Baseline dropdown filtra OS para o hardware selecionado
- Baseline auto-pick = primeiro OS da lista

**Non-Goals:**
- Não alterar comportamento dos outros charts (Mesa, NVIDIA, Kernel)
- Não alterar Absolute mode do OS chart

## Decisions

| Decision | Rationale |
|---|---|
| `modelSelection.os` string única em vez de array | Só 1 hardware por vez, sem necessidade de array |
| Combobox reusa `.baseline-select` CSS | Visual consistente, sem CSS novo |
| Hardware change → auto-popula baseline | Usuário não precisa selecionar baseline manualmente a cada troca |
| Baseline limitado aos OS do hardware | Evita baseline inválido (OS que não roda naquele hardware) |

## Diagrama do fluxo

```
        ┌─ Absolute ──────────────────────────┐
        │  Normalize: [toggle]                │
        │  [chart: grouped bars, all hw+OS]   │
        └─────────────────────────────────────┘

        ┌─ Delta % ───────────────────────────┐
        │  Hardware: [Ryzen 7800X3D  v]       │  ← novo
        │  Baseline: [CachyOS            v]   │  ← filtra OS do hw
        │  [chart: diverging bars, 1 hw]      │
        │    CachyOS ████ 0%                  │
        │    Fedora     ██ +5%                │
        │    Bazzite ██ -2%                   │
        └─────────────────────────────────────┘
```

## Implementação

### State
```js
// modelSelection.os já existe como string (não array)
// baselineState.os já existe
```

### Render (delta mode)
```js
const hwPoints = allPoints.filter(p => p.hardwareLabel === selectedHw);
// Transforma em formato compatível com renderDivergingBarChart:
const deltaData = {
    points: hwPoints.map((p, i) => ({
        x: i, y: delta_pct, label: p.label,
        hardwareLabel: p.hardwareLabel,
        count: p.count, baseLabel: baselineLabel,
        origY: p.y, baseY: baseScore
    })),
    hwLabels: [selectedHw],
    baselineLabel: baselineLabel
};
renderDivergingBarChart(chartId, deltaData, vs.normalize);
```

### Combobox "Hardware"
- ID: `os-hardware`
- Populado com `data.hwLabels` de `lastSoftwareData.os`
- Event `change`: atualiza `modelSelection.os`, re-popula baseline dropdown, re-render
- Visível apenas em Delta % (já tratado pelo sistema de visibilidade)
