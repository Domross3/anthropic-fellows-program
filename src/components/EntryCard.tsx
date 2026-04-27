import { ProjectEntry } from "@/lib/types";

/**
 * Render a single Research or Project entry. The card accepts the looser
 * shape (ProjectEntry — optional affiliation) so both ResearchEntry
 * (affiliation required) and ProjectEntry (affiliation optional) are
 * structurally compatible.
 */
export default function EntryCard({ entry }: { entry: ProjectEntry }) {
  return (
    <article
      style={{
        background:
          "linear-gradient(180deg, rgba(36,23,87,0.32) 0%, rgba(10,6,32,0.7) 100%)",
        border: "1px solid rgba(196, 181, 253, 0.18)",
        borderRadius: 18,
        padding: 24,
        color: "var(--fg-star)",
        fontFamily: "var(--font-body)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: "0.005em",
          color: "var(--fg-star)",
          lineHeight: 1.15,
        }}
      >
        {entry.title}
      </h2>

      <div
        style={{
          marginTop: 6,
          fontSize: 12,
          letterSpacing: "0.04em",
          color: "var(--fg-dust)",
        }}
      >
        {entry.role} · {entry.dates}
      </div>

      {entry.affiliation && (
        <div
          style={{
            marginTop: 4,
            fontSize: 12.5,
            lineHeight: 1.45,
            fontStyle: "italic",
            color: "var(--fg-dust)",
            fontFamily: "var(--font-display)",
          }}
        >
          {entry.affiliation}
        </div>
      )}

      <p
        style={{
          marginTop: 14,
          fontSize: 14,
          lineHeight: 1.65,
          color: "var(--fg-moon)",
          fontWeight: 300,
          margin: "14px 0 0 0",
        }}
      >
        {entry.summary}
      </p>

      {entry.tags && entry.tags.length > 0 && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {entry.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 9999,
                border: "1px solid rgba(196, 181, 253, 0.18)",
                background: "rgba(167, 139, 250, 0.06)",
                color: "var(--fg-moon)",
                letterSpacing: "0.02em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {entry.links && entry.links.length > 0 && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          {entry.links.map((l) => (
            <a
              key={l.url + l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: "var(--aura-bright)",
                textDecoration: "none",
                fontWeight: 500,
                letterSpacing: "0.03em",
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
