import { Link } from "react-router-dom";
import { shortenAddress } from "../../utils/formatters";

const BountyCard = ({ bounty }) => {
  const deadline = new Date(bounty.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const statusColor =
    {
      active: "text-green-500",
      upcoming: "text-yellow-500",
      completed: "text-gray-500",
    }[bounty.status] || "text-white";

  const tags = bounty.tags?.join(", ") || "No tags";
  const rewardDisplay = `${bounty.reward} ${bounty.token || "INJ"}`;
  const description =
    bounty.description?.length > 80
      ? bounty.description.substring(0, 80) + "..."
      : bounty.description || "No description provided";

  return (
    <div className="bg-[#2D2D2D] rounded-[17px] border border-white/50 h-auto flex flex-col justify-between min-w-[260px] m-4">
      <div className="flex justify-between items-center px-4 pt-4">
        <h3 className="text-white text-sm md:text-[18px]">
          {bounty.category || "Uncategorized"}
        </h3>
        <div className="relative flex flex-col items-center py-2">
          <span className="absolute top-0 -left-[5%] border h-[66px] border-white/50"></span>
          <h4 className="flex gap-4 items-center text-white text-xs md:text-[14px]">
            <p className="bg-white rounded-full w-[35px] h-[26px]"></p>
            Rewards
          </h4>
          <p className="text-white text-xs md:text-[16px]">{rewardDisplay}</p>
        </div>
      </div>

      <div className="border-b border-white/50 mt-2"></div>

      <div className="flex flex-col gap-6 m-4">
        <h3 className="text-white text-sm md:text-md">{bounty.title}</h3>
        <p className="text-white text-xs md:text-sm">{description}</p>
        <h3 className="text-white text-sm md:text-md">Tags: {tags}</h3>
        <h3 className="text-white text-sm md:text-md">
          🗓 Deadline: {deadline} | Status:{" "}
          <span className={statusColor}>{bounty.status}</span>
        </h3>
        <div className="flex justify-between items-center px-2">
          <Link
            to={`/bounty/${bounty._id}`}
            className="hover:border hover:border-white hover:bg-[#FF1AC69E] rounded-lg px-2 py-1 text-white text-xs"
          >
            ➤ View Details |
          </Link>
          <Link
            to={`/bounty/${bounty._id}`}
            className="hover:border hover:border-white hover:bg-[#FF1AC69E] rounded-lg px-4 py-1 text-white text-xs"
          >
            Start Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BountyCard;
