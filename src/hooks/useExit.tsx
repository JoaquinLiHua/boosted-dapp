import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { exit } from "../utils/boost";

const useExit = (poolContract: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleExit = useCallback(async () => {
    const txHash = await exit(ethereum, poolContract, account);
    return txHash;
  }, [account, poolContract, ethereum]);

  return { onExit: handleExit };
};

export default useExit;
