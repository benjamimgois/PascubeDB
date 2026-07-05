## Why

CPU e GPU brand charts mostram "Others" para hardware perfeitamente identificável: Athlon Gold 3150U (AMD), Pro V620 e Pro VII (AMD Radeon Pro). Keywords de matching estão incompletas — "athlon" é AMD, "Pro V" e "Pro VII" são AMD Radeon Pro.

## What Changes

- Adicionar `athlon` aos keywords AMD em `getCPUBrandDistribution`
- Adicionar padrões para linhas de GPU AMD Radeon Pro (`pro v`, `pro vii`, `radeon pro`) em `getGPUBrandDistribution`
- Nenhuma mudança de API, lógica de negócio, ou comportamento visível além da reclassificação correta

## Capabilities

### New Capabilities

Nenhuma. Trata-se de correção de bugs na classificação existente, sem nova funcionalidade.

### Modified Capabilities

Nenhuma. O comportamento em nível de spec (contagem de brands) não muda — apenas a precisão da classificação interna.

## Impact

- `app.js:1889-1906` — `getCPUBrandDistribution()`: adicionar `athlon` ao regex AMD
- `app.js:1910-1934` — `getGPUBrandDistribution()`: adicionar padrões para AMD Radeon Pro
- Nenhum impacto em outras funções, dados, ou testes
