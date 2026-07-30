## Why

Os gráficos "Mesa Driver vs. GPU" e "NVIDIA Driver vs. GPU" exibem atualmente cada modelo de GPU individualmente, gerando até 10 páginas de barras agrupadas por modelo. A granularidade excessiva torna a navegação cansativa e dilui a visão comparativa entre gerações de hardware. Agrupar GPUs por família (RX 7000, RX 9000, RTX 40, RTX 50, etc.) reduz o número de páginas para ~2 e oferece uma comparação mais significativa entre arquiteturas.

## What Changes

- As GPUs são agrupadas em famílias com base no prefixo do modelo (ex: RX 7900 XTX → RX 7000, RTX 5070 Ti → RTX 50)
- O label de cada barra no gráfico exibe o nome da família, nunca o modelo individual
- O tooltip (hover) exibe os modelos de GPU que compõem a família e o número de samples de cada um
- A agregação de scores usa **média de médias**: cada modelo dentro da família contribui igualmente, independente do número de amostras
- Modelos mobile (sufixo "Mobile") são agrupados em famílias separadas com sufixo "Mobile" (ex: RTX 40 Mobile)
- GPUs que não se encaixam em nenhuma família conhecida são excluídas do gráfico
- O Delta Mode também opera por família, usando a mesma classificação
- **BREAKING**: Remove a granularidade por modelo individual dos gráficos Mesa/NVIDIA — usuários não verão mais sua GPU específica, apenas a família

## Capabilities

### New Capabilities
- `gpu-family-classifier`: Classifica nomes normalizados de GPU em famílias (RX 500, RX Vega, RX 5000, RX 6000, RX 7000, RX 9000, GTX 900, GTX 10, GTX 16, RTX 20, RTX 30, RTX 40, RTX 50, RTX 40 Mobile, RTX 50 Mobile, Arc A-Series, Arc B-Series) ou retorna null para GPUs não classificáveis

### Modified Capabilities
- `software-comparison`: Os requisitos de agrupamento por GPU passam de "GPU model" para "GPU family". O tooltip deve exibir a composição de modelos por família. O cálculo do winner card também passa a usar família como chave de agrupamento.

## Impact

- `app.js`: Nova função `classifyGPUFamily()`, modificação em `getDriverScatterData()` para agrupar por família, modificação no tooltip de `renderHardwareComparisonBars()` para exibir modelos + samples, modificação em `getAbsoluteWinners()` para usar família
- `index.html`: Sem alterações estruturais (a UI permanece igual, apenas o conteúdo dos dados muda)
