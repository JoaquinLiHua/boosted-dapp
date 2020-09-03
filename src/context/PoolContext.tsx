import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "use-wallet";
import BN from "bignumber.js";
import { getPoolStats, getPoolPriceInUSD } from "src/utils/pools";
import { provider } from "web3-core";
import {
  yfiToken,
  sushiToken,
  bandToken,
  kncToken,
  compToken,
  linkToken,
  lendToken,
  snxToken,
  mkrToken,
  renToken,
  yfiPool,
  bandPool,
  compPool,
  kncPool,
  lendPool,
  linkPool,
  mkrPool,
  renPool,
  snxPool,
  sushiPool,
  uniswapLPToken,
  uniswapPool,
} from "src/constants/tokenAddresses";
import { usePriceFeedContext } from "./PriceFeedContext";

export const ALL_POOLS = [
  {
    name: "BOOST-ETH (Uniswap BOOST-ETH)",
    code: "boost_pool",
    order: 0,
    icon: "/images/boost-icon.png",
    address: uniswapPool,
    tokenContract: uniswapLPToken,
    tokenTicker: "boost",
  },
  {
    name: "Yearn Alpha (YFI)",
    code: "yfi_pool",
    order: 0,
    icon: "/images/yfi-icon.png",
    address: yfiPool,
    tokenContract: yfiToken,
    tokenTicker: "yfi",
  },
  {
    name: "Omakase (SUSHI)",
    code: "eth_pool",
    order: 1,
    icon: "/images/sushi-icon.png",
    address: sushiPool,
    tokenContract: sushiToken,
    tokenTicker: "sushi",
  },
  {
    name: "Band Wagons (BAND)",
    code: "band_pool",
    order: 2,
    icon: "/images/band-icon.svg",
    address: bandPool,
    tokenContract: bandToken,
    tokenTicker: "band",
  },
  {
    name: "Kyber Corp (KNC)",
    code: "knc_pool",
    order: 3,
    icon: "/images/knc-logo.svg",
    address: kncPool,
    tokenContract: kncToken,
    tokenTicker: "knc",
  },
  {
    name: "Compound Soils (COMP)",
    code: "comp_pool",
    order: 4,
    icon: "/images/comp-logo.svg",
    address: compPool,
    tokenContract: compToken,
    tokenTicker: "comp",
  },
  {
    name: "Marine Corps (LINK)",
    code: "link_pool",
    order: 5,
    icon: "/images/link-logo.svg",
    address: linkPool,
    tokenContract: linkToken,
    tokenTicker: "link",
  },
  {
    name: "Aave Nauts (LEND)",
    code: "lend_pool",
    order: 6,
    icon: "/images/lend-logo.svg",
    address: lendPool,
    tokenContract: lendToken,
    tokenTicker: "lend",
  },
  {
    name: "Synth Spartans (SNX)",
    code: "snx_pool",
    order: 7,
    icon: "/images/snx-logo.svg",
    address: snxPool,
    tokenContract: snxToken,
    tokenTicker: "snx",
  },
  {
    name: "Maker Mountain (MKR)",
    code: "mkr_pool",
    order: 8,
    icon: "/images/mkr-logo.svg",
    address: mkrPool,
    tokenContract: mkrToken,
    tokenTicker: "mkr",
  },
  {
    name: "Ren Moon (REN)",
    code: "ren_pool",
    order: 8,
    icon: "/images/ren-logo.svg",
    address: renPool,
    tokenContract: renToken,
    tokenTicker: "ren",
  },
];

export interface IPool {
  name: string;
  icon: string;
  code: string;
  order: number;
  address: string;
  tokenContract: string;
  poolSize: BN | null;
  poolPriceInUSD: number | null;
  periodFinish: BN | null;
  boosterPrice: BN | null;
  tokenTicker: string;
}

interface IPoolContext {
  pools: IPool[];
}

export const PoolContext = createContext<IPoolContext>({
  pools: [],
});

export const PoolProvider: React.FC = ({ children }) => {
  const { coinGecko } = usePriceFeedContext();
  const [pools, setPools] = useState<IPool[]>([]);
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();
  const getStats = useCallback(async () => {
    const promisedPoolsArr = ALL_POOLS.map(async (pool) => {
      const poolStats = await getPoolStats(ethereum, pool.address);
      const poolPriceInUSD = await getPoolPriceInUSD(
        pool.tokenContract,
        poolStats?.poolSize,
        coinGecko
      );
      return {
        name: pool.name,
        icon: pool.icon,
        code: pool.code,
        order: pool.order,
        address: pool.address,
        tokenContract: pool.tokenContract,
        tokenTicker: pool.tokenTicker,
        poolSize: poolStats?.poolSize ? new BN(poolStats?.poolSize) : null,
        poolPriceInUSD: poolPriceInUSD ? poolPriceInUSD : null,
        periodFinish: poolStats?.periodFinish
          ? new BN(poolStats.periodFinish)
          : null,
        boosterPrice: poolStats?.boosterPrice
          ? new BN(poolStats.boosterPrice)
          : null,
      };
    });
    const poolArr = await Promise.all(promisedPoolsArr);
    setPools(poolArr);
  }, [ethereum, coinGecko]);

  useEffect(() => {
    getStats();
  }, [setPools, account, getStats]);
  return (
    <PoolContext.Provider
      value={{
        pools,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};

export const usePoolContext = () => useContext(PoolContext) as IPoolContext;
