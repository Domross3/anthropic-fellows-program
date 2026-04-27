import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 10,
        padding: "18px 32px 0 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "var(--fg-star)",
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          Dom Ross
        </Link>
        <a
          href="mailto:michros@umich.edu"
          style={{
            padding: "9px 20px",
            borderRadius: 9999,
            border: "1px solid rgba(196, 181, 253, 0.25)",
            color: "var(--fg-moon)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            transition: "all 220ms var(--ease-mystic)",
            background: "rgba(167, 139, 250, 0.04)",
          }}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
