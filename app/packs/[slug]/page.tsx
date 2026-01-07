import { getPackBySlug, getPromptsForPack } from "../../../lib/data";

export default function PackPage({ params }: { params: { slug: string } }) {
  const pack = getPackBySlug(params.slug);
  if (!pack) return <main><h1>Not found</h1></main>;

  const prompts = getPromptsForPack(pack);

  return (
    <main>
      <h1>{pack.title}</h1>
      <p style={{ color: "#555" }}>{pack.description}</p>

      <h2 style={{ marginTop: 16 }}>Prompts</h2>
      <ul>
        {prompts.map(p => (
          <li key={p.slug} style={{ marginBottom: 10 }}>
            <a href={`/prompts/${p.slug}`} style={{ fontWeight: 800 }}>{p.title}</a>
            <div style={{ color: "#666" }}>{p.short_description}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
