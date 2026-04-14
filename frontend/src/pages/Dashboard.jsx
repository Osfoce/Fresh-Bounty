import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import BountyCard from "../components/Bounty/BountyCard";
import { Link } from "react-router-dom";
import Pagination from "../components/Common/Pagination";
import { useEffect } from "react";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [bounties, setBounties] = useState([]);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState({
    completed: 0,
    inProgress: 0,
    earnings: 0,
  });
  console.log("Welcome to your dashboard!");

  const bounty = "https://fresh-bounty.onrender.com/bounty";
  // const fetchBounties = async () => {
  //   const res = await axios.get(bounties);
  //   console.log(res.data);
  // };

  const loadBounties = async () => {
    setLoading(true);
    try {
      // const filters = { page: currentPage, limit: 6 };
      // if (filter !== "all") filters.status = filter;

      const response = await axios.get(bounty);
      setBounties(response.data);
      // setPagination(response.pagination);
    } catch (error) {
      console.error("Error loading bounties:", error);
      toast.error("Couldn't fetch bounty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBounties();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow py-[2em]">
        {/* SINGLE LAYOUT CONTAINER */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-6">
          {/* DASHBOARD HEADER CARD */}
          <div className="bg-[#2D2D2D] rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4">
              <h3 className="text-white text-sm sm:text-base">
                Your Earnings on Happy Bounty
              </h3>

              <h4 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
                ${Math.floor(stats.earnings)}.
                <span className="text-gray-400 text-xl sm:text-2xl md:text-3xl">
                  {(stats.earnings % 1).toFixed(2).split(".")[1] || "00"}
                </span>
              </h4>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 md:px-8 pb-6">
              <div className="bg-[#2D2D2D] border border-white/20 rounded-lg p-4 hover:border-white/50 transition">
                <p className="text-white text-center text-xs sm:text-sm">
                  Completed bounty or tasks
                </p>
                <h5 className="text-white text-2xl sm:text-3xl font-bold text-center mt-2">
                  {stats.completed}
                </h5>
              </div>

              <div className="bg-[#2D2D2D] border border-white/20 rounded-lg p-4 hover:border-white/50 transition">
                <p className="text-white text-center text-xs sm:text-sm">
                  Task in progress
                </p>
                <h5 className="text-white text-2xl sm:text-3xl font-bold text-center mt-2">
                  {stats.inProgress}
                </h5>
              </div>

              <div className="bg-[#2D2D2D] border border-white/20 rounded-lg p-4 hover:border-white/50 transition">
                <p className="text-white text-center text-xs sm:text-sm">
                  Competence score
                </p>
                <h5 className="text-white text-2xl sm:text-3xl font-bold text-center mt-2">
                  0
                </h5>
              </div>
            </div>
          </div>

          {/* FILTER SECTION (NOW PROPERLY ALIGNED) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-2 border border-white/70 rounded-lg px-4 py-1 text-white ${
                filter === "all" ? "bg-[#FF1AC69E]" : "bg-gray-800"
              }`}
            >
              All Tasks
              <span className="border border-white/70 rounded-lg px-2 text-xs">
                {pagination?.total || 0}
              </span>
            </button>

            <Link
              to="/create"
              className="flex items-center border border-white/70 rounded-lg px-4 py-1 text-white bg-gray-800 hover:bg-[#FF1AC69E] transition"
            >
              Create task
            </Link>
          </div>

          {/* BOUNTIES SECTION */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {bounties.map((bounty) => (
                  <BountyCard key={bounty._id} bounty={bounty} />
                ))}
              </div>

              {pagination && pagination.pages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.pages}
                  onPageChange={setCurrentPage}
                />
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
