"use client";

import { useState } from "react";
import { DOCUMENTS } from "@/documents/_manifest";
import { DocumentCategory } from "@/lib/types";
import DocumentCard from "./DocumentCard";

const FILTER_TABS: { label: string; value: DocumentCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Resume", value: "resume" },
  { label: "Transcript", value: "transcript" },
  { label: "Projects", value: "project" },
  { label: "Certifications", value: "certification" },
  { label: "Essays", value: "essay" },
  { label: "Cover Letters", value: "cover-letter" },
  { label: "Courses", value: "course" },
];

export default function DocumentGrid() {
  const [filter, setFilter] = useState<DocumentCategory | "all">("all");

  const filtered =
    filter === "all"
      ? DOCUMENTS
      : DOCUMENTS.filter((d) => d.category === filter);

  // Only show tabs for categories that have documents
  const activeTabs = FILTER_TABS.filter(
    (tab) =>
      tab.value === "all" ||
      DOCUMENTS.some((d) => d.category === tab.value)
  );

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Document Library
      </h2>

      <div className="mb-5 flex flex-wrap gap-2">
        {activeTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-accent text-white"
                : "bg-surface text-muted border border-border hover:border-accent/30 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          No documents in this category yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </section>
  );
}
