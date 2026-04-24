# Reference Materials Portal

AI-powered portal for recommendation letter writers. References can search Dominic's academic and professional background using natural language, or browse and download documents directly.

## How It Works

References visit the site, type a query (e.g. "ML experience", "leadership roles", "Google certificate"), and get a Claude-powered summary with citations linking back to source documents.

**Architecture:** All documents are stored as markdown files. On each search, the full document set is loaded into Claude's context window (~25k tokens) — no vector database or RAG pipeline needed at this scale.

## Setup

```bash
# Install dependencies
npm install

# Set your Anthropic API key
echo "CLAUDE_KEY=sk-ant-..." > .env.local

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Documents

1. Write a markdown file in `documents/` (e.g. `documents/new-doc.md`)
2. Optionally drop a PDF in `public/documents/` for download
3. Register it in `documents/_manifest.ts`:

```ts
{
  id: "new-doc",
  title: "Document Title",
  category: "project",        // resume | transcript | project | certification | essay | cover-letter | course | other
  description: "One-line summary",
  filename: "new-doc.md",
  pdfPath: "/documents/new-doc.pdf",  // optional
  tags: ["relevant", "keywords"],
  lastUpdated: "2026-04-24",
}
```

The AI search automatically picks up new documents on the next query.

## Project Structure

```
references/
├── documents/              # Markdown source files (fed to Claude)
│   ├── _manifest.ts        # Central registry of all documents
│   ├── resume.md
│   └── ...
├── public/documents/       # Static PDFs for download
├── src/
│   ├── app/
│   │   ├── page.tsx        # Landing page (search + document grid)
│   │   └── api/search/     # Claude-powered search endpoint
│   ├── components/         # UI components
│   └── lib/                # Types and document loader
```

## Deploy to Vercel

1. Import the repo on Vercel
2. Set **Root Directory** to `references/`
3. Add `CLAUDE_KEY` as an environment variable
4. Deploy

## Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4
- Claude Sonnet (`claude-sonnet-4-6`) via `@anthropic-ai/sdk`
- Framer Motion for animations
