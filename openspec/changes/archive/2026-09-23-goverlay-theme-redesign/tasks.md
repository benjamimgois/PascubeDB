# Tasks

## 1. Paleta de Cores e Fundo Sóbrio

- [x] 1.1 Atualizar tokens de cores no `:root` em `style.css` (fundo `#111622`, cards `#161d2b`, ciano `#0ea5e9`, verde `#22c55e`, magenta `#e879f9`) e verificar aplicação no inspecionar do navegador
- [x] 1.2 Remover a animação de grid 3D (`@keyframes grid-scroll` e `.infinite-grid`) e aplicar o fundo ardósia estático em `style.css` e `index.html`, verificando visual estático sem consumo contínuo de animação

## 2. Navegação e Botões Goverlay

- [x] 2.1 Estilizar o `#tab-nav` e sub-abas com o visual Goverlay (texto semibold sem gradientes roxos de fundo, com underline deslizante ciano no item ativo) em `style.css` e verificar troca de abas
- [x] 2.2 Redesenhar os botões de ação (`.btn-primary` em ciano Goverlay sólido e `.btn-secondary` com borda técnica ardósia `#253046`) e verificar estados de hover

## 3. Toggles e Cards de Estatísticas

- [x] 3.1 Implementar a classe de toggle switch estilo Goverlay (`.goverlay-toggle` com pílula verde vibrante e indicador "ON") em `style.css` e aplicar nos filtros de opções
- [x] 3.2 Manter o layout clássico de cards de estatísticas em `index.html` revertendo o painel experimental de telemetria bullet-point
- [x] 3.3 Estilizar os cards de estatísticas em `style.css` com bordas de 10px e ícones nas novas cores Goverlay (Ciano, Verde, Magenta)
- [x] 3.4 Validar a integridade da atualização dinâmica dos dados dos cards em `app.js`

## 4. Gráficos Chart.js e Validação

- [x] 4.1 Harmonizar as cores de dados no `app.js` (`SCORE_COLORS`, séries de CPU em ciano Goverlay, GPU em verde, tooltips em ardósia com borda ciano) e verificar gráficos renderizados
- [x] 4.2 Executar validação visual completa do dashboard em diferentes larguras de tela (desktop e mobile) para garantir legibilidade e contraste
