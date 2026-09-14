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
    title: "1. Acceptance of Terms",
    body: "By downloading or using the LocalLeague app, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the app.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years of age to use LocalLeague. By registering, you confirm that you meet this requirement. Residents of states where skill-based gaming tournaments are prohibited are not eligible to participate.",
  },
  {
    title: "3. Tournament Rules",
    body: "All tournaments hosted on LocalLeague are skill-based competitions. Entry fees are collected before the tournament begins. Prize money is distributed to winners as per the announced prize structure. Decisions made by LocalLeague regarding match results and disputes are final.",
  },
  {
    title: "4. Fair Play",
    body: "Any use of hacks, cheats, emulators (unless specifically allowed), or unfair means will result in immediate disqualification and permanent account ban without refund. We reserve the right to verify player identities and device authenticity.",
  },
  {
    title: "5. Payments & Withdrawals",
    body: "Entry fees are non-refundable once a tournament has started. Prize withdrawals are processed within 3–7 business days to your registered payment method. LocalLeague is not responsible for delays caused by payment gateways or banks.",
  },
  {
    title: "6. Account Responsibility",
    body: "You are responsible for maintaining the confidentiality of your account credentials. Each user may only register one account. Multiple accounts will result in a permanent ban.",
  },
  {
    title: "7. Limitation of Liability",
    body: "LocalLeague is not liable for any indirect, incidental, or consequential damages arising from the use of the app, including but not limited to loss of earnings or data.",
  },
  {
    title: "8. Modifications",
    body: "We reserve the right to modify these Terms at any time. Continued use of the app following any changes constitutes your acceptance of the new Terms.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.",
  },
  {
    title: "10. Contact",
    body: "For any queries related to these Terms, contact us at: localleague@email.com",
  },
];

/** Normalize Firebase sections — handle both single-blob and multi-section formats */
function normalizeSections(raw: Record<string, PolicySection>): ParsedSection[] {
  const values = Object.values(raw).sort((a, b) => a.title.localeCompare(b.title));

  // If only one section or body is very long (>500 chars), parse it
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

const TermsConditions = () => {
  const { data: firebaseSections, loading } = useFirebaseData<
    Record<string, PolicySection> | null
  >("website/policies/terms", null);

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
          Terms & Conditions
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

export default TermsConditions;
