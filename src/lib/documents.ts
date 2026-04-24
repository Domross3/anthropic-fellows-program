import { promises as fs } from "fs";
import path from "path";
import { DOCUMENTS } from "@/documents/_manifest";
import { DocumentMeta } from "@/lib/types";

export interface LoadedDocument {
  meta: DocumentMeta;
  content: string;
}

let cachedDocs: LoadedDocument[] | null = null;

export async function loadAllDocuments(): Promise<LoadedDocument[]> {
  if (cachedDocs) return cachedDocs;

  const docsDir = path.join(process.cwd(), "documents");
  cachedDocs = await Promise.all(
    DOCUMENTS.map(async (meta) => {
      const content = await fs.readFile(
        path.join(docsDir, meta.filename),
        "utf8"
      );
      return { meta, content };
    })
  );

  return cachedDocs;
}

export function buildContextString(docs: LoadedDocument[]): string {
  return docs
    .map(
      (d) =>
        `=== DOCUMENT: ${d.meta.title} [id: ${d.meta.id}] [category: ${d.meta.category}] ===\n${d.content}`
    )
    .join("\n\n");
}
