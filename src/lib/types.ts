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

// ---------------------------------------------------------------------------
// Content architecture: per-tab data shapes.
//
// The site is organized into tabs (Application, Research, Projects, About).
// Each tab's content lives in /src/data/*.ts and conforms to one of the
// types below, so the same components can render content for any future
// application by swapping data files.
// ---------------------------------------------------------------------------

export interface LinkRef {
  label: string;
  url: string;
}

/**
 * Minimal item shape the Carousel renders. Both DocumentMeta and TabMirror
 * satisfy it — the carousel only cares about these fields.
 */
export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imagePath?: string;
  aura: AuraColor;
}

/**
 * A mirror on the home screen that doubles as a tab navigation target.
 * Clicking the mirror routes to the given path.
 */
export interface TabMirror extends CarouselItem {
  route: string;
}

/**
 * One application essay response. Questions are grouped by `section`
 * (e.g., "Motivation & Fit") at render time. `prompt` is the meta-hint
 * shown beside the question (e.g., "1-2 paragraphs", "Brief explanation
 * with % estimate") and is rendered smaller than the question itself.
 */
export interface ApplicationQuestion {
  id: string;
  section: string;
  question: string;
  prompt?: string;
  answer: string;
}

/**
 * One research entry. Used to render the /research list.
 * Shape is intentionally identical to ProjectEntry — a single EntryCard
 * component renders both.
 */
export interface ResearchEntry {
  id: string;
  title: string;
  role: string;
  dates: string;
  summary: string;
  links?: LinkRef[];
  tags?: string[];
}

/**
 * One project entry. Same shape as ResearchEntry on purpose.
 */
export type ProjectEntry = ResearchEntry;

/**
 * Content for the /about tab.
 */
export interface AboutData {
  paragraph: string;
  email: string;
  resumeUrl: string;
  links: LinkRef[];
}
