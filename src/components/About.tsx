import { Trophy, Users, Zap, Gift } from "lucide-react";

const features = [
  {
    icon: <Trophy size={28} />,
    title: "BGMI Tournaments",
    description:
      "Join daily & weekly BGMI tournaments with structured brackets and live leaderboards.",
  },
  {
    icon: <Users size={28} />,
    title: "Solo / Duo / Squad",
    description:
      "Play your way — go solo for full glory, team up in duos, or dominate with your full squad.",
  },
  {
    icon: <Gift size={28} />,
    title: "Community Rewards",
    description:
      "Win rewards, recognition and leaderboard glory. Free to join, fair competition for all.",
  },
  {
    icon: <Zap size={28} />,
    title: "Easy to Join",
    description:
      "Download, register, and join a tournament in under 2 minutes. No complicated process.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(43 100% 50% / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            About the App
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black gradient-brand-text"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Why LocalLeague?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base leading-relaxed">
            The ultimate mobile gaming tournament platform built for Indian competitive gamers.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative card-dark rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, hsl(25 100% 50% / 0.08), transparent)",
                  border: "1px solid hsl(25 100% 50% / 0.3)",
                }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "hsl(var(--primary) / 0.12)",
                  color: "hsl(var(--primary))",
                }}
              >
                {f.icon}
              </div>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--foreground))" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
