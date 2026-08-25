import ConnectConfig from "./ConnectConfig";

function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 mt-[50vh] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-sm
          rounded-2xl
          border border-white/[0.08]
          bg-[#151515]
          px-5 py-5
          text-white
          shadow-[0_25px_80px_rgba(0,0,0,0.65)]
          sm:px-6 sm:py-6
          animate-[modalIn_0.25s_ease-out]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute right-3.5 top-3.5
            flex h-8 w-8 items-center justify-center
            rounded-full
            text-sm text-white/40
            transition-all duration-200
            hover:bg-white/[0.07]
            hover:text-white
          "
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="mb-5 text-center">
          <div
            className="
              mx-auto mb-3
              flex h-10 w-10 items-center justify-center
              rounded-xl
              bg-gradient-to-br from-[#FF1AC6] to-[#8B5CF6]
              shadow-[0_0_25px_rgba(255,26,198,0.18)]
            "
          >
            <span className="text-sm font-bold">HB</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Welcome to Happy Bounty
          </h2>

          <p className="mt-1.5 text-xs text-white/40 sm:text-sm">
            Connect your wallet to continue
          </p>
        </div>

        {/* WALLET CONNECT */}
        <div className="space-y-2.5">
          <ConnectConfig />
        </div>

        {/* DIVIDER */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.08]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
            Or
          </span>

          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {/* EMAIL LOGIN */}
        <form className="space-y-2.5">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-white/45">
              Email
            </label>

            <input
              type="email"
              placeholder="Email login coming soon"
              disabled
              className="
                w-full
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.025]
                px-3.5 py-2.5
                text-sm text-white/40
                placeholder:text-white/20
                outline-none
                cursor-not-allowed
              "
            />
          </div>

          <button
            type="button"
            disabled
            className="
              w-full
              rounded-xl
              border border-white/[0.06]
              bg-white/[0.06]
              py-2.5
              text-sm font-semibold
              text-white/30
              cursor-not-allowed
            "
          >
            Coming Soon
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-4 text-center text-[10px] leading-relaxed text-white/25 sm:text-xs">
          By connecting, you agree to Happy Bounty's terms and conditions.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;