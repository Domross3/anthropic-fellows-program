import { ABOUT } from "@/data/about";

export const metadata = {
  title: "About — Dominic Ross",
};

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "var(--aura-bright)",
  textDecoration: "none",
  fontWeight: 500,
  letterSpacing: "0.03em",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 22px",
  borderRadius: 9999,
  background:
    "linear-gradient(135deg, var(--aura-deep) 0%, var(--aura) 100%)",
  color: "var(--fg-star)",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  textDecoration: "none",
  border: "1px solid rgba(196, 181, 253, 0.3)",
  boxShadow: "0 0 24px rgba(167, 139, 250, 0.45)",
  fontFamily: "var(--font-body)",
};

export default function AboutPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 4vw, 44px)",
          fontWeight: 500,
          margin: 0,
          color: "var(--fg-star)",
          letterSpacing: "-0.005em",
          textShadow: "0 0 32px rgba(167, 139, 250, 0.28)",
        }}
      >
        About
      </h1>

      <p
        style={{
          marginTop: 24,
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--fg-moon)",
          fontWeight: 300,
          fontFamily: "var(--font-body)",
        }}
      >
        {ABOUT.paragraph}
      </p>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontFamily: "var(--font-body)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--fg-dust)",
            fontWeight: 500,
          }}
        >
          Contact
        </div>
        <a href={`mailto:${ABOUT.email}`} style={linkStyle}>
          {ABOUT.email}
        </a>
        {ABOUT.links.map((l) => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {l.label} ↗
          </a>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <a
          href={ABOUT.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          Resume ↗
        </a>
      </div>
    </div>
  );
}
