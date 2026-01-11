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
      <h2 style={{ marginTop: 16 }}>Try it</h2>

<form style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
    Resume bullet points
  </label>

  <textarea
    placeholder="Paste your current resume bullet points here..."
    rows={8}
    style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
  />

  <button
    type="button"
    style={{
      marginTop: 10,
      padding: "10px 14px",
      border: "1px solid #ddd",
      borderRadius: 6,
      cursor: "pointer",
      background: "white",
    }}
    onClick={() => alert("Next step: wire this to an API route that calls an AI model.")}
  >
    Generate
  </button>

  <div style={{ marginTop: 12, color: "#777", fontSize: 13 }}>
    This button is a placeholder. Next we’ll connect it to your backend/API so it actually generates output.
  </div>
</form>
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
