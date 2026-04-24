"use client";

import { useState, FormEvent } from "react";

const SUGGESTED_QUERIES = [
  "ML and AI experience",
  "Leadership roles",
  "Research in D.C.",
  "Google certificate",
  "Claude hackathon",
  "Technical skills",
];

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  }

  function handleSuggestion(suggestion: string) {
    setQuery(suggestion);
    onSearch(suggestion);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          background:
            "linear-gradient(180deg, rgba(36,23,87,0.35) 0%, rgba(10,6,32,0.7) 100%)",
          border: "1px solid rgba(196, 181, 253, 0.25)",
          borderRadius: 9999,
          padding: 6,
          display: "flex",
          alignItems: "center",
          boxShadow:
            "0 0 40px rgba(167,139,250,0.18), 0 10px 30px rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <span
          aria-hidden
          style={{
            paddingLeft: 22,
            color: "var(--aura-bright)",
            fontSize: 14,
            letterSpacing: "0.2em",
          }}
        >
          ✦
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask the portal…"
          disabled={isLoading}
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: "none",
            padding: "14px 18px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--fg-star)",
            letterSpacing: "0.01em",
          }}
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          style={{
            padding: "12px 26px",
            borderRadius: 9999,
            border: "1px solid rgba(196, 181, 253, 0.3)",
            background:
              "linear-gradient(135deg, var(--aura-deep) 0%, var(--aura) 100%)",
            color: "var(--fg-star)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor:
              !query.trim() || isLoading ? "not-allowed" : "pointer",
            opacity: !query.trim() || isLoading ? 0.55 : 1,
            boxShadow: "0 0 24px rgba(167,139,250,0.45)",
            fontFamily: "var(--font-body)",
            transition: "all 220ms var(--ease-mystic)",
          }}
        >
          {isLoading ? "Scrying…" : "Divine"}
        </button>
      </form>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {SUGGESTED_QUERIES.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestion(suggestion)}
            disabled={isLoading}
            style={{
              padding: "7px 14px",
              borderRadius: 9999,
              border: "1px solid rgba(196, 181, 253, 0.2)",
              background: "rgba(167, 139, 250, 0.06)",
              color: "var(--fg-moon)",
              fontSize: 12,
              letterSpacing: "0.03em",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
              fontFamily: "var(--font-body)",
              transition: "all 220ms var(--ease-mystic)",
            }}
            onMouseEnter={(e) => {
              if (isLoading) return;
              e.currentTarget.style.borderColor =
                "rgba(196, 181, 253, 0.5)";
              e.currentTarget.style.background =
                "rgba(167, 139, 250, 0.14)";
              e.currentTarget.style.color = "var(--fg-star)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(196, 181, 253, 0.2)";
              e.currentTarget.style.background =
                "rgba(167, 139, 250, 0.06)";
              e.currentTarget.style.color = "var(--fg-moon)";
            }}
          >
            ✦ {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
