import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { stakeForProposal, withdrawStaked } from "../../utils/governance";

export const useGovernanceStake = () => {
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

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await withdrawStaked(ethereum, account, amount);
      return txHash;
    },
    [account, ethereum]
  );

  return { onStake: handleStake, onUnstake: handleUnstake };
};
