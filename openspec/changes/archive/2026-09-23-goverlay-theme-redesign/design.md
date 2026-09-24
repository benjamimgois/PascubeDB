# Design

## Context

See `proposal.md` for motivation. PascubeDB atualmente usa um esquema visual construído em torno de gradientes de índigo/roxo (`#6366f1` a `#a855f7`) e um grid tridimensional em movimento contínuo via CSS keyframes. A interface do Goverlay 1.9.3 apresenta uma linguagem visual de utilitário desktop voltado ao Linux gaming: fundo escuro ardósia sóbrio, acentos em ciano elétrico (`#0ea5e9`), switches verdes vibrantes (`#22c55e`), detalhes de versão em magenta suave (`#e879f9`) e painéis agrupados com bordas limpas de 1px.

## Goals / Non-Goals

**Goals:**
- Substituir o tema espacial atual pela linguagem visual do Goverlay 1.9.3.
- Remover animações pesadas de fundo e adotar um layout estático e sóbrio.
- Implementar os três componentes chave solicitados:
  1. Abas principais e sub-abas com underline deslizante ciano.
  2. Toggles estilo Goverlay (com switch pílula e estado `ON` verde vibrante).
  3. Painel de status de telemetria ("Database & Software Status") com bolinhas de status e valores em magenta.
- Harmonizar as cores de dados do Chart.js com os acentos ciano e verde.

**Non-Goals:**
- Mudar para layout de sidebar lateral (mantemos a Opção B: cabeçalho e abas no topo).
- Alterar as regras de negócio de cálculo de pontuação, agrupamento de famílias ou scraping de dados.

## Decisions

### 1. Sistema de Cores e Tokens CSS
- **Decisão**: Centralizar todos os tokens no `:root` em `style.css`:
  - `--bg-color: #111622`
  - `--card-bg: #161d2b`
  - `--card-border: #232d3f`
  - `--primary: #0ea5e9` (Ciano Goverlay)
  - `--success: #22c55e` (Verde vibrante ON)
  - `--accent-magenta: #e879f9` (Versões Goverlay)
- **Alternativa descartada**: Manter gradientes roxos nos botões e mudar apenas o fundo. Razão: Quebraria a coesão estética e não transmitiria o visual autêntico do Goverlay.

### 2. Navegação por Abas com Underline Ciano
- **Decisão**: Refatorar o container `#tab-nav` para utilizar uma barra indicadora absoluta (`.tab-nav-underline`), similar ao que já existe em `.hw-tab-underline`. A classe `.tab-btn.active` ganha cor branca sem fundo de botão, enquanto o underline ciano de 2.5px se posiciona dinamicamente via CSS/JS.
- **Alternativa descartada**: Deixar abas com borda ao redor do botão. Razão: O Goverlay usa navegação limpa com underline em seus grupos de abas superiores (`Optiscaler | Lossless Scaling`).

### 3. Componente de Toggle Goverlay
- **Decisão**: Criar a classe reutilizável `.goverlay-toggle`:
  - Container tipo checkbox customizado com slider arredondado.
  - Quando `:checked` ou `.active`, o fundo muda para `#22c55e` com texto `ON`.
  - Quando inativo, fundo `#253046` com texto `OFF` ou bolinha neutra.
- **Aproveitamento**: Aplicar nos filtros de benchmark existentes (Agrupamento por Família, Filtro de GPUs Dedicadas, etc.).

### 4. Painel Database & Software Status
- **Decisão**: Posicionar o painel como um card compacto técnico logo após o cabeçalho principal, contendo um dropdown de filtro de canal (`Canal Estável`) e métricas com bolinhas verdes e números em magenta (`#e879f9`).
- **Alimentação de Dados**: `app.js` calcula as métricas dinamicamente com base no payload JSON de benchmarks carregado.

### 5. Cores do Chart.js
- **Decisão**: Atualizar o objeto `SCORE_COLORS` em `app.js`:
  - `cpuSingle`: Ciano Goverlay `rgba(14, 165, 233, 0.85)` / border `#38bdf8`
  - `cpuMulti`: Ciano mais claro ou azul profundo
  - `gpu`: Verde vibrante Goverlay `rgba(34, 197, 94, 0.85)` / border `#22c55e`
  - Tooltips: Fundo `#111622` com borda `rgba(14, 165, 233, 0.45)`.

## Risks / Trade-offs

- **[Contraste de acessibilidade nos gráficos]** → Garantir que as bordas das barras em Chart.js tenham contraste suficiente (WCAG AA) contra o fundo `#161d2b`.
- **[Largura do underline em telas mobile]** → No CSS responsivo, caso o `#tab-nav` quebre em grid ou múltiplas linhas em telas pequenas, o underline pode ser desativado em favor de um indicador lateral ou borda inferior padrão em cada botão.

## Migration Plan

1. Atualização dos tokens de cores em `style.css`.
2. Remoção do CSS da animação de grid 3D e estilização do fundo estático.
3. Estilização do `#tab-nav` com underline ciano.
4. Criação dos estilos `.goverlay-toggle` e aplicação nos filtros.
5. Inclusão da marcação HTML e estilização do painel "Database & Software Status".
6. Atualização de `SCORE_COLORS` e tooltips em `app.js`.
