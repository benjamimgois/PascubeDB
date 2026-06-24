## Context

Charts de SBC mostram nomes de CPU/GPU que sao genericos (Raspberry Pi 5, VideoCore VII). A planilha tem coluna "product name" (indice 17) com nome comercial do dispositivo (ex: "Raspberry Pi 5 Rev 1.0"). SBCs tem poucos registros e identificar o modelo exato é importante.

## Goals / Non-Goals

**Goals:**
- Parse coluna productName do JSONP (getVal(17)) e CSV (row[17])
- Exibir productName nos labels dos charts de SBC runs, CPU e GPU
- Atualizar fallback CSV com product name

**Non-Goals:**
- Nao alterar labels de Notebook ou Handheld
- Nao alterar tooltips dos charts

## Decisions

- **Label format**: Quando `productName` existir e nao for 'N/D', exibir `productName` como label principal e CPU/GPU como subtitulo no tooltip
- **Função auxiliar**: `getSbcLabel(r)` — retorna productName se disponível, senao CPU normalizado
- **Parser**: productName = getVal(17) no JSONP, row[17] no CSV
- **SBC CPU/GPU charts**: Labels usam productName + "(CPU name)" ou similar

## Risks / Trade-offs

- [Dados esparsos] Se productName nao estiver preenchido, fallback para CPU name (comportamento atual)
- [Coluna nova] Planilha pode ter productName vazio para registros antigos — tratado por || 'N/D'
