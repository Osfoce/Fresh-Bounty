import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiDollarSign,
  FiLayers,
  FiPlus,
  FiShield,
  FiZap,
} from "react-icons/fi";

function CallToAction() {
  return (
    <section className="relative z-10 mx-6 my-20 md:mx-10 lg:mx-16">
      <style>
        {`
          @keyframes ctaParticle {
            0% {
              transform: translate3d(0, 0, 0);
              opacity: 0;
            }

            15% {
              opacity: 1;
            }

            50% {
              transform: translate3d(70px, -45px, 0);
              opacity: 0.9;
            }

            100% {
              transform: translate3d(140px, 0, 0);
              opacity: 0;
            }
          }

          @keyframes ctaOrbit {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes ctaOrbitReverse {
            from {
              transform: rotate(360deg);
            }

            to {
              transform: rotate(0deg);
            }
          }

          @keyframes ctaFloatOne {
            0%,
            100% {
              transform: translateY(0) rotate(-2deg);
            }

            50% {
              transform: translateY(-12px) rotate(1deg);
            }
          }

          @keyframes ctaFloatTwo {
            0%,
            100% {
              transform: translateY(0) rotate(2deg);
            }

            50% {
              transform: translateY(10px) rotate(-1deg);
            }
          }

          @keyframes ctaGlow {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.25;
            }

            50% {
              transform: translate(-50%, -50%) scale(1.25);
              opacity: 0.45;
            }
          }

          @keyframes ctaScan {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(420%);
            }
          }

          @keyframes ctaPulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.6;
            }

            50% {
              transform: scale(1.5);
              opacity: 1;
            }
          }

          @keyframes ctaLine {
            0%,
            100% {
              opacity: 0.15;
            }

            50% {
              opacity: 0.5;
            }
          }

          .cta-particle {
            animation: ctaParticle 4s linear infinite;
          }

          .cta-orbit {
            animation: ctaOrbit 18s linear infinite;
          }

          .cta-orbit-reverse {
            animation: ctaOrbitReverse 24s linear infinite;
          }

          .cta-float-one {
            animation: ctaFloatOne 5s ease-in-out infinite;
          }

          .cta-float-two {
            animation: ctaFloatTwo 6s ease-in-out infinite;
          }

          .cta-glow {
            animation: ctaGlow 5s ease-in-out infinite;
          }

          .cta-scan {
            animation: ctaScan 5s linear infinite;
          }

          .cta-pulse {
            animation: ctaPulse 2s ease-in-out infinite;
          }

          .cta-line {
            animation: ctaLine 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .cta-particle,
            .cta-orbit,
            .cta-orbit-reverse,
            .cta-float-one,
            .cta-float-two,
            .cta-glow,
            .cta-scan,
            .cta-pulse,
            .cta-line {
              animation: none;
            }
          }
        `}
      </style>

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#080808] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">

        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,26,198,0.09),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(124,58,237,0.08),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,26,198,0.07),transparent_25%)]" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Center Glow */}
        <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF1AC6]/20 blur-[130px]" />

        {/* =====================================================
            MOVING PARTICLES
        ====================================================== */}

        <div className="pointer-events-none absolute left-[12%] top-[28%] h-1 w-1 rounded-full bg-[#FF1AC6] shadow-[0_0_12px_#FF1AC6] cta-particle" />

        <div
          className="pointer-events-none absolute left-[22%] top-[62%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)] cta-particle"
          style={{ animationDelay: "1.2s" }}
        />

        <div
          className="pointer-events-none absolute right-[25%] top-[25%] h-1 w-1 rounded-full bg-[#FF1AC6] shadow-[0_0_12px_#FF1AC6] cta-particle"
          style={{ animationDelay: "2s" }}
        />

        <div
          className="pointer-events-none absolute right-[13%] top-[68%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)] cta-particle"
          style={{ animationDelay: "2.8s" }}
        />

        {/* =====================================================
            ORBIT RINGS
        ====================================================== */}

        <div className="pointer-events-none absolute left-1/2 top-[46%] hidden h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF1AC6]/[0.05] md:block cta-orbit" />

        <div className="pointer-events-none absolute left-1/2 top-[46%] hidden h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/[0.08] md:block cta-orbit-reverse" />

        <div className="pointer-events-none absolute left-1/2 top-[46%] hidden h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF1AC6]/[0.08] md:block cta-orbit" />

        {/* =====================================================
            TOP LABEL
        ====================================================== */}

        <div className="relative z-20 flex justify-center pt-10 md:pt-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/[0.05] px-4 py-2 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="cta-pulse absolute inset-0 rounded-full bg-[#FF1AC6]" />
              <span className="relative h-2 w-2 rounded-full bg-[#FF1AC6] shadow-[0_0_12px_#FF1AC6]" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF1AC6]">
              The Web3 Opportunity Hub
            </span>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="relative z-10 px-6 pb-12 pt-8 text-center md:px-12 md:pb-16 lg:px-20 lg:pb-20">

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-[1] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Build Something.
            <br />

            <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Get Rewarded.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Discover Web3 opportunities, complete meaningful work, and earn
            rewards for your skills. Or create a bounty and find contributors
            ready to build with you.
          </p>

          {/* =================================================
              FLOATING BOUNTY CARDS
          ================================================== */}

          <div className="relative mx-auto mt-10 hidden h-20 max-w-4xl md:block">

            {/* Left Card */}
            <div className="cta-float-one absolute left-0 top-0 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#101010]/90 px-4 py-3 text-left shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF1AC6]/10">
                <FiCode className="text-[#FF1AC6]" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Open Bounty
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  Smart Contract Audit
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <FiDollarSign className="h-3 w-3 text-green-400" />

                  <span className="text-[10px] font-semibold text-green-400">
                    500 USDC
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="cta-float-two absolute right-0 top-0 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#101010]/90 px-4 py-3 text-left shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                <FiZap className="text-purple-400" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Contributor
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  Frontend Developer
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <FiCheck className="h-3 w-3 text-green-400" />

                  <span className="text-[10px] font-semibold text-green-400">
                    Reward Earned
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              CENTRAL OPPORTUNITY PANEL
          ================================================== */}

          <div className="relative mx-auto mt-10 max-w-3xl md:mt-2">
            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-6">

              {/* Scanner */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 -translate-x-full bg-gradient-to-r from-transparent via-[#FF1AC6]/10 to-transparent cta-scan" />

              {/* Top Status */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF1AC6]/10">
                    <FiLayers className="h-3.5 w-3.5 text-[#FF1AC6]" />
                  </div>

                  <span className="text-xs font-semibold text-white">
                    Opportunity Network
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />

                  <span className="text-[10px] font-medium text-gray-500">
                    Live
                  </span>
                </div>
              </div>

              {/* Flow */}
              <div className="grid grid-cols-3 items-center gap-2 py-6 md:gap-6">

                {/* Build */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF1AC6]/15 bg-[#FF1AC6]/[0.06]">
                    <FiCode className="text-lg text-[#FF1AC6]" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-white">
                    Build
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Use your skills
                  </p>
                </div>

                {/* Connection */}
                <div className="relative hidden h-px bg-white/[0.08] md:block">
                  <div className="cta-line absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF1AC6] to-purple-500" />
                  <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#FF1AC6] shadow-[0_0_10px_#FF1AC6]" />
                </div>

                {/* Reward */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/15 bg-purple-500/[0.06]">
                    <FiDollarSign className="text-lg text-purple-400" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-white">
                    Earn
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Get rewarded
                  </p>
                </div>

                {/* Connection Mobile */}
                <div className="col-span-3 flex items-center justify-center md:hidden">
                  <div className="h-6 w-px bg-gradient-to-b from-[#FF1AC6] to-purple-500" />
                </div>

                {/* Grow */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.03]">
                    <FiArrowUpRight className="text-lg text-white" />
                  </div>

                  <p className="mt-3 text-xs font-bold text-white">
                    Grow
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Build your reputation
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06] pt-4">

                <div>
                  <p className="text-lg font-black text-white">
                    124+
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-600">
                    Bounties
                  </p>
                </div>

                <div>
                  <p className="text-lg font-black text-white">
                    12.5K
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-600">
                    Rewards
                  </p>
                </div>

                <div>
                  <p className="text-lg font-black text-white">
                    845+
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-600">
                    Contributors
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================== */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              to="/dashboard"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#FF1AC6] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_40px_rgba(255,26,198,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff32ce] hover:shadow-[0_15px_50px_rgba(255,26,198,0.35)] sm:w-auto"
            >
              <span className="relative z-10">
                Explore Bounties
              </span>

              <FiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

              <span className="cta-scan absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>

            <Link
              to="/create"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.025] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/30 hover:bg-[#FF1AC6]/[0.05] sm:w-auto"
            >
              <FiPlus className="text-gray-500 transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#FF1AC6]" />

              <span>
                Create a Bounty
              </span>
            </Link>
          </div>

          {/* =================================================
              TRUST FEATURES
          ================================================== */}

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">

            <div className="flex items-center gap-2">
              <FiShield className="h-3.5 w-3.5 text-green-400" />

              <span className="text-[10px] font-medium text-gray-500">
                Secure Payments
              </span>
            </div>

            <div className="h-3 w-px bg-white/[0.08]" />

            <div className="flex items-center gap-2">
              <FiZap className="h-3.5 w-3.5 text-[#FF1AC6]" />

              <span className="text-[10px] font-medium text-gray-500">
                Fast Rewards
              </span>
            </div>

            <div className="h-3 w-px bg-white/[0.08]" />

            <div className="flex items-center gap-2">
              <FiLayers className="h-3.5 w-3.5 text-purple-400" />

              <span className="text-[10px] font-medium text-gray-500">
                Multi-Chain
              </span>
            </div>

            <div className="h-3 w-px bg-white/[0.08]" />

            <div className="flex items-center gap-2">
              <FiCheck className="h-3.5 w-3.5 text-green-400" />

              <span className="text-[10px] font-medium text-gray-500">
                Verified Opportunities
              </span>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mx-auto mt-10 flex max-w-md items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FF1AC6]/20" />

            <div className="h-1.5 w-1.5 rounded-full bg-[#FF1AC6] shadow-[0_0_10px_#FF1AC6]" />

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;