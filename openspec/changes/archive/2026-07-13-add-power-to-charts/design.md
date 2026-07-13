## Context

`renderHorizontalBarChart()` em `app.js:5557` já suporta exibição de texto central nas barras via parâmetros `freqs`, `gpuFreqs`, e `centerScore`. Atualmente mostra apenas frequência (`4200 MHz`). Não há suporte para exibir potência (TDP) — dados que agora existem nas colunas AD (cpuMaxPower) e AE (gpuMaxPower) da planilha.

## Goals / Non-Goals

**Goals:**
- Parse `cpuMaxPower` e `gpuMaxPower` dos dois parsers (JSONP + CSV)
- Renderizar `freq MHz / power W` no centro das barras em todos os charts que exibem frequência
- Tooltip atualizado com o valor de potência
- Fallback para comportamento atual quando power for null

**Non-Goals:**
- Não alterar charts de donut/pizza (OS, RAM, VRAM, brand distribution)
- Não alterar charts de popularidade (cpuPopularChart, gpuPopularChart) — não exibem frequência
- Não alterar charts de eficiência (CPU/GPU Efficiency) — já têm formato próprio

## Decisions

### Decision 1: Novo parâmetro `power` em vez de reusar `centerScore`

`centerScore` renderiza como `score / freq MHz`. O formato desejado é `freq MHz / power W`. Usar `centerScore` com power forçaria inversão da ordem ou lógica condicional confusa.

**Alternativa considerada**: Reusar `centerScore` alterando a ordem de exibição. Rejeitado porque quebraria o comportamento existente de `centerScore` em outros contextos.

### Decision 2: Dois novos parâmetros: `power` (CPU) e `gpuPower` (GPU)

Cada um pareia com seu respectivo parâmetro de frequência: `freqs → power`, `gpuFreqs → gpuPower`.

```
renderHorizontalBarChart(
  ..., freqs, freqLabel, gpuFreqs,      // existentes
  ..., power, gpuPower                   // novos
)
```

### Decision 3: Lógica de renderização central

```
centerText = '';

// CPU freq + CPU power
if (cpuFreq && cpuPower)
  centerText = `${cpuFreq} MHz / ${cpuPower} W`;

// GPU freq + GPU power (sobrescreve se ambos existirem no chart misto)
if (gpuFreq && gpuPower)
  centerText = `${gpuFreq} MHz / ${gpuPower} W`;

// Caso misto (mainOverallChart) com CPU+GPU: mostra ambas as duplas
if (cpuFreq && gpuFreq && cpuPower && gpuPower)
  centerText = `${cpuFreq} MHz / ${cpuPower} W  |  ${gpuFreq} MHz / ${gpuPower} W`;

// Fallbacks: freq only, ou vazio
```

### Decision 4: mainOverallChart — dupla CPU+GPU

Por ter dois hardwares na mesma barra (CPU + GPU), exibe ambos os pares: `cpuFreq / cpuPower  |  gpuFreq / gpuPower`. Se algum power faltar, mostra apenas seu par de frequência.

### Decision 5: Tooltip

Adicionar linha no tooltip: `CPU Max Power: <value> W` ou `GPU Max Power: <value> W` conforme o chart.

### Decision 6: makeChartScrollable

O wrapper `makeChartScrollable` (usado por cpuAverageChart e gpuAverageChart) precisa propagar `power`/`gpuPower` para `renderHorizontalBarChart` e manter sincronia no scroll.

## Risks / Trade-offs

- **Comprimento do texto central**: `4200 MHz / 28 W` é ~30-40% maior que `4200 MHz`. Em barras curtas (dados baixos), o texto pode não caber dentro da barra e será deslocado pra fora — comportamento já tratado pelo algoritmo de overlap existente.
- **mainOverallChart com 4 valores**: `4200 / 28 | 2550 / 115` pode ficar apertado. O overlap handler existente decide se desloca pra fora. Aceitável.
- **Dados ausentes**: Se muitos registros não tiverem power, a feature fica invisível (fallback silencioso). Aceitável — não quebra nada.
