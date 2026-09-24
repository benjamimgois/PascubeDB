# Proposal

## Why

O PascubeDB utiliza atualmente uma estética espacial com grid 3D animado e gradientes roxos/índigo, inspirada em dashboards SaaS genéricos. Sendo o PascubeDB um benchmark focado na comunidade de jogos no Linux, adotar a identidade visual e os componentes da interface do **Goverlay 1.9.3** (a principal ferramenta gráfica de configuração de MangoHud e OptiScaler no Linux) confere ao projeto um aspecto de "ferramenta nativa de sistema" — mais sóbrio, técnico, funcional e diretamente alinhado à cultura gamer do Linux.

## What Changes

- **Fundo Sóbrio e Estático**: Remoção da animação contínua do grid 3D rotativo (`linear-gradient` com `rotateX(65deg)`) em favor de um fundo ardósia escuro estático (`#111622`) e sóbrio.
- **Paleta de Cores do Goverlay**:
  - Fundo principal: `#111622` (Navy Slate)
  - Superfícies e Cards: `#161d2b` com bordas sutis de 1px em `#232d3f`
  - Acento Primário: Ciano Elétrico Goverlay (`#0ea5e9` / `#00a8e8`)
  - Acento de Ação/Sucesso ("ON"): Verde vibrante (`#22c55e`)
  - Acento de Versão/Destaque: Magenta/Lavanda suave (`#e879f9`)
- **Abas com Underline Ciano**: Atualização das abas principais (`#tab-nav`) e sub-abas (`.hw-tab-bar`) para exibição limpa sem fundos de botão em gradiente roxo, com underline deslizante ciano no item ativo.
- **Toggles "ON / OFF" Verdes**: Estilo de switch em pílula com indicador `ON` em verde vibrante para filtros e opções ativas.
- **Painel "Database & Software Status"**: Inclusão de um bloco de status técnico inspirado no painel de software do Goverlay, com bolinhas indicadoras (`●`), rótulos em cinza-ardósia e versões/quantidades em magenta suave.
- **Botões Técnicos**: Botão principal no estilo Goverlay `Finish` (ciano sólido com ícone e texto em negrito) e botões secundários com borda ardósia (`#253046`).
- **Gráficos (Chart.js)**: Alinhamento das séries e tooltips para respeitar a nova paleta ciano/verde/ardósia.

## Capabilities

### New Capabilities
- `goverlay-theme`: Sistema de design e componentes visuais inspirados no Goverlay 1.9.3, incluindo paleta de cores (slate/ciano/verde/magenta), switches/toggles "ON/OFF", painel de status de telemetria e botões técnicos.

### Modified Capabilities
- `dashboard-infinite-grid`: A animação rotativa e contínua do grid 3D é desativada e substituída por uma base estática e sóbria de cor ardósia escura.
- `tab-navigation`: As abas de navegação principal passam a adotar o indicador inferior ciano (underline) e tipografia de alto contraste do Goverlay, eliminando o estilo de botão com gradiente roxo.

## Impact

- `style.css`: Redefinição de variáveis CSS (`--bg-color`, `--card-bg`, `--primary`, `--card-border`, etc.), remoção das animações de `@keyframes grid-scroll`, estilização dos toggles `ON/OFF`, do painel de status e dos novos botões.
- `index.html`: Substituição da estrutura de background do grid, inclusão do painel técnico de status do banco/software, e atualização das classes das abas e botões de ação.
- `app.js`: Atualização das constantes de cores de gráficos (`SCORE_COLORS`, `AVERAGE_CHART_CONFIG`, tooltips) e alimentação dos dados do painel de status.
