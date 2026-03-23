"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(data.error || "Something went wrong.");
    }
  }

  if (!token) {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#e05c5c", fontSize: 16, marginBottom: 16 }}>Invalid reset link. Please request a new one.</p>
        <a href="/login" style={{ color: "#c4a882", fontSize: 14 }}>Back to Login</a>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ background: "#1a2535", borderRadius: 12, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h2 style={{ color: "#4ade80", fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Password Updated!</h2>
        <p style={{ color: "#a0b0c0", fontSize: 15, marginBottom: 24 }}>Your password has been reset successfully.</p>
        <a href="/login" style={{
          background: "#c4a882", color: "#000", fontWeight: 800,
          padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 15,
        }}>
          Log In
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#1a2535", borderRadius: 12, padding: 32 }}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", color: "#a0b0c0", fontSize: 14, marginBottom: 8 }}>
          New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
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

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", color: "#a0b0c0", fontSize: 14, marginBottom: 8 }}>
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your new password"
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
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/login" style={{ color: "#6a7a90", fontSize: 13 }}>Back to Login</a>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
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
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "16px 0 8px" }}>Reset Password</h1>
        </div>
        <Suspense fallback={<p style={{ color: "#a0b0c0", textAlign: "center" }}>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}