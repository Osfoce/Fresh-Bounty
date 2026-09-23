import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

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

  useEffect(() => {
    const currentMessage = heroMessages[heroText];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentMessage.slice(
          0,
          displayText.length + 1
        );

        setDisplayText(nextText);

        if (nextText.length === currentMessage.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1400);
        }
      } else {
        const nextText = currentMessage.slice(
          0,
          displayText.length - 1
        );

        setDisplayText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setHeroText(
            (prev) => (prev + 1) % heroMessages.length
          );
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

      <div className="relative z-10 mx-auto flex min-h-[590px] max-w-full items-center bg-white px-5 py-12 sm:min-h-[620px] sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-4">

          {/* LEFT */}
          <div className="max-w-2xl text-center sm:text-left">

            {/* Badge */}
            <div className="hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
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

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/55 sm:mx-0 sm:text-base">
              Complete quests and earn cryptocurrency, tokens, and
              digital rewards. Post bounties and get quality work
              done — fully on-chain.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link
                to="/dashboard"
                className="group flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#B28B20] hover:shadow-xl hover:shadow-[#D4AF37]/25"
              >
                Explore Bounties

                <FiArrowUpRight
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={17}
                />
              </Link>

              <Link
                to="/create"
                className="group flex items-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-black/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 hover:text-black"
              >
                Create a Bounty

                <FiArrowUpRight
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={17}
                />
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

          {/* RIGHT — 3D CUBE */}
          <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[380px] lg:min-h-[430px]">

            {/* Very subtle glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-[70px] sm:h-[320px] sm:w-[320px]" />

            {/* Orbit rings */}
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />

            <div className="hero-3d-perspective relative flex h-[300px] w-[300px] items-center justify-center sm:h-[350px] sm:w-[350px] lg:h-[390px] lg:w-[390px]">

              <div className="hero-3d-object relative h-[210px] w-[210px] sm:h-[240px] sm:w-[240px] lg:h-[270px] lg:w-[270px]">

                {/* OUTER CUBE */}
                {cubeFaces.map((face, index) => (
                  <div
                    key={`outer-${index}`}
                    className="hero-cube-face absolute inset-0 overflow-hidden border border-black/[0.16] bg-white/[0.018]"
                    style={{
                      transform: `
                        rotateX(${face.rotateX || 0}deg)
                        rotateY(${face.rotateY || 0}deg)
                        translateZ(${face.translateZ}px)
                      `,
                    }}
                  >
                    {/* Clean grid */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                      {Array.from({ length: 16 }).map(
                        (_, gridIndex) => (
                          <div
                            key={gridIndex}
                            className="border border-black/[0.035]"
                          />
                        )
                      )}
                    </div>

                    {/* Outer frame */}
                    <div className="absolute inset-0 border border-black/[0.12]" />

                    {/* Sharp corner brackets */}
                    <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-black/[0.28]" />

                    <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-black/[0.22]" />

                    <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-black/[0.22]" />

                    <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-black/[0.28]" />
                  </div>
                ))}

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

                {/* CENTER */}
                <div className="hero-core absolute left-1/2 top-1/2 z-20 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 border border-black/[0.45] bg-white/[0.82] shadow-[0_15px_40px_rgba(0,0,0,0.1)] backdrop-blur-sm sm:h-[80px] sm:w-[80px] lg:h-[90px] lg:w-[90px]">

                  <div className="absolute inset-2 border border-black/[0.08]" />

                  <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]" />

                  <div className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-black/[0.2]" />

                  <div className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2 bg-black/[0.2]" />

                  <div className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-black/[0.2]" />

                  <div className="absolute right-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-black/[0.2]" />
                </div>

                {/* Floating particles */}
                <span className="cube-particle particle-one" />
                <span className="cube-particle particle-two" />
                <span className="cube-particle particle-three" />
                <span className="cube-particle particle-four" />
              </div>
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