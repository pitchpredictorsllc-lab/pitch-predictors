 "use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchSettings();
    }
  }, [isLoggedIn]);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/show-settings");
      const data = await res.json();
      setIsActive(data.isActive);
    } catch {
      setError("Failed to fetch settings.");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/show-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, isActive: false }),
    });

    const data = await res.json();

    if (res.ok) {
      setIsLoggedIn(true);
      setIsActive(data.isActive);
    } else {
      setError(data.error || "Invalid password.");
    }
  }

  async function handleToggle(newValue: boolean) {
    setLoading(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/admin/show-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, isActive: newValue }),
    });

    const data = await res.json();

    if (res.ok) {
      setIsActive(data.isActive);
      setMessage(`Show access is now ${data.isActive ? "ON" : "OFF"}.`);
    } else {
      setError(data.error || "Something went wrong.");
    }

    setLoading(false);
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

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <img src="/radar.png" alt="Pitch Predictors" style={{ width: 70, height: 70, objectFit: "contain", display: "block", margin: "0 auto 12px" }} />
          <div style={{ fontWeight: 900, fontSize: 20, color: "#c4a882", letterSpacing: "-0.02em" }}>PITCH PREDICTORS</div>
          <div style={{ color: "#6a7a90", fontSize: 14, marginTop: 4 }}>Admin Panel</div>
        </div>

        {!isLoggedIn ? (
          // Login form
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "#a0b0c0", fontSize: 14, marginBottom: 8 }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: "100%",
                  background: "#1a2535",
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
              style={{
                width: "100%",
                background: "#c4a882",
                color: "#000",
                fontWeight: 800,
                padding: "14px",
                borderRadius: 8,
                border: "none",
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Log In
            </button>
          </form>
        ) : (
          // Admin panel
          <div style={{ background: "#1a2535", borderRadius: 12, padding: 32 }}>
            <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 900, marginBottom: 8, textAlign: "center" }}>
              Show Access
            </h2>
            <p style={{ color: "#6a7a90", fontSize: 14, textAlign: "center", marginBottom: 32 }}>
              Toggle whether customers can purchase show access today.
            </p>

            {/* Status indicator */}
            <div style={{
              background: isActive ? "#0d2b1a" : "#2b0d0d",
              border: `1px solid ${isActive ? "#1a5c35" : "#5c1a1a"}`,
              borderRadius: 8,
              padding: "16px",
              textAlign: "center",
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{isActive ? "🟢" : "🔴"}</div>
              <div style={{ color: isActive ? "#4ade80" : "#f87171", fontWeight: 800, fontSize: 18 }}>
                {isActive ? "SHOW IS ACTIVE" : "NO SHOW TODAY"}
              </div>
              <div style={{ color: "#6a7a90", fontSize: 13, marginTop: 4 }}>
                {isActive ? "Customers can purchase access" : "Purchase button is disabled"}
              </div>
            </div>

            {/* Toggle buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => handleToggle(true)}
                disabled={loading || isActive}
                style={{
                  flex: 1,
                  background: isActive ? "#1a2535" : "#c4a882",
                  color: isActive ? "#6a7a90" : "#000",
                  fontWeight: 800,
                  padding: "14px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 15,
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                Turn ON
              </button>
              <button
                onClick={() => handleToggle(false)}
                disabled={loading || !isActive}
                style={{
                  flex: 1,
                  background: !isActive ? "#1a2535" : "#e05c5c",
                  color: !isActive ? "#6a7a90" : "#fff",
                  fontWeight: 800,
                  padding: "14px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 15,
                  cursor: !isActive ? "default" : "pointer",
                }}
              >
                Turn OFF
              </button>
            </div>

            {message && (
              <p style={{ color: "#4ade80", fontSize: 14, textAlign: "center", marginTop: 16 }}>{message}</p>
            )}
            {error && (
              <p style={{ color: "#e05c5c", fontSize: 14, textAlign: "center", marginTop: 16 }}>{error}</p>
            )}

            <button
              onClick={() => { setIsLoggedIn(false); setPassword(""); }}
              style={{
                width: "100%",
                background: "transparent",
                color: "#6a7a90",
                border: "none",
                fontSize: 13,
                cursor: "pointer",
                marginTop: 24,
                textDecoration: "underline",
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
