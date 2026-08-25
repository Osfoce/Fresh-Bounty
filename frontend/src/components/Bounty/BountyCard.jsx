import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const BountyCard = ({ bounty }) => {
  const { address, isConnected } = useAccount();
  const [isEnrolling, setIsEnrolling] = useState(false);

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

    // COMPLETED = GREEN
    completed: {
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      dot: "bg-emerald-400",
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
        group relative flex h-full w-full min-w-0 flex-col
        overflow-hidden rounded-2xl
        border border-white/[0.08]
        bg-gradient-to-b from-[#2A2A2A] to-[#202020]
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:border-[#FF1AC6]/30
        hover:shadow-[0_15px_45px_rgba(0,0,0,0.4)]
      "
    >
      {/* SMALL PINK GLOWING DOT */}
      <div
        className="
          pointer-events-none
          absolute
          right-3
          top-3
          z-20
          h-1.5
          w-1.5
          rounded-full
          bg-[#FF1AC6]
          shadow-[0_0_7px_2px_rgba(255,26,198,0.45)]
        "
      />

      {/* Subtle hover glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-48
          w-48
          rounded-full
          bg-[#FF1AC6]/10
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Bottom glow */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-40
          w-40
          rounded-full
          bg-purple-500/5
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10 flex h-full min-w-0 flex-col p-5 sm:p-6">

        {/* TOP ROW */}
        <div className="mb-5 flex min-w-0 items-start justify-between gap-3 sm:gap-4">

          {/* CATEGORY */}
          <div className="min-w-0 flex-1">
            <span
              className="
                inline-flex
                max-w-full
                items-center
                overflow-hidden
                text-ellipsis
                whitespace-nowrap
                rounded-lg
                border border-white/[0.08]
                bg-white/[0.04]
                px-3
                py-1.5
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
              min-w-0
              shrink-0
              rounded-xl
              border border-[#FF1AC6]/20
              bg-[#FF1AC6]/[0.07]
              px-3
              py-2
              text-right
              transition-all
              duration-300
              group-hover:border-[#FF1AC6]/30
              group-hover:bg-[#FF1AC6]/10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#FF1AC6]/70">
              Reward
            </p>

            <p className="mt-0.5 whitespace-nowrap text-sm font-bold text-white sm:text-base">
              {rewardDisplay}
            </p>
          </div>
        </div>

        {/* TITLE */}
        <h3
          className="
            mb-2.5
            min-w-0
            overflow-hidden
            text-ellipsis
            text-lg
            font-bold
            leading-snug
            text-white
            line-clamp-2
            transition-colors
            duration-200
            group-hover:text-[#FF1AC6]
            sm:text-xl
          "
        >
          {bounty.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            min-w-0
            min-h-[72px]
            overflow-hidden
            text-sm
            leading-6
            text-white/50
            line-clamp-3
          "
        >
          {description}
        </p>

        {/* TAGS */}
        <div className="mt-4 min-h-[32px] min-w-0">
          {tags.length > 0 && (
            <div className="flex min-w-0 flex-wrap gap-1.5 overflow-hidden">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="
                    max-w-full
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    rounded-md
                    border border-white/[0.07]
                    bg-white/[0.035]
                    px-2.5
                    py-1
                    text-[11px]
                    text-white/45
                    transition-colors
                    group-hover:border-white/10
                    group-hover:text-white/60
                  "
                >
                  #{tag}
                </span>
              ))}

              {tags.length > 3 && (
                <span
                  className="
                    shrink-0
                    rounded-md
                    bg-white/[0.025]
                    px-2.5
                    py-1
                    text-[11px]
                    text-white/30
                  "
                >
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="my-5 h-px bg-white/[0.07]" />

        {/* META */}
        <div className="mb-5 flex min-w-0 items-center justify-between gap-3">

          {/* DEADLINE */}
          <div className="flex min-w-0 items-center gap-2.5">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                border border-white/[0.07]
                bg-white/[0.04]
                text-sm
              "
            >
              🗓️
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Deadline
              </p>

              <p className="mt-0.5 text-xs font-medium text-white/70">
                {deadline}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div
            className={`
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1.5
              ${statusConfig.bg}
              ${statusConfig.border}
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                shrink-0
                rounded-full
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
                whitespace-nowrap
                text-[10px]
                font-bold
                tracking-wider
                ${statusConfig.color}
              `}
            >
              {bounty.status?.toUpperCase()}
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
              flex
              min-w-0
              items-center
              justify-center
              gap-1.5
              overflow-hidden
              rounded-xl
              border border-white/[0.08]
              bg-white/[0.04]
              px-2
              py-3
              text-xs
              font-semibold
              text-white/65
              transition-all
              duration-200
              hover:border-[#FF1AC6]/40
              hover:bg-[#FF1AC6]/10
              hover:text-[#FF1AC6]
              sm:px-3
              sm:text-sm
            "
          >
            <span className="truncate">
              View Details
            </span>

            <span
              className="
                shrink-0
                transition-transform
                duration-200
                group-hover/details:translate-x-0.5
              "
            >
              →
            </span>
          </Link>

          {/* START TASK */}
          {bounty.status === "active" ? (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="
                relative
                min-w-0
                overflow-hidden
                rounded-xl
                bg-gradient-to-r
                from-[#FF1AC6]
                to-[#FF1AC6]/80
                px-2
                py-3
                text-xs
                font-bold
                text-white
                shadow-lg
                shadow-[#FF1AC6]/10
                transition-all
                duration-200
                hover:brightness-110
                hover:shadow-xl
                hover:shadow-[#FF1AC6]/20
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:px-3
                sm:text-sm
              "
            >
              {isEnrolling ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="
                      h-3.5
                      w-3.5
                      shrink-0
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  <span className="truncate">
                    Enrolling
                  </span>
                </span>
              ) : (
                <span className="block truncate">
                  Start Task
                </span>
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
                min-w-0
                overflow-hidden
                rounded-xl
                border border-white/[0.06]
                bg-white/[0.03]
                px-2
                py-3
                text-xs
                font-semibold
                text-white/25
                cursor-not-allowed
                sm:px-3
                sm:text-sm
              "
            >
              <span className="block truncate">
                {bounty.status === "completed"
                  ? "Ended"
                  : "Coming Soon"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BountyCard;