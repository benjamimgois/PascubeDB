## 1. Parser — Coluna package

- [x] 1.1 Adicionar `packageType: getVal(15) || 'N/D'` em `processGvizData()`
- [x] 1.2 Adicionar `packageType: row[15] || 'N/D'` em `processCSVData()`
- [x] 1.3 Atualizar header do `FALLBACK_CSV` com coluna `package` e adicionar valores de exemplo (native, flatpak, appimage)

## 2. Função de Dados

- [x] 2.1 Criar `getPackageDistribution(data)` — agrupa por `r.packageType`, normaliza vazio como "Unknown"

## 3. HTML + Render

- [x] 3.1 Adicionar canvas `packageDistChart` na secao Community Insights (apos submissionActivityChart)
- [x] 3.2 Renderizar donut chart em `renderCharts()` usando `getPackageDistribution()`

## 4. Verificação

- [ ] 4.1 Abrir index.html e confirmar que donut "Package Distribution" aparece em Community Insights
