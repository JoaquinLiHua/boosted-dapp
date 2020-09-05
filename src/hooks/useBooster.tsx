import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { boost } from "../utils/boost";

const useBoost = (poolContract: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleBoost = useCallback(async () => {
    const txHash = await boost(ethereum, poolContract, account);
    return txHash;
  }, [account, poolContract, ethereum]);

  return { onBoost: handleBoost };
};

export default useBoost;
