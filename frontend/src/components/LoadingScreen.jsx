import { useEffect, useState } from "react";
import HappyBounty from "../assets/images/HappyBounty.png";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();

    let animationFrame;

    const animate = (time) => {
      const elapsed = time - start;
      const percentage = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - percentage, 3);

      setProgress(Math.floor(eased * 100));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setFadeOut(true);

          setTimeout(() => {
            onComplete?.();
          }, 500);
        }, 250);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f5ef] text-[#111111] transition-opacity duration-500 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.06] blur-[100px]" />

        <div className="absolute left-[8%] top-[15%] h-32 w-32 rounded-full bg-[#D4AF37]/[0.04] blur-[70px]" />

        <div className="absolute bottom-[10%] right-[8%] h-40 w-40 rounded-full bg-[#D4AF37]/[0.04] blur-[80px]" />
      </div>

      {/* Minimal grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold scan line */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full animate-[scan_3s_linear_infinite] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Main */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        {/* Logo */}
        <div className="relative mb-9 flex items-center justify-center">
          <img
            src={HappyBounty}
            alt="Happy Bounty"
            className="h-24 w-auto object-contain sm:h-28"
          />
        </div>

        {/* Brand */}
        <h1 className="text-center text-2xl font-black tracking-[0.2em] text-[#111111]">
          HAPPY BOUNTY
        </h1>

        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-black/35">
          The Future of Web3 Work
        </p>

        {/* Progress */}
        <div className="mt-12 w-full">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Initializing Network
            </span>

            <span className="font-mono text-xs font-semibold text-[#B28B20]">
              {progress}%
            </span>
          </div>

          <div className="h-[3px] w-full overflow-hidden rounded-full bg-black/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#B28B20] via-[#D4AF37] to-[#E2C766] transition-[width] duration-100"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 flex w-full items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
          <span>
            {progress < 35
              ? "Connecting"
              : progress < 70
                ? "Loading Bounties"
                : progress < 100
                  ? "Verifying Rewards"
                  : "Ready"}
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4AF37]" />
            Network Online
          </span>
        </div>

        {/* Bottom navigation text */}
        <div className="mt-10 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/25">
          <span>Find</span>
          <span className="h-px w-5 bg-[#D4AF37]/40" />
          <span>Build</span>
          <span className="h-px w-5 bg-[#D4AF37]/40" />
          <span>Earn</span>
        </div>
      </div>

      {/* Corner details */}
      <div className="absolute left-6 top-6 text-[8px] font-semibold uppercase tracking-[0.25em] text-black/20">
        HB // 001
      </div>

      <div className="absolute bottom-6 right-6 text-[8px] font-semibold uppercase tracking-[0.25em] text-black/20">
        WEB3 BOUNTY NETWORK
      </div>

      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-10vh);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
