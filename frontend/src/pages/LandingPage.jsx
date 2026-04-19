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
// import CoinSpinner from "../components/Layout/crypto";


function LandingPage() {
  const [featuredBounties, setFeaturedBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBounties: 0,
    totalRewards: 0,
    totalUsers: 0,
  });

  // Refs for scroll animations
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const API_URL = "https://fresh-bounty.onrender.com/api";

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
          totalRewards: 124500, // dummy
          totalUsers: 845, // dummy
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
        className="relative rounded-lg mx-6 my-2 md:mx-10 lg:mx-16 py-6 bg-cover bg-center mt-6"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid white",
        }}
      >
        <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-12 max-w-[650px]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Make a <br /> living from <br /> Web3
          </h1>
          <p className="mt-4 text-base text-gray-200">
            Complete quests and earn cryptocurrency, tokens, and digital
            rewards. Post bounties and get quality work done – fully on‑chain.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#FF1AC6]/25 transition"
            >
              Explore Bounties
            </Link>
            <Link
              to="/create"
              className="border border-white/30 px-6 py-2 rounded-xl hover:bg-white/10 transition"
            >
              Create a Bounty
            </Link>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS – Animated Cards */}
      <section className="mx-auto text-white px-6 md:px-10 lg:px-16 my-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-[#FF1AC6] bg-clip-text text-transparent">
          ⚡ How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div
            ref={card1Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 group"
          >
            <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] p-6 rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 h-full">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
              <p className="text-gray-400">
                Sign in with MetaMask, WalletConnect, or any Web3 wallet.
              </p>
            </div>
          </div>
          <div
            ref={card2Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-100 group"
          >
            <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] p-6 rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 h-full">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Choose Role</h3>
              <p className="text-gray-400">
                Work on bounties or post your own task with a reward.
              </p>
            </div>
          </div>
          <div
            ref={card3Ref}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-200 group"
          >
            <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] p-6 rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 h-full">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Earn Crypto</h3>
              <p className="text-gray-400">
                Get paid instantly when your solution is accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATS SECTION */}
      <section
        ref={statsRef}
        className="opacity-0 translate-y-10 transition-all duration-700 mx-6 md:mx-10 lg:mx-16 my-16"
      >
        <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            📊 Platform Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#FF1AC6]">
                {stats.totalBounties}+
              </div>
              <div className="text-gray-400">Total Bounties</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#FF1AC6]">
                ${stats.totalRewards.toLocaleString()}+
              </div>
              <div className="text-gray-400">Rewards Distributed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#FF1AC6]">
                {stats.totalUsers}+
              </div>
              <div className="text-gray-400">Active Users</div>
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
              “Posted a Solidity audit bounty and received 3 high‑quality
              submissions within 24 hours. The escrow system made everything
              trustless. Highly recommended!”
            </p>
            <div className="mt-3 text-[#FF1AC6] text-sm">★★★★★</div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-6 hover:border-[#FF1AC6]/30 transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF1AC6]/30 to-[#FF1AC6]/10 flex items-center justify-center text-xl">
                👩‍💻
              </div>
              <div>
                <p className="font-semibold">Maria Gonzales</p>
                <p className="text-xs text-gray-400">Freelance Web3 Designer</p>
              </div>
            </div>
            <p className="text-gray-300 italic">
              “Earned 500 INJ by designing a DeFi dashboard. The process was
              smooth and the payout was instant. I love the multi‑chain
              support!”
            </p>
            <div className="mt-3 text-[#FF1AC6] text-sm">★★★★★</div>
          </div>
        </div>
        {/* Placeholder for more testimonials – can be a carousel later */}
      </section>

      {/* SUPPORTED NETWORKS & TOKENS */}
      <section className="px-6 md:px-10 lg:px-16 my-16">
        <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Supported Networks & Tokens
          </h2>

          <div className="flex flex-wrap justify-center gap-14 items-center">
            {/* Placeholder images for chains – replace with actual logo URLs */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={injecoin} alt="" />
              </div>
              <span className="text-sm">Injective</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
               <img className="w-12" src={eth2} alt="" />
              </div>
              <span className="text-sm">Ethereum</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={bnb1} alt="" />
              </div>
              <span className="text-sm">BNB Chain</span>
            </div>


            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                <img src={base} alt="" />
              </div>
              <span className="text-sm">Base</span>
            </div>

            {/* Tokens */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full  flex items-center justify-center text-2xl">
                <img src={injecoin} alt="" />
              </div>
              <span className="text-sm">INJ / wINJ</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full  flex items-center justify-center text-2xl">
                <img src={usdc1} alt="" />
              </div>
              <span className="text-sm">USDC / USDT</span>
            </div>
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
