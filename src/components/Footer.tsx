/**
 * Single dry line of credit. Mounted globally in app/layout.tsx.
 */
export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "32px 32px 24px 32px",
        color: "var(--fg-dust)",
        fontSize: 11,
        letterSpacing: "0.03em",
        fontFamily: "var(--font-body)",
      }}
    >
      Built with Claude Code and Claude Design.
    </footer>
  );
}
