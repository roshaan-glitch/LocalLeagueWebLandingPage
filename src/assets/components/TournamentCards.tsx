import { Trophy, Users, Zap } from "lucide-react";

const tournaments = [
  {
    game: "BGMI",
    badge: "🔥 Live",
    badgeColor: "#ff4444",
    title: "Solo Showdown",
    mode: "Solo",
    entry: "₹10",
    prize: "₹500",
    slots: "50 Slots",
    filled: 38,
    total: 50,
  },
  {
    game: "BGMI",
    badge: "⚡ Upcoming",
    badgeColor: "hsl(43 100% 50%)",
    title: "Duo Battle",
    mode: "Duo",
    entry: "₹20",
    prize: "₹1,000",
    slots: "25 Teams",
    filled: 15,
    total: 25,
  },
  {
    game: "BGMI",
    badge: "🏆 Featured",
    badgeColor: "hsl(25 100% 50%)",
    title: "Squad Championship",
    mode: "Squad",
    entry: "₹50",
    prize: "₹5,000",
    slots: "20 Squads",
    filled: 12,
    total: 20,
  },
  {
    game: "COD Mobile",
    badge: "⚡ Upcoming",
    badgeColor: "hsl(43 100% 50%)",
    title: "COD Solo Blitz",
    mode: "Solo",
    entry: "₹15",
    prize: "₹750",
    slots: "50 Slots",
    filled: 22,
    total: 50,
  },
  {
    game: "COD Mobile",
    badge: "🏆 Featured",
    badgeColor: "hsl(25 100% 50%)",
    title: "COD Squad War",
    mode: "Squad",
    entry: "₹100",
    prize: "₹10,000",
    slots: "16 Squads",
    filled: 8,
    total: 16,
  },
];

const modeIcon = (mode: string) => {
  if (mode === "Solo") return <Zap size={13} />;
  if (mode === "Duo") return <Users size={13} />;
  return <Trophy size={13} />;
};

const TournamentCards = () => {
  return (
    <section id="tournaments" className="py-24 px-4 relative overflow-hidden">
      {/* bg glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(25 100% 50% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            Entry & Prize Pool
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black gradient-brand-text"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Live Tournaments
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            Low entry fees, high prize pools. Download the app and register now.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tournaments.map((t, i) => {
            const percent = Math.round((t.filled / t.total) * 100);
            return (
              <div
                key={i}
                className="group relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                {/* Hover glow border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: "1px solid hsl(25 100% 50% / 0.35)",
                    background: "linear-gradient(135deg, hsl(25 100% 50% / 0.06), transparent)",
                  }}
                />

                {/* Top row: game + badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                    style={{
                      background: "hsl(var(--muted))",
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {t.game}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      color: t.badgeColor,
                      background: `${t.badgeColor}18`,
                      border: `1px solid ${t.badgeColor}40`,
                    }}
                  >
                    {t.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-black leading-tight"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--foreground))" }}
                >
                  {t.title}
                </h3>

                {/* Mode chip */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                    }}
                  >
                    {modeIcon(t.mode)}
                    {t.mode}
                  </span>
                  <span
                    className="text-xs text-muted-foreground px-2 py-1 rounded-full"
                    style={{ background: "hsl(var(--muted))" }}
                  >
                    {t.slots}
                  </span>
                </div>

                {/* Entry + Prize */}
                <div
                  className="flex items-stretch gap-3 rounded-xl p-3"
                  style={{ background: "hsl(0 0% 4%)", border: "1px solid hsl(var(--border))" }}
                >
                  <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground mb-1 tracking-wide uppercase">Entry Fee</p>
                    <p
                      className="text-2xl font-black"
                      style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--foreground))" }}
                    >
                      {t.entry}
                    </p>
                  </div>
                  {/* divider */}
                  <div style={{ width: "1px", background: "hsl(var(--border))" }} />
                  <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground mb-1 tracking-wide uppercase">Prize Pool</p>
                    <p
                      className="text-2xl font-black gradient-brand-text"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      {t.prize}
                    </p>
                  </div>
                </div>

                {/* Slot fill bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t.filled}/{t.total} slots filled</span>
                    <span style={{ color: percent > 70 ? "#ff6b6b" : "hsl(var(--muted-foreground))" }}>
                      {percent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(0 0% 12%)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        background: "var(--gradient-brand)",
                      }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#download"
                  className="mt-1 w-full py-2.5 rounded-xl text-sm font-bold tracking-wide text-center transition-all duration-200 hover:scale-[1.02] active:scale-95 block"
                  style={{
                    background: "var(--gradient-brand)",
                    color: "#000",
                    fontFamily: "Rajdhani, sans-serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  Join via App →
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted-foreground mt-8 tracking-wide">
          More tournaments available inside the app · Updated daily
        </p>
      </div>
    </section>
  );
};

export default TournamentCards;
