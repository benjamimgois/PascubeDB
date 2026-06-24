## Why

A coluna "package" da planilha indica se o benchmark foi executado via pacote nativo, Flatpak, AppImage, etc. Isso ajuda a comunidade a entender como o Pascube esta sendo distribuido e usado.

## What Changes

- Adicionar campo `packageType` ao parser (JSONP index 15, CSV index 15)
- Criar funcao `getPackageDistribution()` que agrupa por tipo de pacote
- Renderizar grafico donut "Package Distribution" na secao Community Insights
- Atualizar FALLBACK_CSV com coluna package e valores de exemplo (native, flatpak, appimage)

## Capabilities

### New Capabilities
- (nenhuma — mudança apenas de apresentação)

### Modified Capabilities
- `dashboard-community-insights`: Adicionar requisito para Package Distribution donut chart

## Impact

- `app.js`: parser (JSONP + CSV), nova funcao `getPackageDistribution()`, render no final de renderCharts()
- `index.html`: novo canvas `packageDistChart` na secao Community Insights
- `FALLBACK_CSV`: adicionar coluna package + valores de exemplo
