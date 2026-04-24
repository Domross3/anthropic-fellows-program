"use client";

import { useState } from "react";
import { DocumentMeta, AuraColor } from "@/lib/types";

const AURA_VAR: Record<AuraColor, string> = {
  resume: "var(--aura-resume)",
  transcript: "var(--aura-transcript)",
  project: "var(--aura-project)",
  essay: "var(--aura-essay)",
  certification: "var(--aura-certification)",
};

interface ArchiveProps {
  items: DocumentMeta[];
  onOpen: (item: DocumentMeta) => void;
}

export default function Archive({ items, onOpen }: ArchiveProps) {
  const [open, setOpen] = useState(false);

  return (
    <section
      style={{
        marginTop: 80,
        paddingTop: 40,
        borderTop: "1px solid rgba(196, 181, 253, 0.12)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            background: "transparent",
            border: "1px solid rgba(196, 181, 253, 0.22)",
            color: "var(--fg-moon)",
            borderRadius: 9999,
            padding: "10px 24px",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
            transition: "all 300ms var(--ease-mystic)",
          }}
          aria-expanded={open}
        >
          ✦ {open ? "Hide Archive" : "Show All Documents"}
        </button>
      </div>

      {open && (
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            animation: "fadeIn 420ms var(--ease-mystic)",
          }}
        >
          {items.map((item) => {
            const aura = AURA_VAR[item.aura];
            return (
              <button
                key={item.id}
                onClick={() => onOpen(item)}
                style={{
                  textAlign: "left",
                  background:
                    "linear-gradient(180deg, rgba(36,23,87,0.35) 0%, rgba(10,6,32,0.7) 100%)",
                  border: "1px solid rgba(196, 181, 253, 0.18)",
                  borderRadius: 18,
                  padding: 22,
                  color: "var(--fg-star)",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 300ms var(--ease-mystic)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${aura}66`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${aura}33, 0 10px 30px rgba(0,0,0,0.35)`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(196, 181, 253, 0.18)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: aura,
                    marginBottom: 10,
                    fontWeight: 500,
                  }}
                >
                  ✦ {item.category}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.15,
                    color: "var(--fg-star)",
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--fg-moon)",
                    fontWeight: 300,
                  }}
                >
                  {item.description}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 10,
                    color: "var(--fg-dust)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.lastUpdated}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
