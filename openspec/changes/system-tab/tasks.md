## 1. Parser — Novos campos

- [x] 1.1 Confirmar índices das colunas na planilha (displayServer, desktop, storageType, gpuMaxTemp, gpuTempDelta)
- [x] 1.2 Adicionar 5 novos campos no objeto retornado por `processGvizData()`
- [x] 1.3 Adicionar 5 novos campos no objeto retornado por `processCSVData()`

## 2. HTML — Tab navigation

- [x] 2.1 Adicionar botão "System" na `tab-nav` entre Software e Community, com Lucide `monitor` icon
- [x] 2.2 Criar `<div id="tab-system" class="tab-content" data-tab="system">` no HTML
- [x] 2.3 Adicionar stats grid com 4 cards (Display Server top, Desktop top, Storage top, Hottest GPU)
- [x] 2.4 Adicionar seção "System Environment" com 3 containers de donut: Display Server, Desktop, Storage
- [x] 2.5 Adicionar seção "Thermal Performance" com 2 containers de bar: Hottest GPU, Best Cooling

## 3. CSS

- [x] 3.0 Nenhum estilo novo significativo — reusar `.stats-grid`, `.chart-container-wrapper`, `.chart-header`, `.chart-canvas-area`, `.donut-chart-canvas`

## 4. JS — Funções de agregação

- [x] 4.1 Implementar `getDisplayServerDistribution(data)` — agrupa por displayServer, retorna labels + counts
- [x] 4.2 Implementar `getDesktopDistribution(data)` — agrupa por desktop (normalizado), retorna labels + counts
- [x] 4.3 Implementar `getStorageDistribution(data)` — agrupa por storageType, retorna labels + counts
- [x] 4.4 Implementar `getHottestGPU(data, limit=10, minSamples=2)` — média de gpuMaxTemp por GPU, top N
- [x] 4.5 Implementar `getBestCooling(data, limit=10, minSamples=2)` — média de gpuTempDelta por GPU, top N (menor delta)

## 5. JS — Renderização

- [x] 5.1 Implementar `renderSystemCharts()` que chama as 5 agregações e renderiza os charts
- [x] 5.2 Chart A: Display Server — `renderDoughnutChart('displayServerChart', labels, data, colors)`
- [x] 5.3 Chart B: Desktop — `renderDoughnutChart('desktopChart', labels, data, colors)`
- [x] 5.4 Chart C: Storage — `renderDoughnutChart('storageChart', labels, data, colors)`
- [x] 5.5 Chart D: Hottest GPU — `renderHorizontalBarChart('hottestGpuChart', ...)` com showDataLabels
- [x] 5.6 Chart E: Best Cooling — `renderHorizontalBarChart('bestCoolingChart', ...)` com showDataLabels
- [x] 5.7 Integrar `renderSystemCharts()` no fluxo principal (`renderCharts()`)
- [x] 5.8 Atualizar stats grid com valores do sistema (modo mais comum + porcentagem)

## 6. Verificação

- [ ] 6.1 Testar navegação: clicar nas 4 abas e confirmar que mostram/escondem corretamente
- [ ] 6.2 Testar parser: console.log dos novos campos nos dados
- [ ] 6.3 Testar gráficos vazios: desativar colunas na planilha e ver "No data"
- [ ] 6.4 Testar normalização: Desktop com versão vs sem versão
- [ ] 6.5 Verificar que abas existentes (Hardware, Software, Community) não foram afetadas
