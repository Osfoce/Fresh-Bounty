import { useEffect, useState } from "react";

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

      // Smooth loading animation
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
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#080609] text-white transition-opacity duration-500 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-purple-600/10 blur-[80px]" />

        <div className="absolute bottom-[15%] right-[15%] h-40 w-40 rounded-full bg-pink-600/10 blur-[90px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Scan line */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full animate-[scan_3s_linear_infinite] bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />

      {/* Main */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        {/* Logo */}
        <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-fuchsia-500/30 border-t-fuchsia-400" />

          {/* Inner ring */}
          <div className="absolute inset-3 animate-[spin_5s_linear_infinite_reverse] rounded-full border border-purple-500/20 border-b-pink-500/70" />

          {/* Glow */}
          <div className="absolute h-16 w-16 rounded-2xl bg-fuchsia-500/20 blur-xl" />

          {/* Logo box */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_40px_rgba(217,70,239,0.2)] backdrop-blur-xl">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-white">H</span>
              <span className="text-fuchsia-500">B</span>
            </span>
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-center text-2xl font-bold tracking-[0.2em]">
          HAPPY BOUNTY
        </h1>

        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">
          The Future of Web3 Work
        </p>

        {/* Progress */}
        <div className="mt-12 w-full">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Initializing Network
            </span>

            <span className="font-mono text-xs text-fuchsia-400">
              {progress}%
            </span>
          </div>

          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-[width] duration-100"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 flex w-full items-center justify-between text-[9px] uppercase tracking-[0.18em] text-white/25">
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
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-500" />
            Network Online
          </span>
        </div>

        {/* Bottom text */}
        <div className="mt-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/20">
          <span>Find</span>
          <span className="h-px w-5 bg-white/10" />
          <span>Build</span>
          <span className="h-px w-5 bg-white/10" />
          <span>Earn</span>
        </div>
      </div>

      {/* Corner details */}
      <div className="absolute left-6 top-6 text-[8px] uppercase tracking-[0.25em] text-white/20">
        HB // 001
      </div>

      <div className="absolute bottom-6 right-6 text-[8px] uppercase tracking-[0.25em] text-white/20">
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
