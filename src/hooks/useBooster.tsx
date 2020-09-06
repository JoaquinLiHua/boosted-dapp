import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { boost } from "../utils/boost";

export const useBoost = (poolContract: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleBoost = useCallback(async () => {
    if (account) {
      const txHash = await boost(ethereum, poolContract, account);
      return txHash;
    }
  }, [account, poolContract, ethereum]);

  return { onBoost: handleBoost };
};
