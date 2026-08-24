import ConnectConfig from "./ConnectConfig";

function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 mt-[50vh] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#171717] text-white rounded-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] p-6 sm:p-8 animate-[modalIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="text-center mb-7">
          <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF1AC6] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#FF1AC6]/20">
            <span className="text-xl font-bold">HB</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to Happy Bounty
          </h2>

          <p className="text-sm text-white/50 mt-2">
            Connect your wallet to continue
          </p>
        </div>

        {/* WALLET CONNECT */}
        <div className="space-y-3">
          <ConnectConfig />
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-white/10 flex-1" />

          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            Or
          </span>

          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* EMAIL LOGIN */}
        <form className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Email login coming soon"
              disabled
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/40 placeholder:text-white/25 outline-none cursor-not-allowed"
            />
          </div>

          <button
            type="button"
            disabled
            className="w-full py-3 rounded-xl bg-white/10 text-white/40 font-semibold text-sm cursor-not-allowed border border-white/5"
          >
            Coming Soon
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-white/30 mt-6">
          By connecting, you agree to Happy Bounty's terms and conditions.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;