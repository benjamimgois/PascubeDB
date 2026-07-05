## Context

Two brand classification functions (`getCPUBrandDistribution`, `getGPUBrandDistribution`) em `app.js` usam keyword matching para categorizar hardware. Gaps identificados:

- `athlon` não está na lista AMD de CPU → Athlon Gold cai em "Other"
- AMD Radeon Pro GPUs (Pro V620, Pro VII, etc.) não são capturadas → caem em "Other"

## Goals / Non-Goals

**Goals:**
- `Athlon Gold 3150U` classificado como AMD
- `Pro V620` e `Pro VII` classificados como AMD
- Manter compatibilidade reversa — nenhuma classificação existente pode mudar

**Non-Goals:**
- Não adicionar suporte a novas vendors (ex: Qualcomm, IBM)
- Não refatorar o sistema de classificação para regex ou lookup table
- Não modificar outros gráficos ou lógicas

## Decisions

| Decisão | Alternativa | Motivo |
|---------|-------------|--------|
| Adicionar `athlon` à lista AMD CPU | Usar lookup table externa | Mínima mudança, segue padrão existente do código |
| Adicionar `pro v` e `radeon pro` à lista AMD GPU | Detectar por vendor string no driver | Mais frágil; nome do produto é mais confiável |

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Falso positivo: `Pro` em GPU não-AMD (ex: Intel Pro) | Só adicionar padrões específicos (`pro v`, `radeon pro`), não `pro` genérico |
| Athlon vs. Intel Atom conflito | `athlon` só aparece em CPUs AMD; nenhum overlap com Intel |
