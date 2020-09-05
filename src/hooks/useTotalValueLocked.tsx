import { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { ALL_POOLS } from "src/context/PoolContext";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { getBoostPoolPriceInUSD, getPoolValueInUSD } from "src/utils/pools";

export const useTotalValueLocked = () => {
  const [totalValueLockedInUSD, setTotalValueLockedInUSD] = useState<number>(0);
  const { coinGecko } = usePriceFeedContext();
  const {
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchAllPoolSizes = useCallback(async () => {
    const totalValue = ALL_POOLS.map(async (pool) => {
      if (pool.code === "boost_pool") {
        return (await getBoostPoolPriceInUSD(ethereum, coinGecko)) ?? 0;
      } else {
        return (
          (await getPoolValueInUSD(
            ethereum,
            pool.address,
            pool.tokenContract,
            coinGecko
          )) ?? 0
        );
      }
    });
    const totalValueResolved = await Promise.all(totalValue).then((values) => {
      return values.reduce(function (a, b) {
        return a + b;
      }, 0);
    });
    setTotalValueLockedInUSD(totalValueResolved);
  }, [ethereum, coinGecko]);

  useEffect(() => {
    if (ethereum) {
      fetchAllPoolSizes();
      const refreshInterval = setInterval(fetchAllPoolSizes, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, fetchAllPoolSizes]);

  return totalValueLockedInUSD;
};
