import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { boost } from "src/utils/vault";

export const useBoost = (vaultRewardsAddress: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleBoost = useCallback(async () => {
    if (account) {
      const txHash = await boost(ethereum, vaultRewardsAddress, account);
      return txHash;
    }
  }, [account, vaultRewardsAddress, ethereum]);

  return { onBoost: handleBoost };
};
