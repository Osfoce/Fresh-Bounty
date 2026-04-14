import { Link } from "react-router-dom";
import { useState } from "react";

const BountyCard = ({ bounty }) => {
  const [isHovered, setIsHovered] = useState(false);

  const deadline = new Date(bounty.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const statusConfig = {
    active: {
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      dot: "bg-emerald-400",
    },
    upcoming: {
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      dot: "bg-amber-400",
    },
    completed: {
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      dot: "bg-gray-400",
    },
  }[bounty.status] || {
    color: "text-white",
    bg: "bg-white/10",
    dot: "bg-white",
  };

  const tags = bounty.tags || [];
  const rewardDisplay = `${bounty.reward} ${bounty.token || "INJ"}`;
  const description =
    bounty.description?.length > 100
      ? bounty.description.substring(0, 100) + "..."
      : bounty.description || "No description provided";

  return (
    <div
      className="group relative bg-gradient-to-br from-[#2D2D2D] to-[#252525] rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 h-auto flex flex-col justify-between min-w-[280px] max-w-[360px] m-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF1AC6]/0 via-[#FF1AC6]/0 to-[#FF1AC6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10 p-5">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[11px] font-semibold tracking-wide text-white/70 uppercase">
                {bounty.category || "Uncategorized"}
              </span>
            </div>
          </div>

          {/* Rewards Pill */}
          <div className="relative">
            <div className="flex flex-col items-end">
              <div className="bg-gradient-to-r from-[#FF1AC6]/20 to-[#FF1AC6]/5 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-[#FF1AC6]/30">
                <span className="text-[10px] font-medium tracking-wider text-[#FF1AC6] uppercase">
                  Reward
                </span>
                <p className="text-white font-bold text-lg leading-tight">
                  {rewardDisplay}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold leading-tight mb-3 group-hover:text-[#FF1AC6] transition-colors duration-200">
          {bounty.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/60">🗓️</span>
            <span className="text-white/80 text-sm">{deadline}</span>
          </div>
          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${statusConfig.bg}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`}
            />
            <span className={`text-xs font-medium ${statusConfig.color}`}>
              {bounty.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/bounty/${bounty._id}`}
            className="flex-1 text-center px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
          >
            View Details →
          </Link>
          <Link
            to={`/bounty/${bounty._id}`}
            className="flex-1 text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF1AC6] to-[#FF1AC6]/80 text-white text-sm font-semibold hover:from-[#FF1AC6]/90 hover:to-[#FF1AC6] hover:shadow-lg hover:shadow-[#FF1AC6]/25 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Start Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BountyCard;
