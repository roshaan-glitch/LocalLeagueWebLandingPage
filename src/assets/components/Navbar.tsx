import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { useFirebaseData } from "@/hooks/useFirebaseData";

interface HeroData {
  downloadUrl: string;
  fileName: string;
}

const defaultDownload = { downloadUrl: "", fileName: "LocalLeague.apk" };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data } = useFirebaseData<{ downloadUrl: string; fileName: string }>(
    "website/hero",
    defaultDownload
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const downloadUrl = data.downloadUrl || "";
  const fileName = data.fileName || defaultDownload.fileName;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <span
          className="text-xl font-bold tracking-wider"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--primary))" }}
        >
          LocalLeague
        </span>

        {/* Nav shortcuts + Download */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5">
            {[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Screenshots", href: "#screenshots" },
              { label: "Community", href: "#social" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-foreground"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--muted-foreground))" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={downloadUrl || "#home"}
            download={downloadUrl ? fileName : undefined}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "var(--gradient-brand)",
              color: "#000",
              fontFamily: "Rajdhani, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            <Download size={15} strokeWidth={2.5} />
            Download
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
