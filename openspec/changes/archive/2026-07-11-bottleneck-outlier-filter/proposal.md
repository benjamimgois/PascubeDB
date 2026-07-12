## Why

Bottleneck ratio charts (`cpuMulti / gpuScore`) exibem valores absurdos como 244 ou 0.01 causados por erros de digitação nos dados (ex: `1,69` em vez de `1,690`). Sem filtragem, o top 10 CPU/GPU bottlenecks fica poluído com entradas inválidas, tornando os gráficos enganosos.

## What Changes

- Adicionar filtro de sanidade no ratio bottleneck: excluir entradas com ratio < 0.1 ou > 10
- Aplicar o filtro nos 3 pontos de computação do ratio:
  - `renderBottleneckChart` (gráfico principal por GPU)
  - `renderTopCpuBottlenecks` (top 10 CPU bottlenecks)
  - `renderTopGpuBottlenecks` (top 10 GPU bottlenecks)
- Nenhuma mudança na UI, dados crus continuam armazenados — só o chart omite outliers

## Capabilities

### New Capabilities
- `bottleneck-outlier-filter`: Sanity filter on bottleneck ratio computation to exclude data-entry errors

### Modified Capabilities
- (none)

## Impact

- `app.js`: 3 filter calls modificados com validação extra de ratio
- Apenas charts de bottleneck afetados — demais gráficos e dados inalterados
