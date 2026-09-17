import React from "react";
import {
  FaTwitter,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import {
  FiArrowUp,
  FiCheck,
  FiStar,
} from "react-icons/fi";
import HappyBounty from "../../assets/images/HappyBounty.png";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.08] bg-[#080808] text-white">
      {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#FF1AC6]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* =====================================================
          DECORATIVE STAR ICONS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FiStar className="footer-star footer-star-1" />
        <FiStar className="footer-star footer-star-2" />
        <FiStar className="footer-star footer-star-3" />
        <FiStar className="footer-star footer-star-4" />
        <FiStar className="footer-star footer-star-5" />
        <FiStar className="footer-star footer-star-6" />
        <FiStar className="footer-star footer-star-7" />
        <FiStar className="footer-star footer-star-8" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 py-12 md:px-10 lg:px-16">
        {/* ===================================================
            TOP SECTION
        ==================================================== */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* =================================================
              BRAND
          ================================================== */}

          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              {/* Logo */}
              <div className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[#FF1AC6]/30 bg-[#FF1AC6]/10 shadow-[0_0_25px_rgba(255,26,198,0.12)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF1AC6]/20 to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <img
                  src={HappyBounty}
                  alt="Happy Bounty logo"
                  className="relative z-10 h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Brand Name */}
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Happy{" "}
                  <span className="text-[#FF1AC6]">
                    Bounty
                  </span>
                </h3>

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                  Web3 Bounty Platform
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Complete Web3 tasks, contribute your skills, and earn
              cryptocurrency rewards across multiple networks.
            </p>

            {/* STATUS */}
            <div className="mt-6 flex w-fit items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>

              <span className="text-xs text-gray-500">
                Platform operational
              </span>
            </div>
          </div>

          {/* =================================================
              PLATFORM
          ================================================== */}

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Platform
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Browse Bounties
                </a>
              </li>

              <li>
                <a
                  href="/dashboard"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="/leaderboard"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Leaderboard
                </a>
              </li>

              <li>
                <a
                  href="/rewards"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Rewards
                </a>
              </li>
            </ul>
          </div>

          {/* =================================================
              RESOURCES
          ================================================== */}

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition-colors duration-200 hover:text-[#FF1AC6]"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* =================================================
              SOCIAL
          ================================================== */}

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Connect
            </h4>

            <p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-500">
              Follow Happy Bounty and stay updated with new bounties,
              platform updates, and Web3 opportunities.
            </p>

            <div className="flex gap-3">
              {/* X / Twitter */}
              <a
                href="https://x.com/Happy_bounty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Happy Bounty on X"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/40 hover:bg-[#FF1AC6]/10 hover:text-[#FF1AC6]"
              >
                <FaTwitter className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Discord */}
              <a
                href="#"
                aria-label="Happy Bounty Discord"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#5865F2]/40 hover:bg-[#5865F2]/10 hover:text-[#5865F2]"
              >
                <FaDiscord className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* GitHub */}
              <a
                href="#"
                aria-label="Happy Bounty GitHub"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <FaGithub className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

        {/* ===================================================
            BOTTOM SECTION
        ==================================================== */}

        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © 2026 Happy Bounty. All rights reserved.
          </p>

          {/* Legal */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600">
            <a
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-300"
            >
              Security
            </a>
          </div>

          {/* Built For */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>
              Built for
            </span>

            <span className="font-medium text-[#FF1AC6]">
              Web3
            </span>

            <FiCheck className="h-3.5 w-3.5 text-green-400" />
          </div>
        </div>

        {/* ===================================================
            BACK TO TOP
        ==================================================== */}

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-gray-500 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/30 hover:bg-[#FF1AC6]/[0.05] hover:text-white"
          >
            <span>
              Back to top
            </span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:border-[#FF1AC6]/30 group-hover:bg-[#FF1AC6]/10">
              <FiArrowUp className="h-3.5 w-3.5 text-gray-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#FF1AC6]" />
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================
          STAR ANIMATION
      ====================================================== */}

      <style>{`
        .footer-star {
          position: absolute;
          width: 12px;
          height: 12px;
          color: rgba(255, 255, 255, 0.45);
          animation: footerStarShine 4s ease-in-out infinite;
        }

        .footer-star-1 {
          top: 15%;
          left: 8%;
          animation-delay: 0s;
        }

        .footer-star-2 {
          top: 30%;
          left: 28%;
          animation-delay: 1.2s;
        }

        .footer-star-3 {
          top: 12%;
          right: 18%;
          animation-delay: 0.6s;
        }

        .footer-star-4 {
          top: 45%;
          right: 7%;
          animation-delay: 1.8s;
        }

        .footer-star-5 {
          bottom: 20%;
          right: 28%;
          animation-delay: 0.9s;
        }

        .footer-star-6 {
          bottom: 15%;
          left: 42%;
          animation-delay: 2s;
        }

        .footer-star-7 {
          top: 65%;
          left: 15%;
          animation-delay: 1.5s;
        }

        .footer-star-8 {
          bottom: 30%;
          left: 32%;
          animation-delay: 0.4s;
        }

        @keyframes footerStarShine {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.7) rotate(0deg);
            filter: drop-shadow(0 0 0 rgba(255, 26, 198, 0));
          }

          50% {
            opacity: 1;
            transform: scale(1.25) rotate(45deg);
            filter:
              drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))
              drop-shadow(0 0 12px rgba(255, 26, 198, 0.7));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-star {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;