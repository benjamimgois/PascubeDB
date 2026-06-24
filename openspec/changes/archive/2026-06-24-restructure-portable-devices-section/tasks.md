## 1. HTML — Renomear Seção e Adicionar Subsections

- [x] 1.1 Renomear "Mobile and SBC Devices" para "Portable devices" e atualizar subtitulo
- [x] 1.2 Renomear "Mobile Device Type" para "Portable device type"
- [x] 1.3 Remover charts antigos: mobile averages, mobile CPU/GPU performance, mobile OS donut, handheld OS donut
- [x] 1.4 Adicionar subsection Notebook com 4 charts: Top 10 Notebook Runs, Notebook OS, Top 10 Notebook CPU, Top 10 Notebook GPU
- [x] 1.5 Adicionar subsection Handheld com 4 charts: Top 10 Handheld Runs, Handheld OS, Top 10 Handheld CPU, Top 10 Handheld GPU
- [x] 1.6 Adicionar subsection SBC com 4 charts: Top 10 SBC Runs, SBC OS, Top 10 SBC CPU, Top 10 SBC GPU

## 2. CSS — Grid das Subsections

- [x] 2.1 Adicionar grid `.portable-category-grid` (3 colunas) para as subsections
- [x] 2.2 Adicionar regras responsivas para 1024px e 768px

## 3. app.js — Funções de Dados por Categoria

- [x] 3.1 Criar `getNotebookOSDistribution(data)` — filtrar Notebook e aplicar getOSDistribution
- [x] 3.2 Criar `getTopNotebookRuns(data)` — top 10 Main Scores de Notebooks
- [x] 3.3 Criar `getTopCategoryCPUs(data, category, limit)` — função genérica: filtrar por `classifyDevice(r) === category`, agrupar CPU, media de cpuSingle
- [x] 3.4 Criar `getTopCategoryGPUs(data, category, limit)` — similar para GPU, com exclusão de GPUs desktop para Notebook

## 4. app.js — RenderCharts

- [x] 4.1 Atualizar chart de device type: renomear titulo para "Portable device type"
- [x] 4.2 Remover render dos charts antigos: mobile averages, mobile CPU/GPU, mobile OS, handheld OS
- [x] 4.3 Renderizar "Top 10 Notebook Benchmark Runs", "Notebook OS", "Top 10 Notebook CPU", "Top 10 Notebook GPU"
- [x] 4.4 Renderizar "Top 10 Handheld Benchmark Runs", "Handheld OS", "Top 10 Handheld CPU", "Top 10 Handheld GPU"
- [x] 4.5 Renderizar "Top 10 SBC Benchmark Runs", "SBC OS", "Top 10 SBC CPU", "Top 10 SBC GPU"

## 5. Verificação

- [ ] 5.1 Abrir index.html no browser e confirmar que dados carregam (fallback CSV)
- [ ] 5.2 Confirmar titulo da seção "Portable devices"
- [ ] 5.3 Confirmar 3 subsections (Notebook/Handheld/SBC) com 4 charts cada
- [ ] 5.4 Confirmar charts antigos nao aparecem mais
