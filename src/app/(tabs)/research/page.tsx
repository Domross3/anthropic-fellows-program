import EntryCard from "@/components/EntryCard";
import { research } from "@/data/research";

export const metadata = {
  title: "Research — Dominic Ross",
};

export default function ResearchPage() {
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
        Research
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
        Studies in language modeling, education policy, and bio-imaging.
      </p>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {research.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
