import logo from "@/assets/logo.png";
import { Download, Gamepad2, Trophy } from "lucide-react";
import { useFirebaseData } from "@/hooks/useFirebaseData";

interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
  downloadUrl: string;
  fileName: string;
  tags: string[];
}

const defaultHero: HeroData = {
  title: "LocalLeague",
  subtitle: "Your Arena. Your Rules.",
  tagline: "",
  downloadUrl: "#download",
  fileName: "LocalLeague.apk",
  tags: ["BGMI", "Tournaments", "Cash Prizes"],
};

const Hero = () => {
  const { data, loading } = useFirebaseData<HeroData>("website/hero", defaultHero);

  const tags = Array.isArray(data.tags)
    ? data.tags
    : data.tags
    ? Object.values(data.tags as Record<string, string>)
    : defaultHero.tags;

  if (loading) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl w-full">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-muted animate-pulse" />
          <div className="h-16 w-72 rounded-xl bg-muted animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-7 w-24 rounded-full bg-muted animate-pulse" />
            ))}
          </div>
          <div className="h-14 w-44 rounded-xl bg-muted animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden"
    >
      {/* Background glow effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(25 100% 50% / 0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(43 100% 50% / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        {/* App Logo */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl blur-2xl opacity-60"
            style={{ background: "var(--gradient-brand)" }}
          />
          <img
            src={logo}
            alt="LocalLeague"
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl"
          />
        </div>

        {/* Title */}
        <h1
          className="font-black tracking-wider gradient-brand-text leading-none text-center whitespace-nowrap"
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "clamp(2.5rem, 10vw, 7rem)",
          }}
        >
          {data.title || defaultHero.title}
        </h1>

        {/* Tag chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                border: "1px solid hsl(var(--primary) / 0.5)",
                color: "hsl(var(--primary))",
                background: "hsl(var(--primary) / 0.1)",
                fontFamily: "Rajdhani, sans-serif",
                letterSpacing: "0.12em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div id="download" className="flex flex-col sm:flex-row gap-4 items-center mt-2">
          <a
            href={data.downloadUrl || defaultHero.downloadUrl}
            download={data.fileName || defaultHero.fileName}
            className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "var(--gradient-brand)",
              color: "#000",
              fontFamily: "Rajdhani, sans-serif",
              letterSpacing: "0.08em",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <Download size={22} strokeWidth={2.5} className="group-hover:animate-bounce" />
            Download App
          </a>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 sm:gap-12 mt-4">
          {[
            { icon: <Gamepad2 size={18} />, label: "BGMI Tournaments" },
            { icon: <Trophy size={18} />, label: "Cash Prizes" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span style={{ color: "hsl(var(--primary))" }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
