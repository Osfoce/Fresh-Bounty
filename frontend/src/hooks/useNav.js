import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useNav = () => {
  const navigate = useNavigate();
  const { address: account } = useAccount();

  const handleNavigate = (path) => {
    if (!account) {
      toast.error("Please sign in to continue");
      return;
    }
    navigate(path);
  };
  return { handleNavigate };
};
