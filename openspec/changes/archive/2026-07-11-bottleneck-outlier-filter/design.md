## Context

Bottleneck ratio = `cpuMulti / gpuScore`. Valores normais ficam entre ~0.3 e ~3.0 para hardware real. Dados de entrada podem conter typos (ex: `1,69` → parse como 169 em vez de 1690), gerando ratios extremos que poluem os top charts.

O filtro atual só valida existência e positividade dos scores — sem verificação de sanidade.

## Goals / Non-Goals

**Goals:**
- Excluir entradas com ratio fora de [0.1, 10] dos 3 charts de bottleneck
- Manter dados crus intactos (outliers só escondidos, não deletados)
- Mínimo impacto de performance (filtro O(n) por render)

**Non-Goals:**
- Validar dados na ingestão
- Corrigir dados históricos
- Adicionar UI de configuração do阈值

## Decisions

1. **Limites fixos [0.1, 10] em vez de IQR dinâmico**
   - IQR precisaria de amostra estatística por GPU (dados esparsos)
   - Limites fixos cobrem 99% dos casos reais sem falsos positivos
   - Ratio < 0.1 significa GPU 10× mais rápida que CPU — irreal
   - Ratio > 10 significa CPU 10× mais rápida que GPU — irreal

2. **Filtro inline no `filter()` em vez de função separada**
   - Cada chart tem seu próprio pipeline de dados
   - Extrair função comum adicionaria complexidade sem ganho real (3 chamadas)
   - DRY não vale a pena aqui

3. **Ratio computado inline no filter, não pré-calculado**
   - Evita percorrer o array duas vezes (map + filter)
   - Cálculo é barato (divisão simples)

## Risks / Trade-offs

- [Falso positivo] Sistema real com ratio 0.09 (ex: CPU muito fraca + GPU top) seria excluído → improvável, hardware extremo assim não aparece na base
- [Cobertura] Google Sheets pode ter entradas com formatos diferentes do CSV → `cleanNumber` já normaliza ambos
