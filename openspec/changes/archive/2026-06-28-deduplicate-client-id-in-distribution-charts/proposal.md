## Why

A planilha agora permite que um mesmo `client-id` envie múltiplos benchmarks. Sem deduplicação, clientes que submetem vários testes distorcem as proporções dos gráficos de distribuição — um único contribuidor com 20 envios pode parecer 20 vezes mais representativo do que realmente é. Precisamos ajustar os gráficos de proporção para considerar apenas um envio por `client-id`, refletindo a diversidade real da comunidade.

## What Changes

- Alterar todos os gráficos de distribuição/proporção para deduplicar por `client-id` antes de agregar.
- Preservar a run mais recente de cada `client-id` como a representativa para os cálculos de proporção.
- Manter os gráficos de ranking de performance (top scores, médias) inalterados — lá mais envios são válidos e desejáveis.
- Atualizar as specs afetadas para documentar o novo comportamento de deduplicação.

## Capabilities

### New Capabilities
- `client-deduplication`: Helper reutilizável que retorna apenas a run mais recente por `client-id`.

### Modified Capabilities
- `dashboard-analytics-charts`: OS distribution, CPU brand, GPU brand e video driver distribution passam a deduplicar por `client-id`.
- `dashboard-advanced-charts`: Mesa version distribution e kernel version distribution passam a deduplicar por `client-id`.
- `dashboard-community-insights`: Package distribution passa a deduplicar por `client-id`.

## Impact

- `app.js`: funções de agregação de distribuição (`getOSDistribution`, `getCPUBrandDistribution`, `getGPUBrandDistribution`, `getDriverDistribution`, `getKernelVersionData`, `getPackageDistribution`, etc.).
- `openspec/specs/`: delta specs para `dashboard-analytics-charts`, `dashboard-advanced-charts` e `dashboard-community-insights`.
- UI: nenhuma alteração visual estrutural; apenas os valores dos gráficos de distribuição mudarão.
