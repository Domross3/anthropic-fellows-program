"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Carousel from "@/components/Carousel";
import { TABS } from "@/data/tabs";
import { CarouselItem, SearchResponse, TabMirror } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function handleMirrorClick(item: CarouselItem) {
    // The four mirrors on home are tab-mirrors with a route field.
    const route = (item as TabMirror).route;
    if (route) router.push(route);
  }

  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "6px 32px 40px 32px",
        }}
      >
        {/* Hero */}
        <section
          style={{
            textAlign: "center",
            marginBottom: 10,
            paddingTop: 0,
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
            margin: "0 auto 14px auto",
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

        {/* Tab mirrors — clicking navigates to the tab route */}
        <section style={{ paddingBottom: 100 }}>
          <Carousel items={TABS} onOpen={handleMirrorClick} />
        </section>
      </main>
    </>
  );
}
