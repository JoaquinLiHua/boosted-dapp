import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import ERC20ABI from "../constants/abi/ERC20.json";
import { boostToken } from "src/constants/tokenAddresses";
import { ethers } from "ethers";
import { yCRVToken, kovanGovernance } from "src/constants/tokenAddresses";
import { getDisplayBalance } from "./formatBalance";
import BN from "bignumber.js";

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (ERC20ABI.abi as unknown) as AbiItem,
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
    const tokenContract = getContract(provider, tokenAddress);
    const allowance: string = await tokenContract.methods
      .allowance(account, poolAddress)
      .call();
    return allowance;
  } catch (e) {
    return "0";
  }
};

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  const tokenContract = getContract(provider, tokenAddress);
  try {
    const balance: string = await tokenContract.methods
      .balanceOf(userAddress)
      .call();
    return balance;
  } catch (e) {
    return "0";
  }
};

export const getTotalSupply = async (provider: provider) => {
  const tokenContract = getContract(provider, boostToken);
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
  const tokenContract = getContract(provider, tokenAddress);
  const maxApprovalAmount = ethers.constants.MaxUint256.toString();
  try {
    return tokenContract.methods
      .approve(poolAddress, maxApprovalAmount)
      .send({ from: account, gas: 80000 });
  } catch (e) {
    console.log(e);
  }
};

export const getTreasuryBalance = async (provider: provider) => {
  const tokenContract = getContract(provider, yCRVToken);
  try {
    const balance = await tokenContract.methods
      .balanceOf(kovanGovernance)
      .call();
    return balance;
  } catch (e) {
    return "0";
  }
};

export const getPoolValue = async (
  provider: provider,
  poolAddress: string | null,
  tokenAddress: string,
  coinGecko: any
) => {
  if (poolAddress && coinGecko) {
    const tokenContract = getContract(provider, tokenAddress);
    try {
      const poolSize = await tokenContract.methods
        .balanceOf(poolAddress)
        .call();
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: tokenAddress,
        vs_currencies: "usd",
      });
      const priceInUSD = data[tokenAddress].usd;
      const poolSizeNumber = parseInt(
        getDisplayBalance(new BN(poolSize))
      );
      return priceInUSD * poolSizeNumber;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};
