"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <main style={{
      background: "#0f0f0f",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <img src="/radar.png" alt="Pitch Predictors" style={{ width: 70, height: 70, objectFit: "contain", display: "block", margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 900, fontSize: 20, color: "#c4a882", letterSpacing: "-0.02em" }}>PITCH PREDICTORS</div>
          </a>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "16px 0 8px" }}>Forgot Password</h1>
          <p style={{ color: "#6a7a90", fontSize: 14, margin: 0 }}>Enter your email and we'll send you a reset link.</p>
        </div>

        {success ? (
          <div style={{ background: "#1a2535", borderRadius: 12, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📧</div>
            <h2 style={{ color: "#4ade80", fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Check Your Email</h2>
            <p style={{ color: "#a0b0c0", fontSize: 15, marginBottom: 24 }}>
              If an account exists for that email, we've sent a password reset link. It expires in 1 hour.
            </p>
            <a href="/login" style={{
              background: "#c4a882", color: "#000", fontWeight: 800,
              padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 15,
            }}>
              Back to Login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "#1a2535", borderRadius: 12, padding: 32 }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", color: "#a0b0c0", fontSize: 14, marginBottom: 8 }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  background: "#0f0f0f",
                  border: "1px solid #2a3a50",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#fff",
                  fontSize: 15,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {error && (
              <p style={{ color: "#e05c5c", fontSize: 14, marginBottom: 16 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#c4a882",
                color: "#000",
                fontWeight: 800,
                padding: "14px",
                borderRadius: 8,
                border: "none",
                fontSize: 15,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <a href="/login" style={{ color: "#6a7a90", fontSize: 13 }}>Back to Login</a>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
