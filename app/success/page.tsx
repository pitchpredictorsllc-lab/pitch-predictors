export default function Success() {
  return (
    <main style={{
      background: "#0f0f0f",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
      textAlign: "center",
      padding: "24px",
    }}>
      <div>
        <img src="/radar.png" alt="Pitch Predictors" style={{ width: 140, height: 140, objectFit: "contain", display: "block", margin: "0 auto 24px" }} />
        <h1 style={{ color: "#c4a882", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>
          You&apos;re In!
        </h1>
        <p style={{ color: "#a0b0c0", fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
          Your payment was successful. Check your email for confirmation and Discord access instructions.
        </p>
        <a href="/" style={{
          background: "#c4a882",
          color: "#000",
          fontWeight: 800,
          padding: "14px 32px",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 15,
        }}>
          Back to Home
        </a>
      </div>
    </main>
  );
}