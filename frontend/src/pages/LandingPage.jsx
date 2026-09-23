import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNav } from "../hooks/useNav";
import axios from "axios";
import {
  FiZap,
  FiShield,
  FiCheck,
  FiUsers,
  FiArrowRight,
  FiGlobe,
  FiActivity,
  FiBriefcase,
} from "react-icons/fi";

import NavBar from "../components/Layout/NavBar";
import hero from "../assets/images/hero.jpg";
import LiveTricker from "../components/Layout/LiveTricker";
import BountyCard from "../components/Bounty/BountyCard";
import Hero from "./Hero";
import HowItWorks from "./Howitwork";
import PlatformStats from "./PlatformStats";
import Features from "./Features";
import Testimonials from "./Testimonials";
import SupportedNetworks from "./SupportedNetworks";
import CallToAction from "./CallToAction";
import BuiltForWeb3 from "./BuiltForWeb3";
import Footer from "../components/Layout/Footer";

function LandingPage() {
  const [featuredBounties, setFeaturedBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleNavigate } = useNav();

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

  const API_URL = import.meta.env.VITE_API_URL;

  // HERO TEXT ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroText((prev) => (prev + 1) % heroMessages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Fetch featured bounties and stats
  // BACKEND / API LOGIC — UNCHANGED
  useEffect(() => {
    const fetchFeaturedBounties = async () => {
      try {
        const response = await axios.get(`${API_URL}/bounty/bounties`, {
          params: { status: "active", limit: 3, page: 0 },
        });

        setFeaturedBounties(response.data.bounties || []);
      } catch (err) {
        console.error("Error fetching featured bounties:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        // Example: get total bounties count
        const allBounties = await axios.get(`${API_URL}/bounty/bounties`, {
          params: { limit: 1 },
        });

        const totalBounties = allBounties.data.pagination?.total || 0;

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
      {
        threshold: 0.3,
      },
    );

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);
    if (statsRef.current) observer.observe(statsRef.current);

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden bg-[#f6f5ef] text-[#111111]">
      {/* =========================================
          NAVIGATION
      ========================================== */}
      <div className="relative z-50 mt-5 w-full py-6">
        <NavBar />
      </div>
      <LiveTricker />
      {/* =========================================
          HERO SECTION
      ========================================== */}
      <div
        className="relative z-10 mx-4 my-2 mt-5 overflow-hidden rounded-xl md:mx-8 lg:mx-14"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Light overlay instead of dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[#f6f5ef]/80" />

        {/* Soft gold atmosphere */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[110px]" />

        {/* Purple Glow */}
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* HERO CONTENT */}
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      {/* =========================================
          HOW IT WORKS
      ========================================== */}
      <div>
        <HowItWorks />
      </div>

      {/* =========================================
          PLATFORM STATS
      ========================================== */}
      <div>
        <PlatformStats />
      </div>

      {/* =========================================
          FEATURED BOUNTIES
      ========================================== */}
      <section className="relative z-10 my-14 overflow-hidden px-6 md:px-10 lg:px-16">
        {/* Soft gold background glow */}
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/8 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-[#B28B20]/6 blur-[120px]" />

        {/* HEADER */}
        <div className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            {/* SECTION LABEL */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#B28B20]">
                <FiZap className="h-4 w-4" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B28B20]">
                Botchain Opportunities
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-bold tracking-tight text-[#171717] md:text-4xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#B28B20] to-[#8f6f16] bg-clip-text text-transparent">
                Bounties
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-2 max-w-xl text-sm text-[#737373]">
              Discover active opportunities, complete meaningful work, and earn
              rewards through Botchain.
            </p>
          </div>

          {/* VIEW ALL */}
          <Link
            to="/dashboard"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("/dashboard");
            }}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-gray-300 transition-all duration-300 hover:border-[#FF1AC6]/30 hover:bg-[#FF1AC6]/5 hover:text-[#FF1AC6]"
          >
            <span>View all bounties</span>

            <FiArrowRight className="h-4 w-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* =========================================
            LOADING
        ========================================== */}
        {loading ? (
          <div className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[280px] animate-pulse rounded-2xl border border-black/[0.06] bg-white/70 p-5"
              >
                <div className="mb-6 flex justify-between">
                  <div className="h-10 w-10 rounded-xl bg-black/[0.06]" />

                  <div className="h-6 w-20 rounded-full bg-black/[0.06]" />
                </div>

                <div className="mb-3 h-5 w-3/4 rounded bg-black/[0.06]" />

                <div className="mb-2 h-3 w-full rounded bg-black/[0.04]" />

                <div className="mb-6 h-3 w-5/6 rounded bg-black/[0.04]" />

                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-lg bg-black/[0.05]" />

                  <div className="h-7 w-20 rounded-lg bg-black/[0.05]" />
                </div>

                <div className="mt-8 h-9 w-full rounded-xl bg-black/[0.05]" />
              </div>
            ))}
          </div>
        ) : featuredBounties.length === 0 ? (
          /* =========================================
              EMPTY STATE
          ========================================== */
          <div className="relative z-10 overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 bg-[#D4AF37]/8 blur-[80px]" />

            <div className="relative flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-[#f6f5ef] text-[#888]">
                <FiBriefcase className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-semibold text-[#171717]">
                No active bounties
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                There are no featured opportunities available right now. New
                bounties will appear here as soon as they are posted.
              </p>

              <Link
                to="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/dashboard");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF1AC6] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e916b1] hover:shadow-lg hover:shadow-[#FF1AC6]/20"
              >
                Browse bounties
                <FiArrowRight className="h-4 w-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        ) : (
          /* =========================================
              FEATURED BOUNTIES
          ========================================== */
          <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredBounties.map((bounty) => (
              <div
                key={bounty._id}
                className="group relative transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gold hover glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#B28B20]/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-[#D4AF37]/10 group-hover:via-[#B28B20]/5 group-hover:to-[#D4AF37]/10 group-hover:opacity-100" />

                <div className="relative">
                  {/* BountyCard untouched */}
                  <BountyCard bounty={bounty} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================
          WHY FRESH BOUNTY
      ========================================== */}
      <div>
        <Features />
      </div>

      {/* =========================================
          TESTIMONIALS
      ========================================== */}
      <div>
        <Testimonials />
      </div>

      {/* =========================================
          SUPPORTED NETWORKS & TOKENS
      ========================================== */}
      <div>
        <SupportedNetworks />
      </div>

      <div>
        <BuiltForWeb3 />
      </div>

      {/* =========================================
          FINAL CTA
      ========================================== */}
      <div>
        <CallToAction />
      </div>

      {/* =========================================
          FOOTER
      ========================================== */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
