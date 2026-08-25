import { useState } from "react";
import {
  FiDollarSign,
  FiCheckCircle,
  FiActivity,
} from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import BountyCard from "../components/Bounty/BountyCard";
import { Link } from "react-router-dom";
// import Pagination from "../components/Common/Pagination";
import { useEffect } from "react";
import { useAccount } from "wagmi";

function Dashboard() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [bounties, setBounties] = useState([]);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [stats, setStats] = useState({
    completed: 0,
    inProgress: 0,
    earnings: 0,
  });

  console.log(`Welcome to your dashboard with user ${address}`);

  const bountyApi = "https://fresh-bounty.onrender.com/api/task";
  const userInfoApi = `https://fresh-bounty.onrender.com/api/dashboard/${address}`;

  const loadBounties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(bountyApi, {
        params: {
          page: currentPage,
          limit: 6,
          status: filter !== "all" ? filter : undefined,
        },
      });
      setBounties(response.data.bounties || []);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error("Error loading bounties:", err);
      toast.error("Couldn't fetch bounties");
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const { data } = await axios.get(userInfoApi);
      setStats({
        completed: data.submissions?.accepted || 0,
        inProgress: data.submissions?.pending || 0,
        earnings: data.user?.totalEarnings || 0,
      });
    } catch (err) {
      console.error("Error loading userInfo:", err);
      toast.error("Couldn't fetch user info");
    }
  };

  useEffect(() => {
    loadBounties();
    if (isConnected && address) {
      loadDashboardStats();
    }
  }, [address, isConnected, currentPage, filter]);

  // Helper to format earnings with two decimals
  const formatEarnings = (value) => {
    const num = Number(value);
    const dollars = Math.floor(num);
    const cents = (num % 1).toFixed(2).split(".")[1] || "00";
    return { dollars, cents };
  };

  const { dollars, cents } = formatEarnings(stats.earnings);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome Section */}
<div className="mb-8 relative">
  {/* Small accent line */}
  <div className="flex items-center gap-2 mb-3">
    <span className="h-1.5 w-1.5 rounded-full bg-[#FF1AC6] shadow-[0_0_8px_rgba(255,26,198,0.7)]" />
    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF1AC6]/80">
      Overview
    </span>
  </div>

  <h1
    className="
      text-3xl md:text-4xl
      font-bold
      tracking-tight
      text-white
    "
  >
    Dashboard
    <span className="text-[#FF1AC6]">.</span>
  </h1>

  <p className="mt-2 max-w-xl text-sm md:text-[15px] leading-6 text-white/45">
    Manage your bounties, monitor activity, and keep track of your progress.
  </p>

  {/* Subtle bottom accent */}
  <div className="mt-5 h-px w-full bg-gradient-to-r from-[#FF1AC6]/30 via-white/[0.06] to-transparent" />
</div>


         {/* Stats Grid - Professional Cards */}
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">

  {/* Earnings Card */}
  <div
    className="
      group relative overflow-hidden
      rounded-2xl
      border border-white/[0.08]
      bg-gradient-to-br from-[#2D2D2D] to-[#242424]
      transition-all duration-300
      hover:-translate-y-1
      hover:border-[#FF1AC6]/40
      hover:shadow-[0_15px_40px_rgba(255,26,198,0.08)]
    "
  >
    {/* Hover Glow */}
    <div
      className="
        pointer-events-none absolute
        -right-20 -top-20
        h-40 w-40
        rounded-full
        bg-[#FF1AC6]/10
        blur-3xl
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
      "
    />

    <div className="relative p-6">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            border border-[#FF1AC6]/20
            bg-[#FF1AC6]/10
            text-[#FF1AC6]
            transition-all duration-300
            group-hover:bg-[#FF1AC6]/15
            group-hover:shadow-[0_0_20px_rgba(255,26,198,0.12)]
          "
        >
          <FiDollarSign className="text-xl" />
        </div>

        <span
          className="
            rounded-full
            border border-emerald-500/20
            bg-emerald-500/10
            px-2.5 py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-emerald-400
          "
        >
          Lifetime
        </span>
      </div>

      {/* Label */}
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-white/35">
        Total Earnings
      </p>

      {/* Amount */}
      <p className="text-3xl font-bold tracking-tight text-white">
        ${dollars}
        <span className="text-xl font-semibold text-white/40">
          .{cents}
        </span>
      </p>

      {/* Progress */}
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="
            h-full w-3/4 rounded-full
            bg-gradient-to-r
            from-[#FF1AC6]
            to-[#FF1AC6]/40
            transition-all duration-500
            group-hover:w-[82%]
          "
        />
      </div>

    </div>
  </div>


  {/* Completed Tasks Card */}
  <div
    className="
      group relative overflow-hidden
      rounded-2xl
      border border-white/[0.08]
      bg-gradient-to-br from-[#2D2D2D] to-[#242424]
      transition-all duration-300
      hover:-translate-y-1
      hover:border-emerald-500/40
      hover:shadow-[0_15px_40px_rgba(16,185,129,0.08)]
    "
  >
    {/* Hover Glow */}
    <div
      className="
        pointer-events-none absolute
        -right-20 -top-20
        h-40 w-40
        rounded-full
        bg-emerald-500/10
        blur-3xl
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
      "
    />

    <div className="relative p-6">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            border border-emerald-500/20
            bg-emerald-500/10
            text-emerald-400
            transition-all duration-300
            group-hover:bg-emerald-500/15
            group-hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]
          "
        >
          <FiCheckCircle className="text-xl" />
        </div>

        <span
          className="
            rounded-full
            border border-emerald-500/20
            bg-emerald-500/10
            px-2.5 py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-emerald-400
          "
        >
          Achieved
        </span>
      </div>

      {/* Label */}
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-white/35">
        Completed Tasks
      </p>

      {/* Number */}
      <p className="text-3xl font-bold tracking-tight text-white">
        {stats.completed}
      </p>

      {/* Progress */}
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="
            h-full w-2/3 rounded-full
            bg-gradient-to-r
            from-emerald-500
            to-emerald-500/40
            transition-all duration-500
            group-hover:w-3/4
          "
        />
      </div>

    </div>
  </div>


  {/* In Progress Card */}
  <div
    className="
      group relative overflow-hidden
      rounded-2xl
      border border-white/[0.08]
      bg-gradient-to-br from-[#2D2D2D] to-[#242424]
      transition-all duration-300
      hover:-translate-y-1
      hover:border-amber-500/40
      hover:shadow-[0_15px_40px_rgba(245,158,11,0.08)]
    "
  >
    {/* Hover Glow */}
    <div
      className="
        pointer-events-none absolute
        -right-20 -top-20
        h-40 w-40
        rounded-full
        bg-amber-500/10
        blur-3xl
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
      "
    />

    <div className="relative p-6">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            border border-amber-500/20
            bg-amber-500/10
            text-amber-400
            transition-all duration-300
            group-hover:bg-amber-500/15
            group-hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]
          "
        >
          <FiActivity className="text-xl" />
        </div>

        <span
          className="
            rounded-full
            border border-amber-500/20
            bg-amber-500/10
            px-2.5 py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-amber-400
          "
        >
          Active
        </span>
      </div>

      {/* Label */}
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-white/35">
        In Progress
      </p>

      {/* Number */}
      <p className="text-3xl font-bold tracking-tight text-white">
        {stats.inProgress}
      </p>

      {/* Progress */}
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="
            h-full w-1/2 rounded-full
            bg-gradient-to-r
            from-amber-500
            to-amber-500/40
            transition-all duration-500
            group-hover:w-3/5
          "
        />
      </div>

    </div>
  </div>

</div>

          {/* Filters and Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {["all", "active", "completed", "upcoming"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    setCurrentPage(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    filter === status
                      ? "bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white shadow-lg shadow-[#FF1AC6]/25"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status === "all" && pagination && (
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                      {pagination.total}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <Link
              to="/create"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#FF1AC6]/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>+</span>
              Create New Bounty
            </Link>
          </div>

          {/* Bounties Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF1AC6] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              </div>
            </div>
          ) : bounties.length === 0 ? (
            <div className="text-center py-32 bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No bounties found
              </h3>
              <p className="text-white/50">
                Try adjusting your filters or create a new bounty
              </p>
              <Link
                to="/create"
                className="inline-block mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white text-sm font-medium hover:shadow-lg transition"
              >
                Create Bounty →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {bounties.map((bounty) => (
                  <BountyCard key={bounty._id} bounty={bounty} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="mt-10 flex justify-center">
                  <div className="flex gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentPage === 0}
                      className="px-4 py-2 rounded-lg text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      ← Prev
                    </button>
                    <span className="px-4 py-2 text-white font-medium">
                      Page {currentPage + 1} of {pagination.pages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(pagination.pages - 1, prev + 1),
                        )
                      }
                      disabled={currentPage + 1 >= pagination.pages}
                      className="px-4 py-2 rounded-lg text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
