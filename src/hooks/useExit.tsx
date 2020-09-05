import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { exit } from "../utils/boost";

export const useExit = (poolContract: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleExit = useCallback(async () => {
    if (account) {
      const txHash = await exit(ethereum, poolContract, account);
      return txHash;
    }
  }, [account, poolContract, ethereum]);

  return { onExit: handleExit };
};
