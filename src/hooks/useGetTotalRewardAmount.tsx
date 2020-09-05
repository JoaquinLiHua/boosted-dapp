import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { rewardAmount } from "../utils/pools";
import BN from "bignumber.js";
import { ALL_POOLS } from "src/context/PoolContext";

const useGetTotalRewardAmount = () => {
  const [amount, setAmount] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchReadyToHarvest = useCallback(async () => {
    if (account) {
      const totalAmount = ALL_POOLS.map(async (pool) => {
        return (await rewardAmount(ethereum, pool.address, account)) ?? 0;
      });
      const totalValueResolved = await Promise.all(totalAmount).then(
        (values) => {
          return values.reduce(function (a: any, b: any) {
            return new BN(a).toNumber() + new BN(b).toNumber();
          }, 0);
        }
      );
      setAmount(new BN(totalValueResolved));
    }
  }, [account, ethereum]);

  useEffect(() => {
    if (account && ethereum) {
      fetchReadyToHarvest();
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchReadyToHarvest]);

  return amount;
};

export default useGetTotalRewardAmount;
