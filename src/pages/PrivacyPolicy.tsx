import logo from "@/assets/logo.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { parsePolicyBody, type ParsedSection } from "@/lib/parsePolicy";

interface PolicySection {
  title: string;
  body: string;
}

const defaultSections: PolicySection[] = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide when registering on LocalLeague, including your name, mobile number, email address, and payment/withdrawal details. We also collect device information, usage data, and tournament activity to improve your experience.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to: create and manage your account, process tournament entries and prize payouts, send notifications about tournaments and updates, improve app performance and user experience, and comply with legal obligations.",
  },
  {
    title: "3. Data Security",
    body: "We implement industry-standard security measures to protect your personal information. Payment data is encrypted and processed through secure gateways. We never store your full payment credentials.",
  },
  {
    title: "4. Data Sharing",
    body: "We do not sell, trade, or rent your personal information to third parties. Data may be shared with payment processors strictly for completing transactions, or with authorities if required by law.",
  },
  {
    title: "5. Cookies & Analytics",
    body: "The app may use cookies and analytics tools to understand usage patterns and improve features. No personally identifiable information is shared with analytics providers.",
  },
  {
    title: "6. Children's Privacy",
    body: "LocalLeague is intended for users aged 18 and above. We do not knowingly collect data from minors. If we discover that a minor has registered, their account will be terminated immediately.",
  },
  {
    title: "7. Your Rights",
    body: "You have the right to access, correct, or delete your personal data at any time. To make a request, contact us via the email provided below.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. Continued use of the app after changes constitutes your acceptance of the updated policy.",
  },
  {
    title: "9. Contact Us",
    body: "For any privacy-related queries, email us at: localleague@email.com",
  },
];

/** Normalize Firebase sections — handle both single-blob and multi-section formats */
function normalizeSections(raw: Record<string, PolicySection>): ParsedSection[] {
  const values = Object.values(raw).sort((a, b) => a.title.localeCompare(b.title));

  // If only one section or first section body is very long (>500 chars), parse it
  const allBody = values.map((v) => v.body).join(" ");
  if (values.length <= 2 && allBody.length > 500) {
    const parsed = parsePolicyBody(allBody);
    if (parsed.length > 1) return parsed;
  }

  // Otherwise check each section's body for embedded numbered content
  const result: ParsedSection[] = [];
  for (const section of values) {
    if (section.body && section.body.length > 400) {
      const parsed = parsePolicyBody(section.body);
      if (parsed.length > 1) {
        result.push(...parsed);
        continue;
      }
    }
    result.push({ title: section.title, body: section.body });
  }
  return result;
}

const PrivacyPolicy = () => {
  const { data: firebaseSections, loading } = useFirebaseData<
    Record<string, PolicySection> | null
  >("website/policies/privacy", null);

  const sections: ParsedSection[] =
    !loading && firebaseSections
      ? normalizeSections(firebaseSections)
      : defaultSections;

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "#000000" }}>
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-colors hover:text-foreground"
          style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Rajdhani, sans-serif" }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="LocalLeague" className="w-10 h-10 rounded-xl object-cover" />
          <span
            className="text-2xl font-black tracking-wider"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--primary))" }}
          >
            LocalLeague
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-black gradient-brand-text mb-2"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div
          className="rounded-2xl p-8 flex flex-col gap-8 text-sm leading-relaxed"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
        >
          {sections.map((section, idx) => (
            <div key={section.title || idx}>
              {section.title && (
                <h2
                  className="text-lg font-black mb-2"
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {section.title}
                </h2>
              )}
              <p className="text-muted-foreground whitespace-pre-line">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
