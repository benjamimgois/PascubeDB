## 1. HTML — Renomear seção e remover charts SBC

- [ ] 1.1 Renomear heading "Portable Devices" → "Mobile Devices" e description (index.html:303-308)
- [ ] 1.2 Renomear "Portable Device Type" e atualizar descrição do donut (index.html:311-312)
- [ ] 1.3 Remover container do chart "Top 10 SBC Benchmark Runs" (index.html:349-363)
- [ ] 1.4 Atualizar grid: mudar classe `portable-runs-grid` para refletir 2 colunas (index.html:318, 365)
- [ ] 1.5 Renomear "Notebook Thermal" → "Mobile Thermal" e remover SBC thermal container (index.html:544-577)

## 2. CSS — Ajustar grids de 3 para 2 colunas

- [ ] 2.1 Ajustar `.portable-runs-grid` para 2 colunas (style.css:~854)
- [ ] 2.2 Ajustar `.portable-thermals-grid` para 2 colunas (style.css:~861)
- [ ] 2.3 Ajustar media queries para `.portable-runs-grid` e `.portable-thermals-grid` (style.css:~1753, ~1808)

## 3. app.js — Funções helper da categoria Mobile

- [ ] 3.1 Criar `getTopMobileRuns()` que filtra `['Notebook', 'SBC']` combinados (app.js:~2300)
- [ ] 3.2 Criar `getTopMobileCPUs()` que filtra `['Notebook', 'SBC']` para CPU averages
- [ ] 3.3 Criar `getTopMobileGPUs()` que filtra `['Notebook', 'SBC']` para GPU averages (com exclusão de GPUs desktop)
- [ ] 3.4 Atualizar `getMobileDistribution()` para agrupar Notebook+SBC como "Mobile" (app.js:~2184-2195)

## 4. app.js — renderCategoryCharts atualizado

- [ ] 4.1 Substituir chamada SBC por chamada Mobile em `renderCategoryCharts` (app.js:~4141-4143)
- [ ] 4.2 Atualizar labels dos charts de "Notebook" para "Mobile" nos headers dos charts renderizados

## 5. app.js — Charts térmicos

- [ ] 5.1 Atualizar `renderCatChart`: substituir Notebook + SBC por um único Mobile thermal chart (app.js:~3135-3137)
- [ ] 5.2 Atualizar `renderCatChartClosure`: substituir Notebook + SBC por Mobile (app.js:~4999-5001)

## 6. app.js — OS distribution

- [ ] 6.1 Atualizar `getMobileOSDistribution()` se necessário — já filtra `['Handheld', 'SBC', 'Notebook']`, renomear label no consumo

## 7. Verificar

- [ ] 7.1 Abrir dashboard e conferir seção renomeada "Mobile Devices"
- [ ] 7.2 Conferir donut mostra "Handheld vs Mobile"
- [ ] 7.3 Conferir Top 10 Mobile Runs (Notebook+SBC combinados)
- [ ] 7.4 Conferir charts CPU/GPU mobile funcionando
- [ ] 7.5 Conferir chart térmico Mobile
- [ ] 7.6 Conferir Handheld ainda separado e intacto
