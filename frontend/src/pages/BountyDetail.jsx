// BountyDetail.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import { BOUNTY_ABI, CONTRACT_ADDRESSES } from "contract";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useBounty } from "../hooks/useBounty";

const BountyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const currentChainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Use our custom hook
  const {
    claimReward,
    assignSingleWinner,
    assignMultipleWinners,
    useClaimableReward,
    useClaimedStatus,
    isPending: isContractPending,
    isConfirming: isContractConfirming,
  } = useBounty();

  // State
  const [bounty, setBounty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [hasUserSubmitted, setHasUserSubmitted] = useState(false);
  const [userSubmission, setUserSubmission] = useState(null);
  const [winnersData, setWinnersData] = useState(null);
  const [offChainClaimable, setOffChainClaimable] = useState(0);
  const [hasUserClaimedOffChain, setHasUserClaimedOffChain] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // // Write contract hook
  // const {
  //   writeContract,
  //   data: txHash,
  //   isPending: isTxPending,
  // } = useWriteContract();
  // const { isLoading: isTxConfirming, isSuccess: isTxSuccess } =
  //   useWaitForTransactionReceipt({
  //     hash: txHash,
  //   });

  // // const { claimable, claim } = useBounty(bounty.blockchainId);

  // Modal states
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [distributing, setDistributing] = useState(false);

  // Form states
  const [submissionImage, setSubmissionImage] = useState(null);
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSizeWarning, setImageSizeWarning] = useState("");

  // Winners distribution
  const [winnerAddresses, setWinnerAddresses] = useState([]);

  const API_URL = "https://fresh-bounty.onrender.com";
  // process.env.REACT_APP_API_URL ||
  const fileInputRef = useRef(null);

  // --- On‑chain read hooks (only if blockchainId exists) ---
  // const blockchainId = bounty?.blockchainId
  //   ? Number(bounty.blockchainId)
  //   : null;
  const blockchainId =
    bounty?.blockchainId !== null && bounty?.blockchainId !== undefined
      ? Number(bounty.blockchainId)
      : null;

  console.log(`Using blockchainId: ${blockchainId} for on-chain data fetching`);

  const { data: onChainClaimable, refetch: refetchClaimable } =
    useClaimableReward(blockchainId, address);

  const { data: onChainClaimed } = useClaimedStatus(blockchainId, address);

  useEffect(() => {
    if (blockchainId && address) {
      refetchClaimable();
    }
  }, [blockchainId, address]);

  // // Get contract address for current chain
  // const getContractAddress = () => {
  //   if (!chain) return null;
  //   const chainName = chain.network || chain.name?.toLowerCase();
  //   if (chainName?.includes("injective"))
  //     return CONTRACT_ADDRESSES.injectiveTestnet.bounty;
  //   // Add other chain mappings as needed
  //   return null;
  // };

  // Get user wallet
  const getUserWallet = () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return null;
    }
    return address;
  };

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const compressImage = (file, maxWidth = 1024, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            file.type,
            quality,
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // --- Backend API calls (enrollment, submission, winners, comments) ---
  const checkUserEnrollment = async (wallet, bountyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/enrollments/user/${wallet}`,
      );
      const enrollments = response.data.enrollments || [];
      return enrollments.some((e) => e.bountyId === bountyId);
    } catch (error) {
      console.error("Error checking enrollment:", error);
      return false;
    }
  };

  // Check user submission
  const checkUserSubmission = async (wallet, bountyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/submissions/user/${wallet}`,
      );
      const submissions = response.data.submissions || [];
      const existing = submissions.find(
        (sub) => sub.bountyId === bountyId && sub.isSubmitted === true,
      );
      if (existing) {
        setHasUserSubmitted(true);
        setUserSubmission(existing);
      }
    } catch (error) {
      console.error("Error checking submission:", error);
    }
  };

  // Load winners data
  const loadWinnersData = async (bountyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/task/${bountyId}/winners`,
      );
      setWinnersData(response.data);

      // Check claimable amount for current user
      if (address && response.data.isDistributed) {
        const claimableRes = await axios.get(
          `${API_URL}/api/task/${bountyId}/claimable/${address}`,
        );
        setOffChainClaimable(claimableRes.data.claimable || 0);

        const claimedRes = await axios.get(
          `${API_URL}/api/task/${bountyId}/has-claimed/${address}`,
        );
        setHasUserClaimedOffChain(claimedRes.data.hasClaimed);
      }
    } catch (error) {
      console.error("Error loading winners:", error);
    }
  };

  // Load comments
  const loadComments = async (bountyId) => {
    try {
      const stored = localStorage.getItem(`comments_${bountyId}`);
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  // Save comment
  const saveComment = async (bountyId, comment) => {
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`comments_${bountyId}`, JSON.stringify(updated));
  };

  // Fetch bounty details
  useEffect(() => {
    const fetchBounty = async () => {
      console.log(`Fetching bounty details for id: ${id}`);
      if (!id) return;

      try {
        const response = await axios.get(`${API_URL}/api/task/${id}`);
        const bountyData = response.data;
        setBounty(bountyData);

        const wallet = address;
        if (wallet) {
          // Check if user is creator
          setIsCreator(bountyData.creator === wallet);

          // Check enrollment
          const enrolled = await checkUserEnrollment(wallet, id);
          setIsEnrolled(enrolled);

          // Check submission
          await checkUserSubmission(wallet, id);

          // Load winners data
          await loadWinnersData(id);

          // Load comments
          await loadComments(id);
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
  }, [id, navigate, address]);

  // --- Enrollment (off‑chain) ---
  const handleEnroll = async () => {
    const wallet = address;
    if (!wallet) {
      toast.error("Please connect your wallet");
      return;
    }

    setIsEnrolling(true);
    const loadingToast = toast.loading("Enrolling in bounty...");

    try {
      const response = await axios.post(`${API_URL}/api/enroll`, {
        bountyId: id,
        user: wallet,
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

  // --- Submission (off‑chain with image) ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageSizeWarning("⚠️ Image is too large! Maximum 5MB.");
      } else {
        setImageSizeWarning("");
      }
      setSubmissionImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const wallet = address;
    if (!wallet) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!submissionImage || !submissionDescription || !submissionLink) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Submitting task...");

    try {
      let imageBase64 = null;
      if (submissionImage) {
        const compressed = await compressImage(submissionImage);
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(compressed);
        });
      }

      const submissionData = {
        bountyId: id,
        user: wallet,
        description: submissionDescription,
        projectLink: submissionLink,
        image: imageBase64,
      };

      const response = await axios.post(
        `${API_URL}/api/submission`,
        submissionData,
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Task submitted successfully! Pending review.", {
          id: loadingToast,
          duration: 3000,
        });
        setHasUserSubmitted(true);
        setUserSubmission({
          ...submissionData,
          _id: response.data._id,
          status: "pending",
          submittedAt: new Date().toISOString(),
        });
        setShowSubmitModal(false);
        resetSubmissionForm();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit task", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  const resetSubmissionForm = () => {
    setSubmissionImage(null);
    setSubmissionDescription("");
    setSubmissionLink("");
    setImagePreview(null);
    setImageSizeWarning("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // // Onchain claimable check
  // const { data: onChainClaimable } = useReadContract({
  //   address: getContractAddress(),
  //   abi: BOUNTY_ABI,
  //   functionName: "claimableRewards",
  //   args: [bounty.blockchainId, address],
  // });

  // --- Claim reward (on‑chain + backend sync) ---
  const handleClaimReward = async () => {
    const wallet = address;
    if (!wallet) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!bounty?.blockchainId) {
      toast.error("This bounty is not linked to a smart contract");
      return;
    }

    // Check network
    const requiredChainId = bounty.network;
    if (currentChainId !== requiredChainId) {
      toast.loading(`Switching to correct network...`);
      try {
        // await
        switchChain({ chainId: requiredChainId });
        toast.success("Network switched!");
      } catch (err) {
        toast.error("Please switch network manually");
        return;
      }
    }

    // Check if claimable on‑chain
    if (!onChainClaimable || onChainClaimable === 0n) {
      toast.error("No reward available to claim");
      return;
    }
    if (onChainClaimed) {
      toast.error("Reward already claimed");
      return;
    }

    try {
      const { eventData, hash } = await claimReward(blockchainId);
      // Sync with backend
      await axios.post(`${API_URL}/api/task/${id}/claim`, {
        winnerAddress: address,
        txHash: hash,
      });
      toast.success("Reward claimed successfully!");
      // Refresh data
      await loadWinnersData(id);
      refetchClaimable();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Claim failed");
    }
  };

  // --- Distribute reward (on‑chain + backend sync) ---
  const handleDistributeReward = async () => {
    if (!winnerAddresses.length) {
      toast.error("Please enter winner addresses");
      return;
    }

    const validAddresses = winnerAddresses.filter(
      (addr) => addr && addr.startsWith("0x"),
    );
    if (validAddresses.length !== winnerAddresses.length) {
      toast.error("Invalid wallet addresses");
      return;
    }

    if (!bounty?.blockchainId) {
      toast.error("Bounty not on blockchain");
      return;
    }
    // Network check
    if (currentChainId !== bounty.network) {
      toast.loading("Switching network...");
      try {
        // await
        switchChain({ chainId: bounty.network });
      } catch (err) {
        toast.error("Please switch to the correct network");
        return;
      }
    }

    setDistributing(true);
    const loadingToast = toast.loading("Distributing rewards...");

    try {
      let result;
      if (winnerAddresses.length === 1) {
        result = await assignSingleWinner(blockchainId, winnerAddresses[0]);
      } else {
        // For multiple winners, we need percentages. Use bounty.payoutType and bounty.percentages
        let percentages = [];
        if (bounty.payoutType === "equal") {
          const equal = Math.floor(100 / winnerAddresses.length);
          const remainder = 100 - equal * winnerAddresses.length;
          percentages = Array(winnerAddresses.length).fill(equal);
          percentages[percentages.length - 1] += remainder;
        } else if (
          bounty.percentages &&
          bounty.percentages.length === winnerAddresses.length
        ) {
          percentages = bounty.percentages;
        } else {
          toast.error("Invalid payout configuration");
          return;
        }
        result = await assignMultipleWinners(
          blockchainId,
          winnerAddresses,
          percentages,
        );
      }
      // Sync with backend (!! NEEDS TO CHECK SUCESS STATUS)
      await axios.post(`${API_URL}/api/task/${id}/distribute`, {
        winners: winnerAddresses,
        payoutType:
          winnerAddresses.length === 1
            ? "single"
            : bounty.payoutType || "equal",
        percentages: bounty.percentages || [],
        txHash: result.hash,
      });
      toast.success("Rewards distributed onChain and synced!");
      setShowDistributeModal(false);
      await loadWinnersData(id);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Distribution failed");
    } finally {
      setDistributing(false);
    }
  };

  // Open distribute modal
  const openDistributeModal = () => {
    const winnerCount = bounty?.winnersAllowed || 1;
    setWinnerAddresses(Array(winnerCount).fill(""));
    setShowDistributeModal(true);
  };

  // Handle comment submission
  const handleAddComment = async () => {
    const wallet = address;
    if (!wallet) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const hasCommented = comments.some((c) => c.user === wallet);
    if (hasCommented) {
      toast.error("You can only comment once per bounty");
      return;
    }

    const comment = {
      id: Date.now(),
      user: wallet,
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    await saveComment(id, comment);
    setNewComment("");
    toast.success("Comment added!");
  };

  // --- Helper for UI states ---
  const canSubmit = () => {
    if (isCreator) return false;
    if (!isEnrolled) return false;
    if (hasUserSubmitted) return false;
    if (bounty?.status !== "active") return false;
    return true;
  };

  // Check if user can claim
  const canClaim = () => {
    if (isCreator) return false;
    if (!isEnrolled) return false;
    if (hasUserClaimedOffChain) return false;
    // Use on‑chain claimable if available, else off‑chain
    const claimableAmount = blockchainId
      ? onChainClaimable || 0n
      : offChainClaimable;
    if (claimableAmount === 0) return false;
    if (bounty?.status !== "completed") return false;
    return true;
  };

  // Check if creator can distribute
  const canDistribute = () => {
    if (!isCreator) return false;
    const isEnded = new Date(bounty?.deadline) < new Date();
    if (!isEnded) return false;
    if (winnersData?.isDistributed) return false;
    return true;
  };

  // Loading state with NavBar and Footer
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF1AC6] rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state (bounty not found)
  if (!bounty) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white text-xl">Bounty not found</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-semibold hover:shadow-lg transition"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper to display claimable amount
  const displayClaimable = () => {
    if (blockchainId) {
      return onChainClaimable ? Number(onChainClaimable) : 0;
    }
    return offChainClaimable;
  };

  // Main content
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Bounty Card */}
          <div className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8">
            {/* Header: Title & Status */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">
                {bounty.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                  bounty.status === "active"
                    ? "bg-green-900 text-green-300"
                    : bounty.status === "upcoming"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-gray-700 text-gray-300"
                }`}
              >
                {bounty.status === "active"
                  ? "🟢 Active"
                  : bounty.status === "upcoming"
                    ? "🟡 Upcoming"
                    : "⚫ Completed"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
              {bounty.description}
            </p>

            {/* Details Grid - responsive 1 col on mobile, 2 on larger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-white/60 text-xs sm:text-sm">📅 Deadline</p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  {formatDate(bounty.deadline)}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm">💰 Reward</p>
                <p className="text-green-400 font-bold text-lg sm:text-xl">
                  {bounty.reward} {bounty.token || "INJ"}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm">👤 Creator</p>
                <p className="text-white font-mono text-xs sm:text-sm break-all">
                  {shortenAddress(bounty.creator)}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm">🏷️ Category</p>
                <p className="text-white text-sm sm:text-base">
                  {bounty.category || "Uncategorized"}
                </p>
              </div>
              {bounty.tags && bounty.tags.length > 0 && (
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">🔖 Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {bounty.tags.map((tag, idx) => (
                      <span key={idx} className="text-white text-xs sm:text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-white/60 text-xs sm:text-sm">
                  🔗 Project Link
                </p>
                {bounty.originLink ? (
                  <a
                    href={bounty.originLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-xs sm:text-sm break-all"
                  >
                    {bounty.originLink.length > 50
                      ? bounty.originLink.substring(0, 50) + "..."
                      : bounty.originLink}
                  </a>
                ) : (
                  <p className="text-white/50 text-sm">No link provided</p>
                )}
              </div>
            </div>

            {/* Action Buttons - responsive wrap */}
            <div className="flex flex-wrap gap-3">
              {bounty.status === "active" && !isEnrolled && !isCreator && (
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="px-4 py-2 sm:px-6 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-semibold text-sm sm:text-base hover:shadow-lg transition disabled:opacity-50"
                >
                  {isEnrolling ? "Enrolling..." : "🚀 Start Task"}
                </button>
              )}

              {/* Submit button using canSubmit() */}
              {canSubmit() && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2 sm:px-6 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base hover:bg-white/10 transition"
                >
                  📝 Submit Task
                </button>
              )}

              {canClaim() && (
                <button
                  onClick={handleClaimReward}
                  disabled={isContractPending || isContractConfirming}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold"
                >
                  {isContractPending
                    ? "Confirm in wallet..."
                    : isContractConfirming
                      ? "Confirming..."
                      : `💰 Claim Reward (${displayClaimable()} ${bounty.token})`}
                </button>
              )}

              {canDistribute() && (
                <button
                  onClick={openDistributeModal}
                  className="px-4 py-2 sm:px-6 sm:py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-sm sm:text-base hover:shadow-lg transition"
                >
                  🏆 Distribute Reward
                </button>
              )}

              {hasUserSubmitted && userSubmission && (
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs sm:text-sm">
                    {userSubmission.status === "pending" &&
                      "⏳ Submission Pending"}
                    {userSubmission.status === "accepted" &&
                      "✅ Submission Accepted"}
                    {userSubmission.status === "rejected" &&
                      "❌ Submission Rejected"}
                  </span>
                </div>
              )}

              {isEnrolled &&
                !isCreator &&
                bounty.status === "completed" &&
                claimableAmount === 0 &&
                !hasUserClaimed && (
                  <div className="px-3 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 text-xs sm:text-sm">
                    ⏳ Waiting for reward distribution
                  </div>
                )}
            </div>

            {/* Submission Status Display */}
            {hasUserSubmitted && userSubmission && (
              <div className="mt-4 p-4 rounded-lg border bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">
                      Your Submission
                    </h4>
                    <p className="text-sm text-gray-300 break-words">
                      <strong>Description:</strong> {userSubmission.description}
                    </p>
                    <p className="text-sm text-gray-300 break-words">
                      <strong>Link:</strong>{" "}
                      <a
                        href={userSubmission.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline break-all"
                      >
                        {userSubmission.projectLink}
                      </a>
                    </p>
                    {userSubmission.image && (
                      <button
                        onClick={() =>
                          window.open(userSubmission.image, "_blank")
                        }
                        className="text-sm text-blue-400 hover:underline mt-1"
                      >
                        View Submission Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Winners Info */}
            {winnersData?.isDistributed && winnersData.winners.length > 0 && (
              <div className="mt-4 p-4 rounded-lg border border-green-600 bg-green-900/20">
                <h4 className="font-semibold text-green-400 mb-2">
                  🏆 Rewards Distributed
                </h4>
                <div className="space-y-2">
                  {winnersData.winners.map((winner, idx) => {
                    const isCurrentUser =
                      address &&
                      winner.address.toLowerCase() === address.toLowerCase();
                    const isClaimed = winnersData.claimed?.some(
                      (c) =>
                        c.address.toLowerCase() ===
                        winner.address.toLowerCase(),
                    );
                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm border-b border-gray-700 pb-2 gap-2"
                      >
                        <span className="font-mono text-xs break-all">
                          {shortenAddress(winner.address)}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-green-400">
                            {winner.amount.toFixed(4)} {bounty.token}
                          </span>
                          {isClaimed ? (
                            <span className="text-green-400">✅ Claimed</span>
                          ) : isCurrentUser ? (
                            <button
                              onClick={handleClaimReward}
                              className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs"
                            >
                              Claim
                            </button>
                          ) : (
                            <span className="text-yellow-400">⏳ Pending</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="mt-6 bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Comments
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
              {comments.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No comments yet.
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-[#FF1AC6]">
                        {shortenAddress(comment.user)}
                      </span>
                      <span className="text-xs text-white/50">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF1AC6]/50 text-sm"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] border border-white/20 rounded-2xl w-full max-w-md p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Submit Task
              </h2>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ✖
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-white/60 block mb-1">
                  Upload Image (Max 5MB)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm file:mr-2 file:py-1 file:px-3 file:rounded-lg file:bg-white/10 file:text-white file:border-0"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-32 rounded-lg"
                    />
                    {imageSizeWarning && (
                      <p className="text-xs text-yellow-500 mt-1">
                        {imageSizeWarning}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={submissionDescription}
                  onChange={(e) => setSubmissionDescription(e.target.value)}
                  placeholder="What did you do?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF1AC6]/50 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">
                  Proof Link
                </label>
                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF1AC6]/50 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-semibold hover:shadow-lg transition disabled:opacity-50 text-sm sm:text-base"
              >
                {submitting ? "Submitting..." : "📤 Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Distribute Modal */}
      {showDistributeModal && bounty && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDistributeModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] border border-white/20 rounded-2xl w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Distribute Reward
              </h3>
              <button
                onClick={() => setShowDistributeModal(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ✖
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-2">Bounty: {bounty.title}</p>
            <p className="text-gray-300 text-sm mb-4">
              Reward: {bounty.reward} {bounty.token}
            </p>
            <div className="space-y-3 mb-6">
              {winnerAddresses.map((addr, idx) => {
                let amount = 0;
                if (bounty.winnersAllowed > 1 && bounty.payoutType === "equal")
                  amount = bounty.reward / bounty.winnersAllowed;
                else if (
                  bounty.winnersAllowed > 1 &&
                  bounty.percentages &&
                  bounty.percentages[idx]
                )
                  amount = (bounty.reward * bounty.percentages[idx]) / 100;
                else if (bounty.winnersAllowed === 1) amount = bounty.reward;
                return (
                  <div key={idx}>
                    <label className="text-white text-sm block mb-1">
                      Winner {idx + 1} Address
                    </label>
                    <input
                      type="text"
                      value={addr}
                      onChange={(e) => {
                        const newAddrs = [...winnerAddresses];
                        newAddrs[idx] = e.target.value;
                        setWinnerAddresses(newAddrs);
                      }}
                      placeholder="0x..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF1AC6]/50 text-sm"
                    />
                    {amount > 0 && (
                      <p className="text-green-400 text-xs mt-1">
                        Will receive: {amount.toFixed(4)} {bounty.token}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDistributeModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDistributeReward}
                disabled={
                  distributing || isContractPending || isContractConfirming
                }
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:shadow-lg disabled:opacity-50"
              >
                {distributing ? "Distributing..." : "Confirm Distribution"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BountyDetail;
