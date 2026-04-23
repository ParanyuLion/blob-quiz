'use client';

interface AdBannerProps {
  slot?: string;
  className?: string;
}

export default function AdBanner({ className = '' }: AdBannerProps) {
  return (
    <div
      className={`w-full min-h-[90px] rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center ${className}`}
      aria-label="Advertisement"
    >
      {/* ─── Place AdSense Script Here ─────────────────────────────────────────
       *
       *  Example:
       *  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
       *    crossOrigin="anonymous" />
       *  <ins className="adsbygoogle"
       *    style={{ display: 'block' }}
       *    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       *    data-ad-slot={slot}
       *    data-ad-format="auto"
       *    data-full-width-responsive="true" />
       *  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
       *
       * ──────────────────────────────────────────────────────────────────────── */}
      <p className="text-xs text-gray-300 font-body select-none">โฆษณา</p>
    </div>
  );
}
