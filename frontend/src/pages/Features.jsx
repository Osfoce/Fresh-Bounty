
import { useEffect, useRef, useState } from "react";
import {
  FiShield,
  FiGlobe,
  FiZap,
  FiActivity,
  FiCheck,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function Features() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
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
      <style>
        {`
          @keyframes featuresFadeUp {
            from {
              opacity: 0;
              transform: translateY(45px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes featuresFadeDown {
            from {
              opacity: 0;
              transform: translateY(-25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes featuresGlow {
            0%,
            100% {
              opacity: 0.35;
              transform: scale(1);
            }

            50% {
              opacity: 0.7;
              transform: scale(1.08);
            }
          }

          @keyframes featuresShine {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(120%);
            }
          }

          .features-header-animation {
            opacity: 0;
          }

          .features-header-animation.visible {
            animation: featuresFadeDown 0.8s ease-out forwards;
          }

          .features-card-animation {
            opacity: 0;
          }

          .features-card-animation.visible {
            animation: featuresFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)
              forwards;
          }

          .features-glow {
            animation: featuresGlow 5s ease-in-out infinite;
          }

          .features-shine {
            position: absolute;
            inset: 0;
            width: 45%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.05),
              transparent
            );
            transform: translateX(-120%);
            pointer-events: none;
          }

          .group:hover .features-shine {
            animation: featuresShine 1s ease-out;
          }

          @media (prefers-reduced-motion: reduce) {
            .features-header-animation,
            .features-card-animation {
              opacity: 1;
              animation: none !important;
              transform: none !important;
            }

            .features-glow,
            .features-shine {
              animation: none !important;
            }
          }
        `}
      </style>

      <section
        ref={sectionRef}
        className="relative z-10 my-24 overflow-hidden px-6 md:px-10 lg:px-16"
      >
        {/* Background ambience */}
        <div className="features-glow pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#FF1AC6]/[0.06] blur-[140px]" />

        <div className="features-glow pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/[0.05] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">

          {/* HEADER */}
          <div
            className={`features-header-animation ${
              isVisible ? "visible" : ""
            } mx-auto mb-14 max-w-3xl text-center`}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF1AC6] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF1AC6]" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Built for Web3
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Earn
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              Fresh Bounty makes it simple to discover opportunities, complete
              meaningful work, and receive crypto rewards across Web3.
            </p>
          </div>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* SECURE ESCROW */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d0d0d] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#FF1AC6]/30 hover:bg-[#101010] hover:shadow-[0_20px_60px_rgba(255,26,198,0.1)]`}
              style={{ animationDelay: "150ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#FF1AC6]/[0.07] blur-[80px] transition-all duration-500 group-hover:bg-[#FF1AC6]/[0.14]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-[#FF1AC6]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FF1AC6]/20 bg-[#FF1AC6]/[0.08] text-[#FF1AC6] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#FF1AC6]/40 group-hover:bg-[#FF1AC6]/[0.12]">
                  <FiShield className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Secure Escrow
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#FF1AC6]/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Rewards are protected until your work is reviewed and
                    successfully approved.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-emerald-400" />
                  <span>Protected payments</span>
                </div>
              </div>
            </div>

            {/* MULTI-CHAIN */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d0d0d] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:bg-[#101010] hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)]`}
              style={{ animationDelay: "300ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/[0.07] blur-[80px] transition-all duration-500 group-hover:bg-purple-500/[0.14]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/[0.08] text-purple-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-purple-400/40 group-hover:bg-purple-500/[0.12]">
                  <FiGlobe className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Multi-Chain
                  </h3>

                  <div className="mt-4 h-px w-10 bg-purple-500/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Discover bounties and receive rewards across multiple
                    blockchain networks and assets.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-emerald-400" />
                  <span>Multiple networks</span>
                </div>
              </div>
            </div>

            {/* FAST REWARDS */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d0d0d] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-[#101010] hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)]`}
              style={{ animationDelay: "450ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/[0.07] blur-[80px] transition-all duration-500 group-hover:bg-blue-500/[0.14]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-blue-400/40 group-hover:bg-blue-500/[0.12]">
                  <FiZap className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Fast Rewards
                  </h3>

                  <div className="mt-4 h-px w-10 bg-blue-400/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Complete approved tasks and get rewarded without
                    unnecessary delays.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-emerald-400" />
                  <span>Crypto payouts</span>
                </div>
              </div>
            </div>

            {/* TRANSPARENT */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0d0d0d] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-[#101010] hover:shadow-[0_20px_60px_rgba(34,197,94,0.08)]`}
              style={{ animationDelay: "600ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/[0.06] blur-[80px] transition-all duration-500 group-hover:bg-emerald-500/[0.12]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] text-emerald-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/[0.12]">
                  <FiActivity className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Transparent
                  </h3>

                  <div className="mt-4 h-px w-10 bg-emerald-400/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Track bounty activity, submissions, and rewards through
                    a transparent Web3 ecosystem.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-emerald-400" />
                  <span>On-chain activity</span>
                </div>
              </div>
            </div>
          </div>

          {/* TRUST BAR */}
          <div
            className={`features-card-animation ${
              isVisible ? "visible" : ""
            } mt-7 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-white/[0.07] bg-[#0b0b0b] px-6 py-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] md:flex-row md:px-7`}
            style={{ animationDelay: "750ms" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FF1AC6]/15 bg-[#FF1AC6]/[0.07] text-[#FF1AC6] transition-transform duration-300 hover:scale-110">
                <FiUsers className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Built for creators & contributors
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  One platform. Endless Web3 opportunities.
                </p>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="group flex items-center gap-2 rounded-xl border border-[#FF1AC6]/25 bg-[#FF1AC6]/[0.07] px-5 py-2.5 text-sm font-semibold text-[#FF1AC6] transition-all duration-300 hover:border-[#FF1AC6] hover:bg-[#FF1AC6] hover:text-white hover:shadow-[0_8px_30px_rgba(255,26,198,0.2)]"
            >
              <span>Explore Opportunities</span>

              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;

