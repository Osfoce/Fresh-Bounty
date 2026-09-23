import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiPlus,
  FiShield,
  FiUsers,
} from "react-icons/fi";

function CallToAction() {
  return (
    <section className="relative z-10 mx-6 my-16 md:mx-10 lg:mx-16">
      <style>
        {`
          @keyframes ctaFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes ctaGlow {
            0%,
            100% {
              opacity: 0.2;
              transform: scale(1);
            }

            50% {
              opacity: 0.4;
              transform: scale(1.08);
            }
          }

          @keyframes ctaShine {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(180%);
            }
          }

          .cta-float {
            animation: ctaFloat 5s ease-in-out infinite;
          }

          .cta-glow {
            animation: ctaGlow 5s ease-in-out infinite;
          }

          .cta-shine {
            animation: ctaShine 4s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .cta-float,
            .cta-glow,
            .cta-shine {
              animation: none;
            }
          }
        `}
      </style>

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-black/[0.09] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.07)]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(212,175,55,0.12),transparent_30%),radial-gradient(circle_at_10%_100%,rgba(212,175,55,0.06),transparent_30%)]" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative z-10 grid items-center gap-10 px-7 py-10 md:grid-cols-[1.3fr_0.7fr] md:px-12 md:py-12 lg:px-16">
          {/* LEFT CONTENT */}
          <div>
            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f6f16]">
                The Botchain Opportunity Layer
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.035em] text-[#171717] sm:text-4xl md:text-5xl">
              Turn your skills into{" "}
              <span className="bg-gradient-to-r from-[#B28B20] via-[#D4AF37] to-[#8f6f16] bg-clip-text text-transparent">
                opportunities.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              Discover meaningful work, contribute to growing projects, and
              earn transparent rewards through the Botchain ecosystem.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(212,175,55,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B28B20] hover:shadow-[0_12px_35px_rgba(212,175,55,0.25)]"
              >
                <span>Explore Opportunities</span>

                <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/create"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.09] bg-[#f6f5ef] px-6 py-3.5 text-sm font-semibold text-[#171717] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/[0.06]"
              >
                <FiPlus className="h-4 w-4 text-[#B28B20] transition-transform duration-300 group-hover:rotate-90" />

                <span>Create a Bounty</span>
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative hidden h-64 md:block">
            {/* Gold glow */}
            <div className="cta-glow absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/20 blur-[70px]" />

            {/* Main visual */}
            <div className="cta-float absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[32px] border border-[#D4AF37]/25 bg-[#f6f5ef] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex h-28 w-28 items-center justify-center rounded-[26px] border border-[#D4AF37]/30 bg-white shadow-[0_10px_35px_rgba(212,175,55,0.12)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                  <FiCode className="h-7 w-7 text-[#B28B20]" />
                </div>
              </div>

              {/* Shine */}
              <div className="cta-shine pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
            </div>

            {/* Top badge */}
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
              <FiShield className="h-3.5 w-3.5 text-[#B28B20]" />

              <span className="text-[10px] font-semibold text-[#555]">
                Secure
              </span>
            </div>

            {/* Bottom badge */}
            <div className="absolute bottom-5 left-2 flex items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
              <FiUsers className="h-3.5 w-3.5 text-[#B28B20]" />

              <span className="text-[10px] font-semibold text-[#555]">
                Built for contributors
              </span>
            </div>

            {/* Small gold nodes */}
            <span className="absolute left-10 top-16 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

            <span className="absolute bottom-16 right-8 h-1.5 w-1.5 rounded-full bg-[#B28B20]" />
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-black/[0.06] bg-[#f6f5ef]/60 px-6 py-4 md:justify-start md:px-12 lg:px-16">
          <div className="flex items-center gap-2">
            <FiCheck className="h-3.5 w-3.5 text-[#B28B20]" />

            <span className="text-[10px] font-medium text-gray-500">
              Transparent opportunities
            </span>
          </div>

          <div className="h-3 w-px bg-black/[0.08]" />

          <div className="flex items-center gap-2">
            <FiShield className="h-3.5 w-3.5 text-[#B28B20]" />

            <span className="text-[10px] font-medium text-gray-500">
              Protected rewards
            </span>
          </div>

          <div className="h-3 w-px bg-black/[0.08]" />

          <div className="flex items-center gap-2">
            <FiUsers className="h-3.5 w-3.5 text-[#B28B20]" />

            <span className="text-[10px] font-medium text-gray-500">
              Professional contributor network
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;