"use client";

import { motion } from "framer-motion";
import { SearchResponse } from "@/lib/types";
import { DOCUMENTS } from "@/documents/_manifest";
import SourceCitation from "./SourceCitation";

interface SearchResultsProps {
  results: SearchResponse;
  onFollowUp: (query: string) => void;
}

export default function SearchResults({
  results,
  onFollowUp,
}: SearchResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-4"
    >
      {/* Summary Card */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
          AI Summary
        </h3>
        <p className="text-base leading-relaxed text-foreground">
          {results.summary}
        </p>
      </div>

      {/* Citations */}
      {results.citations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Sources
          </h3>
          {results.citations.map((citation, index) => {
            const doc = DOCUMENTS.find((d) => d.id === citation.documentId);
            return (
              <SourceCitation
                key={index}
                citation={citation}
                pdfPath={doc?.pdfPath}
              />
            );
          })}
        </div>
      )}

      {/* Follow-up Queries */}
      {results.suggestedQueries.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            Related Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.suggestedQueries.map((query) => (
              <button
                key={query}
                onClick={() => onFollowUp(query)}
                className="rounded-full border border-accent/30 bg-accent-light/50 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-light"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
