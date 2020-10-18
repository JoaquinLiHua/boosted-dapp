import BN from "bignumber.js";
import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import BoostVaultABI from "../constants/abi/BoostVault.json";
import BoostVaultRewardsABI from "../constants/abi/BoostVaultRewards.json";

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
  amount: BN,
  account: string
) => {
  const vaultContract = getVaultContract(provider, vaultAddress);
  return vaultContract.methods
    .deposit(amount)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const withdraw = async (
  provider: provider,
  vaultAddress: string,
  amount: BN,
  account: string
) => {
  const vaultContract = getVaultContract(provider, vaultAddress);
  return vaultContract.methods
    .withdraw(amount)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
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

export const stake = async (
  provider: provider,
  vaultRewardsAddress: string,
  amount: BN,
  account: string
) => {
  const vaultRewardsContract = getVaultRewardsContract(
    provider,
    vaultRewardsAddress
  );
  return vaultRewardsContract.methods
    .stake(amount)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const unstake = async (
  provider: provider,
  vaultRewardsAddress: string,
  amount: BN,
  account: string
) => {
  try {
    const vaultRewardsContract = getVaultRewardsContract(
      provider,
      vaultRewardsAddress
    );
    return vaultRewardsContract.methods
      .withdraw(amount)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } catch (e) {
    console.log(e);
  }
};
