export default function SupportedNetworks() {
  return (
    <section className="relative overflow-hidden border-y border-black/[0.06] bg-[#f6f5ef] py-10">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-32 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.08] blur-[90px]" />
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-col items-center justify-center text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B28B20]">
          An Network
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#171717] md:text-4xl">
          BOTCHAIN
        </h2>

        <div className="mt-5 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-50" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            Powered by Botchain
          </span>
        </div>
      </div>
    </section>
  );
}