## Context

O dashboard possui vários gráficos de distribuição (donuts e barras de contagem) que refletem a proporção de sistemas, hardware e software na comunidade. Com a mudança na planilha permitindo múltiplos envios por `client-id`, a contagem simples de runs torna esses gráficos vulneráveis a distorção por contribuidores muito ativos. A solução é deduplicar os dados por `client-id` antes de agregar os valores de proporção.

## Goals / Non-Goals

**Goals:**
- Criar um helper reutilizável `getUniqueClientRuns(data)` que retorne apenas a run mais recente de cada `client-id`.
- Aplicar deduplicação em todos os gráficos de distribuição/proporção.
- Preservar os gráficos de ranking e performance que devem continuar considerando todos os envios.
- Documentar o comportamento nas specs afetadas.

**Non-Goals:**
- Alterar leaderboard, top scores, médias de performance ou rankings competitivos.
- Modificar a coleta ou armazenamento dos dados brutos.
- Criar UI nova ou controles de toggle deduplicação (por enquanto).

## Decisions

- **Critério de deduplicação**: usar a run com `Date/Time` mais recente de cada `client-id`. Se houver empate ou data inválida, manter a primeira ocorrência no array.
  - *Rationale*: reflete o estado atual do sistema de cada contribuidor, evitando que testes antigos sobre-representem uma categoria.
- **Onde aplicar**: apenas nos helpers que alimentam gráficos de proporção/distribuição (`getOSDistribution`, `getCPUBrandCounts`, `getGPUBrandCounts`, `getDriverTypeCounts`, `getKernelVersionData`, `getMesaVersionData`, `getPackageDistribution`).
  - *Rationale*: charts de ranking (top scores, médias) dependem de múltiplas amostras; deduplicá-los removeria informação válida.
- **Helper centralizado**: criar `getUniqueClientRuns(data)` em `app.js` para garantir comportamento consistente.
  - *Rationale*: evita reimplementar a lógica em cada helper e facilita futuras alterações no critério de deduplicação.

## Risks / Trade-offs

- **Perda de informação histórica**: gráficos de proporção passarão a refletir apenas o último estado de cada contribuidor.
  - Mitigação: isso é o objetivo da mudança; histórico completo continua disponível em outros charts e na tabela.
- **Distorção em datasets pequenos**: se muitos clientes tiverem apenas uma run, o impacto será mínimo.
  - Mitigação: o helper é aplicado apenas onde faz sentido estatístico.
- **Risco de esquecer algum helper**: a lista de gráficos afetados é conhecida, mas novos donuts futuros podem replicar o padrão antigo.
  - Mitigação: documentar a prática nas specs e centralizar o helper.
