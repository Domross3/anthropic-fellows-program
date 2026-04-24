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
    <div className="rounded-lg border border-border bg-surface transition-colors hover:border-accent/30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between p-4 text-left"
      >
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {citation.title}
          </p>
          <p className="mt-0.5 text-xs text-muted">{citation.relevance}</p>
        </div>
        <span className="ml-3 mt-0.5 text-xs text-muted">
          {expanded ? "collapse" : "expand"}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-4 pb-4 pt-3">
              <blockquote className="border-l-2 border-accent/40 pl-3 text-sm italic text-muted">
                {citation.excerpt}
              </blockquote>
              {pdfPath && (
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                >
                  View Document (PDF)
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
