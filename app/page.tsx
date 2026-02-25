"use client";
import {useState, useEffect} from "react";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(res => {
      if (res.ok) setIsLoggedIn(true);
    });
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    setIsLoggedIn(false);
  };

  const handleCheckout = async () => {
    // Check if logged in first
    const authRes = await fetch("/api/auth/me");
    if (!authRes.ok) {
      window.location.href = "/signup";
      return;
    }
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main style={{
      margin: 0,
      padding: 0,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0f0f0f",
      color: "#e8e8e0",
      minHeight: "100vh",
    }}>

      {/* NAV */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #c4a882",
        background: "#0f0f0f",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/radar.png" alt="Pitch Predictors" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          <span style={{ fontWeight: 900, fontSize: 18, color: "#c4a882", letterSpacing: "-0.02em", fontFamily: "Georgia, Times New Roman, serif" }}>PITCH PREDICTORS</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" style={{ background: "none", border: "1px solid #c4a882", color: "#c4a882", fontWeight: 800, padding: "10px 18px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>Dashboard</a>
              <button onClick={handleSignOut} style={{ background: "none", border: "1px solid #6a7a90", color: "#6a7a90", fontWeight: 700, padding: "10px 18px", borderRadius: 6, fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif" }}>Sign Out</button>
            </>
          ) : (
            <>
              <a href="/login" style={{ background: "none", border: "1px solid #c4a882", color: "#c4a882", fontWeight: 800, padding: "10px 18px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>Log In</a>
              <a href="/signup" style={{ background: "#c4a882", color: "#000", fontWeight: 800, padding: "10px 18px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>Sign Up</a>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        textAlign: "center",
        padding: "100px 24px 80px",
        background: "#0f0f0f",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,168,130,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          display: "inline-block",
          background: "rgba(196,168,130,0.1)",
          border: "1px solid rgba(196,168,130,0.3)",
          color: "#c4a882",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "6px 18px",
          borderRadius: 100,
          marginBottom: 28,
        }}>
          Live During MLB Season
        </div>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            color: "#fff",
            margin: "0 0 20px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}>
            Real-Time Baseball<br />
            <span style={{ color: "#c4a882" }}>Analysis. Live.</span>
          </h1>
        </div>
        <p style={{
          fontSize: 18,
          color: "#8090a8",
          maxWidth: 560,
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}>
          Pitch Predictors is a live show that breaks down MLB games in real time — pitch speeds, tendencies, and expert analysis delivered directly in our exclusive Discord community.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#pricing"
            style={{
              background: "#c4a882",
              color: "#0f0f0f",
              fontWeight: 800,
              padding: "16px 36px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 16,
              letterSpacing: "0.03em",
            }}
          >
            Get Access — $100/Show
          </a>
          <a
            href="#how-it-works"
            style={{
              background: "transparent",
              color: "#e8e8e0",
              fontWeight: 600,
              padding: "16px 36px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 16,
              border: "1px solid #c4a882",
            }}
          >
            How It Works
          </a>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 48,
          marginTop: 72,
          flexWrap: "wrap",
        }}>
          {[
            { value: "LIVE", label: "Real-Time Analysis" },
            { value: "MLB", label: "Season Coverage" },
            { value: "DISCORD", label: "Exclusive Access" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#c4a882" }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "#5a6a80", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
          What You Get
        </h2>
        <p style={{ textAlign: "center", color: "#8090a8", marginBottom: 56, fontSize: 16 }}>
          
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {[
            { icon: "📡", title: "Live Pitch Speed Breakdowns", desc: "We track and analyze pitch speeds as they happen, giving you context and insight pitch by pitch." },
            { icon: "🎙️", title: "Expert Live Commentary", desc: "Our hosts break down pitcher tendencies, matchups, and game situations in real time during every show." },
            { icon: "⚾", title: "In-Depth Game Analysis", desc: "Go beyond the box score. We cover what the numbers mean and why each pitch matters in the moment." },
            { icon: "🎮", title: "Exclusive Discord Access", desc: "Every ticket gets you into our private Discord channel where the show streams live." },
          ].map((item) => (
            <div key={item.title} style={{
              background: "#0f0f0f",
              border: "1px solid #c4a882",
              borderRadius: 12,
              padding: "28px 24px",
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: "#6a7a90", lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "80px 24px", background: "#0f0f0f" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            How It Works
          </h2>
          <p style={{ color: "#8090a8", marginBottom: 56, fontSize: 16 }}>
            Three simple steps to get you in the show.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}>
            {[
              { step: "01", title: "Purchase Show Access", desc: "Buy a ticket to an upcoming live show for $100 through our secure Stripe checkout." },
              { step: "02", title: "Connect Your Discord", desc: "After purchase, link your Discord account. We automatically grant you access to the exclusive show channel — no waiting, no manual approval." },
              { step: "03", title: "Watch the Live Show", desc: "When the show goes live, join us in Discord for real-time pitch speed analysis and expert MLB commentary." },
            ].map((item) => (
              <div key={item.step} style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                background: "#0f0f0f",
                border: "1px solid #c4a882",
                borderRadius: 12,
                padding: "24px",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "#c4a882", color: "#ffffff",
                  fontWeight: 900, fontSize: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: "#6a7a90", lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
          Simple Pricing
        </h2>
        <p style={{ color: "#8090a8", marginBottom: 48, fontSize: 16 }}>
          Pay per show. No subscriptions, no commitments.
        </p>
        <div style={{
          display: "inline-block",
          background: "#0f0f0f",
          border: "2px solid #c4a882",
          borderRadius: 16,
          padding: "48px 56px",
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 0 60px rgba(196,168,130,0.08)",
        }}>
          <div style={{ fontSize: 13, color: "#c4a882", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Per Show Access
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", lineHeight: 1 }}>$100</div>
          <div style={{ color: "#5a6a80", marginBottom: 4, marginTop: 8 }}>one-time per show</div><div style={{ color: "#6a7a90", fontSize: 11, marginBottom: 32, fontStyle: "italic" }}>Applicable taxes may apply at checkout</div>
          <div style={{ textAlign: "left", marginBottom: 32 }}>
            {[
              "Full access to the live show",
              "Automatic Discord channel access",
              "Real-time pitch speed analysis",
              "Expert MLB commentary",
              "Exclusive member community",
            ].map((feature) => (
              <div key={feature} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: "#c4a882", fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: 14, color: "#a0b0c0" }}>{feature}</span>
              </div>
            ))}
          </div>
          <button 
          onClick={handleCheckout} 
          style={{
            width: "100%",
            background: "#c4a882",
            color: "#0f0f0f",
            fontWeight: 800,
            padding: "16px",
            borderRadius: 8,
            border: "none",
            fontSize: 16,
            cursor: "pointer",
            letterSpacing: "0.03em",
          }}>
            Buy Show Access
          </button>
      
          <p style={{ fontSize: 12, color: "#a0b0c0", marginTop: 16 }}>Secure checkout via Stripe</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "32px 40px",
        borderTop: "1px solid #c4a882",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/radar.png" alt="Pitch Predictors" style={{ height: 40, width: "auto", objectFit: "contain" }} />
        </div>
        <div style={{ fontSize: 13, color: "#a0b0c0" }}>© 2025 Pitch Predictors LLC. All rights reserved.</div>
      </footer>

    </main>
  );
}