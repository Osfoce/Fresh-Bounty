// SignUp.jsx
import AuthModal from "./AuthModal";
import { useState } from "react";

function SignUp() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <> 
      <button
        onClick={() => setShowAuthModal(true)}
        className="rounded-lg bg-[#D4AF37] px-5 py-2 text-sm  font-bold text-white  transition-all duration-200 hover:bg-[#B28B20] hover:shadow-lg hover:shadow-[#B28B20]/25"
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