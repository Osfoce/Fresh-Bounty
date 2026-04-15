import HappyBounty from "../../assets/images/HappyBounty.png";
import Connect from "../Connect";
import SignUp from "../SignUp";
import { useAccount } from "wagmi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Redirect when connected
  useEffect(() => {
    // Only proceed if we're on the landing page
    if (pathname !== "/") return;

    const timer = setTimeout(() => {
      if (address && isConnected) {
        navigate("/dashboard");
        console.log(`Connected account: ${address}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [address, isConnected, pathname, navigate]);

  return (
    <div className="fixed w-full top-0 z-50">
      <div className="flex justify-between items-center gap-6 px-4 bg-black h-[60px] border border-black/40">
        {/* LOGO */}
        <div>
          {pathname !== "/dashboard" && pathname !== "/" ? (
            <Link to="/dashboard">
              <img
                className="h-[100px] mt-4 object-contain"
                src={HappyBounty}
                alt="Happy-Bounty"
              />
            </Link>
          ) : (
            <img
              className="h-[100px] w-20 mt-4 object-contain"
              src={HappyBounty}
              alt="Happy Bounty"
            />
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-row items-center gap-4 font-semibold text-white">
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="hover:text-gray-300 transition flex items-center gap-2">
              Resources
              <span
                className={`transform transition-transform ${isOpen ? "rotate-180" : ""} text-md`}
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
          {!isConnected && pathname === "/" ? <SignUp /> : <Connect />}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
