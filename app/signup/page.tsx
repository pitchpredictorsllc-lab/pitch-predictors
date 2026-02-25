"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!form.agreedToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
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
          <p style={{ margin: "8px 0 0", color: "#6a7a90", fontSize: 14 }}>Create your account</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label style={{ fontSize: 12, color: "#c4a882", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>
                {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field.includes("assword") ? "password" : field === "email" ? "email" : "text"}
                value={form[field as keyof typeof form] as string}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #2a3550", background: "#0a0a0a", color: "#fff", fontSize: 14, boxSizing: "border-box" as const, outline: "none" }}
              />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <input type="checkbox" id="terms" checked={form.agreedToTerms} onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })} style={{ marginTop: 3, accentColor: "#c4a882" }} />
            <label htmlFor="terms" style={{ fontSize: 13, color: "#8090a8", lineHeight: 1.5 }}>
              I agree to the <a href="/terms" target="_blank" style={{ color: "#c4a882" }}>Terms & Conditions</a>
            </label>
          </div>
          {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#ef4444" }}>{error}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: "#c4a882", color: "#000", fontWeight: 800, padding: "14px", borderRadius: 8, border: "none", fontSize: 15, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <p style={{ textAlign: "center", fontSize: 13, color: "#6a7a90", margin: 0 }}>
            Already have an account? <a href="/login" style={{ color: "#c4a882", fontWeight: 700 }}>Log in</a>
          </p>
        </div>
      </div>
    </main>
  );
}