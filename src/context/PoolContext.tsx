import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "use-wallet";
import BN from "bignumber.js";
import {
  getPoolStats,
  getPoolValueInUSD,
  getApyCalculated,
  getBoostApy,
  getBoostPoolPriceInUSD,
} from "src/utils/boost";
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
    tokenTicker: "boost-eth-lp",
    open: false,
  },
  {
    name: "Yearn Alpha (YFI)",
    code: "yfi_pool",
    order: 0,
    icon: "/images/yfi-icon.png",
    address: yfiPool,
    tokenContract: yfiToken,
    tokenTicker: "yfi",
    open: false,
  },
  {
    name: "Omakase (SUSHI)",
    code: "eth_pool",
    order: 1,
    icon: "/images/sushi-icon.png",
    address: sushiPool,
    tokenContract: sushiToken,
    tokenTicker: "sushi",
    open: false,
  },
  {
    name: "Band Wagons (BAND)",
    code: "band_pool",
    order: 2,
    icon: "/images/band-icon.svg",
    address: bandPool,
    tokenContract: bandToken,
    tokenTicker: "band",
    open: false,
  },
  {
    name: "Kyber Corp (KNC)",
    code: "knc_pool",
    order: 3,
    icon: "/images/knc-logo.svg",
    address: kncPool,
    tokenContract: kncToken,
    tokenTicker: "knc",
    open: false,
  },
  {
    name: "Compound Soils (COMP)",
    code: "comp_pool",
    order: 4,
    icon: "/images/comp-logo.svg",
    address: compPool,
    tokenContract: compToken,
    tokenTicker: "comp",
    open: false,
  },
  {
    name: "Marine Corps (LINK)",
    code: "link_pool",
    order: 5,
    icon: "/images/link-logo.svg",
    address: linkPool,
    tokenContract: linkToken,
    tokenTicker: "link",
    open: false,
  },
  {
    name: "Aave Nauts (LEND)",
    code: "lend_pool",
    order: 6,
    icon: "/images/lend-logo.svg",
    address: lendPool,
    tokenContract: lendToken,
    tokenTicker: "lend",
    open: false,
  },
  {
    name: "Synth Spartans (SNX)",
    code: "snx_pool",
    order: 7,
    icon: "/images/snx-logo.svg",
    address: snxPool,
    tokenContract: snxToken,
    tokenTicker: "snx",
    open: false,
  },
  {
    name: "Maker Mountain (MKR)",
    code: "mkr_pool",
    order: 8,
    icon: "/images/mkr-logo.svg",
    address: mkrPool,
    tokenContract: mkrToken,
    tokenTicker: "mkr",
    open: false,
  },
  {
    name: "Ren Moon (REN)",
    code: "ren_pool",
    order: 8,
    icon: "/images/ren-logo.svg",
    address: renPool,
    tokenContract: renToken,
    tokenTicker: "ren",
    open: false,
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
  apy: number | null;
  open: boolean;
}

interface IPoolContext {
  closedPools: IPool[];
  openPools: IPool[];
}

export const PoolContext = createContext<IPoolContext>({
  closedPools: [],
  openPools: [],
});

export const PoolProvider: React.FC = ({ children }) => {
  const { coinGecko } = usePriceFeedContext();
  const [closedPools, setClosedPools] = useState<IPool[]>([]);
  const [openPools, setOpenPools] = useState<IPool[]>([]);
  const { ethereum }: { ethereum: provider } = useWallet();

  const getStats = useCallback(async () => {
    const CLOSED_POOLS = ALL_POOLS.filter((e) => !e.open);
    const OPEN_POOLS = ALL_POOLS.filter((e) => e.open);

    const promisedClosedPoolsArr = CLOSED_POOLS.map(async (pool) => {
      const poolStats = await getPoolStats(ethereum, pool.address);
      let apy;
      let poolPriceInUSD;
      if (pool.code === "boost_pool") {
        apy = await getBoostApy(ethereum, coinGecko);
        poolPriceInUSD = await getBoostPoolPriceInUSD(ethereum, coinGecko);
      } else {
        apy = await getApyCalculated(
          ethereum,
          pool.address,
          pool.tokenContract,
          coinGecko
        );
        poolPriceInUSD = await getPoolValueInUSD(
          ethereum,
          pool.address,
          pool.tokenContract,
          coinGecko
        );
      }
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
        apy: apy,
        open: pool.open,
      };
    });

    const promisedOpenPoolsArr = OPEN_POOLS.map(async (pool) => {
      const poolStats = await getPoolStats(ethereum, pool.address);
      let apy;
      let poolPriceInUSD;
      if (pool.code === "boost_pool") {
        apy = await getBoostApy(ethereum, coinGecko);
        poolPriceInUSD = await getBoostPoolPriceInUSD(ethereum, coinGecko);
      } else {
        apy = await getApyCalculated(
          ethereum,
          pool.address,
          pool.tokenContract,
          coinGecko
        );
        poolPriceInUSD = await getPoolValueInUSD(
          ethereum,
          pool.address,
          pool.tokenContract,
          coinGecko
        );
      }
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
        apy: apy,
        open: pool.open,
      };
    });
    const resolvedClosedPool = await Promise.all(promisedClosedPoolsArr);
    const resolvedOpenPool = await Promise.all(promisedOpenPoolsArr);
    setClosedPools(resolvedClosedPool);
    setOpenPools(resolvedOpenPool);
  }, [ethereum, coinGecko]);

  useEffect(() => {
    getStats();
    const refreshInterval = setInterval(getStats, 30000);
    return () => clearInterval(refreshInterval);
  }, [getStats]);
  return (
    <PoolContext.Provider
      value={{
        closedPools,
        openPools,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};

export const usePoolContext = () => useContext(PoolContext) as IPoolContext;
