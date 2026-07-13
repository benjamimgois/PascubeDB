## Context

Seção "Portable Devices" atualmente renderiza charts para 3 categorias: Notebook, Handheld, SBC. Cada categoria tem runs, CPU, GPU, OS distribution e thermal charts. SBC tem pouquíssimos submits — seus charts ficam vazios ou com 1-2 barras, ocupando espaço sem valor informativo.

## Goals / Non-Goals

**Goals:**
- Renomear seção "Portable Devices" → "Mobile Devices"
- Unificar Notebook + SBC em categoria "Mobile" em todos os charts
- Remover charts específicos de SBC
- Manter Handheld como categoria separada
- Ajustar grid de 3 colunas para 2 colunas onde necessário

**Non-Goals:**
- Não alterar `classifyDevice()` — SBC ainda existe como classificação interna
- Não alterar charts de eficiência, bottleneck, ou outros fora da seção mobile

## Decisions

### Decision 1: `classifyDevice()` unchanged — merge no consumo

`classifyDevice()` continua retornando 'Notebook', 'SBC', 'Handheld', 'Desktop'. A unificação acontece nas funções que consomem a classificação, filtrando `['Notebook', 'SBC']` como "Mobile". Isso permite reverter facilmente no futuro se SBC crescer.

### Decision 2: Novas funções helper `getTopMobile*`

Criar `getTopMobileRuns()`, `getTopMobileCPUs()`, `getTopMobileGPUs()` que filtram `['Notebook', 'SBC']` combinados. Reaproveitam a lógica existente das funções Notebook/SBC.

### Decision 3: `getMobileDistribution` retorna "Handheld" vs "Mobile"

Agrupa counts de Notebook + SBC sob label "Mobile".

### Decision 4: `renderCategoryCharts` reduzido para 2 chamadas

Em vez de 3 chamadas (Notebook, Handheld, SBC), passa a chamar só 2: Handheld e Mobile. Mobile usa as novas `getTopMobile*` helpers.

### Decision 5: Thermal charts mesclados

`renderCatChart` / `renderCatChartClosure` para Notebook + SBC substituídos por um único chart "Mobile Thermal Load".

### Decision 6: HTML e CSS

- Section title: "Portable Devices" → "Mobile Devices"
- "Portable Device Type" → "Mobile Device Type"
- Remover 3 containers de SBC (runs, CPU, GPU)
- Grid `.portable-runs-grid` ajustado de 3 colunas implícitas para 2
- Grid `.portable-thermals-grid` ajustado de 3 colunas para 2

## Risks / Trade-offs

- **Perda de visibilidade SBC**: Se SBC crescer no futuro, precisará de um novo change para desmembrar. Aceitável — cenário atual não justifica manutenção.
- **Mistura de performance**: Notebooks vão dominar o top 10 Mobile. SBCs dificilmente aparecerão. Se houver demanda futura, dá pra reavaliar.
- **Product name SBC**: Atualmente SBC runs mostram product name (ex: "Raspberry Pi 5 Rev 1.0"). No merge, isso some. Aceitável dado o volume baixo.
