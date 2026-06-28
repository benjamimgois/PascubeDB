## Why

Atualmente toda interface exibe o `client-id` (hash anônimo) para identificar contribuidores. Com a coluna `username` na planilha, a comunidade agora pode se identificar nominalmente. Exibir o username quando disponível humaniza a interface e incentiva a participação identificada. O `client-id` deve permanecer como fallback para envios anônimos.

## What Changes

- Criar helper `getDisplayName(run)` que retorna username se não vazio/Anonymous, senão client-id.
- Tooltips de todos os gráficos passam a exibir username quando disponível.
- Leaderboard table: coluna "Client ID" passa a exibir username quando disponível.
- Top Contributors chart: labels passam a usar username quando disponível.
- Labels de tooltip em scatter charts e hardware comparison passam a usar username.

## Capabilities

### New Capabilities
- `display-name-resolver`: Helper que resolve o nome de exibição de um contribuidor — username se preenchido e diferente de "Anonymous", caso contrário client-id.

### Modified Capabilities
- `dashboard-advanced-charts`: Tooltips de top scores e médias exibem username no lugar de client-id quando disponível.
- `dashboard-mobile-charts`: Tooltips de top mobile main scores exibem username.
- `portable-device-cpu-charts`: Tooltips de médias CPU por dispositivo portátil exibem username.
- `portable-device-gpu-charts`: Tooltips de médias GPU por dispositivo portátil exibem username.
- `dashboard-leaderboard-filters`: Coluna de identificação da tabela exibe username.

## Impact

- `app.js`: novo helper `getDisplayName(run)`, alteração em `renderTable()`, `renderHorizontalBarChart()`, `renderOSHardwareScatterChart()`, `renderHardwareComparisonBars()`, etc.
- `index.html`: header da coluna "Client ID" renomeado para "Contributor" ou mantido dinâmico.
- Nenhuma dependência externa nova.
