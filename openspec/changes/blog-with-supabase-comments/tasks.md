## 1. Supabase Setup

- [x] 1.1 Create Supabase project (manual — user action)
- [x] 1.2 Create `posts` table via SQL Editor (SQL in setup.sql)
- [x] 1.3 Create `comments` table via SQL Editor (SQL in setup.sql)
- [x] 1.4 Enable RLS and create policies (SQL in setup.sql)
- [x] 1.5 Enable GitHub OAuth provider in Supabase Auth (manual — Auth > Providers > GitHub)
- [x] 1.6 Create GitHub OAuth App (manual — GitHub Settings > Developer Settings > OAuth Apps)
- [x] 1.7 Configure redirect URL in Supabase (manual — Auth > URL Configuration)
- [x] 1.8 Add a sample post via Supabase dashboard to test (manual)

## 2. HTML — Blog Button and Modal

- [x] 2.1 Add `@supabase/supabase-js` CDN script tag in `<head>`
- [x] 2.2 Add `marked` CDN script tag in `<head>`
- [x] 2.3 Add `Blog` button in `.header-actions` before Leaderboard, with Lucide `newspaper` icon and id `blog-btn`
- [x] 2.4 Add `<dialog id="blog-modal">` with header (title "Blog" + close button), list view container, detail view container, and comment section

## 3. CSS — Blog Modal Styles

- [x] 3.1 Style `.blog-modal` (same dialog pattern as leaderboard modal)
- [x] 3.2 Style `.blog-post-card` (title, date, comment count, hover)
- [x] 3.3 Style `.blog-post-body` (markdown rendered: headings, code, lists, links)
- [x] 3.4 Style `.comment-item` (avatar, name, date, text bubble)
- [x] 3.5 Style `.comment-form` (textarea, submit button)
- [x] 3.6 Style `.blog-skeleton` for loading states
- [x] 3.7 Style `.blog-login-prompt` (Login with GitHub button)

## 4. JS — Supabase Client and Auth

- [x] 4.1 Initialize Supabase client with `SUPABASE_URL` and `ANON_KEY` at top of app.js
- [x] 4.2 Implement `getSession()` — check existing session on page load
- [x] 4.3 Implement `loginWithGitHub()` — `supabase.auth.signInWithOAuth({ provider: 'github' })`
- [x] 4.4 Implement `logout()` — `supabase.auth.signOut()`
- [x] 4.5 Listen to `supabase.auth.onAuthStateChange` to update UI reactively

## 5. JS — Blog Modal Logic

- [x] 5.1 Wire `blog-btn` click to open modal and call `loadPosts()`
- [x] 5.2 Implement `loadPosts()` — fetch posts from Supabase, render post list cards with skeleton/empty/error states
- [x] 5.3 Implement `openPost(postId)` — fetch single post + comments, render detail view, switch from list to detail
- [x] 5.4 Implement `backToList()` — switch from detail view back to list
- [x] 5.5 Implement `renderMarkdown(text)` — `DOMPurify.sanitize(marked.parse(text))`
- [x] 5.6 Implement modal close handlers (X button, Escape key, backdrop click)
- [x] 5.7 Implement skeleton loading states for list, post, and comments

## 6. JS — Comments System

- [x] 6.1 Implement `loadComments(postId)` — fetch comments from Supabase ordered by `created_at`, render list with empty/error states
- [x] 6.2 Implement comment form rendering — show form if authenticated, "Login with GitHub" if not
- [x] 6.3 Implement `submitComment(postId, content)` — INSERT comment, handle submitting/error states, append to list on success
- [x] 6.4 Validate non-empty comment before submit
- [x] 6.5 Wire auth state changes to show/hide comment form

## 7. Polish

- [x] 7.1 Test full flow: open modal → view posts → open post → read comments → login → submit comment → logout (manual — test after Supabase setup)
- [x] 7.2 Test error states: network failure on posts, comments, comment submit (manual — test with browser devtools)
- [x] 7.3 Test responsive: modal layout on mobile (manual — test at 768px and below)
- [x] 7.4 Update Lucide icons after dynamic DOM changes (`lucide.createIcons()`)
- [ ] 7.5 Verify no console errors and modal resets properly on close (manual — after Supabase setup)
