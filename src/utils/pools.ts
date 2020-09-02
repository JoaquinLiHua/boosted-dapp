import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import POOLABI from "../constants/abi/BoostPools.json";
import BigNumber from "bignumber.js";
import { getDisplayBalance } from "./formatBalance";

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 250000,
  },
  EXIT: {
    DEFAULT: 300000,
  },
};

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
  poolSize: BigNumber,
  coinGecko: any
) => {
  try {
    const { data } = await coinGecko.simple.fetchTokenPrice({
      contract_addresses: tokenAddress,
      vs_currencies: "usd",
    });
    const priceInUSD = data[tokenAddress].usd;
    const poolSizeNumber = parseInt(getDisplayBalance(new BigNumber(poolSize)));
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
    const gas = GAS_LIMIT.STAKING.DEFAULT;
    if (now >= 1597172400) {
      return poolContract.methods
        .stake(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account, gas })
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
    const gas = GAS_LIMIT.STAKING.DEFAULT;
    const now = new Date().getTime() / 1000;
    if (now >= 1597172400) {
      return poolContract.methods
        .withdraw(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account, gas: gas })
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
    const gas = GAS_LIMIT.STAKING.DEFAULT;
    const now = new Date().getTime() / 1000;
    if (now >= 1597172400) {
      return poolContract.methods
        .getReward()
        .send({ from: account, gas: gas })
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

export const boost = async (
  provider: provider,
  poolAddress: string,
  account: string | null
) => {
  if (account) {
    const poolContract = getContract(provider, poolAddress);
    const gas = GAS_LIMIT.STAKING.DEFAULT;
    const now = new Date().getTime() / 1000;
    if (now >= 1597172400) {
      return poolContract.methods
        .boost()
        .send({ from: account, gas: gas })
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
      const boostedBalances = await poolContract.methods
        .boostedBalances(account)
        .call();
      return boostedBalances;
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
    const gas = GAS_LIMIT.EXIT.DEFAULT;
    const now = new Date().getTime() / 1000;
    if (now >= 1597172400) {
      return poolContract.methods
        .exit()
        .send({ from: account, gas: gas })
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

// const getApyCalculated = () => {};

// const get_synth_weekly_rewards = async function(synth_contract_instance) {
//   if (await isRewardPeriodOver(synth_contract_instance)) {
//     return 0
//   }

//   const rewardRate = await synth_contract_instance.rewardRate()
//   return Math.round((rewardRate / 1e18) * 604800)
// }

// const isRewardPeriodOver = async function(reward_contract_instance) {
//   const now = Date.now() / 1000
//   const periodFinish = await getPeriodFinishForReward(reward_contract_instance)
//   return periodFinish < now
// }

// const weekly_reward = await get_synth_weekly_rewards(Y_STAKING_POOL);
// const rewardPerToken = weekly_reward / totalStakedYAmount;
