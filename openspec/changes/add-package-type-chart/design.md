## Context

Planilha tem coluna "package" (indice 15) com valores: native, flatpak, appimage (ou vazio). Community Insights ja tem metric cards e submission activity chart — um donut de package distribution complementa a secao.

## Goals / Non-Goals

**Goals:**
- Parse campo packageType do JSONP (getVal(15)) e CSV (row[15])
- Criar `getPackageDistribution()` que conta ocorrencias de cada tipo
- Renderizar donut chart no final da secao Community Insights
- Atualizar fallback CSV com dados de package

**Non-Goals:**
- Nao alterar graficos existentes

## Decisions

- **Parser**: `packageType: getVal(15) || 'N/D'` no JSONP, `row[15] || 'N/D'` no CSV
- **Normalizacao**: Agrupar valores vazios como "Unknown", normalizar variacoes de casing
- **Posicao**: Donut chart apos o submission activity line chart
- **Cores**: Usar paleta existente (osPalette) para consistencia

## Risks / Trade-offs

- [Dados esparsos] Maioria dos registros nao tem package preenchido → fatia "Unknown" sera grande. Esperado.
