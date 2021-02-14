import Web3 from 'web3';
import ERC20ABI from '../constants/abi/ERC20.json';
import { ethers } from 'ethers';

export const getERC20Contract = (provider: any, address: string) => {
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract((ERC20ABI.abi as unknown) as AbiItem, address);
	return contract;
};

export const getAllowance = async (
	provider: any,
	tokenAddress: string,
	addressToCheck: string,
	walletAddress: string
) => {
	try {
		const tokenContract = getERC20Contract(provider, tokenAddress);
		const allowance: string = await tokenContract.methods
			.allowance(walletAddress, addressToCheck)
			.call();
		return allowance;
	} catch (e) {
		return '0';
	}
};

export const approve = async (
	provider: any,
	tokenAddress: string,
	contractAddress: string,
	walletAddress: string | null
) => {
	const tokenContract = getERC20Contract(provider, tokenAddress);
	const maxApprovalAmount = ethers.constants.MaxUint256.toString();
	try {
		return tokenContract.methods
			.approve(contractAddress, maxApprovalAmount)
			.send({ from: walletAddress, gas: 80000 });
	} catch (e) {
		console.log(e);
	}
};
