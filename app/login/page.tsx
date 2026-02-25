"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <main style={{ background: "#0f0f0f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "24px" }}>
      <div style={{ border: "2px solid #c4a882", borderRadius: 16, padding: "48px", width: "100%", maxWidth: 440, boxShadow: "0 0 60px rgba(196,168,130,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/radar.png" alt="Pitch Predictors" style={{ width: 80, height: 80, objectFit: "contain", display: "block", margin: "0 auto 12px" }} />
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#c4a882" }}>PITCH PREDICTORS</h1>
          <p style={{ margin: "8px 0 0", color: "#6a7a90", fontSize: 14 }}>Log in to your account</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: "#c4a882", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #2a3550", background: "#0a0a0a", color: "#fff", fontSize: 14, boxSizing: "border-box" as const, outline: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#c4a882", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Your password"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #2a3550", background: "#0a0a0a", color: "#fff", fontSize: 14, boxSizing: "border-box" as const, outline: "none" }}
            />
          </div>
          {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#ef4444" }}>{error}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: "#c4a882", color: "#000", fontWeight: 800, padding: "14px", borderRadius: 8, border: "none", fontSize: 15, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          <p style={{ textAlign: "center", fontSize: 13, color: "#6a7a90", margin: 0 }}>
            Don&apos;t have an account? <a href="/signup" style={{ color: "#c4a882", fontWeight: 700 }}>Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
}