function LiveTricker() {
  const items = [
    { label: "Welcome to Botchain", type: "LIVE" },
    { label: "Earn Rewards", type: "REWARD" },
    { label: "Complete Tasks", type: "TASK" },
    { label: "Instant Payouts", type: "FAST" },
    { label: "New Bounties Added Daily", type: "NEW" },
  ];

  return (
    <div className="relative mt-3 w-full overflow-hidden bg-white">
      {/* Left fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />

      {/* Gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-72 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37]/10 blur-3xl" />

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
                        ? "gold"
                        : "dark"
                  }`}
                />

                {/* Label */}
                <span className="ticker-label">{item.label}</span>

                {/* Category */}
                <span className="ticker-category">{item.type}</span>

                {/* Separator */}
                <span className="ticker-separator">/</span>
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
          color: #171717;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .ticker-category {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #B28B20;
          padding: 3px 7px;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          background: rgba(212, 175, 55, 0.08);
        }

        .ticker-separator {
          margin-left: 8px;
          color: rgba(17, 17, 17, 0.12);
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
          background: #D4AF37;
          box-shadow:
            0 0 6px rgba(212, 175, 55, 0.8),
            0 0 12px rgba(212, 175, 55, 0.35);
          animation: livePulse 2s ease-in-out infinite;
        }

        .status-dot.gold {
          background: #B28B20;
          box-shadow: 0 0 8px rgba(178, 139, 32, 0.6);
          animation: goldPulse 2.5s ease-in-out infinite;
        }

        .status-dot.dark {
          background: #171717;
          box-shadow: 0 0 7px rgba(17, 17, 17, 0.25);
          animation: darkPulse 2.5s ease-in-out infinite;
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

        @keyframes goldPulse {
          0%, 100% {
            opacity: 0.7;
            box-shadow: 0 0 5px rgba(178, 139, 32, 0.4);
          }

          50% {
            opacity: 1;
            box-shadow:
              0 0 8px rgba(178, 139, 32, 0.8),
              0 0 14px rgba(212, 175, 55, 0.3);
          }
        }

        @keyframes darkPulse {
          0%, 100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
            box-shadow: 0 0 8px rgba(17, 17, 17, 0.3);
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