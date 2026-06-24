# PascubeDB

Dashboard web de benchmarks Linux orientado pela comunidade. Dados em tempo real do Google Sheets, visualizações interativas com Chart.js.

## Stack

- **UI**: HTML5 + CSS3 + JS vanilla (sem bundlers, sem frameworks)
- **Ícones**: Lucide (CDN via unpkg)
- **Gráficos**: Chart.js (CDN via jsdelivr)
- **Dados**: Google Sheets (JSONP via `gviz/tq`) + fallback CSV embutido
- **Deploy**: GitHub Pages (`benjamimgois.github.io/PascubeDB`)

## Estrutura

```
PascubeDB/
├── index.html          # Estrutura da página + modais
├── style.css           # Design system dark mode (glassmorphism)
├── app.js              # Toda a lógica do dashboard (~1600 linhas)
├── CLAUDE.md           # Este arquivo
├── openspec/           # Especificações OpenSpec
│   ├── config.yaml
│   ├── specs/          # Specs ativos
│   └── changes/        # Changes (propostas, design, tasks)
├── .agent/             # Workflows do agente
│   ├── skills/
│   └── workflows/
├── .agents/rules/      # Regras do agente
└── .opencode/          # Configs OpenCode
    ├── commands/
    └── skills/
```

## Arquivos principais

### `app.js` — Lógica do dashboard
- **Fetch**: `fetchGoogleSheetDataJSONP()` → JSONP via Google Visualization API
- **Parsing**: `processGvizData()` + `processCSVData()` + `parseCSV()`
- **Dados**: Array `benchmarkData[]` de objetos com `{user, cpu, ram, gpu, vram, driver, kernel, os, mainScore, cpuSingle, cpuMulti, gpuScore, dateTime, clientId}`
- **Filtros**: `handleFilterChange()` — busca textual + dropdowns (OS, CPU, GPU, RAM, VRAM)
- **Ordenação**: `handleSort()` / `sortData()` — todas colunas clicáveis
- **Tabela**: `renderTable()` — tabela no modal com rank, client ID copiável, badges
- **Gráficos**: `renderCharts()` → Chart.js (bar charts, donuts)
  - Seções: Overview → Demographics → Advanced → Mobile → Community Insights
- **Helpers**: `cleanNumber()`, `parseGB()`, `parseDate()`, `normalizeCPU()`, `normalizeGPU()`
- **Classificação**: `classifyDevice()` — Handheld / Notebook / Desktop
- **Fallback**: `FALLBACK_CSV` constante com dados estáticos (110 registros)

### `index.html` — Estrutura
- Header com logo + botões (Leaderboard modal + Sync)
- Stats grid (4 cards: top scores + total runs)
- Charts section (main overall, CPU single, CPU multi, GPU top 10)
- Demographics section (popularidade CPU/GPU, OS/VRAM/RAM donuts)
- Advanced section (médias CPU/GPU, versões Mesa/Kernel/NVIDIA)
- Mobile section (handheld vs notebook, OS mobile, top mobile)
- Community Insights section (pageviews, contributors, daily activity)
- Modal do leaderboard com filtros e tabela sortável

### `style.css` — Design System
- **Tema**: Dark mode (`--bg-color: #0b0f19`)
- **Estilo**: Glassmorphism com `backdrop-filter: blur()`
- **Cards**: `border-radius: 16px`, sombras, hover com glow
- **Grid**: CSS Grid responsivo em todas seções
- **Modal**: `<dialog>` com `::backdrop` blur, scroll interno
- **Tipografia**: Outfit (headings) + Inter (body), monospace para IDs
- **Responsivo**: Breakpoints 1024px e 768px

## Convenções

- **Nomes**: camelCase para funções e variáveis
- **IDs HTML**: kebab-case (`leaderboard-btn`, `search-input`)
- **Classes CSS**: kebab-case com prefixo semântico
- **Dados nulos**: Representados como `'N/D'`, tratados com `cleanNumber()`
- **CSV**: Parsing manual com suporte a quotes encapsulados
- **Fallback**: Sempre tentar Google Sheets primeiro, fallback CSV se falhar
- **Ícones**: Lucide via `data-lucide` attributes + `lucide.createIcons()`

## Build / Setup

Sem build step. Projeto 100% estático — abre direto no browser ou via GitHub Pages.

```bash
# Servir localmente
python3 -m http.server 8000
```

## Testes

Não há testes automatizados. Validação manual no navegador.

## Fluxo de desenvolvimento

Usa OpenSpec para gerenciar mudanças:

1. `opsx-explore` — Investigar problema/ideia
2. `opsx-propose` — Criar proposta com design + tasks
3. `opsx-apply` — Implementar tasks
4. `opsx-archive` — Arquivar change completo

## Observações

- Números com vírgula como separador decimal (ex: `"3,909"`) são limpos por `cleanNumber()`
- GPUs `"Graphics"` (genérico) são mapeadas para `RX Vega` ou `Radeon Graphics` conforme CPU
- CPUs/Custom APU 0405 são normalizadas para `Steam Deck`
- Handheld detection usa regras heurísticas de CPU/GPU/OS/kernel strings
- Mobile averages excluem GPUs desktop dedicadas para não distorcer comparação
