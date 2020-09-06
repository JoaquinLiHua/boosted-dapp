import { useCallback, useState, useEffect } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { rewardAmount } from "../utils/boost";
import BN from "bignumber.js";
import { ALL_POOLS } from "src/context/PoolContext";

export const useGetTotalRewardAmount = () => {
  const [amount, setAmount] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();
  const fetchReadyToHarvest = useCallback(async () => {
    if (account) {
      const totalAmount = ALL_POOLS.map(async (pool) => {
        return new BN(await rewardAmount(ethereum, pool.address, account));
      });
      const totalValueResolved = await Promise.all(totalAmount).then(
        (values) => {
          return values.reduce(function (a: BN, b: BN) {
            return a.plus(b);
          }, new BN("0"));
        }
      );
      setAmount(totalValueResolved);
    }
  }, [account, ethereum]);

  useEffect(() => {
    if (account && ethereum) {
      fetchReadyToHarvest();
      const refreshInterval = setInterval(fetchReadyToHarvest, 10000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchReadyToHarvest]);

  return amount;
};
