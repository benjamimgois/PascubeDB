## Context

Software Comparison section currently renders 4 scatter charts (OS vs Hardware, Mesa vs GPU, NVIDIA vs GPU, Kernel vs CPU) using fixed dot plots with absolute scores. Users cannot distinguish variability within a group, compare percentage improvements, or normalize across different hardware tiers. The 3 driver/kernel charts use `renderDriverScatterChart()` which shares the same structure as the OS scatter.

## Goals / Non-Goals

**Goals:**
- Add controls panel: visualization mode (absolute/delta), chart type (scatter/box-plot), normalize switch
- Box plot for OS vs Hardware showing median, Q1, Q3, min, max per OS per hardware column
- Delta mode: baseline = oldest driver version, green/red diverging bars for gain/regression
- Normalized mode: best score per hardware = 100%, others relative
- All controls interactive (no page reload)

**Non-Goals:**
- Não alterar charts de outras seções (Highest Scores, Demographics, etc.)
- Não adicionar dependências npm — Chart.js vanilla + Canvas API para box plot

## Decisions

- **Box Plot via Canvas API**: Chart.js não tem box plot nativo. Renderizar box plots manualmente usando a Canvas API (retângulos para Q1-Q3, linha para mediana, whiskers). Os scatter dots existentes podem coexistir como overlay opcional.
- **Delta bars via Chart.js bar chart type**: Para delta mode, converter datasets para valores percentuais e usar `type: 'bar'` com `indexAxis: 'y'` para barras divergentes. Cores condicionais (green if >0, red if <0) via `backgroundColor` callback.
- **Painel de controles**: HTML com segment buttons (radio inputs estilizados) + switch. JS escuta `change` events e re-renderiza os charts afetados.
- **Estado global**: Objeto `vizState = { mode: 'absolute', chartType: 'scatter', normalize: false }`. Charts da Software Comparison lêem desse estado antes de renderizar.
- **Normalized scale**: Pós-processamento dos datasets — cada grupo de hardware normaliza seu score relativo ao max do grupo.

## Risks / Trade-offs

- **Box Plot performance**: Calcular percentis (Q1, Q3) requer sorting de arrays para cada (hardware, OS). Dados < 1000 rows → acceptable. → Mitigação: usar quick select ou sort pequenos arrays.
- **Delta baseline ambiguity**: Se a versão mais antiga tem poucas amostras, baseline pode ser instável. → Mitigação: exigir min 3 amostras para considerar baseline.
- **Controles afetam só Software Comparison**: Outros charts não reagem. UX clara via labels.
