## Context

A planilha tem a coluna `Origem / Usuário` (índice 0) mapeada para `r.user`. Valores padrão são "Anonymous" ou vazio. O campo `client-id` é um hash SHA-256. Hoje a interface sempre mostra o client-id (truncado em 8 caracteres) em tooltips, leaderboard e labels de gráficos.

## Goals / Non-Goals

**Goals:**
- Criar `getDisplayName(run)` que retorna `r.user` se não for vazio nem "Anonymous"; caso contrário retorna o client-id truncado.
- Aplicar em todos os pontos onde client-id é exibido na interface.
- Renomear a coluna "Client ID" no leaderboard para "Contributor".

**Non-Goals:**
- Alterar a lógica de deduplicação ou agrupamento (que usa client-id).
- Mudar o comportamento do campo `user` na planilha.
- Criar interface de edição de username.

## Decisions

- **Formato do display name**: se username existe e é diferente de "Anonymous" (case-insensitive), usar username; senão, usar primeiros 8 caracteres do client-id.
  - *Rationale*: Anônimos continuam anônimos via hash truncado; contribuidores nomeados aparecem pelo nome.
- **Onde aplicar**: substituir todas as ocorrências de `clientId.substring(0, 8)` pela chamada a `getDisplayName(run)`. Para labels (Top Contributors), usar `getDisplayName` também.
  - *Rationale*: cobertura completa evita inconsistências.
- **Coluna no leaderboard**: renomear header para "Contributor" em vez de "Client ID".
  - *Rationale*: reflete a nova semântica da coluna.

## Risks / Trade-offs

- **Username com caracteres especiais ou muito longo**: pode quebrar layout.
  - Mitigação: truncar username em 20 caracteres nas labels de gráfico. Na tabela manter full.
- **Usernames duplicados**: dois contribuidores podem ter mesmo username.
  - Mitigação: isso é esperado; a diferenciação técnica continua via client-id, mas a exibição é mais amigável.
- **Coluna username ausente em CSV antigo**: o fallback CSV tem "Anonymous" como padrão.
  - Mitigação: o helper trata "Anonymous" como ausente, mantendo client-id.
