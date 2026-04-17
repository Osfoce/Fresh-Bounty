import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { prepareClaimTx, getClaimableConfig } from "../services/bountyService";

export const useBounty = (bountyId) => {
  const { address, chain } = useAccount();

  const { writeContractAsync } = useWriteContract();

  // Read claimable reward
  const { data: claimable } = useReadContract({
    ...getClaimableConfig({
      bountyId,
      user: address,
      chainId: chain?.id,
    }),
    query: {
      enabled: !!address && !!chain?.id,
    },
  });

  // Claim function
  const claim = async () => {
    if (!address || !chain?.id) throw new Error("Wallet not connected");

    const tx = prepareClaimTx({
      bountyId,
      account: address,
      chainId: chain.id,
    });

    return await writeContractAsync(tx);
  };

  return {
    claimable,
    claim,
  };
};
