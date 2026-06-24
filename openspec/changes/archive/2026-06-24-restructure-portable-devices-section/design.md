## Context

Seção "Portable devices" tem 3 categorias (Notebook/Handheld/SBC) mas organiza charts de forma mista (comparativos + agrupados por tipo de chart). Resultado: usuario precisa escanear varios charts pra comparar a mesma metrica entre categorias.

## Goals / Non-Goals

**Goals:**
- Renomear seção para "Portable devices"
- Reorganizar em 3 subsections paralelas (Notebook / Handheld / SBC)
- Cada subsection com 4 charts: Top 10 Runs, OS Distribution, Top 10 CPU, Top 10 GPU
- Remover charts comparativos antigos (mobile distribution donut, averages grouped bar)
- Manter device type distribution chart renomeado

**Non-Goals:**
- Nao alterar dados ou logica de classificacao
- Nao modificar outras secoes do dashboard

## Decisions

- **Layout**: 3 subsections em grid de 3 colunas, cada uma com 4 charts empilhados (full-width dentro da subsection)
- **Device Type Chart**: Donut "Portable device type" no topo da secao, antes das subsections
- **Data functions**: Reaproveitar `getTopHandheldRuns()`, `getTopSbcRuns()`, `getHandheldOSDistribution()` e criar equivalentes para Notebook. CPU/GPU averages filtrados por categoria.
- **Chart titles**: Prefixo "Top 10 {Notebook|Handheld|SBC}" para clareza

## Risks / Trade-offs

- [Repeticao] 12 charts (3 categorias x 4 charts) pode aumentar densidade visual. Layout em 3 colunas mitiga.
- [Dados esparsos] SBCs tem poucos registros (2 no fallback). Charts SBC podem ficar vazios — mostrar "No data" state.
