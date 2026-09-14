import { useEffect, useRef } from "react";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { X } from "lucide-react";
import { useState } from "react";

interface AdConfig {
  enabled: boolean;
  type: "adsense" | "custom";
  // Google AdSense
  adsenseClientId?: string;
  adsenseSlotId?: string;
  // Custom Ad
  imageUrl?: string;
  linkUrl?: string;
  title?: string;
  label?: string; // e.g. "Sponsored"
}

interface AdsData {
  hero_banner: AdConfig;
  floating_banner: AdConfig;
}

const defaultAds: AdsData = {
  hero_banner: { enabled: false, type: "custom" },
  floating_banner: { enabled: false, type: "custom" },
};

/* ─── Google AdSense unit ─── */
function AdSenseUnit({ clientId, slotId }: { clientId: string; slotId: string }) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {}
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

/* ─── Custom image banner ─── */
function CustomBanner({
  ad,
  onClose,
  floating,
}: {
  ad: AdConfig;
  onClose?: () => void;
  floating?: boolean;
}) {
  if (!ad.imageUrl && !ad.title) return null;

  return (
    <a
      href={ad.linkUrl || "#"}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="relative flex items-center gap-3 rounded-xl overflow-hidden transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        textDecoration: "none",
        maxWidth: floating ? "100%" : "100%",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sponsored label */}
      <span
        className="absolute top-1.5 left-2 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
        style={{
          background: "hsl(var(--muted))",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        {ad.label || "Ad"}
      </span>

      {/* Close button (only floating) */}
      {floating && onClose && (
        <button
          className="absolute top-1.5 right-1.5 z-10 rounded-full p-0.5 transition-colors"
          style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close ad"
        >
          <X size={12} />
        </button>
      )}

      {/* Image */}
      {ad.imageUrl && (
        <img
          src={ad.imageUrl}
          alt={ad.title || "Advertisement"}
          className="object-cover flex-shrink-0"
          style={{
            width: floating ? 72 : "100%",
            height: floating ? 72 : "auto",
            maxHeight: floating ? undefined : 120,
            borderRadius: floating ? "0.75rem 0 0 0.75rem" : undefined,
          }}
        />
      )}

      {/* Text content (floating only, or if no image) */}
      {floating && (
        <div className="flex flex-col gap-0.5 px-2 py-3 pr-7">
          {ad.title && (
            <span
              className="text-sm font-bold leading-tight"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--foreground))" }}
            >
              {ad.title}
            </span>
          )}
          {ad.label && (
            <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              Tap to learn more
            </span>
          )}
        </div>
      )}
    </a>
  );
}

/* ─── Hero banner (below hero section) ─── */
export function HeroAdBanner() {
  const { data, loading } = useFirebaseData<AdsData>("website/ads", defaultAds);
  const ad = data?.hero_banner;

  if (loading || !ad?.enabled) return null;

  return (
    <div className="w-full px-4 pb-4" style={{ maxWidth: 800, margin: "0 auto" }}>
      {ad.type === "adsense" && ad.adsenseClientId && ad.adsenseSlotId ? (
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ border: "1px solid hsl(var(--border))" }}
        >
          <AdSenseUnit clientId={ad.adsenseClientId} slotId={ad.adsenseSlotId} />
        </div>
      ) : (
        <CustomBanner ad={ad} />
      )}
    </div>
  );
}

/* ─── Floating sticky banner (bottom of screen) ─── */
export function FloatingAdBanner() {
  const { data, loading } = useFirebaseData<AdsData>("website/ads", defaultAds);
  const [dismissed, setDismissed] = useState(false);
  const ad = data?.floating_banner;

  if (loading || !ad?.enabled || dismissed) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-full px-4 transition-all duration-300"
      style={{
        transform: "translateX(-50%)",
        maxWidth: 480,
        filter: "drop-shadow(0 8px 24px hsl(0 0% 0% / 0.7))",
      }}
    >
      {ad.type === "adsense" && ad.adsenseClientId && ad.adsenseSlotId ? (
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ border: "1px solid hsl(var(--border))" }}
        >
          <AdSenseUnit clientId={ad.adsenseClientId} slotId={ad.adsenseSlotId} />
        </div>
      ) : (
        <CustomBanner ad={ad} onClose={() => setDismissed(true)} floating />
      )}
    </div>
  );
}
