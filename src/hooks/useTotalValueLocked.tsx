import { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import {
  getBalancerPoolPriceInUSD,
  getBoostPoolPriceInUSD,
  getPoolValueInUSD,
} from "src/utils/boost";
import { ALL_POOLS } from "src/constants/pools";

export const useTotalValueLocked = () => {
  const [totalValueLockedInUSD, setTotalValueLockedInUSD] = useState<string>(
    "0"
  );
  const { coinGecko } = usePriceFeedContext();
  const { ethereum }: { ethereum: provider } = useWallet();

  const fetchAllPoolValues = useCallback(async () => {
    const totalValue = ALL_POOLS.map(async (pool) => {
      if (pool.code === "boost_pool") {
        return (await getBoostPoolPriceInUSD(ethereum, coinGecko)) ?? 0;
      } else {
        if (pool.open) {
          return (
            (await getBalancerPoolPriceInUSD(
              ethereum,
              coinGecko,
              pool.address,
              pool.tokenContract,
              pool.underlyingToken
            )) ?? 0
          );
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
      }
    });
    const totalValueResolved = await Promise.all(totalValue).then((values) => {
      return values.reduce(function (a, b) {
        return a + b;
      }, 0);
    });
    setTotalValueLockedInUSD(totalValueResolved.toString());
  }, [ethereum, coinGecko]);

  useEffect(() => {
    if (ethereum) {
      fetchAllPoolValues();
      const refreshInterval = setInterval(fetchAllPoolValues, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, fetchAllPoolValues]);

  return totalValueLockedInUSD;
};
