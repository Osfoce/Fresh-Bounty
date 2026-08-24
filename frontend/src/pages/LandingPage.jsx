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
      <div className="py-2 mt-2 w-full">
        <NavBar />
        <LiveTricker />
      </div>

      {/* HERO SECTION */}
      <div
        className="relative rounded-lg mx-6 my-2 md:mx-10 lg:mx-16 py-6 bg-cover bg-center mt-6 overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid white",
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
              <span className="relative z-10">
                Explore Bounties
              </span>

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

            <div className="
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
            ">

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full" />

              {/* Number */}
              <div className="
                relative z-10
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-purple-600 to-[#FF1AC6]
                text-2xl font-bold
                shadow-lg shadow-purple-500/30
              ">
                1
              </div>

              {/* Illustration */}
              <div className="
                relative
                h-48
                flex items-center justify-center
                my-6
              ">

                <div className="
                  relative
                  w-32 h-24
                  rounded-2xl
                  bg-gradient-to-br from-purple-700 to-purple-950
                  border border-purple-400/40
                  shadow-[0_0_50px_rgba(139,92,246,0.35)]
                  rotate-[-5deg]
                ">

                  <div className="absolute top-4 left-4 w-20 h-2 rounded-full bg-purple-300/30" />
                  <div className="absolute top-9 left-4 w-12 h-2 rounded-full bg-purple-300/20" />

                  <div className="
                    absolute -right-8 -top-8
                    w-16 h-16
                    rounded-full
                    bg-gradient-to-br from-purple-400 to-[#FF1AC6]
                    flex items-center justify-center
                    text-white text-2xl
                    shadow-lg shadow-purple-500/40
                  ">
                    ◇
                  </div>

                  <div className="
                    absolute -left-6 -bottom-5
                    w-12 h-12
                    rounded-xl
                    bg-black/70
                    border border-purple-400/40
                    flex items-center justify-center
                  ">
                    🔒
                  </div>
                </div>

              </div>

              {/* Content */}
              <div className="relative z-10">

                <h3 className="text-2xl font-bold mb-3">
                  Connect Wallet
                </h3>

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

            <div className="
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
            ">

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full" />

              {/* Number */}
              <div className="
                relative z-10
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-blue-600 to-purple-600
                text-2xl font-bold
                shadow-lg shadow-blue-500/30
              ">
                2
              </div>

              {/* Illustration */}
              <div className="relative h-48 flex items-center justify-center my-6">

                <div className="
                  relative
                  w-64 h-36
                  rounded-2xl
                  bg-[#111827]
                  border border-blue-400/40
                  shadow-[0_0_50px_rgba(59,130,246,0.2)]
                  p-4
                ">

                  {/* Browser dots */}
                  <div className="flex gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                  </div>

                  {/* Roles */}
                  <div className="grid grid-cols-2 gap-3">

                    <div className="
                      rounded-xl
                      bg-purple-600/20
                      border border-purple-400/30
                      p-3
                      text-center
                    ">
                      <div className="text-xl mb-1">👤</div>
                      <span className="text-xs text-gray-300">
                        Worker
                      </span>
                    </div>

                    <div className="
                      rounded-xl
                      bg-blue-600/20
                      border border-blue-400/30
                      p-3
                      text-center
                    ">
                      <div className="text-xl mb-1">💼</div>
                      <span className="text-xs text-gray-300">
                        Creator
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Content */}
              <div className="relative z-10">

                <h3 className="text-2xl font-bold mb-3">
                  Choose Your Role
                </h3>

                <div className="w-10 h-1 rounded-full bg-blue-400 mb-5" />

                <p className="text-gray-400 leading-relaxed">
                  Work on bounties that match your skills or post
                  your own task with a reward.
                </p>

              </div>

            </div>
          </div>


          {/* CARD 3 */}
          <div
            ref={card3Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-200 group relative"
          >

            <div className="
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
            ">

              {/* Glow */}
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#FF1AC6]/20 blur-[90px] rounded-full" />

              {/* Number */}
              <div className="
                relative z-10
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-[#FF1AC6] to-purple-600
                text-2xl font-bold
                shadow-lg shadow-pink-500/30
              ">
                3
              </div>

              {/* Illustration */}
              <div className="
                relative
                h-48
                flex items-center justify-center
                my-6
              ">

                <div className="relative">

                  {/* Box */}
                  <div className="
                    w-32 h-24
                    rounded-xl
                    bg-gradient-to-br
                    from-purple-700
                    to-purple-950
                    border
                    border-purple-400/40
                    shadow-[0_0_50px_rgba(255,26,198,0.25)]
                  " />

                  {/* Coins */}
                  <div className="
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
                  ">
                    ⚡
                  </div>

                  <div className="
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
                  ">
                    ⚡
                  </div>

                  {/* Check */}
                  <div className="
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
                  ">
                    ✓
                  </div>

                </div>

              </div>

              {/* Content */}
              <div className="relative z-10">

                <h3 className="text-2xl font-bold mb-3">
                  Earn Crypto
                </h3>

                <div className="w-10 h-1 rounded-full bg-[#FF1AC6] mb-5" />

                <p className="text-gray-400 leading-relaxed">
                  Get paid instantly in crypto when your solution
                  is accepted. Work. Earn. Repeat.
                </p>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom statement */}
        <div className="relative z-10 max-w-3xl mx-auto mt-14 text-center">

          <div className="
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
          ">

            <span className="text-sm text-gray-400">
              🔐 Secure
            </span>

            <span className="text-sm text-gray-400">
              🌐 Web3 Powered
            </span>

            <span className="text-sm text-gray-400">
              ⚡ Fast Payments
            </span>

            <span className="text-sm text-gray-400">
              👥 Community Driven
            </span>

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Total Bounties */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/30 hover:bg-white/[0.05]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF1AC6]/10 text-xl">
                    🎯
                  </div>

                  <span className="text-xs font-medium text-gray-500">
                    BOUNTIES
                  </span>
                </div>

                <div className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {stats.totalBounties}
                  <span className="text-[#FF1AC6]">+</span>
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  Total Bounties
                </p>

                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-2/3 rounded-full bg-[#FF1AC6]" />
                </div>
              </div>

              {/* Rewards */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/30 hover:bg-white/[0.05]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF1AC6]/10 text-xl">
                    💰
                  </div>

                  <span className="text-xs font-medium text-gray-500">
                    REWARDS
                  </span>
                </div>

                <div className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  $
                  {stats.totalRewards.toLocaleString()}
                  <span className="text-[#FF1AC6]">+</span>
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  Rewards Distributed
                </p>

                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-3/4 rounded-full bg-[#FF1AC6]" />
                </div>
              </div>

              {/* Users */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1AC6]/30 hover:bg-white/[0.05]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF1AC6]/10 text-xl">
                    👥
                  </div>

                  <span className="text-xs font-medium text-gray-500">
                    COMMUNITY
                  </span>
                </div>

                <div className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {stats.totalUsers}
                  <span className="text-[#FF1AC6]">+</span>
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  Active Users
                </p>

                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-1/2 rounded-full bg-[#FF1AC6]" />
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
        className="opacity-0 translate-y-10 transition-all duration-700 mx-6 md:mx-10 lg:mx-16 my-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          💬 What Our Users Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Testimonial 1 – placeholder image */}
          <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-6 hover:border-[#FF1AC6]/30 transition">

            <div className="flex items-center gap-4 mb-4">

              {/* Placeholder for avatar image */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF1AC6]/30 to-[#FF1AC6]/10 flex items-center justify-center text-xl">
                🧑
              </div>

              <div>
                <p className="font-semibold">Alex Thompson</p>

                <p className="text-xs text-gray-400">
                  Smart Contract Developer
                </p>
              </div>

            </div>

            <p className="text-gray-300 italic">
              “Posted a Solidity audit bounty and received 3 high-quality
              submissions within 24 hours. The escrow system made everything
              trustless. Highly recommended!”
            </p>

            <div className="mt-3 text-[#FF1AC6] text-sm">
              ★★★★★
            </div>

          </div>


          {/* Testimonial 2 */}
          <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-6 hover:border-[#FF1AC6]/30 transition">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF1AC6]/30 to-[#FF1AC6]/10 flex items-center justify-center text-xl">
                👩‍💻
              </div>

              <div>
                <p className="font-semibold">Maria Gonzales</p>

                <p className="text-xs text-gray-400">
                  Freelance Web3 Designer
                </p>
              </div>

            </div>

            <p className="text-gray-300 italic">
              “Earned 500 INJ by designing a DeFi dashboard. The process was
              smooth and the payout was instant. I love the multi-chain
              support!”
            </p>

            <div className="mt-3 text-[#FF1AC6] text-sm">
              ★★★★★
            </div>

          </div>

        </div>
      </section>


      {/* SUPPORTED NETWORKS & TOKENS */}
      <section className="px-6 md:px-10 lg:px-16 my-16">

        <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-8">

          <h2 className="text-3xl font-bold text-center mb-8">
            Supported Networks & Tokens
          </h2>

          <div className="flex flex-wrap justify-center gap-14 items-center">

            {/* Injective */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={injecoin} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">Injective</span>
            </div>


            {/* Ethereum */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img className="w-12 spin-slow" src={eth2} alt="" />
              </div>
              <span className="text-sm">Ethereum</span>
            </div>


            {/* BNB */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={bnb1} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">BNB Chain</span>
            </div>


            {/* Base */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={base} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">Base</span>
            </div>


            {/* INJ */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={injecoin} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">INJ / wINJ</span>
            </div>


            {/* USDC */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={usdc1} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">USDT</span>
            </div>


            {/* USDT */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={usdt} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">USDT</span>
            </div>


            {/* Canton */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={canton} alt="" className="w-12 spin-slow" />
              </div>
              <span className="text-sm">Canton</span>
            </div>

            <style>
              {`
                @keyframes spinSlow {
                  to {
                    transform: rotate(360deg);
                  }
                }

                .spin-slow {
                  animation: spinSlow 3s linear infinite;
                }
              `}
            </style>

          </div>
        </div>
      </section>


      {/* FINAL CALL TO ACTION */}
      <section className="mx-6 md:mx-10 lg:mx-16 my-16">

        <div className="relative bg-gradient-to-r from-[#FF1AC6]/20 to-[#FF1AC6]/5 rounded-2xl border border-[#FF1AC6]/30 p-12 text-center overflow-hidden">

          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5"></div>

          <div className="relative z-10">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start earning?
            </h2>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of users already earning crypto by completing
              bounties or posting tasks.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">

              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#FF1AC6]/25 transition"
              >
                Explore Bounties
              </Link>

              <Link
                to="/create"
                className="border border-white/30 px-8 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Create a Bounty
              </Link>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;