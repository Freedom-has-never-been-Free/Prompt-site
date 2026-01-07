import categories from "../data/categories.json";
import packs from "../data/packs.json";
import prompts from "../data/prompts.json";

export type Category = { id: string; slug: string; name: string };

export type PromptTemplate = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  category_id: string;
  tags: string[];
  prompt_template: string;
  input_fields: { key: string; label?: string; required: boolean; description: string }[];
  output_format: { type: string; description: string };
  created_at?: string;
  updated_at?: string;
};

export type PromptPack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt_slugs: string[];
  created_at?: string;
  updated_at?: string;
};

export function getCategories(): Category[] {
  return (categories as Category[]) || [];
}

export function getAllPacks(): PromptPack[] {
  return (packs as PromptPack[]) || [];
}

export function getAllPrompts(): PromptTemplate[] {
  return (prompts as PromptTemplate[]) || [];
}

export function getPromptBySlug(slug: string) {
  return getAllPrompts().find(p => p.slug === slug);
}

export function getPackBySlug(slug: string) {
  return getAllPacks().find(p => p.slug === slug);
}

export function getPromptsForPack(pack: PromptPack) {
  const map = new Map(getAllPrompts().map(p => [p.slug, p]));
  return pack.prompt_slugs.map(s => map.get(s)).filter(Boolean) as PromptTemplate[];
}
