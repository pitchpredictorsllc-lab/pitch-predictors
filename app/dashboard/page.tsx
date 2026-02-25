"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
  };

  return (
    <main style={{
      background: "#0f0f0f",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e8e0",
    }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #c4a882",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/radar.png" alt="Pitch Predictors" style={{ height: 40, objectFit: "contain" }} />
          <span style={{ fontWeight: 900, fontSize: 18, color: "#c4a882", fontFamily: "Georgia, serif" }}>PITCH PREDICTORS</span>
        </div>
        <button
          onClick={handleSignOut}
          style={{ background: "none", border: "1px solid #6a7a90", color: "#6a7a90", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 14 }}
        >
          Sign Out
        </button>
      </nav>
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Welcome!</h1>
        <p style={{ color: "#8090a8", fontSize: 16, marginBottom: 40 }}>You're logged in to Pitch Predictors.</p>

        {/* Discord linking */}
        <div style={{ background: "#0d1120", border: "2px solid #c4a882", borderRadius: 12, padding: "32px", marginBottom: 24 }}>
          <h2 style={{ color: "#c4a882", fontWeight: 900, fontSize: 20, margin: "0 0 12px" }}>🎮 Link Your Discord</h2>
          <p style={{ color: "#8090a8", fontSize: 14, lineHeight: 1.65, margin: "0 0 20px" }}>
            Link your Discord account to automatically receive access to the live show channel after purchase.
          </p>
          <button style={{
            background: "#5865f2", color: "#fff", fontWeight: 800,
            padding: "12px 24px", borderRadius: 8, border: "none",
            fontSize: 14, cursor: "pointer",
          }}>
            Connect Discord
          </button>
        </div>

        {/* Buy show */}
        <div style={{ background: "#0d1120", border: "1px solid #2a3550", borderRadius: 12, padding: "32px" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 20, margin: "0 0 12px" }}>⚾ Buy Show Access</h2>
          <p style={{ color: "#8090a8", fontSize: 14, lineHeight: 1.65, margin: "0 0 20px" }}>
            Purchase access to an upcoming live show for $100+tax.
          </p>
          <button
            onClick={async () => {
              const res = await fetch("/api/checkout", { method: "POST" });
              const data = await res.json();
              if (data.url) window.location.href = data.url;
            }}
            style={{
              background: "#c4a882", color: "#000", fontWeight: 800,
              padding: "12px 24px", borderRadius: 8, border: "none",
              fontSize: 14, cursor: "pointer",
            }}
          >
            Buy Show Access — $100
          </button>
        </div>
      </div>
    </main>
  );
}