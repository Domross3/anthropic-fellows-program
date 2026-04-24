import { DocumentMeta, DocumentCategory } from "@/lib/types";

const CATEGORY_STYLES: Record<DocumentCategory, string> = {
  resume: "bg-blue-50 text-blue-700",
  transcript: "bg-green-50 text-green-700",
  "cover-letter": "bg-purple-50 text-purple-700",
  project: "bg-orange-50 text-orange-700",
  essay: "bg-pink-50 text-pink-700",
  course: "bg-teal-50 text-teal-700",
  certification: "bg-amber-50 text-amber-700",
  other: "bg-gray-50 text-gray-700",
};

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  resume: "Resume",
  transcript: "Transcript",
  "cover-letter": "Cover Letter",
  project: "Project",
  essay: "Essay",
  course: "Course",
  certification: "Certification",
  other: "Other",
};

interface DocumentCardProps {
  document: DocumentMeta;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30">
      <div className="mb-3 flex items-start justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_STYLES[document.category]}`}
        >
          {CATEGORY_LABELS[document.category]}
        </span>
        <span className="text-xs text-muted">
          {new Date(document.lastUpdated).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <h3 className="mb-1.5 text-base font-semibold text-foreground">
        {document.title}
      </h3>
      <p className="mb-4 flex-1 text-sm text-muted">{document.description}</p>

      {document.pdfPath && (
        <a
          href={document.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Download PDF
          <span aria-hidden="true">&darr;</span>
        </a>
      )}
    </div>
  );
}
