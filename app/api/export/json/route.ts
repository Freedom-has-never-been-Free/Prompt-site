import { getAllPrompts, getAllPacks, getCategories } from "../../../../lib/data";

export const runtime = "nodejs";

export async function GET() {
  const data = {
    exported_at: new Date().toISOString(),
    counts: {
      prompts: getAllPrompts().length,
      packs: getAllPacks().length,
      categories: getCategories().length
    },
    categories: getCategories(),
    packs: getAllPacks(),
    prompts: getAllPrompts()
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": "attachment; filename=export.json"
    }
  });
}
