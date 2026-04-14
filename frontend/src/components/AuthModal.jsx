import { useState } from "react";
import ConnectConfig from "./ConnectConfig";
import WalletModal from "./WalletModal";

function AuthModal({ isOpen, onClose }) {
  const [showWallet, setShowWallet] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1c1c1c] text-white w-[380px] p-8 rounded-xl border border-white/20 relative">
          {/* CLOSE */}
          <button className="absolute top-3 right-3 text-lg" onClick={onClose}>
            ✕
          </button>

          <h2 className="text-2xl font-semibold mb-6">
            Welcome to Happy Bounty
          </h2>

          <p className="text-sm mb-4">Welcome back!</p>

          {/* WALLET BUTTON */}

          <ConnectConfig />

          {/* OR */}
          <div className="flex items-center gap-2 mt-4">
            <div className="border w-full border-white/40"></div>
            <span>OR</span>
            <div className="border w-full border-white/40"></div>
          </div>

          {/* EMAIL (COMING SOON) */}
          <form className="flex flex-col gap-4 mt-2">
            <input
              type="email"
              placeholder="COMING SOON"
              className="bg-transparent border border-white/30 rounded-lg px-4 py-2 text-center"
            />
            <button className="bg-white text-black py-2 rounded-lg font-semibold">
              Send code
            </button>
          </form>
        </div>
      </div>

      {/* WALLET MODAL */}
      <WalletModal isOpen={showWallet} onClose={() => setShowWallet(false)} />
    </>
  );
}

export default AuthModal;
