import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";
import screenshot5 from "@/assets/screenshot5.png";
import { useFirebaseData } from "@/hooks/useFirebaseData";

interface ScreenshotItem {
  url: string;
  label: string;
  order?: number;
}

const localFallbacks = [
  { url: screenshot1, label: "Tournament Lobby" },
  { url: screenshot2, label: "Squad Registration" },
  { url: screenshot3, label: "Leaderboard" },
  { url: screenshot4, label: "Rewards Wallet" },
  { url: screenshot5, label: "Home Dashboard" },
];

const Screenshots = () => {
  const { data: firebaseScreenshots, loading } = useFirebaseData<
    Record<string, ScreenshotItem> | null
  >("website/screenshots", null);

  // Loading ke time kuch mat dikhao
  if (loading) return null;

  // Convert Firebase object to array and sort by order
  const screenshots = firebaseScreenshots
    ? Object.values(firebaseScreenshots).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : localFallbacks;

  return (
    <section id="screenshots" className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            App Preview
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black gradient-brand-text"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            See It In Action
          </h2>
        </div>

        {/* Horizontal scroll container */}
        <div
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {screenshots.map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-center flex flex-col items-center gap-3 group"
            >
              {/* Phone frame */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]"
                style={{
                  width: "220px",
                  height: "460px",
                  border: "3px solid hsl(var(--border))",
                  background: "#111",
                  boxShadow: "0 8px 40px hsl(0 0% 0% / 0.7)",
                }}
              >
                {/* Notch */}
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full z-10"
                  style={{ background: "#000" }}
                />
                {/* Screen */}
                <img
                  src={s.url}
                  alt={s.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(25 100% 50% / 0.15), transparent 50%)",
                  }}
                />
              </div>

              {/* Label */}
              <span
                className="text-sm font-semibold tracking-wide"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <p className="text-center text-xs text-muted-foreground mt-2 tracking-widest uppercase">
          ← Scroll to explore →
        </p>
      </div>
    </section>
  );
};

export default Screenshots;
