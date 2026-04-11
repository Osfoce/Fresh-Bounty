import Connect from "../Connect";
import SignUp from "../SignUp";
import { useAccountEffect } from "wagmi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Wallet connection
  useAccountEffect({
    onConnect(data) {
      setAddress(data.address);
      setIsConnected(true);
    },
    onDisconnect() {
      setAddress(null);
      setIsConnected(false);
      navigate("/");
    },
  });

  // Redirect when connected
  useEffect(() => {
    if (address) {
      navigate("/dashboard");
    }
  }, [address, navigate]);

  return (
    <div className="flex justify-between items-center p-2 md:p-6 bg-[#050505] h-[55px] border border-black/40 w-full sticky top-2 z-50">
      {/* LOGO */}
      <div>
        {pathname !== "/" ? (
          <Link to="/dashboard">
            <img
              className="h-[100px] mt-2.5 object-contain"
              src="/src/assets/images/HappyBounty.png"
              alt="Happy Bounty"
            />
          </Link>
        ) : (
          <img
            className="h-[100px] mt-2.5 object-contain"
            src="/src/assets/images/HappyBounty.png"
            alt="Happy Bounty"
          />
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-row items-center gap-2 font-semibold text-white">
        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            className="hover:text-gray-300 transition flex items-center gap-1"
            onClick={() => setIsOpen(false)}
          >
            Resources
            <span
              className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          {/* Animated Dropdown */}
          <div
            className={`absolute top-full left-0 mt-2 w-48 bg-black border border-white rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200 ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            }`}
          >
            <Link
              to="/faqs"
              className="block px-4 py-3 hover:bg-gray-800 hover:pl-6 transition-all"
            >
              FAQs
            </Link>
            <Link
              to="/whitepaper"
              className="block px-4 py-3 hover:bg-gray-800 hover:pl-6 transition-all border-t border-gray-800"
            >
              White Paper
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 hover:bg-gray-800 hover:pl-6 transition-all border-t border-gray-800"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* CONNECT BUTTON */}
        {pathname !== "/" ? <Connect /> : <SignUp />}
      </div>
    </div>
  );
}

export default NavBar;
