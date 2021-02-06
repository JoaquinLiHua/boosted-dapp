import Web3 from 'web3';

import { AbiItem } from 'web3-utils';
import Governance from '../constants/abi/Governance.json';
import { governanceContract } from 'constants/bfAddresses';

export const getContract = (provider: any, address: string) => {
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract((Governance as unknown) as AbiItem, address);
	return contract;
};

export const getTotalStaked = async (provider: any) => {
	try {
		const contract = getContract(provider, governanceContract);
		const totalStaked = await contract.methods.totalSupply().call();
		return totalStaked;
	} catch (e) {
		return null;
	}
};

export const proposals = async (provider: any) => {
	const contract = getContract(provider, governanceContract);
	try {
		const proposalCount = await getProposalCount(provider);
		const proposals: any[] = [];
		for (let i = 0; i < proposalCount; i++) {
			const proposal = await contract.methods.proposals(i).call();
			proposals.push(proposal);
		}
		return proposals;
	} catch (e) {
		return null;
	}
};

export const getSingleProposal = async (provider: any, id: number) => {
	try {
		const contract = getContract(provider, governanceContract);
		const proposal = await contract.methods.proposals(id).call();
		return proposal;
	} catch (e) {
		return null;
	}
};

export const getProposalCount = async (provider: any) => {
	const contract = getContract(provider, governanceContract);
	try {
		const count = await contract.methods.proposalCount().call();
		return count;
	} catch (e) {
		return null;
	}
};

export const submitProposal = async (provider: any, walletAddress: any | null, values: any) => {
	if (walletAddress) {
		try {
			const contract = getContract(provider, governanceContract);
			const web3 = new Web3(provider);
			const amount: string = values.withdrawAmount;
			const tokens = web3.utils.toWei(amount.toString(), 'ether');
			const bntokens = web3.utils.toBN(tokens);
			const tx = await contract.methods
				.propose(values.url.toString(), bntokens, values.withdrawAddress.toString())
				.send({
					from: walletAddress,
				});
			return tx;
		} catch (e) {
			console.log(e);
			return null;
		}
	} else {
		return null;
	}
};

export const stakeForProposal = async (
	provider: any,
	walletAddress: string | null,
	amount: string
) => {
	if (walletAddress) {
		const contract = getContract(provider, governanceContract);
		const web3 = new Web3(provider);
		const tokens = web3.utils.toWei(amount.toString(), 'ether');
		const bntokens = web3.utils.toBN(tokens);
		return contract.methods
			.stake(bntokens)
			.send({ from: walletAddress })
			.on('transactionHash', (tx) => {
				console.log(tx);
				return tx.transactionHash;
			});
	} else {
		alert('wallet not connected');
	}
};

export const getStaked = async (provider: any, walletAddress: string) => {
	if (walletAddress) {
		try {
			const contract = getContract(provider, governanceContract);
			const stakedAmount = await contract.methods.balanceOf(walletAddress).call();
			return stakedAmount;
		} catch (e) {
			return null;
		}
	} else {
		alert('wallet not connected');
		return null;
	}
};

export const voteFor = async (
	provider: any,
	walletAddress: string,
	id: string | string[] | undefined
) => {
	if (walletAddress) {
		try {
			const contract = getContract(provider, governanceContract);
			return await contract.methods
				.voteFor(id)
				.send({ from: walletAddress })
				.on('transactionHash', (tx) => {
					console.log(tx);
					return tx.transactionHash;
				});
		} catch (e) {
			return null;
		}
	} else {
		alert('wallet not connected');
		return null;
	}
};

export const voteAgainst = async (
	provider: any,
	walletAddress: string,
	id: string | string[] | undefined
) => {
	if (walletAddress) {
		try {
			const contract = getContract(provider, governanceContract);
			return await contract.methods
				.voteAgainst(id)
				.send({ from: walletAddress })
				.on('transactionHash', (tx) => {
					console.log(tx);
					return tx.transactionHash;
				});
		} catch (e) {
			return null;
		}
	} else {
		alert('wallet not connected');
		return null;
	}
};

export const voteLockedPeriod = async (provider: any, walletAddress: string) => {
	if (walletAddress) {
		try {
			const contract = getContract(provider, governanceContract);
			return await contract.methods.voteLock(walletAddress).call();
		} catch (e) {
			return null;
		}
	} else {
		alert('wallet not connected');
		return null;
	}
};

export const withdrawStaked = async (
	provider: any,
	walletAddress: string | null,
	amount: string
) => {
	if (walletAddress) {
		try {
			const contract = getContract(provider, governanceContract);
			const web3 = new Web3(provider);
			const tokens = web3.utils.toWei(amount.toString(), 'ether');
			const bntokens = web3.utils.toBN(tokens);
			return await contract.methods
				.withdraw(bntokens)
				.send({ from: walletAddress })
				.on('transactionHash', (tx) => {
					console.log(tx);
					return tx.transactionHash;
				});
		} catch (e) {
			return null;
		}
	} else {
		alert('wallet not connected');
		return null;
	}
};
