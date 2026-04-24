"use client";

import { useEffect } from "react";
import Image from "next/image";
import { DocumentMeta, AuraColor } from "@/lib/types";

const AURA_VAR: Record<AuraColor, string> = {
  resume: "var(--aura-resume)",
  transcript: "var(--aura-transcript)",
  project: "var(--aura-project)",
  essay: "var(--aura-essay)",
  certification: "var(--aura-certification)",
};

interface ItemDetailProps {
  item: DocumentMeta;
  onClose: () => void;
}

export default function ItemDetail({ item, onClose }: ItemDetailProps) {
  const aura = AURA_VAR[item.aura];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-title"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 3, 15, 0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "fadeIn 280ms var(--ease-mystic)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(880px, 100%)",
          maxHeight: "88vh",
          overflowY: "auto",
          background:
            "linear-gradient(180deg, rgba(36,23,87,0.60) 0%, rgba(10,6,32,0.92) 100%)",
          border: "1px solid rgba(196, 181, 253, 0.28)",
          borderRadius: 28,
          boxShadow: `0 0 0 1px rgba(196,181,253,0.18), 0 0 80px 4px ${aura}44, 0 40px 120px rgba(0,0,0,0.7)`,
          padding: 40,
          animation: "slideUp 440ms var(--ease-mystic)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 22,
            background: "transparent",
            border: "1px solid rgba(196, 181, 253, 0.22)",
            borderRadius: 9999,
            width: 36,
            height: 36,
            color: "var(--fg-moon)",
            cursor: "pointer",
            fontSize: 16,
            fontFamily: "var(--font-body)",
          }}
        >
          ✕
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: item.imagePath ? "260px 1fr" : "1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {item.imagePath && (
            <div
              style={{
                position: "relative",
                width: 260,
                height: 340,
                borderRadius: 130,
                overflow: "hidden",
                border: "1px solid rgba(196, 181, 253, 0.28)",
                boxShadow: `0 0 40px ${aura}55, 0 20px 60px rgba(0,0,0,0.6)`,
              }}
            >
              <Image
                src={item.imagePath}
                alt=""
                fill
                sizes="260px"
                style={{
                  objectFit: "cover",
                  filter: "saturate(0.9) contrast(1.04)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, ${aura}22 0%, transparent 40%, rgba(10,6,32,0.5) 100%)`,
                }}
              />
            </div>
          )}

          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: aura,
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              ✦ {item.category}
            </div>
            <h2
              id="item-detail-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 44,
                fontWeight: 500,
                lineHeight: 1.08,
                color: "var(--fg-star)",
                margin: 0,
                letterSpacing: "0.005em",
                textShadow: `0 0 28px ${aura}66`,
              }}
            >
              {item.title}
            </h2>
            <p
              style={{
                marginTop: 14,
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--fg-moon)",
                fontWeight: 300,
              }}
            >
              {item.description}
            </p>

            {item.detailText && (
              <blockquote
                style={{
                  marginTop: 26,
                  marginLeft: 0,
                  paddingLeft: 18,
                  borderLeft: `2px solid ${aura}`,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--fg-star)",
                  opacity: 0.92,
                }}
              >
                {item.detailText}
              </blockquote>
            )}

            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {item.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    padding: "5px 11px",
                    borderRadius: 9999,
                    border: "1px solid rgba(196, 181, 253, 0.22)",
                    background: "rgba(167, 139, 250, 0.08)",
                    color: "var(--fg-moon)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {item.pdfPath && (
                <a
                  href={item.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 22px",
                    borderRadius: 9999,
                    background:
                      "linear-gradient(135deg, var(--aura-deep) 0%, var(--aura) 100%)",
                    color: "var(--fg-star)",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    boxShadow: `0 0 24px ${aura}66`,
                    border: "1px solid rgba(196, 181, 253, 0.3)",
                  }}
                >
                  Download PDF ↗
                </a>
              )}
              <button
                onClick={onClose}
                style={{
                  padding: "11px 22px",
                  borderRadius: 9999,
                  background: "transparent",
                  color: "var(--fg-moon)",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: "0.03em",
                  border: "1px solid rgba(196, 181, 253, 0.22)",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Close
              </button>
            </div>

            <div
              style={{
                marginTop: 26,
                fontSize: 11,
                color: "var(--fg-dust)",
                letterSpacing: "0.05em",
              }}
            >
              Last updated {item.lastUpdated}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
