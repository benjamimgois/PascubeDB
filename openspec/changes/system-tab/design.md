## Context

PascubeDB tem 3 tabs (Hardware, Software, Community). A planilha foi expandida com novas colunas: Display Server, Desktop, Storage type, GPU Max Temp, GPU Temp Delta. Esses dados não são parseados nem visualizados.

A aba "System" agrupa métricas de configuração do sistema e desempenho térmico — domínios que não se encaixam perfeitamente em Hardware (benchmarks) nem Software (comparação de drivers/OS).

## Goals / Non-Goals

**Goals:**
- Nova aba "System" na navegação entre Software e Community
- Parse de 5 novos campos na carga de dados (Gviz + CSV)
- 5 gráficos em 2 seções: System Environment (3 donuts) + Thermal Performance (2 bars)
- Stats grid com 4 cards de resumo

**Non-Goals:**
- Não alterar tabs existentes (Hardware, Software, Community)
- Não adicionar filtros ou modais específicos pra aba System (futuro)
- Não adicionar suporte a Realtime ou subscriptions

## Decisions

**1. Column indices para os novos campos**

Os campos existentes terminam no index 28 (GPU Max Freq). Os novos campos devem estar nos índices 29-33.

```
Index atual: 0-28 (parser existente)
Novos:       29 = displayServer
             30 = desktop
             31 = storageType
             32 = gpuMaxTemp
             33 = gpuTempDelta
```

→ Confirmar na planilha durante implementação.

**2. Normalização de dados**

- `desktop`: pode vir com versão ("KDE Plasma 6.1" → "KDE Plasma"). Usar regex pra extrair nome base.
- `displayServer`: "Wayland", "X11", "XWayland". Manter raw.
- `storageType`: "NVMe", "SSD", "HDD", "eMMC". Normalizar lowercase.
- `gpuMaxTemp`: string numérica → `cleanNumber()`
- `gpuTempDelta`: string numérica → `cleanNumber()`

**3. Ícone da aba**

Usar `monitor` (Lucide) — já disponível no projeto. Alternativa: `settings`.

**4. Reuso de estilos**

Os gráficos usam `renderDoughnutChart` (donuts) e `renderHorizontalBarChart` (bars) — funções existentes, sem necessidade de novos renderers.

**5. Layout da aba**

```
┌────────────────────────────────────────────┐
│  Stats Grid (4 cards)                       │
│  Wayland: 82% │ KDE: 45% │ NVMe: 78% │   │
│  Hottest: RTX 4090 (82°C)                  │
├────────────────────────────────────────────┤
│  System Environment                        │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Display Svr  │ │   Desktop    │         │
│  │   (donut)    │ │   (donut)    │         │
│  └──────────────┘ └──────────────┘         │
│  ┌──────────────────────────────────┐       │
│  │       Storage type (donut)        │       │
│  └──────────────────────────────────┘       │
├────────────────────────────────────────────┤
│  Thermal Performance                        │
│  ┌──────────────────┐ ┌──────────────────┐  │
│  │   Hottest GPU    │ │   Best Cooling   │  │
│  │   (bar chart)    │ │   (bar chart)    │  │
│  └──────────────────┘ └──────────────────┘  │
└────────────────────────────────────────────┘
```

**6. Lógica dos charts**

| Chart | Função | Tipo | Agrupamento |
|-------|--------|------|-------------|
| Display Server | `getSystemDist()` | donut | Wayland / X11 / XWayland |
| Desktop | `getDesktopDist()` | donut | KDE / GNOME / Hyprland... |
| Storage | `getStorageDist()` | donut | NVMe / SSD / HDD |
| Hottest GPU | `getHottestGPU(n)` | bar | GPU com maior média de max temp |
| Best Cooling | `getBestCooling(n)` | bar | GPU com menor delta temp (mais eficiente) |

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Column indices podem estar errados | Verificar na planilha antes de implementar |
| GPU Max Temp pode vir inconsistente (string vs number) | `cleanNumber()` + fallback |
| Desktop Environment pode ter muitas variações | Normalizar por regex, agrupar "Other" |
| Dados esparsos (poucos registros preenchem os novos campos) | Gráficos mostram "No data" se vazio |
| Tab navigation spec precisa de delta spec | Criar `specs/tab-navigation/spec.md` com seção MODIFIED |

## Open Questions

- Quais os índices exatos das colunas na planilha? Verificar no Google Sheets.
- Display Server pode vir como "X11 (Wayland)" ou "Wayland (XWayland)"? Como normalizar?
- GPU Max Temp e GPU Temp Delta: são preenchidos ou opcionais?
