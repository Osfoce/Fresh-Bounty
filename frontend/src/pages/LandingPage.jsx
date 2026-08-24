import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import hero from "../assets/images/hero.jpg";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import LiveTricker from "../components/Layout/LiveTricker";
import BountyCard from "../components/Bounty/BountyCard";
import injecoin from "../assets/images/injecoin.png";
import bnb1 from "../assets/images/bnb1.png";
import eth2 from "../assets/images/eth2.png";
import base from "../assets/images/base.png";
import usdc1 from "../assets/images/usdc1.png";
import canton from "../assets/images/canton.png";
import usdt from "../assets/images/usdt.png";
// import CoinSpinner from "../components/Layout/crypto";

function LandingPage() {
  const [featuredBounties, setFeaturedBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBounties: 0,
    totalRewards: 0,
    totalUsers: 0,
  });

  // HERO ROTATING TEXT
  const [heroText, setHeroText] = useState(0);

  const heroMessages = [
    "Web3",
    "Complete Tasks",
    "Earn Crypto",
    "Build Your Skills",
  ];

  // Refs for scroll animations
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const API_URL = "https://fresh-bounty.onrender.com/api";

  // HERO TEXT ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroText((prev) => (prev + 1) % heroMessages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Fetch featured bounties (active, limit 3)
  useEffect(() => {
    const fetchFeaturedBounties = async () => {
      try {
        const response = await axios.get(`${API_URL}/task`, {
          params: { status: "active", limit: 3, page: 0 },
        });
        setFeaturedBounties(response.data.bounties || []);
      } catch (err) {
        console.error("Error fetching featured bounties:", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch global stats (you can replace with real endpoints)
    const fetchStats = async () => {
      try {
        // Example: get total bounties count
        const allBounties = await axios.get(`${API_URL}/task`, {
          params: { limit: 1 },
        });
        const totalBounties = allBounties.data.pagination?.total || 0;

        // Placeholder for total rewards and users – replace with real data
        setStats({
          totalBounties,
          totalRewards: 124500,
          totalUsers: 845,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchFeaturedBounties();
    fetchStats();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col overflow-x-hidden">
      <div className="py-6 mt-8 w-full">
        <NavBar />
        <LiveTricker />
      </div>

      {/* HERO SECTION */}
      <div
        className="relative rounded-lg mx-6 my-2 md:mx-10 lg:mx-16 py-4 bg-cover bg-center mt-6 overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65 rounded-lg"></div>

        {/* Pink Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF1AC6]/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="absolute -bottom-40 right-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* SHINING STARS */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="hero-star star-1">✦</span>
          <span className="hero-star star-2">✧</span>
          <span className="hero-star star-3">✦</span>
          <span className="hero-star star-4">✧</span>
          <span className="hero-star star-5">✦</span>
          <span className="hero-star star-6">✧</span>
          <span className="hero-star star-7">✦</span>
          <span className="hero-star star-8">✧</span>
          <span className="hero-star star-9">✦</span>
          <span className="hero-star star-10">✧</span>
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20 max-w-[850px]">
          {/* Small Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF1AC6]/30 bg-black/30 backdrop-blur-md mb-7">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1AC6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1AC6]"></span>
            </span>

            <span className="text-sm text-gray-300 tracking-wide">
              The Future of Web3 Work
            </span>
          </div>

          {/* HERO TITLE */}
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
              Make a
            </h1>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
              living from
            </h1>

            {/* ROTATING TEXT */}
            <div className="relative h-[75px] md:h-[85px] lg:h-[100px] overflow-hidden">
              <h1
                key={heroText}
                className="hero-changing-text text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent"
              >
                {heroMessages[heroText]}
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-200 leading-relaxed">
            Complete quests and earn cryptocurrency, tokens, and digital
            rewards. Post bounties and get quality work done – fully on-chain.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/dashboard"
              className="group relative overflow-hidden bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 px-7 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#FF1AC6]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Explore Bounties</span>

              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </Link>

            <Link
              to="/create"
              className="border border-white/30 px-7 py-3 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Create a Bounty
            </Link>
          </div>

          {/* Hero bottom indicators */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex gap-1.5">
              {heroMessages.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === heroText
                      ? "w-8 bg-[#FF1AC6]"
                      : "w-1.5 bg-white/30"
                  }`}
                ></span>
              ))}
            </div>

            <span className="text-xs text-gray-500">
              New opportunities every day
            </span>
          </div>
        </div>

        <style>{`
          .hero-changing-text {
            animation: heroTextIn 0.8s cubic-bezier(0.22, 1, 0.36, 1);
            text-shadow: 0 0 25px rgba(255, 26, 198, 0.35);
          }

          @keyframes heroTextIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
              filter: blur(8px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          .hero-star {
            position: absolute;
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            animation: starShine 3s ease-in-out infinite;
          }

          .star-1 {
            top: 12%;
            left: 8%;
            animation-delay: 0s;
          }

          .star-2 {
            top: 25%;
            left: 35%;
            animation-delay: 1.2s;
          }

          .star-3 {
            top: 14%;
            right: 15%;
            animation-delay: 0.6s;
          }

          .star-4 {
            top: 42%;
            right: 7%;
            animation-delay: 1.8s;
          }

          .star-5 {
            bottom: 18%;
            right: 25%;
            animation-delay: 0.9s;
          }

          .star-6 {
            bottom: 12%;
            left: 42%;
            animation-delay: 2s;
          }

          .star-7 {
            top: 62%;
            left: 10%;
            animation-delay: 1.5s;
          }

          .star-8 {
            bottom: 25%;
            left: 28%;
            animation-delay: 0.4s;
          }

          .star-9 {
            top: 30%;
            right: 32%;
            animation-delay: 2.2s;
          }

          .star-10 {
            bottom: 10%;
            right: 8%;
            animation-delay: 1.1s;
          }

          @keyframes starShine {
            0%,
            100% {
              opacity: 0.15;
              transform: scale(0.7) rotate(0deg);
              text-shadow: 0 0 0px rgba(255, 26, 198, 0);
            }

            50% {
              opacity: 1;
              transform: scale(1.4) rotate(45deg);
              text-shadow:
                0 0 8px rgba(255, 255, 255, 0.9),
                0 0 18px rgba(255, 26, 198, 0.8);
            }
          }

          .hero-badge {
            animation: badgeGlow 3s ease-in-out infinite alternate;
          }

          @keyframes badgeGlow {
            from {
              box-shadow: 0 0 0 rgba(255, 26, 198, 0);
            }

            to {
              box-shadow: 0 0 25px rgba(255, 26, 198, 0.08);
            }
          }
        `}</style>
      </div>

      {/* HOW IT WORKS */}
      <section className="relative mx-auto px-6 md:px-10 lg:px-16 py-24 text-white overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-10 left-[-150px] w-[350px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[-150px] w-[400px] h-[400px] bg-[#FF1AC6]/10 blur-[140px] rounded-full pointer-events-none" />

        {/* Decorative lines */}
        <div className="absolute top-20 right-0 w-72 h-72 border-t border-r border-purple-500/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-60 h-60 border-b border-l border-[#FF1AC6]/10 rounded-full pointer-events-none" />

        {/* Heading */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FF1AC6]/50 bg-[#FF1AC6]/5 mb-6">
            <span className="text-[#FF1AC6] text-lg">⚡</span>
            <span className="text-sm font-medium tracking-wide text-gray-200">
              SIMPLE. FAIR. REWARDING.
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">How It </span>
            <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="mt-5 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Get started in 3 easy steps and start earning on Happy Bounty.
          </p>
        </div>

        {/* Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* CARD 1 */}
          <div
            ref={card1Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 group relative"
          >
            <div
              className="
              relative h-full min-h-[500px]
              rounded-3xl
              border border-purple-500/30
              bg-gradient-to-b from-[#15101f] to-[#09090d]
              p-7
              overflow-hidden
              transition-all duration-500
              hover:-translate-y-3
              hover:border-[#FF1AC6]/70
              hover:shadow-[0_20px_80px_rgba(255,26,198,0.15)]
            "
            >
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full" />

              {/* Number */}
              <div
                className="
                relative z-10
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-purple-600 to-[#FF1AC6]
                text-2xl font-bold
                shadow-lg shadow-purple-500/30
              "
              >
                1
              </div>

              {/* Illustration */}
              <div
                className="
                relative
                h-48
                flex items-center justify-center
                my-6
              "
              >
                <div
                  className="
                  relative
                  w-32 h-24
                  rounded-2xl
                  bg-gradient-to-br from-purple-700 to-purple-950
                  border border-purple-400/40
                  shadow-[0_0_50px_rgba(139,92,246,0.35)]
                  rotate-[-5deg]
                "
                >
                  <div className="absolute top-4 left-4 w-20 h-2 rounded-full bg-purple-300/30" />
                  <div className="absolute top-9 left-4 w-12 h-2 rounded-full bg-purple-300/20" />

                  <div
                    className="
                    absolute -right-8 -top-8
                    w-16 h-16
                    rounded-full
                    bg-gradient-to-br from-purple-400 to-[#FF1AC6]
                    flex items-center justify-center
                    text-white text-2xl
                    shadow-lg shadow-purple-500/40
                  "
                  >
                    ◇
                  </div>

                  <div
                    className="
                    absolute -left-6 -bottom-5
                    w-12 h-12
                    rounded-xl
                    bg-black/70
                    border border-purple-400/40
                    flex items-center justify-center
                  "
                  >
                    🔒
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Connect Wallet</h3>

                <div className="w-10 h-1 rounded-full bg-[#FF1AC6] mb-5" />

                <p className="text-gray-400 leading-relaxed">
                  Securely connect your Web3 wallet like MetaMask,
                  WalletConnect, or any supported wallet.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div
            ref={card2Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-100 group relative"
          >
            <div
              className="
              relative h-full min-h-[500px]
              rounded-3xl
              border border-blue-500/30
              bg-gradient-to-b from-[#101421] to-[#09090d]
              p-7
              overflow-hidden
              transition-all duration-500
              hover:-translate-y-3
              hover:border-blue-400/70
              hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)]
            "
            >
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full" />

              {/* Number */}
              <div
                className="
                relative z-10
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-blue-600 to-purple-600
                text-2xl font-bold
                shadow-lg shadow-blue-500/30
              "
              >
                2
              </div>

              {/* Illustration */}
              <div className="relative h-48 flex items-center justify-center my-6">
                <div
                  className="
                  relative
                  w-64 h-36
                  rounded-2xl
                  bg-[#111827]
                  border border-blue-400/40
                  shadow-[0_0_50px_rgba(59,130,246,0.2)]
                  p-4
                "
                >
                  {/* Browser dots */}
                  <div className="flex gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                  </div>

                  {/* Roles */}
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="
                      rounded-xl
                      bg-purple-600/20
                      border border-purple-400/30
                      p-3
                      text-center
                    "
                    >
                      <div className="text-xl mb-1">👤</div>
                      <span className="text-xs text-gray-300">Worker</span>
                    </div>

                    <div
                      className="
                      rounded-xl
                      bg-blue-600/20
                      border border-blue-400/30
                      p-3
                      text-center
                    "
                    >
                      <div className="text-xl mb-1">💼</div>
                      <span className="text-xs text-gray-300">Creator</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Choose Your Role</h3>

                <div className="w-10 h-1 rounded-full bg-blue-400 mb-5" />

                <p className="text-gray-400 leading-relaxed">
                  Work on bounties that match your skills or post your own task
                  with a reward.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div
            ref={card3Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-200 group relative"
          >
            <div
              className="
              relative h-full min-h-[500px]
              rounded-3xl
              border border-pink-500/30
              bg-gradient-to-b from-[#17101d] to-[#09090d]
              p-7
              overflow-hidden
              transition-all duration-500
              hover:-translate-y-3
              hover:border-[#FF1AC6]/70
              hover:shadow-[0_20px_80px_rgba(255,26,198,0.18)]
            "
            >
              {/* Glow */}
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#FF1AC6]/20 blur-[90px] rounded-full" />

              {/* Number */}
              <div
                className="
                relative z-10
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-[#FF1AC6] to-purple-600
                text-2xl font-bold
                shadow-lg shadow-pink-500/30
              "
              >
                3
              </div>

              {/* Illustration */}
              <div
                className="
                relative
                h-48
                flex items-center justify-center
                my-6
              "
              >
                <div className="relative">
                  {/* Box */}
                  <div
                    className="
                    w-32 h-24
                    rounded-xl
                    bg-gradient-to-br
                    from-purple-700
                    to-purple-950
                    border
                    border-purple-400/40
                    shadow-[0_0_50px_rgba(255,26,198,0.25)]
                  "
                  />

                  {/* Coins */}
                  <div
                    className="
                    absolute
                    -top-10
                    -right-7
                    w-16 h-16
                    rounded-full
                    bg-gradient-to-br
                    from-purple-400
                    to-[#FF1AC6]
                    border-4
                    border-purple-300/40
                    flex items-center justify-center
                    text-2xl
                    shadow-xl
                  "
                  >
                    ⚡
                  </div>

                  <div
                    className="
                    absolute
                    -top-4
                    -right-16
                    w-12 h-12
                    rounded-full
                    bg-gradient-to-br
                    from-purple-500
                    to-blue-600
                    flex items-center justify-center
                    shadow-lg
                  "
                  >
                    ⚡
                  </div>

                  {/* Check */}
                  <div
                    className="
                    absolute
                    -bottom-5
                    -right-5
                    w-14 h-14
                    rounded-xl
                    bg-green-500/20
                    border border-green-400/50
                    flex items-center justify-center
                    text-green-400
                    text-2xl
                  "
                  >
                    ✓
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Earn Crypto</h3>

                <div className="w-10 h-1 rounded-full bg-[#FF1AC6] mb-5" />

                <p className="text-gray-400 leading-relaxed">
                  Get paid instantly in crypto when your solution is accepted.
                  Work. Earn. Repeat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="relative z-10 max-w-3xl mx-auto mt-14 text-center">
          <div
            className="
            inline-flex
            flex-wrap
            justify-center
            gap-6
            px-6
            py-4
            rounded-2xl
            border border-white/10
            bg-white/[0.02]
            backdrop-blur-xl
          "
          >
            <span className="text-sm text-gray-400">🔐 Secure</span>

            <span className="text-sm text-gray-400">🌐 Web3 Powered</span>

            <span className="text-sm text-gray-400">⚡ Fast Payments</span>

            <span className="text-sm text-gray-400">👥 Community Driven</span>
          </div>
        </div>
      </section>

      {/* LIVE STATS SECTION */}
      <section
        ref={statsRef}
        className="opacity-0 translate-y-10 transition-all duration-700 mx-6 md:mx-10 lg:mx-16 my-20"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#151515]/90 backdrop-blur-xl">
          {/* Background Glow */}
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FF1AC6]/10 blur-3xl" />

          <div className="relative p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/10 px-4 py-2 text-sm font-medium text-[#FF1AC6]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF1AC6]" />
                Live Platform Data
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Platform <span className="text-[#FF1AC6]">Stats</span>
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 md:text-base">
                Real-time insights into the Fresh Bounty ecosystem.
              </p>
            </div>

            {/* Stats */}
<div className="grid grid-cols-1 gap-5 md:grid-cols-3">

  {/* TOTAL BOUNTIES */}
  <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#FF1AC6]/40 hover:shadow-[0_20px_60px_rgba(255,26,198,0.08)]">

    {/* Glow */}
    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FF1AC6]/10 blur-3xl transition-all duration-500 group-hover:bg-[#FF1AC6]/20" />

    {/* Top */}
    <div className="relative z-10 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF1AC6]/20 bg-[#FF1AC6]/10 text-[#FF1AC6] transition-transform duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Bounties
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Platform activity
          </p>
        </div>

      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-2.5 py-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400">
          Live
        </span>
      </div>

    </div>

    {/* Number */}
    <div className="relative z-10 mt-8 flex items-end justify-between">

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold tracking-tight text-white">
            {stats.totalBounties}
          </span>

          <span className="text-xl font-bold text-[#FF1AC6]">
            +
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          Total Bounties
        </p>
      </div>

      <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-2 py-1">
        <span className="text-xs font-medium text-green-400">
          +12.4%
        </span>
      </div>

    </div>

    {/* Progress */}
    <div className="relative z-10 mt-7">

      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-gray-600">
        <span>Activity</span>
        <span>Active</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#FF1AC6] to-pink-400 transition-all duration-1000 group-hover:w-[78%]" />
      </div>

    </div>

  </div>


  {/* REWARDS */}
  <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/40 hover:shadow-[0_20px_60px_rgba(139,92,246,0.08)]">

    {/* Glow */}
    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />

    {/* Top */}
    <div className="relative z-10 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10 text-purple-400 transition-transform duration-300 group-hover:scale-110">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m9-9H3"
            />
          </svg>

        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Rewards
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Distributed earnings
          </p>
        </div>

      </div>

      <div className="rounded-full border border-purple-400/20 bg-purple-500/5 px-2.5 py-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">
          Crypto
        </span>
      </div>

    </div>

    {/* Amount */}
    <div className="relative z-10 mt-8 flex items-end justify-between">

      <div>

        <div className="flex items-baseline gap-1">

          <span className="text-5xl font-bold tracking-tight text-white">
            $
            {stats.totalRewards.toLocaleString()}
          </span>

          <span className="text-xl font-bold text-purple-400">
            +
          </span>

        </div>

        <p className="mt-2 text-sm text-gray-400">
          Rewards Distributed
        </p>

      </div>

      <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-2 py-1">
        <span className="text-xs font-medium text-green-400">
          +18.7%
        </span>
      </div>

    </div>

    {/* Progress */}
    <div className="relative z-10 mt-7">

      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-gray-600">
        <span>Distribution</span>
        <span>Growing</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-purple-500 to-[#FF1AC6] transition-all duration-1000 group-hover:w-[86%]" />
      </div>

    </div>

  </div>


  {/* USERS */}
  <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)]">

    {/* Glow */}
    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

    {/* Top */}
    <div className="relative z-10 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-.71-.02-1.42-.075-2.126A4.5 4.5 0 0 0 7.5 16.5m7.5 2.628a9.375 9.375 0 0 1-7.5 0m7.5 0v-.003c0-.71-.02-1.42-.075-2.126A4.5 4.5 0 0 0 7.5 16.5m0 0a4.125 4.125 0 0 1-7.533 2.493A9.337 9.337 0 0 1 4.088 18a9.38 9.38 0 0 1 2.625.372"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            />
          </svg>

        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Community
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Growing network
          </p>
        </div>

      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/5 px-2.5 py-1">

        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
          Active
        </span>

      </div>

    </div>

    {/* Users */}
    <div className="relative z-10 mt-8 flex items-end justify-between">

      <div>

        <div className="flex items-baseline gap-1">

          <span className="text-5xl font-bold tracking-tight text-white">
            {stats.totalUsers}
          </span>

          <span className="text-xl font-bold text-blue-400">
            +
          </span>

        </div>

        <p className="mt-2 text-sm text-gray-400">
          Active Users
        </p>

      </div>

      <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-2 py-1">
        <span className="text-xs font-medium text-green-400">
          +9.2%
        </span>
      </div>

    </div>

    {/* Progress */}
    <div className="relative z-10 mt-7">

      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-gray-600">
        <span>Community</span>
        <span>Growing</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

        <div className="h-full w-[52%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 group-hover:w-[65%]" />

      </div>

    </div>

  </div>

</div>


            {/* Footer */}
            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
              <p className="text-xs text-gray-500">
                Statistics are updated automatically
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                System operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BOUNTIES (REAL DATA) */}
      <section className="px-6 md:px-10 lg:px-16 my-16">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-3xl font-bold">🔥 Featured Bounties</h2>

          <Link
            to="/dashboard"
            className="text-[#FF1AC6] hover:underline flex items-center gap-1"
          >
            View all bounties →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#FF1AC6] rounded-full animate-spin"></div>
          </div>
        ) : featuredBounties.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">📭</div>

            <p className="text-gray-400">
              No active bounties at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBounties.map((bounty) => (
              <BountyCard key={bounty._id} bounty={bounty} />
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS SECTION */}
<section
  ref={testimonialsRef}
  className="opacity-0 translate-y-10 transition-all duration-700 mx-6 md:mx-10 lg:mx-16 my-24"
>
  {/* Section Header */}
  <div className="text-center max-w-3xl mx-auto mb-14">

    <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF1AC6] animate-pulse" />

      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF1AC6]">
        Community Feedback
      </span>
    </div>

    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
      What Our{" "}
      <span className="bg-gradient-to-r from-[#FF1AC6] to-purple-500 bg-clip-text text-transparent">
        Users Say
      </span>
    </h2>

    <p className="mt-4 text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
      Real experiences from builders, creators, and Web3 professionals
      earning through Fresh Bounty.
    </p>

  </div>


  {/* Testimonials */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">

    {/* TESTIMONIAL 1 */}
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151515] via-[#111111] to-[#0b0b0b] p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#FF1AC6]/40 hover:shadow-[0_25px_70px_rgba(255,26,198,0.10)]">

      {/* Glow */}
      <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#FF1AC6]/10 blur-[90px] transition-all duration-500 group-hover:bg-[#FF1AC6]/20" />

      {/* Quote Icon */}
      <div className="absolute top-6 right-7 text-6xl font-serif text-[#FF1AC6]/10 select-none">
        "
      </div>

      <div className="relative z-10">

        {/* User */}
        <div className="flex items-center justify-between mb-7">

          <div className="flex items-center gap-4">

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF1AC6]/30 to-purple-600/20 border border-[#FF1AC6]/20 flex items-center justify-center text-2xl">
                🧑
              </div>

              {/* Online */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0b0b0b] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              </span>

            </div>

            <div>

              <div className="flex items-center gap-2">

                <p className="font-semibold text-white">
                  Alex Thompson
                </p>

                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF1AC6] text-[9px] text-black font-bold">
                  ✓
                </span>

              </div>

              <p className="text-xs text-gray-500 mt-1">
                Smart Contract Developer
              </p>

            </div>

          </div>

          <span className="hidden sm:block text-[10px] uppercase tracking-widest text-gray-600">
            Verified
          </span>

        </div>


        {/* Stars */}
        <div className="flex items-center gap-1 mb-5">

          <span className="text-[#FF1AC6] text-sm">★</span>
          <span className="text-[#FF1AC6] text-sm">★</span>
          <span className="text-[#FF1AC6] text-sm">★</span>
          <span className="text-[#FF1AC6] text-sm">★</span>
          <span className="text-[#FF1AC6] text-sm">★</span>

          <span className="ml-2 text-xs text-gray-600">
            5.0
          </span>

        </div>


        {/* Testimonial */}
        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
          “Posted a Solidity audit bounty and received 3 high-quality
          submissions within 24 hours. The escrow system made everything
          trustless. Highly recommended!”
        </p>


        {/* Bottom */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">

          <span className="text-xs text-gray-600">
            Bounty Creator
          </span>

          <span className="flex items-center gap-2 text-xs text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Completed
          </span>

        </div>

      </div>

    </div>


    {/* TESTIMONIAL 2 */}
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151515] via-[#111111] to-[#0b0b0b] p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_25px_70px_rgba(139,92,246,0.10)]">

      {/* Glow */}
      <div className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full bg-purple-500/10 blur-[90px] transition-all duration-500 group-hover:bg-purple-500/20" />

      {/* Quote */}
      <div className="absolute top-6 right-7 text-6xl font-serif text-purple-500/10 select-none">
        "
      </div>

      <div className="relative z-10">

        {/* User */}
        <div className="flex items-center justify-between mb-7">

          <div className="flex items-center gap-4">

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-[#FF1AC6]/20 border border-purple-400/20 flex items-center justify-center text-2xl">
                👩‍💻
              </div>

              {/* Online */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0b0b0b] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              </span>

            </div>

            <div>

              <div className="flex items-center gap-2">

                <p className="font-semibold text-white">
                  Maria Gonzales
                </p>

                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-500 text-[9px] text-white font-bold">
                  ✓
                </span>

              </div>

              <p className="text-xs text-gray-500 mt-1">
                Freelance Web3 Designer
              </p>

            </div>

          </div>

          <span className="hidden sm:block text-[10px] uppercase tracking-widest text-gray-600">
            Verified
          </span>

        </div>


        {/* Stars */}
        <div className="flex items-center gap-1 mb-5">

          <span className="text-purple-400 text-sm">★</span>
          <span className="text-purple-400 text-sm">★</span>
          <span className="text-purple-400 text-sm">★</span>
          <span className="text-purple-400 text-sm">★</span>
          <span className="text-purple-400 text-sm">★</span>

          <span className="ml-2 text-xs text-gray-600">
            5.0
          </span>

        </div>


        {/* Testimonial */}
        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
          “Earned 500 INJ by designing a DeFi dashboard. The process was
          smooth and the payout was instant. I love the multi-chain
          support!”
        </p>


        {/* Bottom */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">

          <span className="text-xs text-gray-600">
            Bounty Worker
          </span>

          <span className="flex items-center gap-2 text-xs text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Payment Received
          </span>

        </div>

      </div>

    </div>

  </div>


  {/* Trust Statement */}
  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-xs text-gray-600">

    <span className="flex items-center gap-2">
      <span className="text-green-400">✓</span>
      Verified Users
    </span>

    <span className="flex items-center gap-2">
      <span className="text-[#FF1AC6]">✓</span>
      Real Bounty Activity
    </span>

    <span className="flex items-center gap-2">
      <span className="text-purple-400">✓</span>
      On-chain Payments
    </span>

  </div>

</section>


      {/* SUPPORTED NETWORKS & TOKENS */}
<section className="px-6 md:px-10 lg:px-16 my-24">
  <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151515] via-[#101010] to-[#090909] p-8 md:p-12">

    {/* Background Glows */}
    <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-[#FF1AC6]/10 blur-[120px] pointer-events-none" />
    <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

    {/* Decorative Grid */}
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    <div className="relative z-10">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/5 px-4 py-2 mb-5">

          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1AC6] animate-pulse shadow-[0_0_8px_rgba(255,26,198,0.8)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF1AC6]">
            Multi-Chain Ecosystem
          </span>

        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Supported{" "}
          <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Networks & Tokens
          </span>
        </h2>

        <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-400 max-w-xl mx-auto">
          Connect, complete bounties, and receive rewards across
          multiple blockchain networks and digital assets.
        </p>

      </div>


      {/* NETWORKS LABEL */}
      <div className="flex items-center gap-4 mb-6">

        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Networks
        </span>

        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />

      </div>


      {/* NETWORK CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">

        {/* Injective */}
        <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/40 hover:bg-white/[0.05]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40 transition-transform duration-500 group-hover:scale-110 group-hover:border-[#FF1AC6]/30">

            <img
              src={injecoin}
              alt="Injective"
              className="w-11 h-11"
            />

          </div>

          <p className="mt-4 text-sm font-semibold text-white">
            Injective
          </p>

          <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-600">
            Network
          </span>

        </div>


        {/* Ethereum */}
        <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.05]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40 transition-transform duration-500 group-hover:scale-110 group-hover:border-purple-400/30">

            <img
              src={eth2}
              alt="Ethereum"
              className="w-11 h-11"
            />

          </div>

          <p className="mt-4 text-sm font-semibold text-white">
            Ethereum
          </p>

          <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-600">
            Network
          </span>

        </div>


        {/* BNB */}
        <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/[0.05]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40 transition-transform duration-500 group-hover:scale-110">

            <img
              src={bnb1}
              alt="BNB Chain"
              className="w-11 h-11"
            />

          </div>

          <p className="mt-4 text-sm font-semibold text-white">
            BNB Chain
          </p>

          <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-600">
            Network
          </span>

        </div>


        {/* Base */}
        <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.05]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40 transition-transform duration-500 group-hover:scale-110">

            <img
              src={base}
              alt="Base"
              className="w-11 h-11"
            />

          </div>

          <p className="mt-4 text-sm font-semibold text-white">
            Base
          </p>

          <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-600">
            Network
          </span>

        </div>

      </div>


      {/* TOKENS LABEL */}
      <div className="flex items-center gap-4 mb-6">

        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Supported Assets
        </span>

        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />

      </div>


      {/* TOKEN CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        {/* INJ */}
        <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-[#FF1AC6]/30 hover:bg-white/[0.05]">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/[0.08]">

            <img
              src={injecoin}
              alt="INJ"
              className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />

          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              INJ
            </p>

            <p className="text-[10px] text-gray-600">
              INJ / wINJ
            </p>
          </div>

        </div>


        {/* USDC */}
        <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.05]">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/[0.08]">

            <img
              src={usdc1}
              alt="USDC"
              className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
            />

          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              USDC
            </p>

            <p className="text-[10px] text-gray-600">
              Stablecoin
            </p>
          </div>

        </div>


        {/* USDT */}
        <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-green-400/30 hover:bg-white/[0.05]">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/[0.08]">

            <img
              src={usdt}
              alt="USDT"
              className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
            />

          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              USDT
            </p>

            <p className="text-[10px] text-gray-600">
              Stablecoin
            </p>
          </div>

        </div>


        {/* Canton */}
        <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-purple-400/30 hover:bg-white/[0.05]">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/[0.08]">

            <img
              src={canton}
              alt="Canton"
              className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
            />

          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Canton
            </p>

            <p className="text-[10px] text-gray-600">
              Network Asset
            </p>
          </div>

        </div>

      </div>


      {/* FOOTER */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6">

        <div className="flex items-center gap-2">

          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          </span>

          <span className="text-xs text-gray-500">
            Multi-chain infrastructure active
          </span>

        </div>

        <span className="text-xs text-gray-600">
          More networks coming soon
        </span>

      </div>

    </div>
  </div>
</section>


      {/* FINAL CALL TO ACTION */}
<section className="mx-6 md:mx-10 lg:mx-16 my-24">
  <div className="relative overflow-hidden rounded-3xl border border-[#FF1AC6]/20 bg-[#0d0d0d]">

    {/* Background Glows */}
    <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF1AC6]/15 blur-[120px]" />

    <div className="absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

    <div className="absolute -bottom-40 -right-20 h-72 w-72 rounded-full bg-[#FF1AC6]/10 blur-[120px]" />

    {/* Subtle Grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "45px 45px",
      }}
    />

    {/* Decorative Glow Rings */}
    <div className="absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-[#FF1AC6]/10" />
    <div className="absolute -left-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-[#FF1AC6]/10" />

    <div className="absolute -right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-purple-500/10" />
    <div className="absolute -right-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-purple-500/10" />


    {/* CONTENT */}
    <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 lg:px-20">

      {/* Badge */}
      <div className="mb-6 flex justify-center">

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/5 px-4 py-2">

          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF1AC6] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF1AC6]" />
          </span>

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF1AC6]">
            Start Building. Start Earning.
          </span>

        </div>

      </div>


      {/* Heading */}
      <h2 className="mx-auto max-w-4xl text-center text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">

        Turn Your{" "}
        <span className="bg-gradient-to-r from-[#FF1AC6] via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Skills
        </span>{" "}
        Into Rewards.

      </h2>


      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-gray-400 md:text-lg">
        Discover Web3 opportunities, complete meaningful tasks, and
        get rewarded in crypto. Or create a bounty and find skilled
        contributors ready to get the job done.
      </p>


      {/* BUTTONS */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

        <Link
          to="/dashboard"
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#FF1AC6] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,26,198,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff32ce] hover:shadow-[0_0_40px_rgba(255,26,198,0.35)] sm:w-auto"
        >

          <span className="relative z-10">
            Explore Bounties
          </span>

          <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

          {/* Button Shine */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        </Link>


        <Link
          to="/create"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/40 hover:bg-[#FF1AC6]/5 sm:w-auto"
        >

          <span>
            Create a Bounty
          </span>

          <span className="text-gray-500 transition-colors duration-300 group-hover:text-[#FF1AC6]">
            +
          </span>

        </Link>

      </div>


      {/* TRUST POINTS */}
      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-8">

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            ✓
          </span>
          Secure Web3 Payments
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF1AC6]/10 text-[#FF1AC6]">
            ⚡
          </span>
          Fast Rewards
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
            ◇
          </span>
          Multi-Chain
        </div>

      </div>

    </div>

  </div>
</section>

      <Footer />
    </div>
  );
}

export default LandingPage;
