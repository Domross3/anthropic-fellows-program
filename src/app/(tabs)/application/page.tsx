import { APPLICATION_SECTIONS } from "@/data/application";

export const metadata = {
  title: "Application — Dominic Ross",
};

export default function ApplicationPage() {
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
        Application
      </h1>
      <p
        style={{
          marginTop: 8,
          fontSize: 14,
          color: "var(--fg-dust)",
          letterSpacing: "0.02em",
          fontFamily: "var(--font-body)",
        }}
      >
        Essays for the Anthropic Fellows Program.
      </p>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {APPLICATION_SECTIONS.map((section) => (
          <section
            key={section.id}
            style={{
              background:
                "linear-gradient(180deg, rgba(36,23,87,0.32) 0%, rgba(10,6,32,0.7) 100%)",
              border: "1px solid rgba(196, 181, 253, 0.18)",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 500,
                color: "var(--fg-star)",
                letterSpacing: "0.005em",
              }}
            >
              {section.heading}
            </h2>
            <pre
              style={{
                marginTop: 12,
                marginBottom: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--fg-moon)",
                fontWeight: 300,
                background: "transparent",
                border: 0,
                padding: 0,
              }}
            >
              {section.body}
            </pre>
          </section>
        ))}
      </div>
    </div>
  );
}
