import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import ERC20ABI from "../constants/abi/ERC20.json";
import POOLABI from "../constants/abi/BoostPools.json";
import POOLV2ABI from "../constants/abi/BoostPoolV2.json";
import {
  boostToken,
  uniswapPool,
  wethToken,
  uniswapLPToken,
  uniswapPoolV2,
  treasuryV2Contract,
} from "src/constants/tokenAddresses";
import { ethers } from "ethers";
import { yCRVToken, governanceContract } from "src/constants/tokenAddresses";
import BN from "bignumber.js";

export const getERC20Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (ERC20ABI.abi as unknown) as AbiItem,
    address
  );
  return contract;
};

export const getPoolContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (POOLABI as unknown) as AbiItem,
    address
  );
  return contract;
};

export const getPoolV2Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (POOLV2ABI as unknown) as AbiItem,
    address
  );
  return contract;
};

export const getAllowance = async (
  provider: provider,
  tokenAddress: string,
  poolAddress: string,
  account: string
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    const allowance: string = await tokenContract.methods
      .allowance(account, poolAddress)
      .call();
    return allowance;
  } catch (e) {
    return "0";
  }
};

export const getTokenBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    const balance: string = await tokenContract.methods
      .balanceOf(userAddress)
      .call();
    return balance;
  } catch (e) {
    return "0";
  }
};

export const getTotalSupply = async (provider: provider): Promise<string> => {
  const tokenContract = getERC20Contract(provider, boostToken);
  try {
    const totalSupply: string = await tokenContract.methods
      .totalSupply()
      .call();
    return totalSupply;
  } catch (e) {
    return "0";
  }
};

export const approve = async (
  provider: provider,
  tokenAddress: string,
  poolAddress: string,
  account: string | null
) => {
  const tokenContract = getERC20Contract(provider, tokenAddress);
  const maxApprovalAmount = ethers.constants.MaxUint256.toString();
  try {
    return tokenContract.methods
      .approve(poolAddress, maxApprovalAmount)
      .send({ from: account, gas: 80000 });
  } catch (e) {
    console.log(e);
  }
};

export const getTreasuryBalance = async (
  provider: provider
): Promise<string> => {
  const tokenContract = getERC20Contract(provider, yCRVToken);
  try {
    const balance = await tokenContract.methods
      .balanceOf(governanceContract)
      .call();
    return balance;
  } catch (e) {
    return "0";
  }
};

export const getTreasuryV2Balance = async (
  provider: provider
): Promise<string> => {
  const tokenContract = getERC20Contract(provider, yCRVToken);
  try {
    const balance = await tokenContract.methods
      .balanceOf(treasuryV2Contract)
      .call();
    return balance;
  } catch (e) {
    return "0";
  }
};

interface PoolStats {
  periodFinish: string;
  poolSize: string;
  boosterPrice: string;
}

export const getPoolStats = async (
  provider: provider,
  poolAddress: string,
  v1: boolean,
  account: string | null
): Promise<PoolStats | null> => {
  if (provider && account) {
    try {
      let poolContract;
      let periodFinish;
      let poolSize;
      let boosterPrice;
      if (v1) {
        poolContract = getPoolContract(provider, poolAddress);
        poolSize = await poolContract.methods.totalSupply().call();
      } else {
        poolContract = getPoolV2Contract(provider, poolAddress);
        periodFinish = await poolContract.methods.periodFinish().call();
        poolSize = await poolContract.methods.totalSupply().call();
        const boosterInfo = await poolContract.methods
          .getBoosterPrice(account)
          .call();
        boosterPrice = boosterInfo["boosterPrice"];
      }
      return {
        periodFinish,
        poolSize,
        boosterPrice,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  } else {
    return null;
  }
};

export const getPoolValueInUSD = async (
  provider: provider,
  poolAddress: string,
  tokenAddress: string,
  coinGecko: any
): Promise<number> => {
  if (provider && poolAddress && coinGecko) {
    try {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: tokenAddress,
        vs_currencies: "usd",
      });
      const tokenContract = getPoolContract(provider, tokenAddress);
      const poolSize =
        (await tokenContract.methods.balanceOf(poolAddress).call()) / 1e18;
      const priceInUSD = data[tokenAddress].usd;
      const poolSizeNumber = new BN(poolSize).toNumber();
      return priceInUSD * poolSizeNumber;
    } catch (e) {
      console.log(e);
      return 0;
    }
  } else {
    return 0;
  }
};

export const getBoostPoolPriceInUSD = async (
  provider: provider,
  coinGecko: any
): Promise<number> => {
  if (provider && coinGecko) {
    try {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [wethToken, boostToken],
        vs_currencies: "usd",
      });
      const poolContract = getPoolContract(provider, uniswapPool);
      const boostTokenContract = getERC20Contract(provider, boostToken);
      const wethTokenContract = getERC20Contract(provider, wethToken);
      const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);
      const totalUNIAmount =
        (await boostWethUniContract.methods.totalSupply().call()) / 1e18;
      const totalBoostAmount =
        (await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;
      const totalWETHAmount =
        (await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;
      const boostPoolSize =
        (await poolContract.methods.totalSupply().call()) / 1e18;
      const boostPerUNI = totalBoostAmount / totalUNIAmount;
      const WETHPerUNI = totalWETHAmount / totalUNIAmount;
      if (data) {
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const wethPriceInUSD = data[wethToken.toLowerCase()].usd;
        const UNIPrice =
          boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;
        const poolSizeNumber = new BN(boostPoolSize).toNumber();
        return UNIPrice * poolSizeNumber;
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  } else {
    return 0;
  }
};

export const getBoostPoolV2PriceInUSD = async (
  provider: provider,
  coinGecko: any
): Promise<number> => {
  if (provider && coinGecko) {
    try {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [wethToken, boostToken],
        vs_currencies: "usd",
      });
      const poolContract = getPoolContract(provider, uniswapPoolV2);
      const boostTokenContract = getERC20Contract(provider, boostToken);
      const wethTokenContract = getERC20Contract(provider, wethToken);
      const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);
      const totalUNIAmount =
        (await boostWethUniContract.methods.totalSupply().call()) / 1e18;
      const totalBoostAmount =
        (await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;
      const totalWETHAmount =
        (await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;
      const boostPoolSize =
        (await poolContract.methods.totalSupply().call()) / 1e18;
      const boostPerUNI = totalBoostAmount / totalUNIAmount;
      const WETHPerUNI = totalWETHAmount / totalUNIAmount;
      if (data) {
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const wethPriceInUSD = data[wethToken.toLowerCase()].usd;
        const UNIPrice =
          boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;
        const poolSizeNumber = new BN(boostPoolSize).toNumber();
        return UNIPrice * poolSizeNumber;
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  } else {
    return 0;
  }
};

export const getBalancerPoolPriceInUSD = async (
  provider: provider,
  coinGecko: any,
  poolAddress: string,
  lpTokenAddress: string,
  tokenTwo?: string
): Promise<number> => {
  if (provider && coinGecko && tokenTwo) {
    try {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [tokenTwo, boostToken],
        vs_currencies: "usd",
      });
      const poolContract = getPoolContract(provider, poolAddress);
      const boostTokenContract = getERC20Contract(provider, boostToken);
      const tokenTwoContract = getERC20Contract(provider, tokenTwo);
      const lpTokenContract = getERC20Contract(provider, lpTokenAddress);
      const totalBalancerAmount =
        (await lpTokenContract.methods.totalSupply().call()) / 1e18;
      const totalBoostAmount =
        (await boostTokenContract.methods.balanceOf(lpTokenAddress).call()) /
        1e18;
      const totalTokenTwoAmount =
        (await tokenTwoContract.methods.balanceOf(lpTokenAddress).call()) /
        1e18;
      const boostPoolSize =
        (await poolContract.methods.totalSupply().call()) / 1e18;
      const boostPerBalancer = totalBoostAmount / totalBalancerAmount;
      const tokenTwoPerBalancer = totalTokenTwoAmount / totalBalancerAmount;
      if (data) {
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const tokenTwoPriceInUSD = data[tokenTwo.toLowerCase()].usd;
        const balancerPrice =
          boostPerBalancer * boostPriceInUSD +
          tokenTwoPerBalancer * tokenTwoPriceInUSD;
        const poolSizeNumber = new BN(boostPoolSize).toNumber();
        return balancerPrice * poolSizeNumber;
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  } else {
    return 0;
  }
};

export const stake = async (
  provider: provider,
  poolAddress: string,
  amount: string,
  account: string
) => {
  const poolContract = getPoolContract(provider, poolAddress);
  const now = new Date().getTime() / 1000;
  const web3 = new Web3(provider);
  const tokens = web3.utils.toWei(amount.toString(), "ether");
  const bntokens = web3.utils.toBN(tokens);
  if (now >= 1601557200) {
    return poolContract.methods
      .stake(bntokens)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } else {
    alert("Pool no longer active");
  }
};

export const unstake = async (
  provider: provider,
  poolAddress: string,
  amount: string,
  account: string
) => {
  try {
    const poolContract = getPoolContract(provider, poolAddress);
    const web3 = new Web3(provider);
    const tokens = web3.utils.toWei(amount.toString(), "ether");
    const bntokens = web3.utils.toBN(tokens);
    return poolContract.methods
      .withdraw(bntokens)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } catch (e) {
    console.log(e);
  }
};

export const rewardAmount = async (
  provider: provider,
  poolAddress: string,
  account: string | null
): Promise<string> => {
  if (account && provider) {
    try {
      const poolContract = getPoolContract(provider, poolAddress);
      const earnedRewards: string = await poolContract.methods
        .earned(account)
        .call();
      return earnedRewards;
    } catch (e) {
      console.log(e);
      return "0";
    }
  } else {
    return "0";
  }
};

export const claim = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  try {
    const poolContract = getPoolContract(provider, poolAddress);
    return poolContract.methods
      .getReward()
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } catch (e) {
    console.log(e);
  }
};

export const boost = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  try {
    const poolContract = getPoolContract(provider, poolAddress);
    const now = new Date().getTime() / 1000;
    if (now >= 1601557200) {
      return poolContract.methods
        .boost()
        .send({ from: account })
        .on("transactionHash", (tx) => {
          console.log(tx);
          return tx.transactionHash;
        });
    } else {
      alert("Pool not active");
    }
  } catch (e) {
    console.log(e);
  }
};

export const boostCount = async (
  provider: provider,
  poolAddress: string,
  account: string
): Promise<string> => {
  const poolContract = getPoolContract(provider, poolAddress);
  try {
    const boosterCount = await poolContract.methods
      .numBoostersBought(account)
      .call();
    return boosterCount;
  } catch (e) {
    console.log(e);
    return "0";
  }
};

export const stakedAmount = async (
  provider: provider,
  poolAddress: string,
  account: string | null
): Promise<string> => {
  if (account) {
    try {
      const poolContract = getPoolContract(provider, poolAddress);
      const stakedAmount = await poolContract.methods.balanceOf(account).call();
      return stakedAmount;
    } catch (e) {
      console.log(e);
      return "0";
    }
  } else {
    return "0";
  }
};

export const exit = async (
  provider: provider,
  poolAddress: string,
  account: string
) => {
  try {
    const poolContract = getPoolContract(provider, poolAddress);
    return poolContract.methods
      .exit()
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } catch (e) {
    console.log(e);
  }
};

export const getApyCalculated = async (
  provider: provider,
  poolAddress: string,
  tokenAddress: string,
  coinGecko: any
) => {
  if (provider && coinGecko) {
    try {
      const poolContract = getPoolContract(provider, poolAddress);
      const weeklyRewards = await getWeeklyRewards(poolContract);
      const rewardPerToken =
        weeklyRewards / (await poolContract.methods.totalSupply().call());
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [tokenAddress, boostToken],
        vs_currencies: "usd",
      });
      if (data && data[tokenAddress]) {
        const tokenPriceInUSD = data[tokenAddress].usd;
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const apy =
          ((rewardPerToken * boostPriceInUSD * 100) / tokenPriceInUSD) * 52;
        return Number(apy.toFixed(2));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  } else {
    return null;
  }
};

export const getBoostApy = async (provider: provider, coinGecko: any) => {
  if (provider && coinGecko) {
    try {
      const poolContract = getPoolContract(provider, uniswapPool);
      const boostTokenContract = getERC20Contract(provider, boostToken);
      const wethTokenContract = getERC20Contract(provider, wethToken);
      const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);

      const weeklyRewards = await getWeeklyRewards(poolContract);

      const rewardPerToken =
        weeklyRewards / (await poolContract.methods.totalSupply().call());

      const totalUNIAmount =
        (await boostWethUniContract.methods.totalSupply().call()) / 1e18;

      const totalBoostAmount =
        (await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;
      const totalWETHAmount =
        (await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;

      const boostPerUNI = totalBoostAmount / totalUNIAmount;
      const WETHPerUNI = totalWETHAmount / totalUNIAmount;

      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [wethToken, boostToken],
        vs_currencies: "usd",
      });
      if (data) {
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const wethPriceInUSD = data[wethToken.toLowerCase()].usd;

        const UNIPrice =
          boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;

        const BoostWeeklyROI =
          (rewardPerToken * boostPriceInUSD * 100) / UNIPrice;

        const apy = BoostWeeklyROI * 52;
        return Number(apy.toFixed(2));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  } else {
    return null;
  }
};

export const getBoostV2Apy = async (provider: provider, coinGecko: any) => {
  if (provider && coinGecko) {
    try {
      const poolContract = getPoolV2Contract(provider, uniswapPoolV2);
      const boostTokenContract = getERC20Contract(provider, boostToken);
      const wethTokenContract = getERC20Contract(provider, wethToken);
      const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);

      const weeklyRewards = await getWeeklyRewards(poolContract);

      const rewardPerToken =
        weeklyRewards / (await poolContract.methods.totalSupply().call());

      const totalUNIAmount =
        (await boostWethUniContract.methods.totalSupply().call()) / 1e18;

      const totalBoostAmount =
        (await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;
      const totalWETHAmount =
        (await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) /
        1e18;

      const boostPerUNI = totalBoostAmount / totalUNIAmount;
      const WETHPerUNI = totalWETHAmount / totalUNIAmount;

      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [wethToken, boostToken],
        vs_currencies: "usd",
      });
      if (data) {
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const wethPriceInUSD = data[wethToken.toLowerCase()].usd;

        const UNIPrice =
          boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;

        const BoostWeeklyROI =
          (rewardPerToken * boostPriceInUSD * 100) / UNIPrice;

        const apy = BoostWeeklyROI * 52;
        return Number(apy.toFixed(2));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  } else {
    return null;
  }
};

export const getBalancerAPY = async (
  provider: provider,
  coinGecko: any,
  poolAddress: string,
  lpTokenContract: string,
  tokenTwo?: string
) => {
  if (provider && coinGecko && tokenTwo) {
    try {
      const poolContract = getPoolV2Contract(provider, poolAddress);
      const boostContract = getERC20Contract(provider, boostToken);
      const tokenTwoContract = getERC20Contract(provider, tokenTwo);
      const balancerTokenContract = getERC20Contract(provider, lpTokenContract);

      const weeklyRewards = await getWeeklyRewards(poolContract);

      const rewardPerToken =
        weeklyRewards / (await poolContract.methods.totalSupply().call());

      const totalBalancerAmount =
        (await balancerTokenContract.methods.totalSupply().call()) / 1e18;

      const totalBoostAmount =
        (await boostContract.methods.balanceOf(balancerTokenContract).call()) /
        1e18;
      const totalTokenTwoAmount =
        (await tokenTwoContract.methods
          .balanceOf(balancerTokenContract)
          .call()) / 1e18;

      const boostPerBalancer = totalBoostAmount / totalBalancerAmount;
      const totalTwoPerBalancer = totalTokenTwoAmount / totalBalancerAmount;

      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [tokenTwo, boostToken],
        vs_currencies: "usd",
      });
      if (data) {
        const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
        const tokenTwoPriceInUSD = data[tokenTwo.toLowerCase()].usd;

        const balancerPrice =
          boostPerBalancer * boostPriceInUSD +
          totalTwoPerBalancer * tokenTwoPriceInUSD;

        const BoostWeeklyROI =
          (rewardPerToken * boostPriceInUSD * 100) / balancerPrice;

        const apy = BoostWeeklyROI * 52;
        return Number(apy.toFixed(2));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  } else {
    return null;
  }
};

const getWeeklyRewards = async function (synthContract) {
  if (await isRewardPeriodOver(synthContract)) {
    return 0;
  }
  const rewardRate = await synthContract.methods.rewardRate().call();
  return Math.round(rewardRate * 604800);
};

const isRewardPeriodOver = async function (rewardContract) {
  const now = Date.now() / 1000;
  const periodFinish = await getPeriodFinishForReward(rewardContract);
  return periodFinish < now;
};

const getPeriodFinishForReward = async function (rewardContract) {
  return await rewardContract.methods.periodFinish().call();
};

export const getNextBoosterAvailable = async (
  provider: provider,
  poolAddress: string,
  account: string
): Promise<string> => {
  try {
    const poolContract = getPoolContract(provider, poolAddress);
    const periodFinish = await poolContract.methods
      .nextBoostPurchaseTime(account)
      .call();
    return periodFinish;
  } catch (e) {
    console.log(e);
    return "9999";
  }
};
