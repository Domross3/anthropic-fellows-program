export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Dominic Ross
          </h1>
          <p className="text-sm text-muted">Reference Materials Portal</p>
        </div>
        <a
          href="mailto:domross@umich.edu"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
