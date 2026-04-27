# Site Restructure — Tabs + Data-Driven Content

This commit reorganizes the site into four tabs (Application, Research,
Projects, About) backed by typed data files, so content can be swapped for
future applications (grad school, other fellowships) without touching
components.

## Architecture

- **Routing.** Four new routes under a Next.js route group `app/(tabs)`:
  `/application`, `/research`, `/projects`, `/about`. The route group
  shares a layout (Header + TabNav) but does not appear in URLs.
- **Home (`/`).** Unchanged in spirit: cosmos backdrop, hero title, AI
  search bar, scrubber-driven carousel. The carousel mirrors are now the
  four tabs — clicking a mirror routes to that tab.
- **Data layer.** Each tab's content lives in `src/data/*.ts`, typed via
  interfaces in `src/lib/types.ts`. To reuse this site for another
  application, swap the data files; components stay the same.
- **Footer.** Single dry line — `Built with Claude Code and Claude Design.` —
  mounted globally in `app/layout.tsx`.
- **Cosmos.** Moved from `app/page.tsx` into `app/layout.tsx` so the
  starfield persists across route transitions instead of remounting.

## New files

```
src/data/tabs.ts                        # 4 tab-mirror definitions
src/data/application.ts                 # essay sections (preserves existing placeholders verbatim)
src/data/research.ts                    # 3 entries (N-Gram, Fitzpatrick, Lubensky), TODO summaries
src/data/projects.ts                    # 2 entries (Aspera, Modus AI), TODO summaries
src/data/about.ts                       # paragraph + email + links + resume URL (TODO placeholders)
src/app/(tabs)/layout.tsx               # shared Header + TabNav shell for inner tabs
src/app/(tabs)/application/page.tsx
src/app/(tabs)/research/page.tsx
src/app/(tabs)/projects/page.tsx
src/app/(tabs)/about/page.tsx
src/components/TabNav.tsx               # horizontal tab nav with active state
src/components/EntryCard.tsx            # shared list card for Research + Projects
src/components/Footer.tsx               # single-line credit
CHANGES.md                              # this file
```

## Modified files

```
src/lib/types.ts                        # added LinkRef, CarouselItem, TabMirror,
                                        # ApplicationSection, ResearchEntry, ProjectEntry, AboutData
src/app/layout.tsx                      # mounts Cosmos + Footer globally
src/app/page.tsx                        # carousel renders TABS; clicking routes
src/components/Carousel.tsx             # item type widened from DocumentMeta to CarouselItem
src/components/Header.tsx               # 'Dom Ross' wordmark linked to /
```

## Untouched (deliberate)

```
documents/*.md                          # still the AI-search corpus
documents/_manifest.ts                  # still drives /api/search
src/app/api/search/route.ts
src/components/Archive.tsx              # parked: no longer rendered, kept for re-use
src/components/ItemDetail.tsx           # parked: no longer rendered, kept for re-use
src/components/SearchBar.tsx            # used on home
src/components/SearchResults.tsx        # used on home
src/components/SourceCitation.tsx       # used on home (inside SearchResults)
public/photos/*.jpg                     # used by tab mirrors + Research/Projects later
src/app/globals.css                     # mystic theme tokens unchanged
```

## TODO placeholders left for you

| Where | What |
|---|---|
| `src/data/application.ts` | Section bodies are HTML-comment placeholders, identical to the existing `documents/essay-anthropic.md`. Replace each `body` with real text. |
| `src/data/research.ts` | All three entries: `role`, `dates`, `summary` (and optional `links`, `tags`). |
| `src/data/projects.ts` | Both entries: `role`, `dates`, `summary` (and optional `links`, `tags`). |
| `src/data/about.ts` | `paragraph`, `resumeUrl` (Google Drive), `links[].url` for GitHub + LinkedIn. Email is filled in. Personal site URL is filled in. |

## Verification

- `tsc --noEmit` passes clean.
- `documents/_manifest.ts` and `/api/search` are untouched, so AI search
  continues to work over the same 6-file corpus.
- The home carousel uses 4 mirrors; the scrubber width still scales to
  item count automatically.

## Why a route group instead of nested routes

`app/(tabs)/...` keeps URLs flat (`/application`, not `/tabs/application`)
while letting the four inner tabs share one layout file. The home page
sits outside the group at `app/page.tsx` so it can have its own structure
(carousel + search + no TabNav) without inheriting the inner shell.
