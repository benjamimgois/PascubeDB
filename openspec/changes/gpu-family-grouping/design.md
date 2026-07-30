## Context

Atualmente `getDriverScatterData()` (app.js:5739) agrupa runs por `normalizeGPU(r.gpu)`, gerando até 40 entradas de hardware distintas. `renderHardwareComparisonBars()` (app.js:5448) pagina 4 GPUs por vez. Para os charts Mesa e NVIDIA isso resulta em até 10 páginas. A granularidade é excessiva e a comparação entre gerações de hardware fica diluída.

O `getAbsoluteWinners()` (app.js:4620) usa a mesma chave `normalizeGPU()` para contar vitórias por versão de driver. Também precisa ser adaptado para usar família.

A `normalizeGPU()` (app.js:2039) já normaliza nomes (stripa vendor, `(R)`, `(TM)`, converte `Laptop GPU` → `Mobile`). A classificação por família opera sobre o nome já normalizado.

## Goals / Non-Goals

**Goals:**
- Criar `classifyGPUFamily(normalizedName)` que mapeia GPU → família ou null
- Modificar `getDriverScatterData()` para agrupar por família em vez de modelo individual
- Modificar tooltip de `renderHardwareComparisonBars()` para exibir composição de modelos por família
- Modificar `getAbsoluteWinners()` para usar família como chave
- Garantir que GPUs mobile formam famílias separadas (sufixo "Mobile")
- Excluir GPUs não classificáveis dos charts Mesa/NVIDIA

**Non-Goals:**
- Não altera outros charts (Top 10 scores, CPU popularity, etc.)
- Não altera a UI (HTML/CSS) — mesma estrutura de cards e controles
- Não altera `normalizeGPU()` — a classificação opera sobre o resultado dela
- Não cria toggle entre modo família/modelo — apenas família

## Decisions

### Decision 1: Classificação por regex de prefixo numérico

**Escolha**: Regex que captura o prefixo numérico do modelo (ex: `RX 7\d{3}` → RX 7000).

**Alternativa rejeitada**: Tabela de lookup estática com todos os modelos conhecidos. Frágil — qualquer GPU nova quebraria. Regex captura qualquer variante futura (ex: RX 7050, RTX 5050).

**Regras**:
```
RX 5xx                → RX 500        (Polaris)
RX Vega / AMD Vega    → RX Vega       (Vega)
RX 5xxx               → RX 5000       (RDNA 1)
RX 6xxx               → RX 6000       (RDNA 2)
RX 7xxx               → RX 7000       (RDNA 3)
RX 9xxx               → RX 9000       (RDNA 4)
GTX 9xx               → GTX 900       (Maxwell)
GTX 10xx              → GTX 10        (Pascal)
GTX 16xx              → GTX 16        (Turing)
RTX 20xx              → RTX 20        (Turing)
RTX 30xx              → RTX 30        (Ampere)
RTX 40xx              → RTX 40        (Ada Lovelace)
RTX 50xx              → RTX 50        (Blackwell)
Arc Axxx              → Arc A-Series  (Alchemist)
Arc Bxxx              → Arc B-Series  (Battlemage)
RTX 30xx Mobile/Laptop → RTX 30 Mobile
RTX 40xx Mobile/Laptop → RTX 40 Mobile
RTX 50xx Mobile/Laptop → RTX 50 Mobile
```

Mobile é detectado antes do desktop — se o nome contém `Mobile` ou `Laptop`, classifica como família mobile.

**Ordem de checagem**: Mobile primeiro (checa sufixo), depois desktop. Isso evita que `RTX 4070 Mobile` seja classificado como `RTX 40`.

### Decision 2: Agregação por média de médias (mean of means)

Para cada família F e versão de driver V:
1. Agrupar runs por modelo de GPU dentro da família
2. Calcular média de score por modelo: `avg(M) = sum(scores) / count(samples)`
3. Média da família: `avg(F) = sum(avg(M) for M in F) / count(models in F)`

Se a família tem 1 modelo → colapsa naturalmente para média simples.

**Alternativa rejeitada**: Média simples de todos os runs. Um modelo com 100 samples dominaria a família sobre outro com 3 samples. A média de médias trata cada modelo igualmente.

### Decision 3: Tooltip mostra composição da família

O `renderHardwareComparisonBars()` já tem um callback de tooltip customizado. Será estendido para receber metadados de composição da família (`familyModels`) via os dados de scatter.

**Formato do tooltip**:
```
RX 9000
Mesa 26.1: 4,203
Models:
  RX 9070 XT (22)
  RX 9070 (6)
  RX 9070 GRE (3)
  RX 9060 XT (5)
```

### Decision 4: Dados de composição passados via `scatterData`

`getDriverScatterData()` será modificado para retornar, além de `points` e `hwLabels`, um novo campo `familyModelMap`:
```javascript
{
  points: [...],       // mesmo formato, mas x: familyIndex
  hwLabels: [...],     // ["RX 6000", "RX 7000", ...]
  familyModelMap: {    // NOVO
    "RX 6000": [
      { model: "RX 6600", samples: 12 },
      { model: "RX 6800 XT", samples: 8 }
    ],
    ...
  }
}
```

`renderHardwareComparisonBars()` armazena `familyModelMap` no chart instance e o tooltip callback o consulta.

### Decision 5: Mobile vs Desktop — famílias separadas

Mobile é detectado pelo sufixo `Mobile` ou `Laptop` no nome normalizado. GPUs mobile formam famílias com sufixo "Mobile" (ex: `RTX 40 Mobile`). Isso permite comparar performance de drivers separadamente para desktop e notebook, que têm características térmicas e de performance distintas.

## Risks / Trade-offs

- **Perda de granularidade**: Usuário com GPU específica não vê mais seu modelo individual. → Aceito pelo usuário. O valor está na comparação entre gerações.
- **Família com 1 modelo dominante**: Se uma família tem 1 modelo com 100 samples e outro com 2, a média de médias dilui o modelo dominante. → Comportamento desejado; cada modelo contribui igualmente.
- **Classificação de GPUs futuras**: GPUs lançadas após a implementação podem não ser reconhecidas. → O regex por prefixo captura padrões numéricos, então RTX 60xx ou RX 100xx seriam capturados automaticamente se seguirem o padrão. Se não seguirem, caem como null e são excluídas.
- **Compatibilidade com Delta Mode**: O Delta Mode usa `renderSoftwareDeltaChart()` que também usa `getDriverScatterData()`. → A mudança no `getDriverScatterData()` afeta o Delta Mode automaticamente — ambos passam a operar por família.
