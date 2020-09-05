import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { stakeForProposal } from "../utils/governance";

const useGovernanceStake = () => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeForProposal(ethereum, account, amount);
      return txHash;
    },
    [account, ethereum]
  );

  return { onStake: handleStake };
};

export default useGovernanceStake;
