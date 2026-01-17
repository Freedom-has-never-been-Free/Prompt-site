"use client";

import { useState, useMemo } from "react";

type ApiResponse = {
  bullets: string[];
  why_ats: string[];
  keywords: string[];
};

export default function TryIt() {
  const [roleTitle, setRoleTitle] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [whatYouDid, setWhatYouDid] = useState("");
  const [toolsSkills, setToolsSkills] = useState("");
  const [impact, setImpact] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parsedSkills = useMemo(() => {
    return toolsSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 20);
  }, [toolsSkills]);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate-resume-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleTitle,
          companyIndustry,
          whatYouDid,
          toolsSkills: parsedSkills,
          impact,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = (await res.json()) as ApiResponse;
      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Something broke. Classic.");
    } finally {
      setLoading(false);
    }
  }

  const canGenerate =
    roleTitle.trim() && whatYouDid.trim() && (companyIndustry.trim() || parsedSkills.length);

  return (
    <section style={{ border: "1px solid #eee", borderRadius: 10, padding: 14 }}>
      <div style={{ display: "grid", gap: 10 }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Role title
          </label>
          <input
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="e.g., Warehouse Associate, Dispatcher, Sales Rep"
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Company / industry
          </label>
          <input
            value={companyIndustry}
            onChange={(e) => setCompanyIndustry(e.target.value)}
            placeholder="e.g., Mohawk Flooring (manufacturing/logistics)"
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            What you did (plain English)
          </label>
          <textarea
            value={whatYouDid}
            onChange={(e) => setWhatYouDid(e.target.value)}
            placeholder="Describe responsibilities, projects, and day-to-day work. Don't worry about sounding fancy."
            rows={6}
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Tools / skills (comma-separated)
          </label>
          <input
            value={toolsSkills}
            onChange={(e) => setToolsSkills(e.target.value)}
            placeholder="e.g., forklifts, WMS, RF scanner, Excel, DOT logs"
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
          {parsedSkills.length > 0 && (
            <div style={{ marginTop: 8, color: "#666", fontSize: 13 }}>
              Parsed: {parsedSkills.join(" • ")}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Impact (optional)
          </label>
          <textarea
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            placeholder="Any measurable results? Saved time, reduced errors, increased throughput, improved safety, etc."
            rows={3}
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
        </div>

        <button
          type="button"
          disabled={!canGenerate || loading}
          onClick={onGenerate}
          style={{
            padding: "11px 14px",
            border: "1px solid #ddd",
            borderRadius: 10,
            cursor: canGenerate && !loading ? "pointer" : "not-allowed",
            background: "white",
            fontWeight: 600,
          }}
        >
          {loading ? "Generating…" : "Generate 3 resume bullets"}
        </button>

        {!canGenerate && (
          <div style={{ color: "#666", fontSize: 13 }}>
            Add at least a role title + what you did. (Yes, the computer needs something to chew on.)
          </div>
        )}

        {error && (
          <div style={{ color: "#b00020", fontSize: 13 }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: 8 }}>
            <h3 style={{ margin: "10px 0 6px" }}>Bullets</h3>
            <ul>
              {result.bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{b}</li>
              ))}
            </ul>

            <h3 style={{ margin: "14px 0 6px" }}>Why this works for ATS</h3>
            <ul>
              {result.why_ats.map((w, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{w}</li>
              ))}
            </ul>

            {result.keywords?.length ? (
              <>
                <h3 style={{ margin: "14px 0 6px" }}>Keywords emphasized</h3>
                <div style={{ color: "#444" }}>{result.keywords.join(", ")}</div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}