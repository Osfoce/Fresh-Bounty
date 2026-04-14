import { useState } from "react";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import { Link } from "react-router-dom";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState({
    completed: 0,
    inProgress: 0,
    earnings: 0,
  });
  console.log("Welcome to your dashboard!");

  return (
    // FIX 1: Changed from container to full width with flex column
    // FIX 2: Added min-h-screen to ensure full height
    // FIX 3: Added bg-black to match landing page theme
    <div className="bg-black text-white min-h-screen flex flex-col py-[5em]">
      {/* FIX 4: NavBar now sits at top naturally */}
      <NavBar />

      {/* FIX 5: Added main wrapper with flex-grow to push footer later if needed */}
      {/* FIX 6: Changed container to responsive padding */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          {/* FIX 7: Changed border color to white/30 for consistency */}
          {/* FIX 8: Added responsive margins and padding */}
          <div className="bg-[#2D2D2D] rounded-lg shadow-lg overflow-hidden">
            {/* FIX 9: Improved text sizing and spacing */}
            <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4">
              <h3 className="text-white text-sm sm:text-base">
                Your Earnings on Happy Bounty
              </h3>

              {/* FIX 10: Better responsive font sizing for earnings */}
              <h4 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
                ${Math.floor(stats.earnings)}.
                <span className="text-gray-400 text-xl sm:text-2xl md:text-3xl">
                  {(stats.earnings % 1).toFixed(2).split(".")[1] || "00"}
                </span>
              </h4>
            </div>

            {/* FIX 11: Improved grid with better responsive breakpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 md:px-8 pb-6">
              {/* FIX 12: Card 1 - Fixed height and centering issues */}
              <div className="bg-[#2D2D2D] border border-white/30 rounded-lg p-4 hover:border-white/60 transition">
                <p className="text-white text-center text-xs sm:text-sm">
                  Completed bounty or tasks
                </p>
                <h5 className="text-white text-2xl sm:text-3xl font-bold text-center mt-2">
                  {stats.completed}
                </h5>
              </div>

              {/* FIX 13: Card 2 - Same improvements */}
              <div className="bg-[#2D2D2D] border border-white/30 rounded-lg p-4 hover:border-white/60 transition">
                <p className="text-white text-center text-xs sm:text-sm">
                  Task in progress
                </p>
                <h5 className="text-white text-2xl sm:text-3xl font-bold text-center mt-2">
                  {stats.inProgress}
                </h5>
              </div>

              {/* FIX 14: Card 3 - Same improvements */}
              <div className="bg-[#2D2D2D] border border-white/30 rounded-lg p-4 hover:border-white/60 transition">
                <p className="text-white text-center text-xs sm:text-sm">
                  Competence score
                </p>
                <h5 className="text-white text-2xl sm:text-3xl font-bold text-center mt-2">
                  0
                </h5>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-2 mb-6 m-4">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center gap-2 border border-white/70 rounded-lg px-4 py-1 text-white ${filter === "all" ? "bg-[#FF1AC69E]" : "bg-gray-800"}`}
        >
          All Tasks
          <span className="border border-white/70 rounded-lg px-2 text-xs">
            {pagination?.total || 0}
          </span>
        </button>
        <Link
          to="/create"
          className="flex items-center border border-white/70 rounded-lg px-4 py-1 text-white bg-gray-800 hover:bg-[#FF1AC69E]"
        >
          Create task
        </Link>
      </div>

      {/* Bounties Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <Footer />
    </div>
  );
}

export default Dashboard;
