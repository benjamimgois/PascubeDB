## 1. Helper de resolução de nome

- [x] 1.1 Criar `getDisplayName(run)` em `app.js` que retorna username se não vazio/Anonymous, senão client-id truncado
- [x] 1.2 Testar helper com dados de exemplo

## 2. Tooltips de gráficos de performance

- [x] 2.1 Atualizar tooltips do Top 10 Main Scores para usar `getDisplayName`
- [x] 2.2 Atualizar tooltips do Top 10 CPU Single para usar `getDisplayName`
- [x] 2.3 Atualizar tooltips do Top 10 CPU Multi para usar `getDisplayName`
- [x] 2.4 Atualizar tooltips do Top 10 GPU para usar `getDisplayName`
- [x] 2.5 Atualizar tooltips de Average CPU/GPU Score para usar `getDisplayName`

## 3. Tooltips de gráficos de dispositivos portáteis

- [x] 3.1 Atualizar tooltips de Notebook/Handheld Top Main Scores para usar `getDisplayName`
- [x] 3.2 Atualizar tooltips de Notebook/Handheld/SBC CPU averages para usar `getDisplayName`
- [x] 3.3 Atualizar tooltips de Notebook/Handheld/SBC GPU averages para usar `getDisplayName`

## 4. Leaderboard

- [x] 4.1 Atualizar `renderTable` para exibir `getDisplayName` em vez de client-id puro
- [x] 4.2 Renomear header da coluna de "Client ID" para "Contributor"
- [x] 4.3 Atualizar click-to-copy para copiar `getDisplayName`

## 5. Outros pontos de exibição

- [x] 5.1 Atualizar tooltips de scatter charts (OS vs Hardware) para usar `getDisplayName`
- [x] 5.2 Atualizar tooltips de hardware comparison bars (Mesa/NVIDIA/Kernel) para usar `getDisplayName`
- [x] 5.3 Atualizar labels do Top Contributors chart para usar `getDisplayName`

## 6. Validação

- [x] 6.1 Executar `node --check app.js` para validar sintaxe
- [x] 6.2 Commit e push
