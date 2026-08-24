function LiveTricker() {
  const items = [
    { label: "Welcome to Happy Bounty", type: "LIVE" },
    { label: "Earn Rewards", type: "REWARD" },
    { label: "Complete Tasks", type: "TASK" },
    { label: "Instant Payouts", type: "FAST" },
    { label: "New Bounties Added Daily", type: "NEW" },
  ];

  return (
    <div className="relative w-full overflow-hidden mt-8 border-y border-white/[0.06] bg-[#090909]/95 backdrop-blur-xl">

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent z-20 pointer-events-none" />

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090909] via-[#090909]/80 to-transparent z-20 pointer-events-none" />

      {/* Pink glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-8 bg-[#FF1AC6]/10 blur-3xl pointer-events-none" />

      <div className="ticker-track">

        {[1, 2, 3].map((_, index) => (
          <div key={index} className="ticker-content">

            {items.map((item, i) => (
              <div key={i} className="ticker-item">

                {/* Status indicator */}
                <span
                  className={`status-dot ${
                    item.type === "LIVE"
                      ? "live"
                      : item.type === "NEW"
                      ? "pink"
                      : "purple"
                  }`}
                />

                {/* Label */}
                <span className="ticker-label">
                  {item.label}
                </span>

                {/* Category */}
                <span className="ticker-category">
                  {item.type}
                </span>

                {/* Separator */}
                <span className="ticker-separator">
                  /
                </span>

              </div>
            ))}

          </div>
        ))}

      </div>

      <style>{`
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerScroll 28s linear infinite;
          will-change: transform;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        .ticker-content {
          display: flex;
          align-items: center;
          padding-right: 20px;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          white-space: nowrap;
        }

        .ticker-label {
          color: #e5e5e5;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .ticker-category {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #FF1AC6;
          padding: 3px 7px;
          border-radius: 999px;
          border: 1px solid rgba(255, 26, 198, 0.2);
          background: rgba(255, 26, 198, 0.06);
        }

        .ticker-separator {
          margin-left: 8px;
          color: rgba(255, 255, 255, 0.12);
          font-size: 18px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        .status-dot.live {
          background: #22c55e;
          box-shadow:
            0 0 6px rgba(34, 197, 94, 0.8),
            0 0 12px rgba(34, 197, 94, 0.4);
          animation: livePulse 2s ease-in-out infinite;
        }

        .status-dot.pink {
          background: #FF1AC6;
          box-shadow: 0 0 8px rgba(255, 26, 198, 0.7);
          animation: pinkPulse 2.5s ease-in-out infinite;
        }

        .status-dot.purple {
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.7);
          animation: purplePulse 2.5s ease-in-out infinite;
        }

        @keyframes tickerScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333333%);
          }
        }

        @keyframes livePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.45;
            transform: scale(0.75);
          }
        }

        @keyframes pinkPulse {
          0%, 100% {
            opacity: 0.7;
            box-shadow: 0 0 5px rgba(255, 26, 198, 0.4);
          }

          50% {
            opacity: 1;
            box-shadow:
              0 0 8px rgba(255, 26, 198, 0.8),
              0 0 14px rgba(255, 26, 198, 0.3);
          }
        }

        @keyframes purplePulse {
          0%, 100% {
            opacity: 0.7;
          }

          50% {
            opacity: 1;
            box-shadow:
              0 0 8px rgba(139, 92, 246, 0.8),
              0 0 14px rgba(139, 92, 246, 0.3);
          }
        }

        @media (max-width: 640px) {
          .ticker-item {
            padding: 12px 14px;
            gap: 8px;
          }

          .ticker-label {
            font-size: 12px;
          }

          .ticker-category {
            font-size: 8px;
          }

          .ticker-track {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }

          .status-dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default LiveTricker;