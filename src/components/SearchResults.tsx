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
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          borderRadius: 22,
          padding: 28,
          background:
            "linear-gradient(180deg, rgba(36,23,87,0.5) 0%, rgba(10,6,32,0.85) 100%)",
          border: "1px solid rgba(196, 181, 253, 0.22)",
          boxShadow:
            "0 0 40px rgba(167,139,250,0.15), 0 20px 60px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--aura-bright)",
            marginBottom: 12,
            fontWeight: 500,
          }}
        >
          ✦ AI Summary
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--fg-star)",
            margin: 0,
            fontWeight: 400,
            letterSpacing: "0.005em",
          }}
        >
          {results.summary}
        </p>
      </div>

      {results.citations.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--fg-dust)",
              fontWeight: 500,
              paddingLeft: 6,
            }}
          >
            Sources
          </div>
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

      {results.suggestedQueries.length > 0 && (
        <div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--fg-dust)",
              fontWeight: 500,
              marginBottom: 10,
              paddingLeft: 6,
            }}
          >
            Follow the thread
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {results.suggestedQueries.map((query) => (
              <button
                key={query}
                onClick={() => onFollowUp(query)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 9999,
                  border: "1px solid rgba(196, 181, 253, 0.28)",
                  background: "rgba(167, 139, 250, 0.1)",
                  color: "var(--aura-bright)",
                  fontSize: 12,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 220ms var(--ease-mystic)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(167, 139, 250, 0.22)";
                  e.currentTarget.style.borderColor =
                    "rgba(196, 181, 253, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(167, 139, 250, 0.1)";
                  e.currentTarget.style.borderColor =
                    "rgba(196, 181, 253, 0.28)";
                }}
              >
                ✦ {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
