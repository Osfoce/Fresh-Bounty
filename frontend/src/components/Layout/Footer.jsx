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
    <footer className="relative mt-24 overflow-hidden border-t border-black/[0.08] bg-[#f6f5ef] text-[#171717]">
      {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-[#B28B20]/[0.08] blur-[120px]" />

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.35) 1px, transparent 1px)",
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
              <div className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-white shadow-[0_8px_30px_rgba(212,175,55,0.12)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <img
                  src={HappyBounty}
                  alt="Botchain logo"
                  className="relative z-10 h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Brand Name */}
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#171717]">
                  Botchain
                </h3>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f6f16]">
                  Onchain Opportunity Platform
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-600">
              A professional platform connecting builders, contributors, and
              organizations through meaningful onchain opportunities and
              transparent rewards.
            </p>

            {/* STATUS */}
            <div className="mt-6 flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-white px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
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
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#171717]">
              Platform
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
                >
                  Browse Opportunities
                </a>
              </li>

              <li>
                <a
                  href="/dashboard"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="/leaderboard"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
                >
                  Leaderboard
                </a>
              </li>

              <li>
                <a
                  href="/rewards"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
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
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#171717]">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors duration-200 hover:text-[#B28B20]"
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
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#171717]">
              Connect
            </h4>

            <p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-600">
              Stay connected with Botchain and follow new opportunities,
              ecosystem updates, and developments across the platform.
            </p>

            <div className="flex gap-3">
              {/* X / Twitter */}
              <a
                href="https://x.com/Happy_bounty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Botchain on X"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-gray-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#B28B20]"
              >
                <FaTwitter className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Discord */}
              <a
                href="#"
                aria-label="Botchain Discord"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-gray-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#B28B20]"
              >
                <FaDiscord className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* GitHub */}
              <a
                href="#"
                aria-label="Botchain GitHub"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-gray-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#B28B20]"
              >
                <FaGithub className="text-lg transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-black/[0.1] to-transparent" />

        {/* ===================================================
            BOTTOM SECTION
        ==================================================== */}

        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © 2026 Botchain. All rights reserved.
          </p>

          {/* Legal */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <a
              href="#"
              className="transition-colors hover:text-[#B28B20]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#B28B20]"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#B28B20]"
            >
              Security
            </a>
          </div>

          {/* Built For */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Built for</span>

            <span className="font-medium text-[#B28B20]">
              Onchain Work
            </span>

            <FiCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
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
            className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-xs font-medium text-gray-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/[0.06] hover:text-[#B28B20]"
          >
            <span>Back to top</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black/[0.08] bg-[#f6f5ef] transition-all duration-300 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10">
              <FiArrowUp className="h-3.5 w-3.5 text-[#B28B20] transition-transform duration-300 group-hover:-translate-y-0.5" />
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
          color: rgba(178, 139, 32, 0.35);
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
            filter: drop-shadow(0 0 0 rgba(212, 175, 55, 0));
          }

          50% {
            opacity: 0.8;
            transform: scale(1.25) rotate(45deg);
            filter:
              drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))
              drop-shadow(0 0 12px rgba(212, 175, 55, 0.3));
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