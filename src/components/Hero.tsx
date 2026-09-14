import logo from "@/assets/logo.png";
import { Download, Gamepad2, Trophy } from "lucide-react";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { motion } from "framer-motion";

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
        {/* App Logo with GLOW + BOUNCE */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Glow behind logo */}
          <motion.div
            className="absolute inset-0 rounded-2xl blur-2xl"
            style={{ background: "var(--gradient-brand)" }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Logo with bounce */}
          <motion.img
            src={logo}
            alt="LocalLeague"
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Title with entry animation */}
        <motion.h1
          className="font-black tracking-wider gradient-brand-text leading-none text-center whitespace-nowrap"
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "clamp(2.5rem, 10vw, 7rem)",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {data.title || defaultHero.title}
        </motion.h1>

        {/* Tag chips with stagger */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mt-1"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
          }}
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                border: "1px solid hsl(var(--primary) / 0.5)",
                color: "hsl(var(--primary))",
                background: "hsl(var(--primary) / 0.1)",
                fontFamily: "Rajdhani, sans-serif",
                letterSpacing: "0.12em",
              }}
              variants={{
                hidden: { y: 10, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          id="download" 
          className="flex flex-col sm:flex-row gap-4 items-center mt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
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
        </motion.div>

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
