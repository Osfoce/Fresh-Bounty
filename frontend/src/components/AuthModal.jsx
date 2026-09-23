
import { useEffect } from "react";
import ConnectConfig from "./ConnectConfig";

function AuthModal({ isOpen, onClose }) {
  // Prevent background page from scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex min-h-screen
        items-center justify-center
        overflow-y-auto
        bg-black/10
        p-4
        backdrop-blur-md
        sm:p-6
      "
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-sm
          rounded-2xl
          border border-black/[0.08]
          bg-white
          px-5 py-5
          text-[#111111]
          shadow-[0_25px_80px_rgba(0,0,0,0.22)]
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
            text-sm text-black/40
            transition-all duration-200
            hover:bg-[#D4AF37]/10
            hover:text-[#D4AF37]
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
              bg-[#D4AF37]
              text-white
              shadow-[0_8px_25px_rgba(212,175,55,0.25)]
            "
          >
            <span className="text-sm font-black">HB</span>
          </div>

          <h2 className="text-xl font-black tracking-tight text-[#111111] sm:text-2xl">
            Welcome to Happy Bounty
          </h2>

          <p className="mt-1.5 text-xs font-medium text-black/50 sm:text-sm">
            Connect your wallet to continue
          </p>
        </div>

        {/* WALLET CONNECT */}
        <div className="space-y-2.5">
          <ConnectConfig />
        </div>

        {/* DIVIDER */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/[0.09]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/35">
            Or
          </span>

          <div className="h-px flex-1 bg-black/[0.09]" />
        </div>

        {/* EMAIL LOGIN */}
        <form className="space-y-2.5">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-black/60">
              Email
            </label>

            <input
              type="email"
              placeholder="Email login coming soon"
              disabled
              className="
                w-full
                rounded-xl
                border border-black/[0.08]
                bg-black/[0.025]
                px-3.5 py-2.5
                text-sm font-medium text-black/40
                placeholder:text-black/25
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
              border border-black/[0.07]
              bg-black/[0.045]
              py-2.5
              text-sm font-bold
              text-black/35
              cursor-not-allowed
            "
          >
            Coming Soon
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-4 text-center text-[10px] font-medium leading-relaxed text-black/40 sm:text-xs">
          By connecting, you agree to Happy Bounty's terms and conditions.
        </p>

        {/* GOLD ACCENT */}
        <div
          className="
            pointer-events-none
            absolute bottom-0 left-1/2
            h-[2px] w-24
            -translate-x-1/2
            rounded-full
            bg-[#D4AF37]
          "
        />
      </div>
    </div>
  );
}

export default AuthModal;

