import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import BoostVaultABI from "../constants/abi/BoostVault.json";
import BoostVaultRewardsABI from "../constants/abi/BoostVaultRewards.json";
// import Notify from "bnc-notify";

// const options = {
//   dappId: "6d987d84-81c4-4224-9b30-bf5db73ee93e",
//   networkId: 1,
//   darkMode: true,
// };

// // initialize notify
// const notify = Notify(options);

export const getVaultContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (BoostVaultABI as unknown) as AbiItem,
    address
  );
  return contract;
};

export const getVaultRewardsContract = (
  provider: provider,
  address: string
) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (BoostVaultRewardsABI as unknown) as AbiItem,
    address
  );
  return contract;
};

export const deposit = async (
  provider: provider,
  vaultAddress: string,
  amount: string,
  decimals: number,
  account: string
) => {
  const vaultContract = getVaultContract(provider, vaultAddress);
  const web3 = new Web3(provider);
  const tokens = (Number(amount) * Math.pow(10, decimals)).toFixed(0);
  const bntokens = web3.utils.toBN(tokens);
  return vaultContract.methods
    .deposit(bntokens)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      // const { emitter } = notify.hash(tx);
      // emitter.on("all", (transaction) => ({
      //   onclick: () =>
      //     window.open(
      //       `https://etherscan.io/tx/${transaction.hash}`,
      //       "_blank",
      //       "noopener, norefferer"
      //     ),
      // }));
      return tx.transactionHash;
    });
};

export const withdraw = async (
  provider: provider,
  vaultAddress: string,
  amount: string,
  decimals: number,
  account: string
) => {
  const vaultContract = getVaultContract(provider, vaultAddress);
  const web3 = new Web3(provider);
  // console.log(Number(amount));
  // console.log(Number(amount) / Math.pow(10, decimals));
  const tokens = Math.trunc(Number(amount) * Math.pow(10, decimals));
  // console.log(tokens);
  // Current value WRONG: 110327327 = 110.32 usdc
  // 55058418 = 55.xx usdc
  // 0x2e1a7d4d0000000000000000000000000000000000000000000000000000000003481ff2
  // 11032732 = 11.032
  // 0x2e1a7d4d0000000000000000000000000000000000000000000000000000000000a8589c
  // 99292944 =
  const bntokens = web3.utils.toBN(tokens);
  return vaultContract.methods
    .withdraw(bntokens)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      // const { emitter } = notify.hash(tx);
      // emitter.on("all", (transaction) => ({
      //   onclick: () =>
      //     window.open(
      //       `https://etherscan.io/tx/${transaction.hash}`,
      //       "_blank",
      //       "noopener, norefferer"
      //     ),
      // }));
      return tx.transactionHash;
    });
};

export const getRewardAmount = async (
  provider: provider,
  vaultRewardsAddress: string,
  account: string | null
): Promise<string> => {
  if (account && provider) {
    try {
      const vaultRewardsContract = getVaultRewardsContract(
        provider,
        vaultRewardsAddress
      );
      const claimableRewards: string = await vaultRewardsContract.methods
        .earned(account)
        .call();
      return claimableRewards;
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
  vaultRewardsAddress: string,
  account: string | null
) => {
  try {
    const vaultRewardsContract = getVaultRewardsContract(
      provider,
      vaultRewardsAddress
    );
    return vaultRewardsContract.methods
      .getReward(account)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        // const { emitter } = notify.hash(tx);
        // emitter.on("all", (transaction) => ({
        //   onclick: () =>
        //     window.open(
        //       `https://etherscan.io/tx/${transaction.hash}`,
        //       "_blank",
        //       "noopener, norefferer"
        //     ),
        // }));
        return tx.transactionHash;
      });
  } catch (e) {
    console.log(e);
  }
};

export const stake = async (
  provider: provider,
  vaultRewardsAddress: string,
  amount: string,
  decimals: number,
  account: string
) => {
  const vaultRewardsContract = getVaultRewardsContract(
    provider,
    vaultRewardsAddress
  );
  const web3 = new Web3(provider);
  const tokens = (Number(amount) * Math.pow(10, decimals)).toFixed(0);
  const bntokens = web3.utils.toBN(tokens);
  return await vaultRewardsContract.methods
    .stake(bntokens)
    .send({ from: account })
    .on("transactionHash", (tx) => {
    //   const { emitter } = notify.hash(tx);
    //   emitter.on("all", (transaction) => ({
    //     onclick: () =>
    //       window.open(
    //         `https://etherscan.io/tx/${transaction.hash}`,
    //         "_blank",
    //         "noopener, norefferer"
    //       ),
    //   }));
      return tx.transactionHash;
    });
};

export const unstake = async (
  provider: provider,
  vaultRewardsAddress: string,
  amount: string,
  decimals: number,
  account: string
) => {
  try {
    const vaultRewardsContract = getVaultRewardsContract(
      provider,
      vaultRewardsAddress
    );
    const web3 = new Web3(provider);
    const tokens = (Number(amount) * Math.pow(10, decimals)).toFixed(0);
    const bntokens = web3.utils.toBN(tokens);
    return await vaultRewardsContract.methods
      .withdraw(bntokens)
      .send({ from: account })
      // .on("transactionHash", (tx) => {
      //   const { emitter } = notify.hash(tx);
      //   emitter.on("all", (transaction) => ({
      //     onclick: () =>
      //       window.open(
      //         `https://etherscan.io/tx/${transaction.hash}`,
      //         "_blank",
      //         "noopener, norefferer"
      //       ),
      //   }));
      //   return tx.transactionHash;
      // });
  } catch (e) {
    console.log(e);
  }
};

export const getStakedAmount = async (
  provider: provider,
  stakedAddress: string,
  account: string | null
): Promise<string> => {
  if (account) {
    try {
      const vaultRewardsAddress = getVaultRewardsContract(
        provider,
        stakedAddress
      );
      const stakedAmount = await vaultRewardsAddress.methods
        .balanceOf(account)
        .call();
      return stakedAmount;
    } catch (e) {
      console.log(e);
      return "0";
    }
  } else {
    return "0";
  }
};

export const getDepositedAmount = async (
  provider: provider,
  vaultAddress: string,
  account: string | null
): Promise<string> => {
  if (account) {
    try {
      const vaultRewardsAddress = getVaultContract(provider, vaultAddress);
      const depositedAmount = await vaultRewardsAddress.methods
        .balanceOf(account)
        .call();
      return depositedAmount;
    } catch (e) {
      console.log(e);
      return "0";
    }
  } else {
    return "0";
  }
};

export const getPricePerFullShare = async (
  provider: provider,
  vaultAddress: string
): Promise<string> => {
  try {
    const vaultContract = getVaultContract(provider, vaultAddress);
    const pricePerFullShare = await vaultContract.methods
      .getPricePerFullShare()
      .call();
    return pricePerFullShare;
  } catch (e) {
    console.log(e);
    return "0";
  }
};

export const getWithdrawalFee = async (
  provider: provider,
  vaultAddress: string
): Promise<{ withdrawFee: string; denom: string }> => {
  try {
    const vaultContract = getVaultContract(provider, vaultAddress);
    const denom = await vaultContract.methods.DENOM().call();
    const withdrawFee = await vaultContract.methods.withdrawalFee().call();
    return { withdrawFee, denom };
  } catch (e) {
    console.log(e);
    return { withdrawFee: "0", denom: "0" };
  }
};

export const getNextBoosterAvailable = async (
  provider: provider,
  vaultRewardAddress: string,
  account: string
): Promise<string> => {
  try {
    const vaultRewardsContract = getVaultRewardsContract(
      provider,
      vaultRewardAddress
    );
    const periodFinish = await vaultRewardsContract.methods
      .nextBoostPurchaseTime(account)
      .call();
    return periodFinish;
  } catch (e) {
    console.log(e);
    return "9999";
  }
};

export const getBoostedBalance = async (
  provider: provider,
  vaultRewardAddress: string,
  account: string
): Promise<string> => {
  try {
    const vaultRewardsContract = getVaultRewardsContract(
      provider,
      vaultRewardAddress
    );
    const boostedBalance = await vaultRewardsContract.methods
      .boostedBalances(account)
      .call();
    return boostedBalance;
  } catch (e) {
    console.log(e);
    return "0";
  }
};

export const getBoosterInfo = async (
  provider: provider,
  vaultRewardAddress: string,
  account: string
): Promise<{ boosterPrice: string; newBoostBalance: string }> => {
  try {
    const vaultRewardsContract = getVaultRewardsContract(
      provider,
      vaultRewardAddress
    );
    const boosterInfo = await vaultRewardsContract.methods
      .getBoosterPrice(account)
      .call();
    const newBoostBalance = boosterInfo["newBoostBalance"];
    const boosterPrice = boosterInfo["boosterPrice"];
    return { boosterPrice, newBoostBalance };
  } catch (e) {
    console.log(e);
    return { boosterPrice: "0", newBoostBalance: "0" };
  }
};

export const boostCount = async (
  provider: provider,
  vaultRewardAddress: string,
  account: string
): Promise<string> => {
  const vaultRewardContract = getVaultRewardsContract(
    provider,
    vaultRewardAddress
  );
  try {
    const boosterCount = await vaultRewardContract.methods
      .numBoostersBought(account)
      .call();
    return boosterCount;
  } catch (e) {
    console.log(e);
    return "0";
  }
};

export const boost = async (
  provider: provider,
  vaultRewardAddress: string,
  account: string | null
) => {
  try {
    const vaultRewardContract = getVaultRewardsContract(
      provider,
      vaultRewardAddress
    );
    return vaultRewardContract.methods
      .boost()
      .send({ from: account })
      .on("transactionHash", (tx) => {
        // const { emitter } = notify.hash(tx);
        // emitter.on("all", (transaction) => ({
        //   onclick: () =>
        //     window.open(
        //       `https://etherscan.io/tx/${transaction.hash}`,
        //       "_blank",
        //       "noopener, norefferer"
        //     ),
        // }));
        return tx.transactionHash;
      });
  } catch (e) {
    console.log(e);
  }
};

// @TODO - support non-stable coins
export const getVaultValueLocked = async (
  provider: provider,
  vaultAddress: string,
  vaultRewardAddress: string,
  decimals: number
): Promise<number> => {
  try {
    const vaultContract = getVaultContract(provider, vaultAddress);
    const pricePerFullShare = await getPricePerFullShare(
      provider,
      vaultAddress
    );
    const vaultSize: string = await vaultContract.methods
      .balanceOf(vaultRewardAddress)
      .call();

    const vaultSizeNum = Number(vaultSize) / Math.pow(10, decimals);
    const pricePerFullShareNum = Number(pricePerFullShare) / 1e18;
    return vaultSizeNum * pricePerFullShareNum;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
