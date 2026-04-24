import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { loadAllDocuments, buildContextString } from "@/lib/documents";
import { SearchResponse } from "@/lib/types";

function stripCodeFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function extractBalancedJsonObject(text: string): string | null {
  let start = -1;
  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (start === -1) {
      if (char === "{") {
        start = i;
        depth = 1;
      }
      continue;
    }
    if (isEscaped) {
      isEscaped = false;
      continue;
    }
    if (char === "\\" && inString) {
      isEscaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (char === "{") depth++;
    if (char === "}") depth--;
    if (depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

function removeTrailingCommas(text: string): string {
  return text.replace(/,\s*([}\]])/g, "$1");
}

function parseJsonCandidate(text: string): unknown | null {
  const stripped = stripCodeFences(text);
  if (!stripped) return null;

  const candidates = new Set([stripped]);
  const balanced = extractBalancedJsonObject(stripped);
  if (balanced) candidates.add(balanced);

  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start !== -1 && end > start) candidates.add(stripped.slice(start, end + 1));

  for (const candidate of Array.from(candidates)) {
    try {
      return JSON.parse(removeTrailingCommas(candidate).trim());
    } catch {
      continue;
    }
  }
  return null;
}

function coerceSearchResponse(raw: unknown): SearchResponse | null {
  if (!raw || typeof raw !== "object") return null;
  const entry = raw as Record<string, unknown>;

  const summary =
    typeof entry.summary === "string" ? entry.summary.trim() : "";
  if (!summary) return null;

  const citations = Array.isArray(entry.citations)
    ? entry.citations
        .filter(
          (c): c is Record<string, unknown> =>
            c !== null && typeof c === "object"
        )
        .map((c) => ({
          documentId:
            typeof c.documentId === "string" ? c.documentId : "unknown",
          title: typeof c.title === "string" ? c.title : "",
          excerpt: typeof c.excerpt === "string" ? c.excerpt : "",
          relevance: typeof c.relevance === "string" ? c.relevance : "",
        }))
        .filter((c) => c.title && c.excerpt)
    : [];

  const suggestedQueries = Array.isArray(entry.suggestedQueries)
    ? entry.suggestedQueries.filter(
        (q): q is string => typeof q === "string" && q.trim().length > 0
      )
    : [];

  return { summary, citations, suggestedQueries };
}

const SYSTEM_PROMPT = `You are a reference assistant for Dominic Ross, a Computer Science student at the University of Michigan. Professors who are writing recommendation letters are searching through Dom's academic and professional documents to find relevant information.

Given all of Dom's documents and a search query, provide a clear, professional response that helps the professor find exactly what they need.

Rules:
- Be specific: quote exact details, numbers, dates, and course names from the documents
- Be concise: 2-4 sentences for the summary
- Cite your sources: reference which document each piece of information comes from
- Be professional: this is for a recommendation letter context
- If the documents don't contain information about the query, say so clearly

Respond ONLY with valid JSON matching this exact schema:
{
  "summary": "2-4 sentence professional summary answering the query",
  "citations": [
    {
      "documentId": "the document id from the manifest",
      "title": "Section or topic title",
      "excerpt": "Specific relevant quote or detail from the document",
      "relevance": "Brief explanation of why this is relevant"
    }
  ],
  "suggestedQueries": ["related follow-up query 1", "related follow-up query 2"]
}

Do not include markdown fences, explanations, or any text outside the JSON.`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { query?: string };
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.CLAUDE_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "CLAUDE_KEY not configured" },
        { status: 500 }
      );
    }

    const docs = await loadAllDocuments();
    const context = buildContextString(docs);

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here are all of Dominic's documents:\n\n${context}\n\n---\n\nSearch query: "${query}"`,
        },
      ],
    });

    const rawText = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as unknown as { text: string }).text)
      .join("\n")
      .trim();

    const parsed = coerceSearchResponse(parseJsonCandidate(rawText));

    if (parsed) {
      return NextResponse.json(parsed);
    }

    // Retry with stricter formatting
    const retryMessage = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here are all of Dominic's documents:\n\n${context}\n\n---\n\nSearch query: "${query}"\n\nIMPORTANT: Return ONLY the JSON object. No markdown fences. No text before or after.`,
        },
      ],
    });

    const retryText = retryMessage.content
      .filter((b) => b.type === "text")
      .map((b) => (b as unknown as { text: string }).text)
      .join("\n")
      .trim();

    const retryParsed = coerceSearchResponse(parseJsonCandidate(retryText));
    if (retryParsed) {
      return NextResponse.json(retryParsed);
    }

    return NextResponse.json(
      { error: "Failed to generate a valid response. Please try again." },
      { status: 502 }
    );
  } catch (err: unknown) {
    console.error("[/api/search] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
