## 1. Viz Controls Panel HTML + CSS

- [x] 1.1 Adicionar painel de controles no `index.html` com 3 controles: segment button "Modo" (Absolute / Delta), segment button "Tipo" (Scatter / Box Plot), switch "Normalizar Escala"
- [x] 1.2 Estilizar controles no `style.css`: segment buttons como pills, switch como toggle

## 2. Viz State & Event Wiring

- [ ] 2.1 Criar objeto global `vizState = { mode: 'absolute', chartType: 'scatter', normalize: false }` no `app.js`
- [ ] 2.2 Adicionar event listeners nos controles que atualizam `vizState` e chamam `renderSoftwareCharts()`

## 3. Refactor: extract Software Chart rendering

- [x] 3.1 Extrair lógica de renderização dos 4 charts da Software Comparison para função `renderSoftwareCharts()` em `app.js`
- [x] 3.2 Chamar `renderSoftwareCharts()` no fluxo de carga (dentro de `renderCharts`)

## 4. Box Plot Renderer

- [x] 4.1 Criar função `computeBoxPlotData(groups)` que calcula mediana, Q1, Q3, min, max por grupo de dados
- [x] 4.2 Criar função `renderBoxPlotChart(canvasId, data)` que desenha box plots usando Canvas API
- [x] 4.3 Implementar tooltip com estatísticas (mediana, Q1, Q3, min, max, n)

## 5. Delta Mode

- [x] 5.1 Em `renderSoftwareCharts()`, quando `vizState.mode === 'delta'`, calcular baseline (versão mais antiga) e converter datasets para delta percentual
- [x] 5.2 Renderizar Chart.js bar chart com `indexAxis: 'y'`, barras divergentes verdes/vermelhas
- [x] 5.3 Adicionar labels nas extremidades das barras com maior variação

## 6. Normalized Scale

- [x] 6.1 Quando `vizState.normalize === true`, pós-processar datasets: normalizar cada hardware para 0-100% (melhor = 100%)
- [x] 6.2 Ajustar eixo Y para mostrar porcentagem
- [x] 6.3 Tooltip mostrar % + valor absoluto original

## 7. Integration & Cleanup

- [x] 7.1 Garantir que `renderSoftwareCharts()` destrua instâncias anteriores antes de re-renderizar
- [x] 7.2 Verificar que controles só afetam Software Comparison, não outras seções
- [ ] 7.3 Testar combinações (Delta + Normalize, Box Plot + Absolute, etc.)
