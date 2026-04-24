export type DocumentCategory =
  | "resume"
  | "transcript"
  | "cover-letter"
  | "project"
  | "essay"
  | "course"
  | "certification"
  | "other";

export type AuraColor =
  | "resume"
  | "transcript"
  | "project"
  | "essay"
  | "certification";

export interface DocumentMeta {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string;
  filename: string;
  pdfPath?: string;
  imagePath?: string;
  aura: AuraColor;
  tags: string[];
  lastUpdated: string;
  featured?: boolean;
  detailText?: string;
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
