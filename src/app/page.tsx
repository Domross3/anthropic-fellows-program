"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import DocumentGrid from "@/components/DocumentGrid";
import { SearchResponse } from "@/lib/types";

export default function Home() {
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
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* Hero / Search Section */}
        <section className="mb-12">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Reference Materials
            </h2>
            <p className="text-base text-muted">
              Search my academic and professional background using AI, or browse
              documents directly below.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              Searching documents with AI...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="mt-6">
              <SearchResults results={results} onFollowUp={handleSearch} />
            </div>
          )}
        </section>

        {/* Document Library */}
        <DocumentGrid />
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        Dominic Ross &middot; University of Michigan &middot; EECS
      </footer>
    </>
  );
}
