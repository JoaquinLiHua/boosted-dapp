import Web3 from 'web3';

// import { AbiItem } from 'web3-utils';
// import BoostVaultABI from '../constants/abi/BoostVault.json';
// import BoostVaultRewardsABI from '../constants/abi/BoostVaultRewards.json';
// // import Notify from "bnc-notify";

// // const options = {
// //   dappId: "6d987d84-81c4-4224-9b30-bf5db73ee93e",
// //   networkId: 1,
// //   darkMode: true,
// // };

// // // initialize notify
// // const notify = Notify(options);

// export const getVaultContract = (provider: any, address: string) => {
// 	const web3 = new Web3(provider);
// 	const contract = new web3.eth.Contract((BoostVaultABI as unknown) as AbiItem, address);
// 	return contract;
// };

// export const getVaultRewardsContract = (provider: any, address: string) => {
// 	const web3 = new Web3(provider);
// 	const contract = new web3.eth.Contract((BoostVaultRewardsABI as unknown) as AbiItem, address);
// 	return contract;
// };

// export const deposit = async (
// 	provider: any,
// 	vaultAddress: string,
// 	amount: string,
// 	decimals: number,
// 	walletAddress: string
// ) => {
// 	const vaultContract = getVaultContract(provider, vaultAddress);
// 	const web3 = new Web3(provider);
// 	const tokens = (Number(amount) * Math.pow(10, decimals)).toFixed(0);
// 	const bntokens = web3.utils.toBN(tokens);
// 	return vaultContract.methods
// 		.deposit(bntokens)
// 		.send({ from: walletAddress })
// 		.on('transactionHash', (tx) => {
// 			// const { emitter } = notify.hash(tx);
// 			// emitter.on("all", (transaction) => ({
// 			//   onclick: () =>
// 			//     window.open(
// 			//       `https://etherscan.io/tx/${transaction.hash}`,
// 			//       "_blank",
// 			//       "noopener, norefferer"
// 			//     ),
// 			// }));
// 			return tx.transactionHash;
// 		});
// };

// export const withdraw = async (
// 	provider: any,
// 	vaultAddress: string,
// 	amount: string,
// 	decimals: number,
// 	walletAddress: string
// ) => {
// 	const vaultContract = getVaultContract(provider, vaultAddress);
// 	const web3 = new Web3(provider);
// 	// console.log(Number(amount));
// 	// console.log(Number(amount) / Math.pow(10, decimals));
// 	const tokens = Math.trunc(Number(amount) * Math.pow(10, decimals));
// 	// console.log(tokens);
// 	// Current value WRONG: 110327327 = 110.32 usdc
// 	// 55058418 = 55.xx usdc
// 	// 0x2e1a7d4d0000000000000000000000000000000000000000000000000000000003481ff2
// 	// 11032732 = 11.032
// 	// 0x2e1a7d4d0000000000000000000000000000000000000000000000000000000000a8589c
// 	// 99292944 =
// 	const bntokens = web3.utils.toBN(tokens);
// 	return vaultContract.methods
// 		.withdraw(bntokens)
// 		.send({ from: walletAddress })
// 		.on('transactionHash', (tx) => {
// 			// const { emitter } = notify.hash(tx);
// 			// emitter.on("all", (transaction) => ({
// 			//   onclick: () =>
// 			//     window.open(
// 			//       `https://etherscan.io/tx/${transaction.hash}`,
// 			//       "_blank",
// 			//       "noopener, norefferer"
// 			//     ),
// 			// }));
// 			return tx.transactionHash;
// 		});
// };

// export const getRewardAmount = async (
// 	provider: any,
// 	vaultRewardsAddress: string,
// 	walletAddress: string | null
// ): Promise<string> => {
// 	if (walletAddress && provider) {
// 		try {
// 			const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardsAddress);
// 			const claimableRewards: string = await vaultRewardsContract.methods
// 				.earned(walletAddress)
// 				.call();
// 			return claimableRewards;
// 		} catch (e) {
// 			console.log(e);
// 			return '0';
// 		}
// 	} else {
// 		return '0';
// 	}
// };

// export const claim = async (
// 	provider: any,
// 	vaultRewardsAddress: string,
// 	walletAddress: string | null
// ) => {
// 	try {
// 		const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardsAddress);
// 		return vaultRewardsContract.methods
// 			.getReward(walletAddress)
// 			.send({ from: walletAddress })
// 			.on('transactionHash', (tx) => {
// 				// const { emitter } = notify.hash(tx);
// 				// emitter.on("all", (transaction) => ({
// 				//   onclick: () =>
// 				//     window.open(
// 				//       `https://etherscan.io/tx/${transaction.hash}`,
// 				//       "_blank",
// 				//       "noopener, norefferer"
// 				//     ),
// 				// }));
// 				return tx.transactionHash;
// 			});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const stake = async (
// 	provider: any,
// 	vaultRewardsAddress: string,
// 	amount: string,
// 	decimals: number,
// 	walletAddress: string
// ) => {
// 	const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardsAddress);
// 	const web3 = new Web3(provider);
// 	const tokens = (Number(amount) * Math.pow(10, decimals)).toFixed(0);
// 	const bntokens = web3.utils.toBN(tokens);
// 	return await vaultRewardsContract.methods
// 		.stake(bntokens)
// 		.send({ from: walletAddress })
// 		.on('transactionHash', (tx) => {
// 			//   const { emitter } = notify.hash(tx);
// 			//   emitter.on("all", (transaction) => ({
// 			//     onclick: () =>
// 			//       window.open(
// 			//         `https://etherscan.io/tx/${transaction.hash}`,
// 			//         "_blank",
// 			//         "noopener, norefferer"
// 			//       ),
// 			//   }));
// 			return tx.transactionHash;
// 		});
// };

// export const unstake = async (
// 	provider: any,
// 	vaultRewardsAddress: string,
// 	amount: string,
// 	decimals: number,
// 	walletAddress: string
// ) => {
// 	try {
// 		const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardsAddress);
// 		const web3 = new Web3(provider);
// 		const tokens = (Number(amount) * Math.pow(10, decimals)).toFixed(0);
// 		const bntokens = web3.utils.toBN(tokens);
// 		return await vaultRewardsContract.methods.withdraw(bntokens).send({ from: walletAddress });
// 		// .on("transactionHash", (tx) => {
// 		//   const { emitter } = notify.hash(tx);
// 		//   emitter.on("all", (transaction) => ({
// 		//     onclick: () =>
// 		//       window.open(
// 		//         `https://etherscan.io/tx/${transaction.hash}`,
// 		//         "_blank",
// 		//         "noopener, norefferer"
// 		//       ),
// 		//   }));
// 		//   return tx.transactionHash;
// 		// });
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const getStakedAmount = async (
// 	provider: any,
// 	stakedAddress: string,
// 	walletAddress: string | null
// ): Promise<string> => {
// 	if (walletAddress) {
// 		try {
// 			const vaultRewardsAddress = getVaultRewardsContract(provider, stakedAddress);
// 			const stakedAmount = await vaultRewardsAddress.methods.balanceOf(walletAddress).call();
// 			return stakedAmount;
// 		} catch (e) {
// 			console.log(e);
// 			return '0';
// 		}
// 	} else {
// 		return '0';
// 	}
// };

// export const getDepositedAmount = async (
// 	provider: any,
// 	vaultAddress: string,
// 	walletAddress: string | null
// ): Promise<string> => {
// 	if (walletAddress) {
// 		try {
// 			const vaultRewardsAddress = getVaultContract(provider, vaultAddress);
// 			const depositedAmount = await vaultRewardsAddress.methods.balanceOf(walletAddress).call();
// 			return depositedAmount;
// 		} catch (e) {
// 			console.log(e);
// 			return '0';
// 		}
// 	} else {
// 		return '0';
// 	}
// };

// export const getPricePerFullShare = async (
// 	provider: any,
// 	vaultAddress: string
// ): Promise<string> => {
// 	try {
// 		const vaultContract = getVaultContract(provider, vaultAddress);
// 		const pricePerFullShare = await vaultContract.methods.getPricePerFullShare().call();
// 		return pricePerFullShare;
// 	} catch (e) {
// 		console.log(e);
// 		return '0';
// 	}
// };

// export const getWithdrawalFee = async (
// 	provider: any,
// 	vaultAddress: string
// ): Promise<{ withdrawFee: string; denom: string }> => {
// 	try {
// 		const vaultContract = getVaultContract(provider, vaultAddress);
// 		const denom = await vaultContract.methods.DENOM().call();
// 		const withdrawFee = await vaultContract.methods.withdrawalFee().call();
// 		return { withdrawFee, denom };
// 	} catch (e) {
// 		console.log(e);
// 		return { withdrawFee: '0', denom: '0' };
// 	}
// };

// export const getNextBoosterAvailable = async (
// 	provider: any,
// 	vaultRewardAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	try {
// 		const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardAddress);
// 		const periodFinish = await vaultRewardsContract.methods
// 			.nextBoostPurchaseTime(walletAddress)
// 			.call();
// 		return periodFinish;
// 	} catch (e) {
// 		console.log(e);
// 		return '9999';
// 	}
// };

// export const getBoostedBalance = async (
// 	provider: any,
// 	vaultRewardAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	try {
// 		const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardAddress);
// 		const boostedBalance = await vaultRewardsContract.methods.boostedBalances(walletAddress).call();
// 		return boostedBalance;
// 	} catch (e) {
// 		console.log(e);
// 		return '0';
// 	}
// };

// export const getBoosterInfo = async (
// 	provider: any,
// 	vaultRewardAddress: string,
// 	walletAddress: string
// ): Promise<{ boosterPrice: string; newBoostBalance: string }> => {
// 	try {
// 		const vaultRewardsContract = getVaultRewardsContract(provider, vaultRewardAddress);
// 		const boosterInfo = await vaultRewardsContract.methods.getBoosterPrice(walletAddress).call();
// 		const newBoostBalance = boosterInfo['newBoostBalance'];
// 		const boosterPrice = boosterInfo['boosterPrice'];
// 		return { boosterPrice, newBoostBalance };
// 	} catch (e) {
// 		console.log(e);
// 		return { boosterPrice: '0', newBoostBalance: '0' };
// 	}
// };

// export const boostCount = async (
// 	provider: any,
// 	vaultRewardAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	const vaultRewardContract = getVaultRewardsContract(provider, vaultRewardAddress);
// 	try {
// 		const boosterCount = await vaultRewardContract.methods.numBoostersBought(walletAddress).call();
// 		return boosterCount;
// 	} catch (e) {
// 		console.log(e);
// 		return '0';
// 	}
// };

// export const boost = async (
// 	provider: any,
// 	vaultRewardAddress: string,
// 	walletAddress: string | null
// ) => {
// 	try {
// 		const vaultRewardContract = getVaultRewardsContract(provider, vaultRewardAddress);
// 		return vaultRewardContract.methods
// 			.boost()
// 			.send({ from: walletAddress })
// 			.on('transactionHash', (tx) => {
// 				// const { emitter } = notify.hash(tx);
// 				// emitter.on("all", (transaction) => ({
// 				//   onclick: () =>
// 				//     window.open(
// 				//       `https://etherscan.io/tx/${transaction.hash}`,
// 				//       "_blank",
// 				//       "noopener, norefferer"
// 				//     ),
// 				// }));
// 				return tx.transactionHash;
// 			});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// // @TODO - support non-stable coins
// export const getVaultValueLocked = async (
// 	provider: any,
// 	vaultAddress: string,
// 	vaultRewardAddress: string,
// 	decimals: number
// ): Promise<number> => {
// 	try {
// 		const vaultContract = getVaultContract(provider, vaultAddress);
// 		const pricePerFullShare = await getPricePerFullShare(provider, vaultAddress);
// 		const vaultSize: string = await vaultContract.methods.balanceOf(vaultRewardAddress).call();

// 		const vaultSizeNum = Number(vaultSize) / Math.pow(10, decimals);
// 		const pricePerFullShareNum = Number(pricePerFullShare) / 1e18;
// 		return vaultSizeNum * pricePerFullShareNum;
// 	} catch (e) {
// 		console.log(e);
// 		return 0;
// 	}
// };
