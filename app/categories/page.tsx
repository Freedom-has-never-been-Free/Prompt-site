import { getCategories, getAllPrompts } from "../../lib/data";

export default function CategoriesPage() {
  const cats = getCategories();
  const prompts = getAllPrompts();

  return (
    <main>
      <h1>Categories</h1>
      <ul>
        {cats.map(c => {
          const count = prompts.filter(p => p.category_id === c.id).length;
          return (
            <li key={c.id} style={{ marginBottom: 10 }}>
              <b>{c.name}</b> <span style={{ color: "#777" }}>({count})</span>
              <div style={{ color: "#666" }}><code>{c.id}</code></div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
