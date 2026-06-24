## Context

Dashboard atualmente classifica dispositivos como Desktop, Notebook ou Handheld. Planilha agora tem coluna "architecture" (x86_64, aarch64). Dispositivos aarch64 (SBCs) ficam sem classificação. Precisamos detecta-los e adicionar charts especificos.

## Goals / Non-Goals

**Goals:**
- Parse coluna `architecture` do JSONP e CSV fallback
- Adicionar classificação "SBC" via `classifyDevice()` para aarch64
- Renomear seção "Mobile Devices" para "Mobile and SBC Devices"
- Incluir SBCs nos graficos de tipo de dispositivo e medias
- Novos charts: "SBCs Operating Systems" (donut) e "Top 10 SBC - Overall" (bar)
- Atualizar FALLBACK_CSV com coluna architecture

**Non-Goals:**
- Nao alterar graficos de CPU/GPU populares ou demografia geral
- Nao adicionar benchmarks especificos de SBC (single/multi/gpu) — apenas Main Score

## Decisions

- **classifyDevice()**: Nova condição para architecture === 'aarch64' → 'SBC'. Ordem: Handheld > SBC > Notebook.
- **Mobile averages**: SBC entra no calculo como terceira categoria (Handheld/SBC/Notebook), com filtro similar de exclusão de GPUs desktop.
- **renderCharts()**: Charts existentes de tipo de dispositivo e medias ganham terceira barra/fatia. Novos charts renderizados no fim da seção.
- **Parser**: Coluna architecture esperada na posição 14 do CSV (indice 14), campo 14 do JSONP.
- **Fallback CSV**: Adicionar registros aarch64 exemplares com architecture preenchida.

## Risks / Trade-offs

- [Dados inconsistentes] Se architecture nao vier preenchida, dispositivo cai como Desktop (comportamento atual). Codigo trata como fallback seguro.
- [SBC com GPU desktop] Pouco provavel em aarch64, mas filtro de exclusão de GPUs desktop nos averages se aplica tambem a SBCs.
