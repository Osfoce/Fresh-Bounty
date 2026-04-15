// BountyDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BountyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bounty, setBounty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const API_URL = "http://localhost:5000";
  //   process.env.REACT_APP_API_URL ||

  // Get user wallet
  const getUserWallet = () => {
    const wallet = localStorage.getItem("walletAddress");
    if (!wallet) {
      toast.error("Please connect your wallet first");
      return null;
    }
    return wallet;
  };

  // Fetch bounty details
  useEffect(() => {
    const fetchBounty = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/task/${id}`);
        setBounty(response.data);

        // Check if user is already enrolled
        const wallet = getUserWallet();
        if (wallet) {
          const enrollmentsRes = await axios.get(
            `${API_URL}/api/enrollments/user/${wallet}`,
          );
          const isUserEnrolled = enrollmentsRes.data.enrollments.some(
            (enrollment) => enrollment.bountyId === id,
          );
          setIsEnrolled(isUserEnrolled);
        }
      } catch (error) {
        console.error("Error fetching bounty:", error);
        toast.error("Failed to load bounty details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBounty();
  }, [id, navigate]);

  const handleEnroll = async () => {
    const userWallet = getUserWallet();
    if (!userWallet) return;

    setIsEnrolling(true);
    const loadingToast = toast.loading("Enrolling in bounty...");

    try {
      const response = await axios.post(`${API_URL}/api/enroll`, {
        bountyId: id,
        user: userWallet,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully enrolled in bounty!", {
          id: loadingToast,
          duration: 3000,
        });
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      if (error.response?.status === 400) {
        toast.error("You are already enrolled in this bounty", {
          id: loadingToast,
          duration: 3000,
        });
      } else {
        toast.error("Failed to enroll. Please try again.", {
          id: loadingToast,
          duration: 3000,
        });
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!bounty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white">Bounty not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{bounty.title}</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="bg-gradient-to-r from-[#FF1AC6]/20 to-[#FF1AC6]/5 rounded-xl px-4 py-2 border border-[#FF1AC6]/30">
            <span className="text-white/60 text-sm">Reward</span>
            <p className="text-white font-bold text-2xl">
              {bounty.reward} {bounty.token || "INJ"}
            </p>
          </div>

          {bounty.status === "active" && !isEnrolled && (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-semibold hover:shadow-lg hover:shadow-[#FF1AC6]/25 transition-all duration-200 disabled:opacity-50"
            >
              {isEnrolling ? "Enrolling..." : "Start Task"}
            </button>
          )}

          {isEnrolled && (
            <div className="px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-semibold">
              ✓ Enrolled
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-white/60 text-sm mb-2">Description</h3>
            <p className="text-white">{bounty.description}</p>
          </div>

          <div>
            <h3 className="text-white/60 text-sm mb-2">Category</h3>
            <p className="text-white">{bounty.category || "Uncategorized"}</p>
          </div>

          {bounty.tags && bounty.tags.length > 0 && (
            <div>
              <h3 className="text-white/60 text-sm mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {bounty.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white/60 text-sm mb-2">Start Date</h3>
              <p className="text-white">
                {new Date(bounty.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-white/60 text-sm mb-2">Deadline</h3>
              <p className="text-white">
                {new Date(bounty.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white/60 text-sm mb-2">Creator</h3>
            <p className="text-white font-mono text-sm">{bounty.creator}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyDetail;
