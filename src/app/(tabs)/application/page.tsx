import { application } from "@/data/application";
import { ApplicationQuestion } from "@/lib/types";

export const metadata = {
  title: "Application — Dominic Ross",
};

/**
 * Group questions by section, preserving the order in which sections
 * first appear in the data file.
 */
function groupBySection(
  questions: ApplicationQuestion[]
): { name: string; questions: ApplicationQuestion[] }[] {
  const sections: { name: string; questions: ApplicationQuestion[] }[] = [];
  for (const q of questions) {
    let s = sections.find((sec) => sec.name === q.section);
    if (!s) {
      s = { name: q.section, questions: [] };
      sections.push(s);
    }
    s.questions.push(q);
  }
  return sections;
}

export default function ApplicationPage() {
  const sections = groupBySection(application);

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
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {sections.map((section) => (
          <section key={section.name}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--aura-bright)",
                fontWeight: 500,
                marginBottom: 18,
                fontFamily: "var(--font-body)",
              }}
            >
              ✦ {section.name}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              {section.questions.map((q) => (
                <article
                  key={q.id}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(36,23,87,0.32) 0%, rgba(10,6,32,0.7) 100%)",
                    border: "1px solid rgba(196, 181, 253, 0.18)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 500,
                      lineHeight: 1.25,
                      color: "var(--fg-star)",
                      letterSpacing: "0.005em",
                    }}
                  >
                    {q.question}
                  </h2>
                  {q.prompt && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 12,
                        color: "var(--fg-dust)",
                        letterSpacing: "0.04em",
                        fontStyle: "italic",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {q.prompt}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 16,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: "var(--font-body)",
                      fontSize: 14.5,
                      lineHeight: 1.7,
                      color: "var(--fg-moon)",
                      fontWeight: 300,
                    }}
                  >
                    {q.answer}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
