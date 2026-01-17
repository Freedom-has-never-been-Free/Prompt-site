import OpenAI from "openai";

export const runtime = "nodejs"; // keep it simple/compatible

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function safeArray(x: unknown): string[] {
  if (!Array.isArray(x)) return [];
  return x.map(String).map((s) => s.trim()).filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const roleTitle = String(body.roleTitle || "").trim();
    const companyIndustry = String(body.companyIndustry || "").trim();
    const whatYouDid = String(body.whatYouDid || "").trim();
    const toolsSkills = safeArray(body.toolsSkills);
    const impact = String(body.impact || "").trim();

    if (!roleTitle || !whatYouDid) {
      return new Response("Missing roleTitle or whatYouDid", { status: 400 });
    }

    const instructions = `
You are an expert resume writer optimizing for ATS + human readability.
Return JSON ONLY matching this schema:
{
  "bullets": ["...", "...", "..."],
  "why_ats": ["...", "...", "..."],
  "keywords": ["...", "...", ...]
}

Rules:
- Exactly 3 bullets.
- Each bullet: 18–28 words, starts with a strong verb, includes 1 metric OR a plausible proxy if no number is given.
- Use keywords naturally, not stuffed.
- If impact is missing, infer reasonable “proxy metrics” (time saved, error reduction, throughput, compliance, safety).
- Keep claims believable. No superhero nonsense.
`;

    const input = `
Role Title: ${roleTitle}
Company/Industry: ${companyIndustry || "N/A"}
What I did (plain English):
${whatYouDid}

Tools/Skills: ${toolsSkills.length ? toolsSkills.join(", ") : "N/A"}

Impact (optional):
${impact || "N/A"}
`;

    const resp = await client.responses.create({
      model: "gpt-5",
      reasoning: { effort: "low" },
      instructions,
      input,
      // Ask for JSON output (Responses API supports structured outputs; keeping it simple here)
    });

    // The Responses API gives convenient output_text. We'll parse JSON from it.
    const text = resp.output_text?.trim() || "";

    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // If the model returns extra text, try to salvage JSON block
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start >= 0 && end > start) parsed = JSON.parse(text.slice(start, end + 1));
    }

    if (!parsed || !Array.isArray(parsed.bullets)) {
      return new Response(
        JSON.stringify({ error: "Bad model output", raw: text }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(err?.message || "Server error", { status: 500 });
  }
}