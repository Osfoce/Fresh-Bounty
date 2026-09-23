import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNav } from "../hooks/useNav";
import {
  FiArrowUpRight,
  FiCheck,
  FiDollarSign,
  FiLayers,
  FiStar,
  FiZap,
} from "react-icons/fi";

const heroMessages = [
  "Find Bounties.",
  "Complete Tasks.",
  "Build On-Chain.",
  "Get Rewarded.",
];

const cubeFaces = [
  { rotateY: 0, translateZ: 165 },
  { rotateY: 90, translateZ: 165 },
  { rotateY: 180, translateZ: 165 },
  { rotateY: -90, translateZ: 165 },
  { rotateX: 90, translateZ: 165 },
  { rotateX: -90, translateZ: 165 },
];

const innerCubeFaces = [
  { rotateY: 0, translateZ: 65 },
  { rotateY: 90, translateZ: 65 },
  { rotateY: 180, translateZ: 65 },
  { rotateY: -90, translateZ: 65 },
  { rotateX: 90, translateZ: 65 },
  { rotateX: -90, translateZ: 65 },
];

const cubeEdges = [
  { top: "0%", left: "0%", width: "100%" },
  { top: "100%", left: "0%", width: "100%" },

  { top: "0%", left: "0%", height: "100%", vertical: true },
  { top: "0%", left: "100%", height: "100%", vertical: true },

  { top: "0%", left: "50%", height: "100%", vertical: true },
];

const cubeConnections = [
  { x: "0%", y: "0%" },
  { x: "50%", y: "0%" },
  { x: "100%", y: "0%" },
  { x: "0%", y: "50%" },
  { x: "100%", y: "50%" },
  { x: "0%", y: "100%" },
  { x: "50%", y: "100%" },
  { x: "100%", y: "100%" },
];

export default function Hero() {
  const [heroText, setHeroText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleNavigate } = useNav();

  useEffect(() => {
    const currentMessage = heroMessages[heroText];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentMessage.slice(0, displayText.length + 1);

        setDisplayText(nextText);

        if (nextText.length === currentMessage.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1400);
        }
      } else {
        const nextText = currentMessage.slice(0, displayText.length - 1);

        setDisplayText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setHeroText((prev) => (prev + 1) % heroMessages.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, heroText]);

  return (
    <section className="relative min-h-[590px] overflow-hidden bg-white text-[#111111] sm:min-h-[620px]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white">
        <div className="absolute -left-40 top-0 h-[360px] w-[360px] rounded-full bg-[#D4AF37]/[0.035] blur-[110px]" />

        <div className="absolute -right-40 top-10 h-[360px] w-[360px] rounded-full bg-[#D4AF37]/[0.025] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-black/[0.025] blur-[110px]" />
      </div>

      {/* =====================================================
          STARS
      ===================================================== */}
      <span className="hero-star star-1">
        <FiStar />
      </span>

      <span className="hero-star star-2">
        <FiStar />
      </span>

      <span className="hero-star star-3">
        <FiStar />
      </span>

      <span className="hero-star star-4">
        <FiStar />
      </span>

      <span className="hero-star star-5">
        <FiStar />
      </span>

      <span className="hero-star star-6">
        <FiStar />
      </span>

      <span className="hero-star star-7">
        <FiStar />
      </span>

      <span className="hero-star star-8">
        <FiStar />
      </span>

      <span className="hero-star star-9">
        <FiStar />
      </span>

      <span className="hero-star star-10">
        <FiStar />
      </span>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-12 sm:min-h-[650px] sm:px-8 sm:py-16 lg:px-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* =================================================
              LEFT SIDE — UNCHANGED
          ================================================= */}
          <div className="max-w-2xl text-center sm:text-left">
            {/* BADGE */}
            <div className="hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-30" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>

              <span className="text-xs font-semibold tracking-wide text-black/60">
                The Future of Web3 Work
              </span>
            </div>

            {/* Heading */}
            <div className="py-2 md:py-3">
              <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-[#111111] sm:text-6xl md:text-7xl lg:text-[5.2rem]">
                Make a
              </h1>

              <h1 className="mt-1 text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-black sm:text-6xl md:text-7xl lg:text-[5.2rem]">
                living from
              </h1>

              <div className="relative mt-3 h-[60px] overflow-hidden sm:h-[70px] md:h-[93px]">
                <div className="hero-changing-text absolute left-1/2 top-0 flex -translate-x-1/2 items-center whitespace-nowrap text-4xl font-bold leading-none sm:left-0 sm:translate-x-0 sm:text-5xl md:text-6xl lg:text-[5.2rem]">
                  <span className="typing-gradient">
                    {displayText}
                  </span>

                  <span className="typing-cursor ml-2 inline-block h-[0.75em] w-[3px] rounded-full bg-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-400 sm:mx-0 sm:text-base md:mt-4">
              Complete quests and earn cryptocurrency, tokens, and digital
              rewards. Post bounties and get quality work done — fully on-chain.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link
                to="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/dashboard");
                }}
                className="group relative overflow-hidden rounded-lg bg-[#FF1AC6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,26,198,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e915ad] hover:shadow-[0_0_35px_rgba(255,26,198,0.25)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Bounties
                  <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                <span className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]" />
              </Link>

              <Link
                to="/create"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/create");
                }}
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-gray-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
              >
                Create a Bounty
                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Indicators */}
            <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex gap-1.5">
                {heroMessages.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === heroText
                        ? "w-7 bg-[#D4AF37]"
                        : "w-1.5 bg-black/15"
                    }`}
                  />
                ))}
              </div>

              <span className="text-[11px] font-medium text-black/35">
                New opportunities every day
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE — UPGRADED 3D ORBIT SYSTEM
          ================================================= */}
          <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[430px] lg:min-h-[500px]">
            {/* =================================================
                ATMOSPHERIC ENERGY
            ================================================= */}
            <div className="orbit-energy absolute h-[280px] w-[280px] rounded-full bg-[#FF1AC6]/10 blur-[100px] sm:h-[350px] sm:w-[350px]" />

            <div className="orbit-energy-two absolute h-[210px] w-[210px] rounded-full bg-purple-600/10 blur-[80px] sm:h-[270px] sm:w-[270px]" />

            {/* Subtle center pulse */}
            <div className="core-pulse absolute h-[180px] w-[180px] rounded-full border border-[#FF1AC6]/5 sm:h-[220px] sm:w-[220px]" />

            {/* =================================================
                3D ORBIT CONTAINER
            ================================================= */}
            <div className="orbit-system absolute h-[330px] w-[330px] sm:h-[420px] sm:w-[420px] lg:h-[460px] lg:w-[460px]">
              {/* =================================================
                  OUTER ORBIT
              ================================================= */}
              <div className="orbit orbit-outer absolute inset-0 rounded-full border border-white/[0.075]">
                <span className="orbit-node node-pink" />

                <span className="orbit-particle particle-one" />
                <span className="orbit-particle particle-two" />
              </div>

              {/* =================================================
                  SECOND OUTER ORBIT
              ================================================= */}
              <div className="orbit orbit-outer-secondary absolute inset-[14px] rounded-full border border-purple-400/[0.045]">
                <span className="orbit-node node-purple-secondary" />
              </div>

              {/* =================================================
                  MIDDLE ORBIT
              ================================================= */}
              <div className="orbit orbit-middle absolute inset-[28px] rounded-full border border-[#FF1AC6]/10 sm:inset-[35px]">
                <span className="orbit-node node-purple" />

                <span className="orbit-particle particle-three" />
              </div>

              {/* =================================================
                  INNER ORBIT
              ================================================= */}
              <div className="orbit orbit-inner absolute inset-[58px] rounded-full border border-white/[0.055] sm:inset-[65px]">
                <span className="orbit-node node-white" />

                <span className="orbit-particle particle-four" />
              </div>

              {/* =================================================
                  HORIZONTAL ORBIT
              ================================================= */}
              <div className="orbit-horizontal absolute left-[-18px] right-[-18px] top-1/2 h-[125px] -translate-y-1/2 rounded-[50%] border border-[#FF1AC6]/10 sm:left-[-25px] sm:right-[-25px] sm:h-[150px]">
                <span className="horizontal-particle" />
              </div>

              {/* =================================================
                  DIAGONAL ORBIT
              ================================================= */}
              <div className="orbit-diagonal absolute left-[15px] right-[15px] top-1/2 h-[190px] -translate-y-1/2 rounded-[50%] border border-purple-500/10 sm:left-[20px] sm:right-[20px] sm:h-[220px]">
                <span className="diagonal-particle" />
              </div>

              {/* =================================================
                  FINE ENERGY RINGS
              ================================================= */}
              <div className="energy-ring energy-ring-one absolute inset-[80px] rounded-full" />

              <div className="energy-ring energy-ring-two absolute inset-[95px] rounded-full" />
            </div>

            {/* =================================================
                CENTRAL 3D CORE
            ================================================= */}
            <div className="hero-core relative z-20 h-[165px] w-[165px] sm:h-[205px] sm:w-[205px] lg:h-[225px] lg:w-[225px]">
              {/* Deep glow */}
              <div className="absolute -inset-12 rounded-full bg-[#FF1AC6]/10 blur-[55px]" />

              <div className="absolute -inset-6 rounded-full border border-[#FF1AC6]/5 shadow-[0_0_80px_rgba(255,26,198,0.08)]" />

              {/* =================================================
                  GLASS OUTER SHELL
              ================================================= */}
              <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.025] shadow-[inset_0_0_40px_rgba(255,255,255,0.025),0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl" />

              {/* Rotating shell */}
              <div className="core-shell absolute inset-[6px] rounded-full border border-[#FF1AC6]/10" />

              {/* Inner rings */}
              <div className="absolute inset-[12px] rounded-full border border-[#FF1AC6]/20" />

              <div className="absolute inset-[22px] rounded-full border border-purple-500/10" />

              {/* =================================================
                  3D SPHERE
              ================================================= */}
              <div className="hero-sphere absolute inset-[34px] overflow-hidden rounded-full bg-gradient-to-br from-[#ff4bd1]/35 via-[#161116] to-purple-900/45 shadow-[inset_-18px_-20px_35px_rgba(0,0,0,0.85),inset_12px_10px_25px_rgba(255,255,255,0.08),0_0_50px_rgba(255,26,198,0.2)]">
                {/* Sphere atmospheric layer */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_25%),radial-gradient(circle_at_70%_75%,rgba(168,85,247,0.18),transparent_45%)]" />

                {/* Structural frame */}
                <div className="hero-structural-frame absolute inset-0">

                  {cubeEdges.map((edge, index) => (
                    <span
                      key={`edge-${index}`}
                      className={`absolute bg-black/[0.12] ${
                        edge.vertical
                          ? "h-full w-px"
                          : "h-px"
                      }`}
                      style={{
                        top: edge.top,
                        left: edge.left,
                        width: edge.vertical
                          ? undefined
                          : edge.width,
                        height: edge.vertical
                          ? edge.height
                          : undefined,
                      }}
                    />
                  ))}

                  {/* Diagonal perspective lines */}
                  <span className="cube-diagonal diagonal-a" />
                  <span className="cube-diagonal diagonal-b" />
                  <span className="cube-diagonal diagonal-c" />
                  <span className="cube-diagonal diagonal-d" />

                  {/* Center lines */}
                  <span className="cube-center-line cube-center-horizontal" />
                  <span className="cube-center-line cube-center-vertical" />
                </div>

                {/* Connection points */}
                {cubeConnections.map((point, index) => (
                  <span
                    key={`connection-${index}`}
                    className="cube-connection-node"
                    style={{
                      left: point.x,
                      top: point.y,
                    }}
                  />
                ))}

                {/* INNER CUBE */}
                {innerCubeFaces.map((face, index) => (
                  <div
                    key={`inner-${index}`}
                    className="hero-inner-face absolute left-1/2 top-1/2 h-[120px] w-[120px] border border-black/[0.28] bg-black/[0.025] shadow-[0_10px_35px_rgba(0,0,0,0.06)] sm:h-[135px] sm:w-[135px] lg:h-[145px] lg:w-[145px]"
                    style={{
                      marginLeft: "-60px",
                      marginTop: "-60px",
                      transform: `
                        rotateX(${face.rotateX || 0}deg)
                        rotateY(${face.rotateY || 0}deg)
                        translateZ(${face.translateZ}px)
                      `,
                    }}
                  >
                    {/* Inner grid */}
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                      {Array.from({ length: 4 }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className="border border-black/[0.07]"
                          />
                        )
                      )}
                    </div>

                    {/* Inner frame */}
                    <div className="absolute inset-0 border border-black/[0.08]" />
                  </div>
                ))}

                {/* Inner cube connection beams */}
                <div className="core-beam core-beam-top" />
                <div className="core-beam core-beam-right" />
                <div className="core-beam core-beam-bottom" />
                <div className="core-beam core-beam-left" />

            {/* =================================================
                NETWORK CARD
            ================================================= */}
            <div className="orbit-data-card absolute right-[0%] top-[5%] z-30 w-[130px] rounded-2xl border border-white/10 bg-[#101011]/80 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:right-[3%] sm:w-[145px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.16em] text-gray-500">
                  Network
                </span>

                  <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]" />

              <div className="text-sm font-semibold text-white">On-chain</div>

                  <div className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2 bg-black/[0.2]" />

            {/* =================================================
                REWARD CARD
            ================================================= */}
            <div className="orbit-reward-card absolute bottom-[5%] left-[0%] z-30 w-[140px] rounded-2xl border border-white/10 bg-[#101011]/85 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:left-[3%] sm:w-[155px]">
              <div className="flex items-center gap-2">
                <div className="reward-icon flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF1AC6]/10">
                  <FiDollarSign size={14} className="text-[#FF1AC6]" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-gray-500">
                    Reward
                  </p>

                  <p className="text-xs font-semibold text-white">+450 USDC</p>
                </div>
              </div>
            </div>

            {/* =================================================
                ORBIT LABEL
            ================================================= */}
            <div className="absolute bottom-[18%] right-[7%] z-30 hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl sm:flex sm:items-center sm:gap-2">
              <FiLayers size={11} className="text-purple-400" />

              <span className="text-[9px] text-gray-400">
                Web3 Contributors
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .typing-gradient {
          font-weight: 800;
          background: linear-gradient(
            100deg,
            #111111 0%,
            #111111 18%,
            #8f751f 38%,
            #D4AF37 55%,
            #D4AF37 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .typing-cursor {
          animation: cursorBlink 0.7s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.35);
        }

        @keyframes cursorBlink {
          0%,
          45% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0;
          }
        }

        .hero-badge {
          animation: badgeFloat 5s ease-in-out infinite;
        }

        @keyframes badgeFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        /* 3D Perspective */
        .hero-3d-perspective {
          perspective: 1400px;
          perspective-origin: center center;
        }

        .hero-3d-object {
          transform-style: preserve-3d;
          transform-origin: center center;
          animation: heroCubeRotate 50s linear infinite;
          will-change: transform;
        }

        @keyframes heroCubeRotate {
          0% {
            transform:
              rotateX(0deg)
              rotateY(0deg)
              rotateZ(0deg);
          }

          100% {
            transform:
              rotateX(360deg)
              rotateY(360deg)
              rotateZ(360deg);
          }
        }

        .hero-cube-face {
          transform-style: preserve-3d;
          backface-visibility: visible;
        }

        .hero-inner-face {
          transform-style: preserve-3d;
          backface-visibility: visible;
        }

        /* Structural frame */
        .hero-structural-frame {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .cube-diagonal {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 1px;
          transform-origin: center;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(17, 17, 17, 0.09),
            transparent
          );
        }

        .diagonal-a {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .diagonal-b {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .diagonal-c {
          transform: translate(-50%, -50%) rotate(135deg);
        }

        .diagonal-d {
          transform: translate(-50%, -50%) rotate(-135deg);
        }

        .cube-center-line {
          position: absolute;
          left: 50%;
          top: 50%;
          background: rgba(17, 17, 17, 0.1);
        }

        .cube-center-horizontal {
          width: 100%;
          height: 1px;
          transform: translate(-50%, -50%);
        }

        .cube-center-vertical {
          width: 1px;
          height: 100%;
          transform: translate(-50%, -50%);
        }

        /* Outer cube connection points */
        .cube-connection-node {
          position: absolute;
          z-index: 15;
          width: 5px;
          height: 5px;
          border: 1px solid rgba(17, 17, 17, 0.22);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.025);
          transform: translate(-50%, -50%);
        }

        /* Core connection beams */
        .core-beam {
          position: absolute;
          z-index: 10;
          left: 50%;
          top: 50%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(17, 17, 17, 0.13),
            transparent
          );
          transform-origin: center;
          pointer-events: none;
        }

        .core-beam-top {
          width: 1px;
          height: 72px;
          transform: translate(-50%, -100%);
        }

        .core-beam-right {
          width: 72px;
          height: 1px;
          transform: translate(0%, -50%);
        }

        .core-beam-bottom {
          width: 1px;
          height: 72px;
          transform: translate(-50%, 0%);
        }

        .core-beam-left {
          width: 72px;
          height: 1px;
          transform: translate(-100%, -50%);
        }

        /* Orbit rings */
        .hero-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(17, 17, 17, 0.055);
          border-radius: 9999px;
          pointer-events: none;
        }

        .hero-orbit-one {
          width: 285px;
          height: 285px;
          transform: translate(-50%, -50%) rotateX(68deg);
          animation: orbitSpin 18s linear infinite;
        }

        .hero-orbit-two {
          width: 350px;
          height: 350px;
          border-style: dashed;
          border-color: rgba(17, 17, 17, 0.07);
          transform: translate(-50%, -50%) rotateY(68deg);
          animation: orbitSpinReverse 25s linear infinite;
        }

        @keyframes orbitSpin {
          from {
            transform:
              translate(-50%, -50%)
              rotateX(68deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotateX(68deg)
              rotateZ(360deg);
          }
        }

        @keyframes orbitSpinReverse {
          from {
            transform:
              translate(-50%, -50%)
              rotateY(68deg)
              rotateZ(360deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotateY(68deg)
              rotateZ(0deg);
          }
        }

        /* Center core */
        .hero-core {
          transform-style: preserve-3d;
          animation: coreFloat 6s ease-in-out infinite;
        }

        @keyframes coreFloat {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              translateZ(0)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              translateZ(12px)
              scale(1.025);
          }
        }

        /* Floating particles */
        .cube-particle {
          position: absolute;
          z-index: 30;
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: #111111;
          opacity: 0.25;
        }

        .particle-one {
          top: 12%;
          left: 17%;
          animation: particleFloatOne 5s ease-in-out infinite;
        }

        .particle-two {
          top: 20%;
          right: 10%;
          animation: particleFloatTwo 6s ease-in-out infinite;
        }

        .particle-three {
          bottom: 16%;
          left: 9%;
          animation: particleFloatThree 7s ease-in-out infinite;
        }

        .particle-four {
          bottom: 10%;
          right: 17%;
          animation: particleFloatFour 5.5s ease-in-out infinite;
        }

        @keyframes particleFloatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(12px, -15px, 25px);
            opacity: 0.45;
          }
        }

        @keyframes particleFloatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.15;
          }

          50% {
            transform: translate3d(-15px, 12px, 30px);
            opacity: 0.4;
          }
        }

        @keyframes particleFloatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.15;
          }

          50% {
            transform: translate3d(15px, -10px, 20px);
            opacity: 0.4;
          }
        }

        @keyframes particleFloatFour {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(-12px, -14px, 25px);
            opacity: 0.4;
          }
        }

        @media (max-width: 639px) {
          .hero-3d-perspective {
            transform: scale(0.7);
          }

          .hero-orbit-one {
            width: 250px;
            height: 250px;
          }

          .hero-orbit-two {
            width: 300px;
            height: 300px;
          }

          .cube-connection-node {
            width: 4px;
            height: 4px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-changing-text,
          .typing-cursor,
          .hero-badge,
          .hero-3d-object,
          .hero-core,
          .hero-orbit,
          .cube-particle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
