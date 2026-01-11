"use client";

export default function TryIt() {
  return (
    <>
      <h2 style={{ marginTop: 16 }}>Try it</h2>

      <form style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Resume bullet points
        </label>

        <textarea
          placeholder="Paste your current resume bullet points here..."
          rows={8}
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
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
          onClick={() =>
            alert("Next step: wire this to an API route that calls an AI model.")
          }
        >
          Generate
        </button>

        <div style={{ marginTop: 12, color: "#777", fontSize: 13 }}>
          This button is a placeholder. Next we’ll connect it to the backend.
        </div>
      </form>
    </>
  );
}