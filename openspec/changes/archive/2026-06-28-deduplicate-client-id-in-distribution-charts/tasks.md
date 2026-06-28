## 1. Helper de deduplicação

- [x] 1.1 Adicionar `getUniqueClientRuns(data)` em `app.js` que retorna apenas a run mais recente por `client-id`
- [x] 1.2 Testar helper com dados de exemplo (múltiplas runs do mesmo client-id, datas inválidas, empates)

## 2. Ajustar gráficos de distribuição

- [x] 2.1 Aplicar `getUniqueClientRuns` antes de agregar OS distribution
- [x] 2.2 Aplicar `getUniqueClientRuns` antes de agregar CPU brand distribution
- [x] 2.3 Aplicar `getUniqueClientRuns` antes de agregar GPU brand distribution
- [x] 2.4 Aplicar `getUniqueClientRuns` antes de agregar video driver distribution
- [x] 2.5 Aplicar `getUniqueClientRuns` antes de agregar Mesa version distribution
- [x] 2.6 Aplicar `getUniqueClientRuns` antes de agregar kernel version distribution
- [x] 2.7 Aplicar `getUniqueClientRuns` antes de agregar package distribution

## 3. Validação e entrega

- [x] 3.1 Executar `node --check app.js` para validar sintaxe
- [x] 3.2 Verificar no navegador que donuts de distribuição refletem uma amostra por client-id
- [x] 3.3 Confirmar que gráficos de ranking/média permanecem inalterados
- [x] 3.4 Commit e push das alterações
