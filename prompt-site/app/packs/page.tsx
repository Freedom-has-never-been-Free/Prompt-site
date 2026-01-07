import { getAllPacks, getPromptsForPack } from "../../lib/data";

export default function PacksPage() {
  const packs = getAllPacks();
  return (
    <main>
      <h1>Packs</h1>
      <ul>
        {packs.map(pk => {
          const prompts = getPromptsForPack(pk);
          return (
            <li key={pk.slug} style={{ marginBottom: 14 }}>
              <a href={`/packs/${pk.slug}`} style={{ fontWeight: 800 }}>{pk.title}</a>
              <div style={{ color: "#555" }}>{pk.description}</div>
              <div style={{ color: "#777", fontSize: 13 }}>{prompts.length} prompts</div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
