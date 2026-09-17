
import { useEffect, useRef } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiDollarSign,
  FiLayers,
  FiLock,
} from "react-icons/fi";

const platformHighlights = [
  {
    icon: FiLayers,
    value: "3",
    label: "Supported Networks",
    description:
      "Multi-chain infrastructure for Web3 bounty activity.",
    accent: "pink",
  },
  {
    icon: FiCode,
    value: "4",
    label: "Web3 Core Features",
    description:
      "Smart contracts, wallets, escrow, and on-chain rewards.",
    accent: "purple",
  },
  {
    icon: FiLock,
    value: "On-chain",
    label: "Bounty Infrastructure",
    description:
      "Bounty and reward logic can be secured through blockchain.",
    accent: "pink",
  },
  {
    icon: FiDollarSign,
    value: "10%",
    label: "Creator Fee",
    description:
      "A transparent platform fee applied to bounty creators.",
    accent: "purple",
  },
];

const PlatformStats = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("highlights-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("highlights-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="platform-stats-section"
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* LEFT PINK GLOW */}
          <div
            className="absolute left-[-180px] top-[5%] h-[400px] w-[400px] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,26,198,0.12), transparent 70%)",
            }}
          />

          {/* RIGHT PURPLE GLOW */}
          <div
            className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.10), transparent 70%)",
            }}
          />

          {/* CENTER GLOW */}
          <div
            className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,26,198,0.045), transparent 70%)",
            }}
          />
        </div>

        {/* =====================================================
            MAIN CONTAINER
        ===================================================== */}
        <div className="platform-stats-inner">
          {/* ===================================================
              HEADER
          =================================================== */}
          <div className="mx-auto max-w-2xl text-center">
            {/* BADGE */}
            <div
              className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5"
              style={{
                borderColor: "rgba(255,26,198,0.25)",
                backgroundColor: "rgba(255,26,198,0.08)",
                boxShadow:
                  "0 0 25px rgba(255,26,198,0.05)",
              }}
            >
              <FiCheckCircle
                size={12}
                className="text-[#FF1AC6]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300">
                Platform Highlights
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Built for{" "}
              <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
                On-chain Work
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
              A Web3 bounty infrastructure designed to connect
              creators and contributors through transparent,
              blockchain-powered workflows.
            </p>
          </div>

          {/* ===================================================
              HIGHLIGHT CARDS
          =================================================== */}
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {platformHighlights.map((item, index) => {
                const Icon = item.icon;
                const isPink = item.accent === "pink";

                return (
                  <div
                    key={item.label}
                    className={`highlight-card highlight-card-${index + 1} group`}
                  >
                    <div
                      className="relative h-full overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
                      style={{
                        borderColor: isPink
                          ? "rgba(255,26,198,0.16)"
                          : "rgba(168,85,247,0.16)",

                        background:
                          "linear-gradient(145deg, rgba(24,24,27,0.96), rgba(13,13,15,0.96))",

                        boxShadow:
                          "0 15px 50px rgba(0,0,0,0.35)",
                      }}
                    >
                      {/* TOP LINE */}
                      <div
                        className="absolute left-6 right-6 top-0 h-px opacity-50"
                        style={{
                          background: isPink
                            ? "linear-gradient(to right, transparent, rgba(255,26,198,0.7), transparent)"
                            : "linear-gradient(to right, transparent, rgba(168,85,247,0.7), transparent)",
                        }}
                      />

                      {/* HOVER GLOW */}
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          backgroundColor: isPink
                            ? "rgba(255,26,198,0.16)"
                            : "rgba(168,85,247,0.16)",
                        }}
                      />

                      {/* NUMBER */}
                      <div className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.2em] text-white/20">
                        0{index + 1}
                      </div>

                      {/* ICON */}
                      <div
                        className="relative mb-7 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110"
                        style={{
                          borderColor: isPink
                            ? "rgba(255,26,198,0.25)"
                            : "rgba(168,85,247,0.25)",

                          backgroundColor: isPink
                            ? "rgba(255,26,198,0.10)"
                            : "rgba(168,85,247,0.10)",

                          boxShadow: isPink
                            ? "0 0 25px rgba(255,26,198,0.08)"
                            : "0 0 25px rgba(168,85,247,0.08)",
                        }}
                      >
                        <Icon
                          size={20}
                          className={
                            isPink
                              ? "text-[#FF1AC6]"
                              : "text-purple-400"
                          }
                        />
                      </div>

                      {/* VALUE */}
                      <div className="relative">
                        <h3 className="text-3xl font-bold tracking-tight text-white">
                          {item.value}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-gray-200">
                          {item.label}
                        </p>

                        <p className="mt-3 text-xs leading-relaxed text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div className="relative mt-6 flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: isPink
                              ? "#FF1AC6"
                              : "#A855F7",

                            boxShadow: isPink
                              ? "0 0 10px rgba(255,26,198,0.9)"
                              : "0 0 10px rgba(168,85,247,0.9)",
                          }}
                        />

                        <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-gray-600">
                          Platform Feature
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===================================================
              BOTTOM PANEL
          =================================================== */}
          <div className="mx-auto mt-6 max-w-6xl">
            <div
              className="relative overflow-hidden rounded-2xl border p-5 sm:p-6"
              style={{
                borderColor: "rgba(255,255,255,0.10)",
                background:
                  "linear-gradient(135deg, rgba(24,24,27,0.98), rgba(15,15,18,0.98))",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              {/* GLOW */}
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-[140px] w-[420px] -translate-x-1/2 rounded-full blur-[90px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,26,198,0.08), transparent 70%)",
                }}
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {/* LEFT */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      borderColor:
                        "rgba(255,26,198,0.20)",
                      backgroundColor:
                        "rgba(255,26,198,0.07)",
                    }}
                  >
                    <FiCheckCircle
                      size={18}
                      className="text-[#FF1AC6]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Designed for transparent Web3 work
                    </p>

                    <p className="mt-1 max-w-2xl text-xs leading-relaxed text-gray-500">
                      Happy Bounty brings bounty creation,
                      contributor workflows, escrow, and
                      blockchain-based rewards together in one
                      Web3 experience.
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-2 sm:self-auto"
                  style={{
                    borderColor:
                      "rgba(255,26,198,0.15)",
                    backgroundColor:
                      "rgba(255,26,198,0.04)",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF1AC6] shadow-[0_0_10px_rgba(255,26,198,0.9)]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Web3 Native
                  </span>

                  <FiArrowUpRight
                    size={11}
                    className="text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          ANIMATIONS
      ======================================================= */}
      <style>{`
        .platform-stats-section {
          position: relative;
          width: 100%;
          padding: 90px 24px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 26, 198, 0.025),
              transparent 35%
            ),
            #070708;
          color: white;
        }

        .platform-stats-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ========================================
           CARD REVEAL
        ======================================== */

        @media (min-width: 1024px) {
          .highlight-card {
            opacity: 0;
            transform:
              translateY(50px)
              scale(0.95);
          }

          .platform-stats-section.highlights-visible
            .highlight-card-1 {
            animation:
              highlightReveal
              0.8s
              cubic-bezier(.22, 1, .36, 1)
              0.05s
              forwards;
          }

          .platform-stats-section.highlights-visible
            .highlight-card-2 {
            animation:
              highlightReveal
              0.8s
              cubic-bezier(.22, 1, .36, 1)
              0.18s
              forwards;
          }

          .platform-stats-section.highlights-visible
            .highlight-card-3 {
            animation:
              highlightReveal
              0.8s
              cubic-bezier(.22, 1, .36, 1)
              0.31s
              forwards;
          }

          .platform-stats-section.highlights-visible
            .highlight-card-4 {
            animation:
              highlightReveal
              0.8s
              cubic-bezier(.22, 1, .36, 1)
              0.44s
              forwards;
          }

          @keyframes highlightReveal {
            0% {
              opacity: 0;
              transform:
                translateY(50px)
                scale(0.95);
            }

            65% {
              opacity: 1;
              transform:
                translateY(-5px)
                scale(1.01);
            }

            100% {
              opacity: 1;
              transform:
                translateY(0)
                scale(1);
            }
          }
        }

        /* ========================================
           TABLET + MOBILE
        ======================================== */

        @media (max-width: 1023px) {
          .highlight-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 640px) {
          .platform-stats-section {
            padding: 70px 20px;
          }
        }

        /* ========================================
           REDUCED MOTION
        ======================================== */

        @media (prefers-reduced-motion: reduce) {
          .platform-stats-section,
          .platform-stats-section *,
          .platform-stats-section *::before,
          .platform-stats-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .highlight-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default PlatformStats;
