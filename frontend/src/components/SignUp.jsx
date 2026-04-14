// SignUp.jsx
import AuthModal from "./AuthModal";
import { useState } from "react";

function SignUp() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 px-5 py-2 rounded-lg text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#FF1AC6]/25 transition-all duration-200"
      >
        Sign Up
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default SignUp;
