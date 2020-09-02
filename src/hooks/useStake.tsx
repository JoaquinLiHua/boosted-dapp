import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { stake, unstake } from "../utils/pools";

const useStake = (poolContract: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(ethereum, poolContract, amount, account);
      return txHash;
    },
    [account, poolContract, ethereum]
  );

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(ethereum, poolContract, amount, account);
      return txHash;
    },
    [account, poolContract, ethereum]
  );

  return { onStake: handleStake, onUnstake: handleUnstake };
};

export default useStake;
