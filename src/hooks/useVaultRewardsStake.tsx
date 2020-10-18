import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { stake, unstake } from "../utils/pool";

export const useVaultRewardsStake = (vaultRewardsAddress: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleStake = useCallback(
    async (amount: string) => {
      if (account) {
        const txHash = await stake(
          ethereum,
          vaultRewardsAddress,
          amount,
          account
        );
        return txHash;
      }
    },
    [account, vaultRewardsAddress, ethereum]
  );

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (account) {
        const txHash = await unstake(
          ethereum,
          vaultRewardsAddress,
          amount,
          account
        );
        return txHash;
      }
    },
    [account, vaultRewardsAddress, ethereum]
  );

  return {
    onVaultRewardsStake: handleStake,
    onVaultRewardsUnstake: handleUnstake,
  };
};
