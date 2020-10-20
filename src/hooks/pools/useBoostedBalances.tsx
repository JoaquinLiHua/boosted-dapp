import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { getBoostedBalance, getNewBoostedBalance } from "../../utils/pool";
import BN from "bignumber.js";

export const useGetBoostedBalances = (poolAddress: string) => {
  const [currentBoostedBalance, setCurrentBoostedBalance] = useState(
    new BN("0")
  );
  const [nextBoostedBalance, setNextBoostedBalance] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchCurrentBoostedBalance = useCallback(async () => {
    if (account) {
      const amount = new BN(
        await getBoostedBalance(ethereum, poolAddress, account)
      );
      setCurrentBoostedBalance(amount);
    }
  }, [account, ethereum, poolAddress]);

  const fetchNextBoostedBalance = useCallback(async () => {
    if (account) {
      const amount = new BN(
        await getNewBoostedBalance(ethereum, poolAddress, account)
      );
      setNextBoostedBalance(amount);
    }
  }, [account, ethereum, poolAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchNextBoostedBalance();
      fetchCurrentBoostedBalance();
      const refreshInterval1 = setInterval(fetchNextBoostedBalance, 10000);
      const refreshInterval2 = setInterval(fetchCurrentBoostedBalance, 10000);

      return () => {
        clearInterval(refreshInterval1);
        clearInterval(refreshInterval2);
      };
    } else {
      return;
    }
  }, [account, ethereum, fetchCurrentBoostedBalance, fetchNextBoostedBalance]);

  return [currentBoostedBalance, nextBoostedBalance];
};
