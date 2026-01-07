import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Library",
  description: "A small prompt library you can deploy and grow."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        <header style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="/" style={{ fontWeight: 900, textDecoration: "none" }}>Prompt Library</a>
          <a href="/categories">Categories</a>
          <a href="/packs">Packs</a>
          <a href="/export">Export</a>
        </header>

        <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
          {children}
        </div>

        <footer style={{ padding: 16, borderTop: "1px solid #eee", color: "#666" }}>
          No accounts. No nonsense.
        </footer>
      </body>
    </html>
  );
}
