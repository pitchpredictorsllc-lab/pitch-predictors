export default function Terms() {
  const sections = [
    {
      title: "Disclaimer",
      content: `The information and analysis provided by Pitch Predictors LLC ("we," "us," or "our") are strictly for entertainment and informational purposes only. We do not offer or facilitate betting or wagering services, nor do we accept or place bets on behalf of users. Our content, including predictive models, statistical breakdowns, and sports commentary, is designed to inform and engage sports enthusiasts, not to promote or encourage gambling. This disclaimer applies to all content shared in the Pitch Predictors LLC Discord server, or any property owned or operated by Pitch Predictors LLC and its members.`,
    },
    {
      title: "Website & Account Terms",
      content: `By creating an account on pitchpredictors.com, you agree to provide accurate and complete information including your name, email address, and Discord account. You are responsible for maintaining the confidentiality of your account credentials and must not share your login with anyone else.\n\nWe collect the following information to operate our service: your name, email address, hashed (encrypted) password, and Discord account ID and username. This information is stored securely and is never sold to third parties. If you wish to have your account and associated data deleted, please contact us directly.\n\nOur website uses cookies solely to keep you logged in during your session. We do not use advertising or tracking cookies of any kind.\n\nYou must be 21 years of age or older to create an account or purchase any service from Pitch Predictors LLC.`,
    },
    {
      title: "Florida Residents & Legal Compliance",
      content: `Pitch Predictors LLC operates in accordance with the laws of the State of Florida. It is your responsibility to ensure that any actions you take based on our content comply with Florida law and any applicable regulations in your jurisdiction. All users must be 21 years of age or older to access and use our services. By using our platforms, you affirm that you meet this requirement. Our content and services are not intended for use in jurisdictions where such activities are prohibited by law. Users are solely responsible for ensuring their access and use of our services are lawful in their jurisdiction.`,
    },
    {
      title: "Opinions Only – No Guarantees",
      content: `Any information shared by Pitch Predictors LLC or its members represents personal opinions only. No particular outcome or result is ever guaranteed by joining or purchasing any service promoted, sold, or discussed through our properties. You are solely responsible for performing your own due diligence and making decisions based on your own evaluation of the information provided.`,
    },
    {
      title: "No Joint Venture",
      content: `Nothing contained herein shall be deemed or construed by you or by any third party as creating any employment or agency relationship or partnership or joint venture between us. You hereby agree and acknowledge that you are acting independently and not in concert with us or with any other party to this agreement.`,
    },
    {
      title: "Intellectual Property & Content Sharing",
      content: `All content, analysis, written materials, video, audio, and communications distributed on any platform owned or operated by Pitch Predictors LLC are the exclusive intellectual property of Pitch Predictors LLC. This includes, but is not limited to, proprietary models, graphics, strategy guides, and educational resources.\n\nUsers are strictly prohibited from copying, reproducing, redistributing, reselling, or sharing any content—whether for free or for compensation—without the express written consent of Pitch Predictors LLC. This applies to all public and private platforms including social media, Discord, forums, and email. Violation of this policy may result in immediate termination of access, legal action, and/or monetary damages.\n\nWe are not affiliated with or endorsed by Hardrock Sportsbook or any licensed sportsbook. References to sportsbook platforms are strictly for illustrative purposes.`,
    },
    {
      title: "No Guarantees or Warranties",
      content: `All opinions, projections, and data are provided "as is" without any express or implied warranties. We make no guarantees of outcomes or financial returns, and past performance is not indicative of future results. Users assume full responsibility for any actions taken based on our content.`,
    },
    {
      title: "Play Responsibly",
      content: `Sports wagering involves financial risk and may not be suitable for all individuals. If you or someone you know is struggling with gambling, we strongly encourage seeking help. Contact the Florida Council on Compulsive Gambling at 1-888-ADMIT-IT (1-888-236-4848) – available 24/7 for free, confidential support.`,
    },
    {
      title: "Limitation of Liability",
      content: `Pitch Predictors LLC, its affiliates, and contributors shall not be held liable for any direct or indirect losses, damages, or legal consequences arising from your use of our content or reliance on our analysis. By accessing any of our materials or engaging with our services, you agree to indemnify and hold us harmless from any such claims. Pitch Predictors LLC does not encourage or condone mirror betting. Any users who choose to copy or follow wagers made by our team or guests do so at their discretion and risk. All users are expected to make independent decisions. We share our content for entertainment purposes - not as recommendations or advice.`,
    },
    {
      title: "Access Terms for Pass Purchases",
      content: `By purchasing a Day-Pass, the customer receives premium access to our Discord server only for the duration of the show on the day of purchase, not a full 24-hour period. Access will begin when customers redeem their purchase by messaging in the "day-pass" channel and end following the show's conclusion.\n\nBy purchasing a Week-Pass, the customer receives premium access to our Discord server for seven (7) consecutive calendar days beginning on the date of purchase. This Week-Pass includes a minimum guarantee of five (5) shows during that access period. No refunds or credits will be issued for unused time or missed shows, provided the five-show minimum is met. We do not allow for pausing of subscriptions, nor do we allow for refunds for any reason. Weekly subscriptions automatically renew, and can be cancelled by accessing the Pitch Predictors LLC Customer Portal.`,
    },
    {
      title: "Terms of Service",
      content: `By accessing, subscribing to, or using any service, website, content, or communication from Pitch Predictors LLC, you agree to the following:\n\n• Use at Your Own Risk: All decisions made based on our content are your sole responsibility. You agree not to hold Pitch Predictors LLC liable for any financial losses or other consequences.\n\n• No Financial or Betting Advice: We do not provide investment, financial, or gambling advice. Nothing shared should be interpreted as a recommendation to engage in any financial transaction or wager.\n\n• Accountability: You are responsible for maintaining the confidentiality of your account credentials and agree not to share your login or access with anyone.\n\n• Termination of Access: Pitch Predictors LLC reserves the right to suspend or terminate access to any user at any time for violating these terms or engaging in harmful or unlawful behavior.\n\n• Prohibited Conduct: You agree not to use our content or services for any unlawful purpose, including scraping, redistributing, or reverse-engineering our materials. Misuse of community platforms may result in immediate termination.\n\n• Premium Access: Access to certain content or services may require payment. We reserve the right to change prices, modify service offerings, or revoke access without prior notice in the case of abuse or violation of terms.\n\n• Eligibility: You are solely responsible for ensuring that your use of our content complies with the laws of your jurisdiction.\n\n• Modifications: We may revise these Terms of Service at any time. Continued use of our services constitutes your acceptance of the modified terms. It is your responsibility to review these terms periodically.`,
    },
  ];

  return (
    <main style={{
      background: "#0f0f0f",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e8e0",
      padding: "60px 24px",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <img src="/radar.png" alt="Pitch Predictors" style={{ width: 80, height: 80, objectFit: "contain", display: "block", margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 900, fontSize: 22, color: "#c4a882", letterSpacing: "-0.02em" }}>PITCH PREDICTORS</div>
          </a>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "24px 0 8px" }}>Terms & Conditions</h1>
          <p style={{ color: "#6a7a90", fontSize: 14, margin: 0 }}>Last updated: February 2026</p>
        </div>

        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#c4a882", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #1a2535" }}>
              {section.title}
            </h2>
            {section.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ color: "#a0b0c0", fontSize: 15, lineHeight: 1.8, margin: "0 0 16px" }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 60 }}>
          <a href="/" style={{
            background: "#c4a882", color: "#000", fontWeight: 800,
            padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 15,
          }}>
            Back to Home
          </a>
        </div>

      </div>
    </main>
  );
}