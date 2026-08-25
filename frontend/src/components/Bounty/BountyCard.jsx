import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import {
  FiCalendar,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiZap,
} from "react-icons/fi";

const BountyCard = ({ bounty }) => {
  const { address, isConnected } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const navigate = useNavigate();

  const deadline = new Date(bounty.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const statusConfig = {
    active: {
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      dot: "bg-emerald-400",
    },
    upcoming: {
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      dot: "bg-amber-400",
    },
    completed: {
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      border: "border-gray-400/20",
      dot: "bg-gray-400",
    },
  }[bounty.status] || {
    color: "text-white/60",
    bg: "bg-white/5",
    border: "border-white/10",
    dot: "bg-white/50",
  };

  const tags = bounty.tags || [];
  const rewardDisplay = `${bounty.reward} ${bounty.token || "INJ"}`;

  const description =
    bounty.description?.length > 100
      ? bounty.description.substring(0, 100) + "..."
      : bounty.description || "No description provided";

  const getUserWallet = () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return null;
    }

    return address;
  };

  const API_URL = "https://fresh-bounty.onrender.com";

  const handleEnroll = async (e) => {
    e.preventDefault();

    const userWallet = getUserWallet();
    if (!userWallet) return;

    setIsEnrolling(true);

    const loadingToast = toast.loading("Enrolling in bounty...");

    try {
      const response = await axios.post(`${API_URL}/api/enroll`, {
        bountyId: bounty._id,
        user: userWallet,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully enrolled in bounty!", {
          id: loadingToast,
          duration: 3000,
        });
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

  return (
    <div
      className="
        group relative flex h-full w-full flex-col overflow-hidden
        rounded-2xl
        border border-white/[0.08]
        bg-[#171717]
        shadow-[0_8px_30px_rgba(0,0,0,0.22)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-[#FF1AC6]/30
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SMALL GLOWING PINK CIRCLE */}
      <div
        className="
          pointer-events-none
          absolute
          right-4
          top-4
          z-20
          h-2
          w-2
          rounded-full
          bg-[#FF1AC6]
          shadow-[0_0_6px_2px_rgba(255,26,198,0.45)]
          animate-pulse
        "
      />

      {/* TOP ACCENT */}
      <div
        className="
          absolute left-0 right-0 top-0 h-[2px]
          bg-gradient-to-r from-transparent via-[#FF1AC6] to-transparent
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Background Glow */}
      <div
        className="
          pointer-events-none absolute -right-24 -top-24
          h-48 w-48 rounded-full
          bg-[#FF1AC6]/10
          blur-3xl
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div
        className="
          pointer-events-none absolute -bottom-24 -left-24
          h-40 w-40 rounded-full
          bg-purple-500/10
          blur-3xl
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10 flex h-full flex-col p-5">

        {/* HEADER */}
        <div className="mb-5 flex items-start justify-between gap-3">

          {/* CATEGORY */}
          <div className="flex min-w-0 items-center gap-2">

            <div
              className="
                flex h-8 w-8 shrink-0 items-center justify-center
                rounded-lg
                border border-[#FF1AC6]/15
                bg-[#FF1AC6]/10
                text-[#FF1AC6]
              "
            >
              <FiZap className="text-sm" />
            </div>

            <span
              className="
                truncate rounded-lg
                border border-white/[0.07]
                bg-white/[0.035]
                px-2.5 py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white/50
                transition-colors
                group-hover:text-white/70
              "
            >
              {bounty.category || "Uncategorized"}
            </span>
          </div>

          {/* REWARD */}
          <div
            className="
              shrink-0 rounded-xl
              border border-[#FF1AC6]/20
              bg-[#FF1AC6]/[0.06]
              px-3 py-2
              text-right
              transition-all duration-300
              group-hover:border-[#FF1AC6]/35
              group-hover:bg-[#FF1AC6]/10
            "
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FF1AC6]/60">
              Reward
            </p>

            <p className="mt-0.5 whitespace-nowrap text-sm font-bold text-white">
              {rewardDisplay}
            </p>
          </div>
        </div>

        {/* TITLE */}
        <div className="mb-2.5">
          <h3
            className="
              line-clamp-2
              text-lg font-bold
              leading-snug
              tracking-tight
              text-white
              transition-colors duration-200
              group-hover:text-[#FF1AC6]
            "
          >
            {bounty.title}
          </h3>
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            min-h-[66px]
            line-clamp-3
            text-sm
            leading-[1.55rem]
            text-white/45
          "
        >
          {description}
        </p>

        {/* TAGS */}
        <div className="mt-4 min-h-[28px]">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="
                    rounded-md
                    border border-white/[0.06]
                    bg-white/[0.025]
                    px-2 py-1
                    text-[10px]
                    text-white/40
                    transition-all duration-200
                    group-hover:border-white/[0.1]
                    group-hover:text-white/60
                  "
                >
                  #{tag}
                </span>
              ))}

              {tags.length > 3 && (
                <span
                  className="
                    rounded-md
                    bg-white/[0.02]
                    px-2 py-1
                    text-[10px]
                    text-white/25
                  "
                >
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-transparent" />

        {/* META */}
        <div className="mb-5 flex items-center justify-between">

          {/* DEADLINE */}
          <div className="flex items-center gap-2.5">

            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg
                border border-white/[0.07]
                bg-white/[0.035]
                text-white/40
                transition-colors
                group-hover:border-[#FF1AC6]/20
                group-hover:text-[#FF1AC6]
              "
            >
              <FiCalendar className="text-sm" />
            </div>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/25">
                Deadline
              </p>

              <p className="mt-0.5 text-xs font-semibold text-white/70">
                {deadline}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div
            className={`
              flex items-center gap-1.5
              rounded-full
              border
              px-2.5 py-1.5
              ${statusConfig.bg}
              ${statusConfig.border}
            `}
          >
            <span
              className={`
                h-1.5 w-1.5 rounded-full
                ${statusConfig.dot}
                ${
                  bounty.status === "active"
                    ? "animate-pulse shadow-[0_0_8px_currentColor]"
                    : ""
                }
              `}
            />

            <span
              className={`
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                ${statusConfig.color}
              `}
            >
              {bounty.status}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto grid grid-cols-2 gap-2.5">

          {/* VIEW DETAILS */}
          <Link
            to={`/task/${bounty._id}`}
            className="
              group/details
              flex items-center justify-center gap-1.5
              rounded-xl
              border border-white/[0.08]
              bg-white/[0.035]
              px-3 py-2.5
              text-xs font-semibold
              text-white/60
              transition-all duration-200
              hover:border-white/[0.15]
              hover:bg-white/[0.07]
              hover:text-white
            "
          >
            <span>View Details</span>

            <FiArrowRight
              className="
                transition-transform duration-200
                group-hover/details:translate-x-0.5
              "
            />
          </Link>

          {/* START TASK */}
          {bounty.status === "active" ? (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="
                group/start
                relative flex items-center justify-center
                gap-1.5
                overflow-hidden
                rounded-xl
                bg-gradient-to-r
                from-[#FF1AC6]
                to-[#e815b0]
                px-3 py-2.5
                text-xs font-bold
                text-white
                shadow-[0_8px_20px_rgba(255,26,198,0.12)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_10px_25px_rgba(255,26,198,0.25)]
                hover:brightness-110
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isEnrolling ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Enrolling
                </span>
              ) : (
                <>
                  <span>Start Task</span>

                  <FiArrowRight
                    className="
                      transition-transform duration-200
                      group-hover/start:translate-x-0.5
                    "
                  />
                </>
              )}

              {/* Shine */}
              {!isEnrolling && (
                <span
                  className="
                    pointer-events-none absolute inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/15
                    to-transparent
                    transition-transform duration-700
                    group-hover/start:translate-x-full
                  "
                />
              )}
            </button>
          ) : (
            <button
              disabled
              title={
                bounty.status === "completed"
                  ? "Bounty completed"
                  : "Bounty not started yet"
              }
              className="
                flex items-center justify-center gap-1.5
                rounded-xl
                border border-white/[0.06]
                bg-white/[0.025]
                px-3 py-2.5
                text-xs font-semibold
                text-white/25
                cursor-not-allowed
              "
            >
              {bounty.status === "completed" ? (
                <>
                  <FiCheckCircle />
                  Ended
                </>
              ) : (
                <>
                  <FiClock />
                  Coming Soon
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BountyCard;