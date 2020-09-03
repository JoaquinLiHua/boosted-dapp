import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import POOLABI from "../constants/abi/BoostPools.json";
import BN from "bignumber.js";
import { getDisplayBalance } from "./formatBalance";
import { boostToken } from "src/constants/tokenAddresses";

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (POOLABI as unknown) as AbiItem,
    address
  );
  return contract;
};

export const getPoolStats = async (provider: provider, poolAddress: string) => {
  const poolContract = getContract(provider, poolAddress);
  try {
    const periodFinish = await poolContract.methods.periodFinish().call();
    const poolSize = await poolContract.methods.totalSupply().call();
    const boosterPrice = await poolContract.methods.boosterPrice().call();
    return {
      periodFinish,
      poolSize,
      boosterPrice,
    };
  } catch (e) {
    return null;
  }
};

export const getPoolPriceInUSD = async (
  tokenAddress: string,
  poolSize: BN,
  coinGecko: any
) => {
  try {
    const { data } = await coinGecko.simple.fetchTokenPrice({
      contract_addresses: tokenAddress,
      vs_currencies: "usd",
    });
    const priceInUSD = data[tokenAddress].usd;
    const poolSizeNumber = parseInt(getDisplayBalance(new BN(poolSize)));
    return priceInUSD * poolSizeNumber;
  } catch (e) {
    return null;
  }
};

export const stake = async (
  provider: provider,
  poolAddress: string,
  amount: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    const now = new Date().getTime() / 1000;
    const web3 = new Web3(provider);
    const tokens = web3.utils.toWei(amount.toString(), "ether");
    const bntokens = web3.utils.toBN(tokens);
    if (now >= 1598965200) {
      return poolContract.methods
        .stake(bntokens)
        .send({ from: account })
        .on("transactionHash", (tx) => {
          console.log(tx);
          return tx.transactionHash;
        });
    } else {
      alert("pool not active");
    }
  } else {
    alert("wallet not connected");
  }
};

export const unstake = async (
  provider: provider,
  poolAddress: string,
  amount: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
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
  } else {
    alert("wallet not connected");
  }
};

export const rewardAmount = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    try {
      const earnedRewards = await poolContract.methods.earned(account).call();
      return earnedRewards;
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("wallet not connected");
  }
};

export const claim = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    return poolContract.methods
      .getReward()
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } else {
    alert("wallet not connected");
  }
};

export const boost = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    const now = new Date().getTime() / 1000;
    if (now >= 1599138000) {
      return poolContract.methods
        .boost()
        .send({ from: account })
        .on("transactionHash", (tx) => {
          console.log(tx);
          return tx.transactionHash;
        });
    } else {
      alert("pool not active");
    }
  } else {
    alert("wallet not connected");
  }
};

export const boostCount = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    try {
      const boosterCount = await poolContract.methods
        .numBoostersBought(account)
        .call();
      return boosterCount;
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("wallet not connected");
  }
};

export const stakedAmount = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    try {
      const stakedAmount = await poolContract.methods.balanceOf(account).call();
      return stakedAmount;
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("wallet not connected");
  }
};

export const exit = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    return poolContract.methods
      .exit()
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } else {
    alert("wallet not connected");
  }
};

export const getApyCalculated = async (
  provider: provider,
  poolAddress: string,
  tokenAddress: string,
  coinGecko: any
) => {
  try {
    const poolContract = getContract(provider, poolAddress);
    const rewardPerToken = await poolContract.methods.rewardPerToken().call();
    const weeklyRewards = (rewardPerToken / 1e18) * 604800;
    const { data } = await coinGecko.simple.fetchTokenPrice({
      contract_addresses: [
        tokenAddress,
        "0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78",
      ],
      vs_currencies: "usd",
    });
    const tokenPriceInUSD = data[tokenAddress].usd;
    const apy =
      ((weeklyRewards * tokenPriceInUSD * 100) / data[boostToken].usd) * 52;
    console.log(weeklyRewards);
    console.log(data[boostToken].usd);
    console.log(apy);
    return apy;
  } catch (e) {
    return null;
  }
};
