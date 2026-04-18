import { useState, useEffect } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import { supportedChains } from "../rainbowChains";
import { useBounty } from "../hooks/useBounty";
import { CONTRACT_ADDRESSES } from "contract";

function Create() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [bountyData, setBountyData] = useState({
    title: "",
    description: "",
    category: "",
    network: "",
    tags: "", // string for input (will convert later)

    startDate: "",
    deadline: "",

    originLink: "",

    reward: 0,
    token: "INJ", // pick your default

    // payout logic (needed for contract/backend)
    winnersAllowed: 1,
    payoutType: "",
    percentages: [],

    // UI-specific logic
    rewardType: "self-fund",

    creator: "", // will be filled from wallet
  });

  // Multi-winner state
  const [multipleWinner, setMultipleWinner] = useState(false);
  const [selectedPayoutType, setSelectedPayoutType] = useState("MULTI_EQUAL"); // default to equal split
  const [winnerCount, setWinnerCount] = useState(2);
  const [percentageArray, setPercentageArray] = useState([]);

  // Modal states
  const [showEqualModal, setShowEqualModal] = useState(false);
  const [showPercentModal, setShowPercentModal] = useState(false);
  const [showInfoMenu, setShowInfoMenu] = useState(false);

  const { switchChain } = useSwitchChain();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const currentChainId = useChainId();
  const {
    createBounty,
    isPending: isContractPending,
    isConfirming,
  } = useBounty();

  // Helper to update bounty data
  const updateBountyData = (field, value) => {
    setBountyData((prev) => ({ ...prev, [field]: value }));
  };

  // Set creator when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      updateBountyData("creator", address);
    }
  }, [address, isConnected]);

  // Network selection handler (also updates form)
  const handleChainChange = (e) => {
    const chainId = Number(e.target.value);
    updateBountyData("network", chainId);
    switchChain({ chainId });
  };

  // const nextStep = () => {
  //   if (currentStep < totalSteps) {
  //     if (validateStep(currentStep)) {
  //       setCurrentStep((prev) => prev + 1);
  //     }
  //   }
  // };

  const nextStep = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!bountyData.network) {
          toast.error("Please select a network");
          return false;
        }
        if (!bountyData.category) {
          toast.error("Please select a category");
          return false;
        }
        break;
      case 2:
        if (!bountyData.title || bountyData.title.length < 5) {
          toast.error("Title must be at least 5 characters");
          return false;
        }
        if (!bountyData.description || bountyData.description.length < 20) {
          toast.error("Description must be at least 20 characters");
          return false;
        }
        if (!bountyData.startDate || !bountyData.deadline) {
          toast.error("Please select start and end dates");
          return false;
        }
        break;
      case 3:
        if (bountyData.reward <= 0) {
          toast.error("Please enter a valid reward amount");
          return false;
        }
        break;
    }
    return true;
  };

  const handleEqualSplitConfirm = () => {
    const count = winnerCount;
    if (count < 2 || count > 5) {
      toast.error("Number of winners must be between 2 and 5");
      return;
    }
    setWinnerCount(count);
    setSelectedPayoutType("MULTI_EQUAL");
    setPercentageArray([]);
    setShowEqualModal(false);
    toast.success(`${count} winners selected for equal split`);
  };

  const handlePercentSplitConfirm = () => {
    if (percentageArray.length === 0) {
      toast.error("Please select a preset or enter percentages");
      return;
    }
    const total = percentageArray.reduce((sum, p) => sum + p, 0);
    if (total !== 100) {
      toast.error("Percentages must sum to 100");
      return;
    }
    setSelectedPayoutType("MULTI_PERCENTAGE");
    setWinnerCount(percentageArray.length);
    setShowPercentModal(false);
    toast.success(
      `${percentageArray.length} winners selected with percentage split`,
    );
  };

  const handlePresetSelect = (preset) => {
    setPercentageArray(preset);
  };

  // Calculate fees (5%)
  const fee = bountyData.reward * 0.05;
  const totalAmount = bountyData.reward + fee;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // --- Contract submission logic ---
  const handleFinalSubmit = async () => {
    // 1. Validate final step
    if (!validateStep(3)) return;

    // 2. Check wallet connection
    if (!isConnected || !address) {
      toast.error("Please connect your wallet");
      return;
    }

    // 3. Network verification
    const selectedChainId = bountyData.network;
    console.log("Selected chain ID:", selectedChainId);

    if (!selectedChainId) {
      toast.error("Please select a network");
      return;
    }

    // 4. Check if contract is deployed on the selected network
    const contractAddress = CONTRACT_ADDRESSES[selectedChainId]?.bounty;
    if (!contractAddress || contractAddress === "Loading...") {
      toast.error(
        `Contract not deployed on ${supportedChains.find((c) => c.id === selectedChainId)?.name}. Only Injective testnet is supported currently.`,
      );
      return;
    }

    // 5. If user is on a different chain, prompt to switch
    if (currentChainId !== selectedChainId) {
      toast.loading(
        `Switching to ${supportedChains.find((c) => c.id === selectedChainId)?.name}...`,
      );
      try {
        //await remove
        switchChain({ chainId: selectedChainId });
        toast.success("Network switched!");
      } catch (err) {
        toast.error("Failed to switch network. Please switch manually.");
        return;
      }
    }

    // 6. Prepare bounty data for contract (transform form data)
    const finalWinnersAllowed = multipleWinner ? winnerCount : 1;
    const finalPayoutType = multipleWinner ? selectedPayoutType : "SINGLE";
    console.log(
      `Final payout type: ${finalPayoutType}, winners allowed: ${finalWinnersAllowed}`,
    );
    const finalPercentages =
      multipleWinner && selectedPayoutType === "MULTI_PERCENTAGE"
        ? percentageArray
        : [];

    // Create a copy for backend (convert tags string to array if needed)
    const backendData = {
      ...bountyData,
      tags: bountyData.tags ? [bountyData.tags] : [],
      winnersAllowed: finalWinnersAllowed,
      payoutType: finalPayoutType,
      percentages: finalPercentages,
      status: "upcoming", // will be calculated by backend
    };

    // 7. Call smart contract
    try {
      const { eventData, hash } = await createBounty({
        reward: bountyData.reward, // send total (reward + fee) to contract
        token: bountyData.token,
        winnersAllowed: finalWinnersAllowed,
        payoutType: finalPayoutType,
        percentages: finalPercentages,
      });

      const blockchainId = eventData?.bountyId
        ? Number(eventData.bountyId)
        : null;
      console.log(
        `Token type ${bountyData.token} reward ${bountyData.reward} total amount ${totalAmount} in wei`,
      );
      console.log("Full eventData:", eventData);
      if (!blockchainId) throw new Error("No bountyId from contract event");

      // 8. Save to backend with blockchain info
      const saveResponse = await axios.post(
        // REACT_APP_API_URL ||
        `${"https://fresh-bounty.onrender.com"}/api/task`,
        {
          ...backendData,
          blockchainId: Number(blockchainId),
          txHash: hash,
          isOnChain: true,
          creator: address,
        },
      );

      if (saveResponse.status === 201) {
        toast.success("Bounty created on-chain and saved!");
        navigate("/dashboard");
      } else {
        throw new Error("Backend save failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Creation failed");
    }
  };

  // Determine button loading state
  const isProcessing = isContractPending || isConfirming;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-[#FF1AC6] bg-clip-text text-transparent">
              Create New Bounty
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              Fill in the details to launch your bounty
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="relative flex justify-between">
              <div className="absolute top-5 left-0 w-full h-1 bg-white/10 rounded-full" />
              <div
                className="absolute top-5 left-0 h-1 bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/50 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
              />

              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="relative flex flex-col items-center z-10"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white shadow-lg shadow-[#FF1AC6]/25"
                        : "bg-white/10 border border-white/20 text-white/50"
                    }`}
                  >
                    {step}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">
                      Step {step}
                    </p>
                    <p className="text-xs font-medium text-white/80">
                      {step === 1 && "Network"}
                      {step === 2 && "Details"}
                      {step === 3 && "Reward"}
                      {step === 4 && "Review"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Cards */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Choose Network */}
            {currentStep === 1 && (
              <div className="group relative bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF1AC6]/0 via-[#FF1AC6]/0 to-[#FF1AC6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#FF1AC6] rounded-full" />
                    <h2 className="text-xl font-semibold text-white">
                      Choose Network
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Blockchain Network
                      </label>
                      <select
                        onChange={handleChainChange}
                        value={bountyData.network}
                        className="w-full bg-[#2D2D2D] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50 focus:ring-1 focus:ring-[#FF1AC6]/50 transition"
                      >
                        <option value="">Select Network</option>
                        {supportedChains.map((chain) => (
                          <option key={chain.id} value={chain.id}>
                            {chain.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Category
                      </label>
                      <select
                        value={bountyData.category}
                        onChange={(e) =>
                          updateBountyData("category", e.target.value)
                        }
                        className="w-full bg-[#2D2D2D] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50 focus:ring-1 focus:ring-[#FF1AC6]/50 transition"
                      >
                        <option value="">Select Category</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Task Details */}
            {currentStep === 2 && (
              <div className="group relative bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF1AC6]/0 via-[#FF1AC6]/0 to-[#FF1AC6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#FF1AC6] rounded-full" />
                    <h2 className="text-xl font-semibold text-white">
                      Task Details
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={bountyData.title}
                        onChange={(e) =>
                          updateBountyData("title", e.target.value)
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF1AC6]/50 focus:ring-1 focus:ring-[#FF1AC6]/50 transition"
                        placeholder="e.g., Build a DeFi dashboard"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={bountyData.description}
                        onChange={(e) =>
                          updateBountyData("description", e.target.value)
                        }
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#FF1AC6]/50 focus:ring-1 focus:ring-[#FF1AC6]/50 transition"
                        placeholder="Describe the task, requirements, and expectations..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Tags <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={bountyData.tags}
                        onChange={(e) =>
                          updateBountyData("tags", e.target.value)
                        }
                        className="w-full bg-[#2D2D2D] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50 transition"
                      >
                        <option value="">Select a tag</option>
                        <option value="smart-contract">Smart Contract</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="ui-ux">UI/UX</option>
                        <option value="marketing">Marketing</option>
                        <option value="content">Content Creation</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">
                          Start Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={bountyData.startDate}
                          onChange={(e) =>
                            updateBountyData("startDate", e.target.value)
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">
                          End Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={bountyData.deadline}
                          onChange={(e) =>
                            updateBountyData("deadline", e.target.value)
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Origin Link
                      </label>
                      <input
                        value={bountyData.originLink}
                        onChange={(e) =>
                          updateBountyData("originLink", e.target.value)
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF1AC6]/50 transition"
                        placeholder="https://github.com/... or https://figma.com/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Reward Info with Modals */}
            {currentStep === 3 && (
              <div className="group relative bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF1AC6]/0 via-[#FF1AC6]/0 to-[#FF1AC6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#FF1AC6] rounded-full" />
                    <h2 className="text-xl font-semibold text-white">
                      Reward Information
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Info cards */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-white/80 leading-relaxed">
                        <span className="font-semibold text-[#FF1AC6]">
                          Self-fund:
                        </span>{" "}
                        You use your own money to create the task. You will be
                        responsible for providing the reward money to the
                        winner(s).
                      </p>
                    </div>

                    {/* Multiple winner toggle */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div>
                        <h3 className="text-white font-medium">
                          Multiple winners
                        </h3>
                        <p className="text-xs text-white/50">
                          Allow multiple participants to share the reward
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={multipleWinner}
                          onChange={() => setMultipleWinner(!multipleWinner)}
                        />
                        <div className="w-12 h-6 bg-white/20 rounded-full peer-checked:bg-[#FF1AC6]/80 transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                      </label>
                    </div>

                    {multipleWinner && (
                      <div className="flex flex-wrap gap-3 items-center">
                        <button
                          onClick={() => setShowEqualModal(true)}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-[#FF1AC6]/20 hover:border-[#FF1AC6]/50 transition"
                        >
                          Equal Split
                        </button>
                        <button
                          onClick={() => setShowPercentModal(true)}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-[#FF1AC6]/20 hover:border-[#FF1AC6]/50 transition"
                        >
                          % Split
                        </button>

                        {/* Info button with tooltip */}
                        <div className="relative">
                          <button
                            onClick={() => setShowInfoMenu(!showInfoMenu)}
                            className="text-white/50 hover:text-white/80 transition"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          {showInfoMenu && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl p-3 z-50">
                              <p className="text-xs text-black">
                                Equal split: Reward split equally among winners.
                              </p>
                              <p className="text-xs text-black mt-2">
                                % split: Custom percentages for each winner.
                              </p>
                              <p className="text-xs text-black font-semibold mt-2">
                                Supported configs:
                              </p>
                              <p className="text-xs text-black">
                                [40,30,20,5,5], [40,30,20,10], [50,30,20],
                                [50,50]
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Show selected payout info */}
                        {selectedPayoutType === "MULTI_EQUAL" &&
                          winnerCount > 1 && (
                            <span className="text-xs text-[#FF1AC6] bg-[#FF1AC6]/10 px-2 py-1 rounded-full">
                              {winnerCount} winners - Equal split
                            </span>
                          )}
                        {selectedPayoutType === "MULTI_PERCENTAGE" &&
                          percentageArray.length > 0 && (
                            <span className="text-xs text-[#FF1AC6] bg-[#FF1AC6]/10 px-2 py-1 rounded-full">
                              {percentageArray.length} winners -{" "}
                              {percentageArray.join("% / ")}%
                            </span>
                          )}
                      </div>
                    )}

                    {/* Reward type */}
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Reward Type <span className="text-red-400">*</span>
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            updateBountyData("rewardType", "self-fund")
                          }
                          className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
                            bountyData.rewardType === "self-fund"
                              ? "bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white shadow-lg shadow-[#FF1AC6]/25"
                              : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          Self-Fund
                        </button>
                        <button
                          disabled
                          className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm cursor-not-allowed"
                        >
                          Seek Funding{" "}
                          <span className="text-red-400 text-xs">soon</span>
                        </button>
                      </div>
                    </div>

                    {/* Set Reward Amount */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div>
                        <h4 className="text-white text-sm">Set reward</h4>
                        <p className="text-xs text-white/50">
                          Amount distributed to the winner(s)
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 w-full md:w-64">
                        <div className="flex items-center justify-between border border-white/10 rounded-xl bg-white/5 w-full h-10 px-4">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={bountyData.reward}
                            onChange={(e) =>
                              updateBountyData(
                                "reward",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            placeholder="0.00"
                            className="bg-transparent outline-none text-white text-sm w-full"
                          />
                          <p className="text-white/50 text-sm">
                            {bountyData.token}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Service Fees */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div>
                        <h4 className="text-white text-sm">
                          Service fees (5%)
                        </h4>
                        <a
                          href="#"
                          className="text-xs text-blue-400 hover:underline"
                        >
                          Learn more
                        </a>
                      </div>
                      <div className="flex flex-col gap-1 w-full md:w-64">
                        <div className="flex items-center justify-between border border-white/10 rounded-xl bg-white/5 w-full h-10 px-4">
                          <input
                            type="text"
                            value={fee.toFixed(4)}
                            disabled
                            className="bg-transparent outline-none text-white/70 text-sm w-full"
                          />
                          <p className="text-white/50 text-sm">
                            {bountyData.token}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div>
                        <h4 className="text-white text-sm">Total Amount</h4>
                        <p className="text-xs text-white/50">
                          Reward + service fees
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 w-full md:w-64">
                        <div className="flex items-center justify-between border border-white/10 rounded-xl bg-white/5 w-full h-10 px-4">
                          <input
                            type="text"
                            value={totalAmount.toFixed(4)}
                            disabled
                            className="bg-transparent outline-none text-white text-sm w-full font-semibold"
                          />
                          <p className="text-white/50 text-sm">
                            {bountyData.token}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Token selection */}
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Select Token
                      </label>
                      <select
                        value={bountyData.token}
                        onChange={(e) =>
                          updateBountyData("token", e.target.value)
                        }
                        className="w-full sm:w-64 bg-[#2D2D2D] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50 transition"
                      >
                        <option value="INJ">INJ (Injective)</option>
                        <option value="USDC">USDC</option>
                        <option value="USDT">USDT</option>
                        <option value="ETH">ETH</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review - Dynamic with all entered data */}
            {currentStep === 4 && (
              <div className="group relative bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 hover:border-[#FF1AC6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF1AC6]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF1AC6]/0 via-[#FF1AC6]/0 to-[#FF1AC6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#FF1AC6] rounded-full" />
                    <h2 className="text-xl font-semibold text-white">
                      Review & Submit
                    </h2>
                  </div>

                  <div className="space-y-0">
                    {/* Category */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Category</span>
                      <span className="text-white text-sm font-medium">
                        {bountyData.category || "Not selected"}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Title</span>
                      <span className="text-white text-sm font-medium">
                        {bountyData.title || "Not entered"}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="flex justify-between items-start py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Description</span>
                      <span className="text-white text-sm text-right max-w-[60%]">
                        {bountyData.description
                          ? bountyData.description.length > 100
                            ? bountyData.description.substring(0, 100) + "..."
                            : bountyData.description
                          : "Not entered"}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Tags</span>
                      <span className="text-white text-sm font-medium">
                        {bountyData.tags || "Not selected"}
                      </span>
                    </div>

                    {/* Origin Link */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Origin Link</span>
                      <span className="text-white text-sm truncate max-w-[60%]">
                        {bountyData.originLink ? (
                          <a
                            href={bountyData.originLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {bountyData.originLink.length > 40
                              ? bountyData.originLink.substring(0, 40) + "..."
                              : bountyData.originLink}
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Timeline</span>
                      <span className="text-white text-sm">
                        {formatDate(bountyData.startDate)} →{" "}
                        {formatDate(bountyData.deadline)}
                      </span>
                    </div>

                    {/* Reward */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Reward</span>
                      <span className="text-white text-sm font-medium">
                        {bountyData.reward} {bountyData.token}
                      </span>
                    </div>

                    {/* Service Fee */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">
                        Service Fee (5%)
                      </span>
                      <span className="text-white text-sm">
                        {fee.toFixed(4)} {bountyData.token}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">
                        Total Amount
                      </span>
                      <span className="text-[#FF1AC6] text-sm font-bold">
                        {totalAmount.toFixed(4)} {bountyData.token}
                      </span>
                    </div>

                    {/* Multiple Winners Info */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">
                        Multiple Winners
                      </span>
                      <span className="text-white text-sm">
                        {multipleWinner
                          ? selectedPayoutType === "MULTI_EQUAL"
                            ? `Yes (${winnerCount} winners, equal split)`
                            : `Yes (${percentageArray.length} winners, ${percentageArray.join("% / ")}%)`
                          : "No (Single winner)"}
                      </span>
                    </div>

                    {/* Reward Type */}
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Reward Type</span>
                      <span className="text-white text-sm capitalize">
                        {bountyData.rewardType?.replace("-", " ")}
                      </span>
                    </div>

                    {/* Network */}
                    <div className="flex justify-between items-center py-3">
                      <span className="text-white/60 text-sm">Network</span>
                      <span className="text-white text-sm">
                        {supportedChains.find(
                          (c) => c.id === bountyData.network,
                        )?.name || "Not selected"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-white/40 text-xs">
                      By creating this bounty you agree to our{" "}
                      <a href="#" className="text-blue-400 hover:underline">
                        Terms and Conditions
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 gap-4">
              {currentStep === 1 ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition"
                >
                  ← Cancel
                </Link>
              ) : (
                <button
                  onClick={prevStep}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition"
                >
                  ← Back
                </button>
              )}

              {currentStep === totalSteps ? (
                <button
                  onClick={handleFinalSubmit}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white text-sm font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "✨ Create Bounty"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white text-sm font-semibold hover:shadow-lg transition"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Equal Split Modal */}
      {showEqualModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowEqualModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] border border-white/20 rounded-2xl w-[90%] max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Equal Split
            </h3>
            <p className="text-white/50 text-sm mb-4">
              Enter the number of winners (2-5)
            </p>
            <input
              type="number"
              min="2"
              max="5"
              value={winnerCount}
              onChange={(e) => setWinnerCount(parseInt(e.target.value) || 2)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white mb-4 focus:outline-none focus:border-[#FF1AC6]/50"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEqualModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEqualSplitConfirm}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-medium hover:shadow-lg transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Percentage Split Modal */}
      {showPercentModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPercentModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#2D2D2D] to-[#252525] border border-white/20 rounded-2xl w-[90%] max-w-md p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-2">% Split</h3>
            <p className="text-white/50 text-sm mb-4">
              Select a preset or enter custom percentages
            </p>

            <div className="space-y-2 mb-4">
              <button
                onClick={() => handlePresetSelect([40, 30, 20, 5, 5])}
                className="w-full text-left px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                [40, 30, 20, 5, 5] - 5 winners
              </button>
              <button
                onClick={() => handlePresetSelect([40, 30, 20, 10])}
                className="w-full text-left px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                [40, 30, 20, 10] - 4 winners
              </button>
              <button
                onClick={() => handlePresetSelect([50, 30, 20])}
                className="w-full text-left px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                [50, 30, 20] - 3 winners
              </button>
              <button
                onClick={() => handlePresetSelect([50, 50])}
                className="w-full text-left px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                [50, 50] - 2 winners
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white/60 mb-2">
                Custom percentages (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g., 40,30,20,10"
                onChange={(e) => {
                  const values = e.target.value
                    .split(",")
                    .map((v) => parseInt(v.trim()));
                  if (values.every((v) => !isNaN(v))) {
                    setPercentageArray(values);
                  }
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#FF1AC6]/50"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPercentModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePercentSplitConfirm}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white font-medium hover:shadow-lg transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Create;
