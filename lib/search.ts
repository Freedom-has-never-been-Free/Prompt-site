import type { PromptTemplate } from "./data";

function scoreOne(p: PromptTemplate, q: string) {
  const query = q.toLowerCase().trim();
  if (!query) return 0;

  const title = p.title.toLowerCase();
  const desc = p.short_description.toLowerCase();
  const tags = (p.tags || []).map(t => t.toLowerCase());

  let score = 0;
  if (title === query) score += 100;
  if (title.includes(query)) score += 40;
  if (desc.includes(query)) score += 15;

  for (const t of tags) {
    if (t === query) score += 30;
    else if (t.includes(query)) score += 10;
  }

  const words = query.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    let hits = 0;
    for (const w of words) {
      if (title.includes(w)) hits += 3;
      if (desc.includes(w)) hits += 1;
      if (tags.some(t => t.includes(w))) hits += 1;
    }
    score += hits;
  }
  return score;
}

export function searchPrompts(prompts: PromptTemplate[], q: string) {
  const query = q.trim();
  if (!query) return prompts;
  return prompts
    .map(p => ({ p, s: scoreOne(p, query) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s || a.p.title.localeCompare(b.p.title))
    .map(x => x.p);
}
