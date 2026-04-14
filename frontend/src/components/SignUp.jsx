import AuthModal from "./AuthModal";
import { useState } from "react";

function SignUp() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="border border-white px-4 py-1 rounded-lg w-fit"
      >
        Sign up
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default SignUp;
