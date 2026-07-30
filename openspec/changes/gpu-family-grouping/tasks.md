## 1. GPU Family Classifier

- [x] 1.1 Criar `classifyGPUFamily(normalizedName)` em app.js que mapeia nome normalizado de GPU para nome canônico de família usando regex de prefixo numérico
- [x] 1.2 Implementar detecção de Mobile antes de Desktop (checar sufixo `Mobile`/`Laptop` primeiro)
- [x] 1.3 Retornar `null` para GPUs não classificáveis (Steam Deck, Mali, VideoCore, integradas genéricas)
- [x] 1.4 Suportar todas as famílias do spec: RX 500, RX Vega, RX 5000, RX 6000, RX 7000, RX 9000, GTX 900, GTX 10, GTX 16, RTX 20, RTX 30, RTX 40, RTX 50, RTX 30/40/50 Mobile, Arc A-Series, Arc B-Series

## 2. Agregação por Família no Scatter Data

- [x] 2.1 Modificar `getDriverScatterData()` para agrupar runs por `classifyGPUFamily(normalizeGPU(r.gpu))` ao invés de `normalizeGPU(r.gpu)`
- [x] 2.2 Excluir runs cuja família é `null` do dataset
- [x] 2.3 Implementar agregação mean-of-means: para cada família+versão, calcular média por modelo, depois média das médias
- [x] 2.4 Adicionar `familyModelMap` ao retorno de `getDriverScatterData()`: `{ family: [{ model, samples }] }` com contagem de samples por modelo por versão
- [x] 2.5 Ajustar paginação e ordenação para usar labels de família (4 famílias por página, ordenadas por avg score descendente)

## 3. Tooltip com Composição da Família

- [x] 3.1 Modificar `renderHardwareComparisonBars()` para armazenar `familyModelMap` no chart instance
- [x] 3.2 Atualizar callback de tooltip para exibir nome da família, versão, score e lista de modelos com sample count
- [x] 3.3 Para família com 1 modelo: tooltip mostra modelo sem breakdown adicional

## 4. Winner Card

- [x] 4.1 Modificar `getAbsoluteWinners()` para usar `classifyGPUFamily()` como chave de hardware ao invés de `normalizeGPU()`
- [x] 4.2 Excluir famílias null do cálculo de winners
- [x] 4.3 Ajustar shrinkage estimator se necessário para o novo agrupamento

## 5. Validação

- [ ] 5.1 Testar com FALLBACK_CSV: verificar que famílias aparecem corretamente nos charts Mesa e NVIDIA
- [ ] 5.2 Verificar que gráfico Mesa mostra apenas famílias AMD (RX 5000~9000, RX Vega, RX 500)
- [ ] 5.3 Verificar que gráfico NVIDIA mostra apenas famílias NVIDIA (GTX 900~16, RTX 20~50)
- [ ] 5.4 Verificar que famílias Mobile aparecem separadas das desktop
- [ ] 5.5 Verificar que GPUs não classificáveis (Steam Deck, Mali, VideoCore) não aparecem nos charts
- [ ] 5.6 Verificar tooltip exibe composição correta de modelos por família
- [ ] 5.7 Verificar Delta Mode funciona com famílias
- [ ] 5.8 Verificar paginação (prev/next) com famílias
