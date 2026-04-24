export type DocumentCategory =
  | "resume"
  | "transcript"
  | "cover-letter"
  | "project"
  | "essay"
  | "course"
  | "certification"
  | "other";

export interface DocumentMeta {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string;
  filename: string;
  pdfPath?: string;
  tags: string[];
  lastUpdated: string;
}

export interface SearchRequest {
  query: string;
}

export interface Citation {
  documentId: string;
  title: string;
  excerpt: string;
  relevance: string;
}

export interface SearchResponse {
  summary: string;
  citations: Citation[];
  suggestedQueries: string[];
}
