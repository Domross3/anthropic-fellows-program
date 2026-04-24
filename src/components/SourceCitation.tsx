"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Citation } from "@/lib/types";

interface SourceCitationProps {
  citation: Citation;
  pdfPath?: string;
}

export default function SourceCitation({
  citation,
  pdfPath,
}: SourceCitationProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        borderRadius: 16,
        background:
          "linear-gradient(180deg, rgba(36,23,87,0.32) 0%, rgba(10,6,32,0.65) 100%)",
        border: "1px solid rgba(196, 181, 253, 0.16)",
        transition: "border-color 220ms var(--ease-mystic)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          textAlign: "left",
          padding: "16px 20px",
          background: "transparent",
          border: 0,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          color: "var(--fg-star)",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--fg-star)",
              letterSpacing: "0.01em",
            }}
          >
            {citation.title}
          </p>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: 12,
              color: "var(--fg-dust)",
              fontWeight: 300,
              lineHeight: 1.5,
            }}
          >
            {citation.relevance}
          </p>
        </div>
        <span
          style={{
            marginLeft: 14,
            marginTop: 2,
            fontSize: 11,
            color: "var(--aura-bright)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          {expanded ? "◂ close" : "open ▸"}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "14px 20px 20px 20px",
                borderTop: "1px solid rgba(196, 181, 253, 0.1)",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  paddingLeft: 14,
                  borderLeft: "2px solid var(--aura)",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--fg-moon)",
                }}
              >
                {citation.excerpt}
              </blockquote>
              {pdfPath && (
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "var(--aura-bright)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                  }}
                >
                  Open PDF <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
