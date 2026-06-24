## 1. Parser — Coluna productName

- [x] 1.1 Adicionar `productName: getVal(17) || 'N/D'` em `processGvizData()`
- [x] 1.2 Adicionar `productName: row[17] || 'N/D'` em `processCSVData()`
- [x] 1.3 Atualizar header do `FALLBACK_CSV` com coluna `product name` e adicionar valores nos registros SBC

## 2. Função Auxiliar de Label SBC

- [x] 2.1 Criar `getSbcLabel(r)` — retorna `r.productName` se disponivel e nao 'N/D', senao retorna `normalizeCPU(r.cpu)`

## 3. Charts — Labels com productName

- [x] 3.1 Atualizar `getTopSbcRuns()` para usar `getSbcLabel(r)` no label
- [x] 3.2 Atualizar `renderCategoryCharts()` para SBC: labels de CPU chart usam productName quando disponivel
- [x] 3.3 Atualizar `renderCategoryCharts()` para SBC: labels de GPU chart usam productName quando disponivel

## 4. Verificação

- [ ] 4.1 Abrir index.html e confirmar que charts SBC mostram product name nos labels
