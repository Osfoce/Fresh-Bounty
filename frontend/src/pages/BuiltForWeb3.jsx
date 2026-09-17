import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiCreditCard,
  FiDollarSign,
  FiLock,
  FiShield,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    icon: FiCode,
    title: "Smart Contracts",
    description:
      "Bounty rules and reward logic are powered by blockchain smart contracts.",
  },
  {
    icon: FiCreditCard,
    title: "Wallet Integration",
    description:
      "Connect your wallet to create bounties, interact with rewards, and manage your on-chain activity.",
  },
  {
    icon: FiLock,
    title: "Bounty Escrow",
    description:
      "Rewards can be secured through on-chain escrow until the bounty requirements are fulfilled.",
  },
  {
    icon: FiDollarSign,
    title: "On-chain Rewards",
    description:
      "Contributors receive blockchain-based rewards with transactions that can be verified on-chain.",
  },
];

export default function BuiltForWeb3() {
  return (
    <section
      className="relative overflow-hidden bg-black px-5 py-20 text-white sm:px-8 lg:px-10"
      style={{
        backgroundColor: "#070708",
      }}
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[-180px] top-[10%] h-[350px] w-[350px] rounded-full blur-[120px]"
          style={{
            backgroundColor: "rgba(255, 26, 198, 0.05)",
          }}
        />

        <div
          className="absolute bottom-[-100px] right-[-120px] h-[350px] w-[350px] rounded-full blur-[130px]"
          style={{
            backgroundColor: "rgba(168, 85, 247, 0.05)",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            backgroundColor: "rgba(255, 26, 198, 0.025)",
          }}
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mx-auto max-w-2xl text-center">

          {/* BADGE */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{
              borderColor: "rgba(255, 26, 198, 0.15)",
              backgroundColor: "rgba(255, 26, 198, 0.05)",
            }}
          >
            <FiZap
              size={12}
              className="text-[#FF1AC6]"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
              Web3 Infrastructure
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Web3 Work
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Happy Bounty combines decentralized technology with a
            practical bounty marketplace to make Web3 work easier,
            transparent, and verifiable.
          </p>
        </div>

        {/* =====================================================
            TECHNOLOGY CARDS
        ===================================================== */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group relative"
                >
                  <div
                    className="relative h-full overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(13,13,14,0.9)",
                    }}
                  >

                    {/* TOP GLOW */}
                    <div
                      className="absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(255,26,198,0.5), transparent)",
                      }}
                    />

                    {/* NUMBER */}
                    <div className="absolute right-4 top-4 text-[10px] font-medium tracking-widest text-white/20">
                      0{index + 1}
                    </div>

                    {/* ICON */}
                    <div
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500"
                      style={{
                        borderColor: "rgba(255,26,198,0.12)",
                        backgroundColor: "rgba(255,26,198,0.06)",
                      }}
                    >
                      <Icon
                        size={19}
                        className="text-[#FF1AC6] transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      {feature.description}
                    </p>

                    {/* VERIFIED */}
                    <div className="mt-5 flex items-center gap-1.5">
                      <FiCheckCircle
                        size={11}
                        className="text-[#FF1AC6]"
                      />

                      <span className="text-[9px] uppercase tracking-[0.12em] text-gray-600">
                        Web3 enabled
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            TRANSPARENCY PANEL
        ===================================================== */}
        <div className="mx-auto mt-6 max-w-5xl">

          <div
            className="relative overflow-hidden rounded-2xl border p-5 sm:p-6"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background:
                "linear-gradient(to right, #0d0d0e, #111012, #0d0d0e)",
            }}
          >

            {/* GLOW */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[120px] w-[300px] -translate-x-1/2 rounded-full blur-[70px]"
              style={{
                backgroundColor: "rgba(255,26,198,0.05)",
              }}
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* LEFT */}
              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                  <FiShield
                    size={17}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Transparent by design
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-500">
                    Bounty activity and blockchain transactions can be
                    independently verified instead of relying entirely
                    on a centralized payment system.
                  </p>
                </div>

              </div>

              {/* RIGHT STATUS */}
              <div
                className="flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-2 sm:self-auto"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.025)",
                }}
              >

                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: "#FF1AC6",
                    boxShadow:
                      "0 0 10px rgba(255,26,198,0.8)",
                  }}
                />

                <span className="text-[9px] uppercase tracking-[0.14em] text-gray-500">
                  On-chain
                </span>

                <FiArrowUpRight
                  size={11}
                  className="text-gray-500"
                />

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          REDUCED MOTION
      ===================================================== */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .group {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}