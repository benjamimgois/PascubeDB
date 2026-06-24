## 1. Parser — Coluna Architecture

- [x] 1.1 Adicionar campo `architecture` no objeto retornado por `processGvizData()` (campo indice 14 do JSONP)
- [x] 1.2 Adicionar campo `architecture` no objeto retornado por `processCSVData()` (coluna indice 14 do CSV)
- [x] 1.3 Atualizar `FALLBACK_CSV` — adicionar coluna "architecture" no header e preencher valores (x86_64 para registros existentes, aarch64 para exemplos SBC)

## 2. Classificação SBC

- [x] 2.1 Adicionar condição em `classifyDevice()`: se `r.architecture === 'aarch64'` retornar `'SBC'`; posicionar após Handheld e antes de Notebook
- [x] 2.2 Garantir que `classifyDevice()` leia o novo campo `architecture` do objeto

## 3. Charts Existentes — SBC como Terceira Categoria

- [x] 3.1 Em `getMobileDistribution()`, incluir SBC na contagem (Handheld/SBC/Notebook)
- [x] 3.2 Em `getMobileAverages()`, calcular medias tambem para SBCs (com filtro de exclusão de GPUs desktop)
- [x] 3.3 Atualizar `renderCharts()`: grafico "Mobile Device Type" (donut) com 3 fatias (Handheld/SBC/Notebook)
- [x] 3.4 Atualizar `renderCharts()`: grafico "Notebook vs Handheld Averages" para "Notebook vs Handheld vs SBC Averages" com 3 grupos de barras

## 4. Novos Charts — SBC Especificos

- [x] 4.1 Adicionar funcao de dados para "SBCs Operating Systems" (donut) — agregar SO de dispositivos SBC
- [x] 4.2 Adicionar funcao de dados para "Top 10 SBC - Overall" (horizontal bar) — top 10 Main Scores de SBCs
- [x] 4.3 Renderizar ambos os charts em `renderCharts()` ao final da seção mobile

## 5. HTML + CSS

- [x] 5.1 Renomear titulo da seção de "Mobile Devices" para "Mobile and SBC Devices" em `index.html`
- [x] 5.2 Adicionar canvas `sbcOsDistChart` e `sbcOverallChart` no HTML com containers apropriados
- [x] 5.3 Ajustar grid CSS se necessario para acomodar novos charts

## 6. Verificação

- [ ] 6.1 Abrir index.html no browser e confirmar que dados carregam (com fallback CSV)
- [ ] 6.2 Confirmar que dispositivos SBC aparecem no donut "Mobile Device Type"
- [ ] 6.3 Confirmar que grafico "SBCs Operating Systems" renderiza
- [ ] 6.4 Confirmar que grafico "Top 10 SBC - Overall" renderiza
- [ ] 6.5 Confirmar que medias incluem SBC no grafico de comparacao
