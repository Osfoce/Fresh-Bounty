
import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiShield,
  FiCode,
  FiPenTool,
  FiZap,
} from "react-icons/fi";

function Testimonials() {
  const testimonialsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = testimonialsRef.current;

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
          @keyframes testimonialHeader {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes testimonialCard {
            from {
              opacity: 0;
              transform: translateY(55px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes testimonialGlow {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.35;
            }

            50% {
              transform: scale(1.12);
              opacity: 0.65;
            }
          }

          @keyframes testimonialFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes testimonialShine {
            0% {
              transform: translateX(-130%);
            }

            100% {
              transform: translateX(130%);
            }
          }

          .testimonial-header {
            opacity: 0;
          }

          .testimonial-header.visible {
            animation: testimonialHeader 0.8s
              cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .testimonial-card {
            opacity: 0;
          }

          .testimonial-card.visible {
            animation: testimonialCard 0.9s
              cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .testimonial-glow {
            animation: testimonialGlow 5s ease-in-out infinite;
          }

          .testimonial-quote {
            animation: testimonialFloat 4s ease-in-out infinite;
          }

          .testimonial-shine {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 35%;
            pointer-events: none;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.045),
              transparent
            );
            transform: translateX(-130%);
          }

          .testimonial-card:hover .testimonial-shine {
            animation: testimonialShine 1s ease-out;
          }

          @media (prefers-reduced-motion: reduce) {
            .testimonial-header,
            .testimonial-card {
              opacity: 1;
              animation: none !important;
              transform: none !important;
            }

            .testimonial-glow,
            .testimonial-quote,
            .testimonial-shine {
              animation: none !important;
            }
          }
        `}
      </style>

      <section
        ref={testimonialsRef}
        className="relative z-10 mx-6 my-24 overflow-hidden md:mx-10 lg:mx-16"
      >
        {/* BACKGROUND GLOW */}
        <div className="testimonial-glow pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#FF1AC6]/[0.05] blur-[130px]" />

        <div className="testimonial-glow pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-purple-600/[0.05] blur-[130px]" />

        <div className="relative mx-auto max-w-6xl">

          {/* HEADER */}
          <div
            className={`testimonial-header ${
              isVisible ? "visible" : ""
            } mx-auto mb-14 max-w-3xl text-center`}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/[0.05] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF1AC6] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF1AC6]" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF1AC6]">
                Community Feedback
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              What Our{" "}
              <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              Real experiences from builders, creators, and Web3
              professionals earning through Fresh Bounty.
            </p>
          </div>

          {/* TESTIMONIAL GRID */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* TESTIMONIAL 1 */}
            <div
              className={`testimonial-card ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#151515] via-[#111111] to-[#0b0b0b] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#FF1AC6]/40 hover:shadow-[0_25px_70px_rgba(255,26,198,0.12)] md:p-8`}
              style={{ animationDelay: "200ms" }}
            >
              <div className="testimonial-shine" />

              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#FF1AC6]/[0.08] blur-[90px] transition-all duration-500 group-hover:bg-[#FF1AC6]/[0.18]" />

              {/* QUOTE */}
              <div className="testimonial-quote absolute right-7 top-5 select-none font-serif text-7xl leading-none text-[#FF1AC6]/[0.08]">
                "
              </div>

              <div className="relative z-10">

                {/* USER */}
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex items-center gap-4">

                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FF1AC6]/20 bg-gradient-to-br from-[#FF1AC6]/30 to-purple-600/20 text-[#FF1AC6]">
                        <FiCode className="h-6 w-6" />
                      </div>

                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#0b0b0b] bg-[#0b0b0b]">
                        <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">
                          Alex Thompson
                        </p>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF1AC6] text-[9px] font-bold text-black">
                          <FiCheck className="h-2.5 w-2.5" />
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        Smart Contract Developer
                      </p>
                    </div>
                  </div>

                  <span className="hidden text-[10px] uppercase tracking-[0.2em] text-gray-600 sm:block">
                    Verified
                  </span>
                </div>

                {/* RATING */}
                <div className="mb-5 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="text-sm text-[#FF1AC6] transition-transform duration-300 group-hover:scale-110"
                      style={{
                        transitionDelay: `${star * 40}ms`,
                      }}
                    >
                      ★
                    </span>
                  ))}

                  <span className="ml-2 text-xs text-gray-600">
                    5.0
                  </span>
                </div>

                {/* MESSAGE */}
                <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                  “Posted a Solidity audit bounty and received 3
                  high-quality submissions within 24 hours. The escrow
                  system made everything trustless. Highly recommended!”
                </p>

                {/* FOOTER */}
                <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <span className="text-xs text-gray-600">
                    Bounty Creator
                  </span>

                  <span className="flex items-center gap-2 text-xs text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_7px_rgba(74,222,128,0.7)]" />
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL 2 */}
            <div
              className={`testimonial-card ${
                isVisible ? "visible" : ""
              } group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#151515] via-[#111111] to-[#0b0b0b] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_25px_70px_rgba(139,92,246,0.12)] md:p-8`}
              style={{ animationDelay: "400ms" }}
            >
              <div className="testimonial-shine" />

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-purple-500/[0.08] blur-[90px] transition-all duration-500 group-hover:bg-purple-500/[0.18]" />

              {/* QUOTE */}
              <div className="testimonial-quote absolute right-7 top-5 select-none font-serif text-7xl leading-none text-purple-500/[0.08]">
                "
              </div>

              <div className="relative z-10">

                {/* USER */}
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex items-center gap-4">

                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/30 to-[#FF1AC6]/20 text-purple-400">
                        <FiPenTool className="h-6 w-6" />
                      </div>

                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#0b0b0b] bg-[#0b0b0b]">
                        <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">
                          Maria Gonzales
                        </p>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[9px] font-bold text-white">
                          <FiCheck className="h-2.5 w-2.5" />
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        Freelance Web3 Designer
                      </p>
                    </div>
                  </div>

                  <span className="hidden text-[10px] uppercase tracking-[0.2em] text-gray-600 sm:block">
                    Verified
                  </span>
                </div>

                {/* RATING */}
                <div className="mb-5 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="text-sm text-purple-400 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        transitionDelay: `${star * 40}ms`,
                      }}
                    >
                      ★
                    </span>
                  ))}

                  <span className="ml-2 text-xs text-gray-600">
                    5.0
                  </span>
                </div>

                {/* MESSAGE */}
                <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                  “Earned 500 INJ by designing a DeFi dashboard. The
                  process was smooth and the payout was instant. I love
                  the multi-chain support!”
                </p>

                {/* FOOTER */}
                <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <span className="text-xs text-gray-600">
                    Bounty Worker
                  </span>

                  <span className="flex items-center gap-2 text-xs text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_7px_rgba(74,222,128,0.7)]" />
                    Payment Received
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TRUST INDICATORS */}
          <div
            className={`testimonial-card ${
              isVisible ? "visible" : ""
            } mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gray-600`}
            style={{ animationDelay: "600ms" }}
          >
            <span className="flex items-center gap-2">
              <FiShield className="h-3.5 w-3.5 text-green-400" />
              Verified Users
            </span>

            <span className="flex items-center gap-2">
              <FiZap className="h-3.5 w-3.5 text-[#FF1AC6]" />
              Real Bounty Activity
            </span>

            <span className="flex items-center gap-2">
              <FiCheck className="h-3.5 w-3.5 text-purple-400" />
              On-chain Payments
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
