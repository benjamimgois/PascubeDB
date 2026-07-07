## Why

O dashboard não tem canal pra comunicar changelogs, atualizações ou notas da comunidade. Posts ficam perdidos em issues do GitHub. Comentários e sugestões não têm espaço dentro do app. Um blog inline com comentários via Supabase resolve isso sem sair do dashboard.

## What Changes

- Novo botão "Blog" na header ao lado de "Leaderboard"
- Modal `<dialog>` com lista de posts (título, resumo, data, nº comentários)
- Post expandido com body markdown renderizado
- Sistema de comentários por post com login GitHub OAuth
- Posts gerenciados via Supabase dashboard (admin)
- Comentários armazenados no Supabase com RLS

## Capabilities

### New Capabilities
- `blog-posts`: Listagem, leitura e renderização markdown de posts do blog
- `blog-comments`: Comentários por post com autenticação GitHub OAuth via Supabase

### Modified Capabilities
<!-- Nenhuma spec existente é alterada — são capacidades novas -->

## Impact

- **Novas dependências CDN**: `@supabase/supabase-js` + `marked`
- **Novas tabelas Supabase**: `posts` + `comments`
- **Novas funções em app.js**: ~80 linhas (blog modal, auth, comments CRUD)
- **Novo elemento HTML**: `<dialog id="blog-modal">` + botão no header
- **Novos estilos CSS**: ~60 linhas para modal blog, cards de post, comentários
- **Config externa**: Projeto Supabase + GitHub OAuth App + redirect URL
