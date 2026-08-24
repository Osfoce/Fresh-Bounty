import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.08] bg-[#080808] text-white">

      {/* Background Glows */}
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#FF1AC6]/10 blur-[120px] pointer-events-none" />

      <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 py-16 md:px-10 lg:px-16">

        {/* TOP SECTION */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="lg:col-span-1">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF1AC6]/30 bg-[#FF1AC6]/10 shadow-[0_0_25px_rgba(255,26,198,0.12)]">

                <span className="text-xl font-bold text-[#FF1AC6]">
                  ⚡
                </span>

              </div>

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


          {/* PLATFORM */}
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


          {/* RESOURCES */}
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


          {/* SOCIAL */}
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


        {/* DIVIDER */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />


        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

          <p className="text-xs text-gray-600">
            © 2026 Happy Bounty. All rights reserved.
          </p>


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


          <div className="flex items-center gap-2 text-xs text-gray-600">

            <span>
              Built for
            </span>

            <span className="text-[#FF1AC6]">
              Web3
            </span>

            <span>
              ⚡
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;