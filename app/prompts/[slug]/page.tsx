import { getPromptBySlug } from "../../../lib/data";

export default function PromptPage({ params }: { params: { slug: string } }) {
  const p = getPromptBySlug(params.slug);
  if (!p) return <main><h1>Not found</h1></main>;

  return (
    <main>
      <h1>{p.title}</h1>
      <p style={{ color: "#555" }}>{p.short_description}</p>

      <div style={{ color: "#777", fontSize: 13 }}>
      Category: <b>{p.category_id}</b> · Tags:{" "}
      <b>{Array.isArray(p.tags) ? p.tags.join(" #") : ""}</b>
      </div>

      <h2 style={{ marginTop: 16 }}>Prompt</h2>
      <pre style={{ whiteSpace: "pre-wrap", padding: 12, border: "1px solid #eee", background: "#fafafa" }}>
        {p.prompt_template}
      </pre>

      <h2 style={{ marginTop: 16 }}>Inputs</h2>
      <ul>
        {p.input_fields.map((f) => (
          <li key={f.key}>
            <b>{f.key}</b> {f.required ? "(required)" : "(optional)"}{" "}
            <span style={{ color: "#666" }}>{f.description}</span>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: 16 }}>Output format</h2>
      <div style={{ padding: 12, border: "1px solid #eee", background: "#fafafa" }}>
        <div><b>{p.output_format.type}</b></div>
        <div style={{ color: "#666" }}>{p.output_format.description}</div>
      </div>
    </main>
  );
}
