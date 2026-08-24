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
    <div className="fixed -top-3 left-0 w-full z-50 px-4 md:px-6 lg:px-8">

      <nav className="relative mx-auto mt-3 flex h-[64px] max-w-[1500px] items-center justify-between rounded-2xl border border-white/[0.08] bg-black/75 px-4 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:px-6">

        {/* Subtle pink glow */}
        <div className="absolute left-8 top-0 h-px w-32 bg-gradient-to-r from-transparent via-[#FF1AC6]/50 to-transparent" />

        {/* LOGO */}
        <div className="relative z-10 flex items-center">

          {pathname !== "/dashboard" && pathname !== "/" ? (
            <Link
              to="/dashboard"
              className="group flex items-center"
            >
              <img
                className="h-[72px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                src={HappyBounty}
                alt="Happy Bounty"
              />
            </Link>
          ) : (
            <img
              className="h-[72px] w-auto object-contain"
              src={HappyBounty}
              alt="Happy Bounty"
            />
          )}

        </div>


        {/* RIGHT SECTION */}
        <div className="relative z-10 flex items-center gap-3 font-semibold text-white md:gap-5">

          {/* RESOURCES */}
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >

            <button
              type="button"
              className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-300 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
            >

              <span>
                Resources
              </span>

              <span
                className={`text-[10px] text-gray-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#FF1AC6]" : ""
                }`}
              >
                ▼
              </span>

            </button>


            {/* DROPDOWN */}
            <div
              className={`absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d]/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 ${
                isOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >

              {/* Dropdown Header */}
              <div className="border-b border-white/[0.06] px-4 py-3">

                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600">
                  Explore
                </p>

              </div>


              <Link
                to="/faqs"
                className="group flex items-center justify-between px-4 py-3 text-sm text-gray-400 transition-all duration-200 hover:bg-[#FF1AC6]/5 hover:text-white"
              >
                <span>
                  FAQs
                </span>

                <span className="text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-[#FF1AC6]">
                  →
                </span>
              </Link>


              <Link
                to="/whitepaper"
                className="group flex items-center justify-between border-t border-white/[0.05] px-4 py-3 text-sm text-gray-400 transition-all duration-200 hover:bg-[#FF1AC6]/5 hover:text-white"
              >
                <span>
                  White Paper
                </span>

                <span className="text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-[#FF1AC6]">
                  →
                </span>
              </Link>


              <Link
                to="/contact"
                className="group flex items-center justify-between border-t border-white/[0.05] px-4 py-3 text-sm text-gray-400 transition-all duration-200 hover:bg-[#FF1AC6]/5 hover:text-white"
              >
                <span>
                  Contact
                </span>

                <span className="text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-[#FF1AC6]">
                  →
                </span>
              </Link>


              <Link
                to="/setting"
                className="group flex items-center justify-between border-t border-white/[0.05] px-4 py-3 text-sm text-gray-400 transition-all duration-200 hover:bg-[#FF1AC6]/5 hover:text-white"
              >
                <span>
                  Settings
                </span>

                <span className="text-gray-700 transition-all group-hover:translate-x-1 group-hover:text-[#FF1AC6]">
                  →
                </span>
              </Link>

            </div>

          </div>


          {/* CONNECT / SIGN UP */}
          <div className="flex items-center">

            {!isConnected && pathname === "/" ? (
              <SignUp />
            ) : (
              <Connect />
            )}

          </div>

        </div>

      </nav>
    </div>
  );
}

export default NavBar;