import HappyBounty from "../../assets/images/HappyBounty.png";
import Connect from "../Connect";
import SignUp from "../SignUp";
import { useAccount } from "wagmi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

function NavBar() {
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smoothly scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Redirect when connected
  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => {
        if (address && isConnected) {
          navigate("/dashboard");
          console.log(`Connected account: ${address}`);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      if (!address && !isConnected) {
        navigate("/");
        // console.log(`User signed out`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [address, isConnected, pathname, navigate]);

  // Handle logo click
  const handleLogoClick = (event) => {
    if (pathname === "/" || pathname === "/dashboard") {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (

    <div
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled
          ? "px-4 pt-3 sm:px-6 md:px-8"
          : "px-3 pt-3 sm:px-4 md:px-6 lg:px-8"
      }`}
    >
      <nav
        className={`relative mx-auto flex items-center justify-between overflow-visible border transition-all duration-500 ease-out ${
          scrolled
            ? "h-[62px] max-w-[1180px] rounded-full border-[#deddd5] bg-white/95 px-4 shadow-[0_12px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:px-5 md:px-6"
            : "h-[74px] max-w-[1500px] rounded-[22px] border-transparent bg-white px-3 shadow-none sm:px-5 md:px-6"
        }`}
      >
    <div className="fixed left-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 md:px-6 lg:px-8">
      <nav className="relative mx-auto flex h-[68px] max-w-[1500px] items-center justify-between overflow-visible rounded-[20px] border border-white/[0.09] bg-[#080808]/85 px-3 shadow-[0_12px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-5 md:px-6">
        {/* TOP ACCENT LINE */}
        <div
          className={`pointer-events-none absolute left-1/2 top-0 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent transition-all duration-500 ${
            scrolled ? "w-28 opacity-100" : "w-40 opacity-70"
          }`}
        />

        {/* SUBTLE INNER GLOW */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            scrolled
              ? "rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-100"
              : "rounded-[22px] bg-transparent opacity-0"
          }`}
        />

        {/* LOGO */}
        <div className="relative z-10 flex h-full items-center">
          {pathname !== "/dashboard" && pathname !== "/" ? (
            <Link
              to="/dashboard"
              onClick={handleLogoClick}
              className="group flex h-full items-center"
              aria-label="Go to dashboard"
            >
              <img
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled
                    ? "h-[50px] sm:h-[52px]"
                    : "h-[58px] sm:h-[64px]"
                } group-hover:scale-[1.04]`}
                src={HappyBounty}
                alt="Happy Bounty"
              />
            </Link>
          ) : (
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex h-full items-center"
              aria-label="Back to top"
            >
              <img
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled
                    ? "h-[50px] sm:h-[52px]"
                    : "h-[58px] sm:h-[64px]"
                } group-hover:scale-[1.04]`}
                src={HappyBounty}
                alt="Happy Bounty"
              />
            </button>
          )}
        </div>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}

        <div className="relative z-20 flex items-center gap-1.5 font-semibold text-white sm:gap-2 md:gap-4">
          {/* =================================================
              RESOURCES
          ================================================== */}

          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              type="button"
              className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
                isOpen
                  ? "border-[#deddd5] bg-white/70 text-[#171717]"
                  : "border-transparent text-[#55544f] hover:border-[#deddd5] hover:bg-white/50 hover:text-[#171717]"
              }`}
            >
              <span>Resources</span>

              <FiChevronDown
                className={`h-4 w-4 transition-all duration-300 ${
                  isOpen
                    ? "rotate-180 text-[#B28B20]"
                    : "text-[#8b8981] group-hover:text-[#55544f]"
                }`}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 top-full mt-2.5 w-[230px] origin-top-right overflow-hidden rounded-2xl border border-[#deddd5] bg-[#f6f5ef]/[98%] shadow-[0_25px_70px_rgba(0,0,0,0.14)] backdrop-blur-2xl transition-all duration-200 ${
                isOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-[0.98] opacity-0"
              }`}
            >
              {/* DROPDOWN HEADER */}
              <div className="border-b border-[#deddd5] px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#99978f]">
                    Explore
                  </p>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.45)]" />
                </div>
              </div>

              {/* FAQ */}
              <Link
                to="/faqs"
                className="group flex items-center justify-between px-4 py-3.5 transition-all duration-200 hover:bg-white/70"
              >
                <div>
                  <span className="block text-sm font-medium text-[#55544f] transition-colors duration-200 group-hover:text-[#171717]">
                    FAQs
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[#9a9890] transition-colors group-hover:text-[#77756e]">
                    Frequently asked questions
                  </span>
                </div>

                <FiArrowRight className="h-4 w-4 text-[#aaa89f] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#B28B20]" />
              </Link>

              {/* WHITE PAPER */}
              <Link
                to="/whitepaper"
                className="group flex items-center justify-between border-t border-[#e5e3db] px-4 py-3.5 transition-all duration-200 hover:bg-white/70"
              >
                <div>
                  <span className="block text-sm font-medium text-[#55544f] transition-colors duration-200 group-hover:text-[#171717]">
                    White Paper
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[#9a9890] transition-colors group-hover:text-[#77756e]">
                    Learn how Happy Bounty works
                  </span>
                </div>

                <FiArrowRight className="h-4 w-4 text-[#aaa89f] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#B28B20]" />
              </Link>

              {/* CONTACT */}
              <Link
                to="/contact"
                className="group flex items-center justify-between border-t border-[#e5e3db] px-4 py-3.5 transition-all duration-200 hover:bg-white/70"
              >
                <div>
                  <span className="block text-sm font-medium text-[#55544f] transition-colors duration-200 group-hover:text-[#171717]">
                    Contact
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[#9a9890] transition-colors group-hover:text-[#77756e]">
                    Get in touch with the team
                  </span>
                </div>

                <FiArrowRight className="h-4 w-4 text-[#aaa89f] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#B28B20]" />
              </Link>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mx-1 hidden h-7 w-px bg-[#d9d7ce] sm:block" />

          {/* CONNECT / SIGN UP */}
          <div className="flex items-center">
            {!isConnected && pathname === "/" ? <SignUp /> : <Connect />}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
