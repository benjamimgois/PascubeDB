## Why

Os scatter charts e bar charts da seção Software Comparison mostram apenas pontuações absolutas, dificultando identificar tendências de performance quando hardwares de diferentes capacidades são comparados. Falta também uma visualização de variabilidade (box plot) e a capacidade de ver ganhos/regressões percentuais entre versões de drivers.

## What Changes

- **Novo painel de controles** abaixo dos stats cards: toggle Modo de Visualização (Absoluta / Delta %) + toggle Tipo de Gráfico (Pontos / Box Plot) + switch Normalizar Escala (Melhor=100%)
- **Box Plot** substitui Dot Plot em OS vs. Hardware quando selecionado, mostrando mediana, quartis e whiskers por OS
- **Visão Delta %** nos gráficos de driver/kernel: baseline = versão mais antiga, barras divergentes mostram ganho (verde) ou regressão (vermelho)
- **Escala Normalizada** (Melhor=100%) equaliza visualmente GPUs/CPUs de diferentes capacidades

## Capabilities

### New Capabilities
- `viz-controls-panel`: Painel de controles de visualização (modo, tipo de gráfico, escala normalizada)
- `box-plot-chart`: Renderização de gráfico Box Plot para OS vs. Hardware
- `delta-analysis`: Visão Delta % com barras divergentes para driver/kernel charts
- `normalized-scale`: Escala normalizada (Melhor=100%) para driver/kernel charts

### Modified Capabilities
- `software-comparison`: Adicionar novos modos de visualização (delta, normalizado, box plot) aos charts existentes

## Impact

- `index.html`: novo painel de controles + containers para box plot
- `app.js`: novas funções de renderização (box plot, delta bars, scaling) + lógica de toggles
- `style.css`: estilos para novos controles e gráficos
- Nenhuma dependência nova (Chart.js já incluso, suporta box plot via plugin ou custom)
