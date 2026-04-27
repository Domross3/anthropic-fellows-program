"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TAB_LINKS: { label: string; href: string }[] = [
  { label: "Application", href: "/application" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

/**
 * Horizontal tab nav. Highlights the route matching the current pathname.
 * Used at the top of each inner tab page; the home page does not render it
 * (the carousel mirrors *are* the navigation there).
 */
export default function TabNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Sections"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        flexWrap: "wrap",
        marginTop: 8,
        marginBottom: 32,
      }}
    >
      {TAB_LINKS.map((t) => {
        const active =
          pathname === t.href || pathname.startsWith(t.href + "/");
        return (
          <Link
            key={t.href}
            href={t.href}
            style={{
              padding: "8px 18px",
              borderRadius: 9999,
              border: `1px solid ${
                active
                  ? "rgba(196, 181, 253, 0.5)"
                  : "rgba(196, 181, 253, 0.18)"
              }`,
              background: active
                ? "rgba(167, 139, 250, 0.18)"
                : "rgba(167, 139, 250, 0.04)",
              color: active ? "var(--fg-star)" : "var(--fg-moon)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              transition: "all 220ms var(--ease-mystic)",
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
