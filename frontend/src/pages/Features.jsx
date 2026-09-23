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
              opacity: 0.25;
              transform: scale(1);
            }

            50% {
              opacity: 0.5;
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
              rgba(255, 255, 255, 0.5),
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
        className="relative z-10 my-24 overflow-hidden bg-[#f6f5ef] px-6 md:px-10 lg:px-16"
      >
        {/* Background ambience */}
        <div className="features-glow pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/[0.08] blur-[140px]" />

        <div className="features-glow pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#B28B20]/[0.06] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* HEADER */}
          <div
            className={`features-header-animation ${
              isVisible ? "visible" : ""
            } mx-auto mb-14 max-w-3xl text-center`}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-white px-4 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f6f16]">
                Built for the Botchain Ecosystem
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-[-0.03em] text-[#171717] md:text-5xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#B28B20] via-[#D4AF37] to-[#8f6f16] bg-clip-text text-transparent">
                Build & Earn
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              Botchain provides a professional infrastructure for discovering
              opportunities, contributing meaningful work, and accessing
              transparent rewards across an evolving onchain ecosystem.
            </p>
          </div>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* SECURE ESCROW */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-black/[0.08] bg-white p-7 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]`}
              style={{ animationDelay: "150ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#D4AF37]/[0.06] blur-[80px] transition-all duration-500 group-hover:bg-[#D4AF37]/[0.12]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#B28B20] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/[0.13]">
                  <FiShield className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-[#171717]">
                    Secure Escrow
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#D4AF37]/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    Rewards remain protected through a structured process
                    until submitted work is reviewed and approved.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-black/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-[#B28B20]" />
                  <span>Protected payments</span>
                </div>
              </div>
            </div>

            {/* MULTI-CHAIN */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-black/[0.08] bg-white p-7 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]`}
              style={{ animationDelay: "300ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#D4AF37]/[0.06] blur-[80px] transition-all duration-500 group-hover:bg-[#D4AF37]/[0.12]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#B28B20] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/[0.13]">
                  <FiGlobe className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-[#171717]">
                    Multi-Chain
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#D4AF37]/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    Access opportunities across connected blockchain networks
                    while keeping discovery and participation in one place.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-black/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-[#B28B20]" />
                  <span>Connected networks</span>
                </div>
              </div>
            </div>

            {/* FAST REWARDS */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-black/[0.08] bg-white p-7 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]`}
              style={{ animationDelay: "450ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#D4AF37]/[0.06] blur-[80px] transition-all duration-500 group-hover:bg-[#D4AF37]/[0.12]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#B28B20] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/[0.13]">
                  <FiZap className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-[#171717]">
                    Fast Rewards
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#D4AF37]/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    Move from approved contributions to rewards through a
                    streamlined and transparent process.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-black/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-[#B28B20]" />
                  <span>Efficient payouts</span>
                </div>
              </div>
            </div>

            {/* TRANSPARENT */}
            <div
              className={`features-card-animation ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[26px] border border-black/[0.08] bg-white p-7 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]`}
              style={{ animationDelay: "600ms" }}
            >
              <div className="features-shine" />

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#D4AF37]/[0.06] blur-[80px] transition-all duration-500 group-hover:bg-[#D4AF37]/[0.12]" />

              <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#B28B20] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/[0.13]">
                  <FiActivity className="h-6 w-6" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold tracking-tight text-[#171717]">
                    Transparent
                  </h3>

                  <div className="mt-4 h-px w-10 bg-[#D4AF37]/70 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    Track opportunities, submissions, and rewards through a
                    transparent infrastructure designed for onchain work.
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-black/[0.06] pt-5 text-xs font-medium text-gray-500">
                  <FiCheck className="h-4 w-4 text-[#B28B20]" />
                  <span>Transparent activity</span>
                </div>
              </div>
            </div>
          </div>

          {/* TRUST BAR */}
          <div
            className={`features-card-animation ${
              isVisible ? "visible" : ""
            } mt-7 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-black/[0.08] bg-white px-6 py-5 shadow-[0_15px_50px_rgba(0,0,0,0.06)] md:flex-row md:px-7`}
            style={{ animationDelay: "750ms" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#B28B20] transition-transform duration-300 hover:scale-110">
                <FiUsers className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#171717]">
                  Built for builders & contributors
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  One professional platform for meaningful onchain
                  opportunities.
                </p>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="group flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(212,175,55,0.18)] transition-all duration-300 hover:bg-[#B28B20] hover:shadow-[0_10px_35px_rgba(212,175,55,0.25)]"
            >
              <span>Explore Opportunities</span>

              <FiArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;