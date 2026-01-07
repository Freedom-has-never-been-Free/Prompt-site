import { getAllPrompts } from "../lib/data";
import { searchPrompts } from "../lib/search";

export default function Home({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q?.trim() || "";
  const prompts = q ? searchPrompts(getAllPrompts(), q) : getAllPrompts().slice(0, 20);

  return (
    <main>
      <h1>Prompt Library</h1>
      <p style={{ fontSize: 18 }}>
        A simple, deployable prompt library. Add prompts in <code>data/prompts.json</code>.
      </p>

      <form method="GET" style={{ marginTop: 14 }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search prompts…"
          style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 10 }}
        />
      </form>

      <h2 style={{ marginTop: 18 }}>{q ? `Results for “${q}”` : "Featured prompts"}</h2>
      <ul>
        {prompts.map(p => (
          <li key={p.slug} style={{ marginBottom: 10 }}>
            <a href={`/prompts/${p.slug}`} style={{ fontWeight: 800 }}>{p.title}</a>
            <div style={{ color: "#555" }}>{p.short_description}</div>
            <div style={{ color: "#777", fontSize: 13 }}>#{p.tags.join(" #")}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
