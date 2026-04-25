"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Cosmos from "@/components/Cosmos";
import Carousel from "@/components/Carousel";
import Archive from "@/components/Archive";
import ItemDetail from "@/components/ItemDetail";
import { DOCUMENTS } from "@/documents/_manifest";
import { DocumentMeta, SearchResponse } from "@/lib/types";

export default function Home() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<DocumentMeta | null>(null);

  const featured = DOCUMENTS.filter((d) => d.featured);

  async function handleSearch(query: string) {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error || `Search failed (${res.status})`
        );
      }
      const data = (await res.json()) as SearchResponse;
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Cosmos />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Header />

        <main
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "16px 32px 40px 32px",
          }}
        >
          {/* Hero */}
          <section
            style={{
              textAlign: "center",
              marginBottom: 18,
              paddingTop: 4,
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-0.005em",
                color: "var(--fg-star)",
                margin: 0,
                textShadow: "0 0 36px rgba(167, 139, 250, 0.3)",
              }}
            >
              Anthropic Fellows Program Application
            </h1>
          </section>

          {/* Search */}
          <section
            style={{
              maxWidth: 880,
              margin: "0 auto 24px auto",
            }}
          >
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {isLoading && (
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  color: "var(--fg-moon)",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 15,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    borderRadius: 9999,
                    border: "2px solid rgba(196, 181, 253, 0.3)",
                    borderTopColor: "var(--aura-bright)",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Consulting the archive…
              </div>
            )}

            {error && (
              <div
                style={{
                  marginTop: 20,
                  padding: 16,
                  borderRadius: 14,
                  border: "1px solid rgba(255, 139, 209, 0.3)",
                  background: "rgba(255, 139, 209, 0.08)",
                  color: "#ffb3dd",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            {results && (
              <div style={{ marginTop: 32 }}>
                <SearchResults results={results} onFollowUp={handleSearch} />
              </div>
            )}
          </section>

          {/* Carousel */}
          <section style={{ paddingBottom: 100 }}>
            <Carousel items={featured} onOpen={setOpenItem} />
          </section>

          {/* Archive */}
          <Archive items={DOCUMENTS} onOpen={setOpenItem} />
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "40px 32px 48px 32px",
            color: "var(--fg-dust)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          ✦ Dominic Ross · University of Michigan · EECS ✦
        </footer>
      </div>

      {openItem && (
        <ItemDetail item={openItem} onClose={() => setOpenItem(null)} />
      )}
    </>
  );
}
