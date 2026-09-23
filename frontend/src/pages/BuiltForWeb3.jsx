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
      className="relative overflow-hidden bg-[#f6f5ef] px-5 py-20 text-[#171717] sm:px-8 lg:px-10"
      style={{
        backgroundColor: "#f6f5ef",
      }}
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[-180px] top-[10%] h-[350px] w-[350px] rounded-full blur-[120px]"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.08)",
          }}
        />

        <div
          className="absolute bottom-[-100px] right-[-120px] h-[350px] w-[350px] rounded-full blur-[130px]"
          style={{
            backgroundColor: "rgba(178, 139, 32, 0.07)",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.04)",
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
              borderColor: "rgba(212, 175, 55, 0.3)",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
            }}
          >
            <FiZap size={12} className="text-[#B28B20]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8a8a8a]">
              Web3 Infrastructure
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#B28B20] to-[#8f6f16] bg-clip-text text-transparent">
              Web3 Work
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#737373] sm:text-base">
            Happy Bounty combines decentralized technology with a practical
            bounty marketplace to make Web3 work easier, transparent, and
            verifiable.
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
                <div key={feature.title} className="group relative">
                  <div
                    className="relative h-full overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
                    style={{
                      borderColor: "rgba(0, 0, 0, 0.08)",
                      backgroundColor: "rgba(255, 255, 255, 0.72)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.035)",
                    }}
                  >
                    {/* TOP GOLD GLOW */}
                    <div
                      className="absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(212,175,55,0.8), transparent)",
                      }}
                    />

                    {/* NUMBER */}
                    <div className="absolute right-4 top-4 text-[10px] font-medium tracking-widest text-black/20">
                      0{index + 1}
                    </div>

                    {/* ICON */}
                    <div
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10"
                      style={{
                        borderColor: "rgba(212, 175, 55, 0.25)",
                        backgroundColor: "rgba(212, 175, 55, 0.08)",
                      }}
                    >
                      <Icon
                        size={19}
                        className="text-[#B28B20] transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-base font-semibold text-[#171717]">
                      {feature.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-2 text-xs leading-relaxed text-[#737373]">
                      {feature.description}
                    </p>

                    {/* VERIFIED */}
                    <div className="mt-5 flex items-center gap-1.5">
                      <FiCheckCircle size={11} className="text-[#B28B20]" />

                      <span className="text-[9px] uppercase tracking-[0.12em] text-[#999999]">
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
              borderColor: "rgba(0, 0, 0, 0.08)",
              background:
                "linear-gradient(to right, rgba(255,255,255,0.82), rgba(250,249,243,0.95), rgba(255,255,255,0.82))",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.035)",
            }}
          >
            {/* GOLD GLOW */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[120px] w-[300px] -translate-x-1/2 rounded-full blur-[70px]"
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.07)",
              }}
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* LEFT */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10">
                  <FiShield size={17} className="text-[#B28B20]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#171717]">
                    Transparent by design
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-[#737373]">
                    Bounty activity and blockchain transactions can be
                    independently verified instead of relying entirely on a
                    centralized payment system.
                  </p>
                </div>
              </div>

              {/* RIGHT STATUS */}
              <div
                className="flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-2 sm:self-auto"
                style={{
                  borderColor: "rgba(212, 175, 55, 0.25)",
                  backgroundColor: "rgba(212, 175, 55, 0.07)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: "#D4AF37",
                    boxShadow: "0 0 10px rgba(212, 175, 55, 0.65)",
                  }}
                />

                <span className="text-[9px] uppercase tracking-[0.14em] text-[#8a8a8a]">
                  On-chain
                </span>

                <FiArrowUpRight size={11} className="text-[#B28B20]" />
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
