import Web3 from 'web3';

// import { AbiItem } from 'web3-utils';
// import BoostPoolsV1 from '../constants/abi/BoostPoolsV1.json';
// import BoostPoolsV2 from '../constants/abi/BoostPoolsV2.json';
// import { wethToken, uniswapLPToken } from 'constants/tokenAddresses';
// import { uniswapPool, uniswapPoolV2 } from 'constants/pools';
// import { boostToken } from 'constants/bfAddresses';
// import BN from 'bignumber.js';
// import { getERC20Contract } from './erc20';

// export const getPoolContract = (provider: any, address: string) => {
// 	const web3 = new Web3(provider);
// 	const contract = new web3.eth.Contract((BoostPoolsV1 as unknown) as AbiItem, address);
// 	return contract;
// };

// export const getPoolV2Contract = (provider: any, address: string) => {
// 	const web3 = new Web3(provider);
// 	const contract = new web3.eth.Contract((BoostPoolsV2 as unknown) as AbiItem, address);
// 	return contract;
// };

// interface PoolStats {
// 	periodFinish: string;
// 	poolSize: string;
// 	boosterPrice: string;
// }

// export const getPoolStats = async (
// 	provider: any,
// 	poolAddress: string,
// 	v1: boolean,
// 	walletAddress: string | null
// ): Promise<PoolStats | null> => {
// 	if (provider && walletAddress) {
// 		try {
// 			let poolContract;
// 			let periodFinish;
// 			let poolSize;
// 			let boosterPrice;
// 			if (v1) {
// 				poolContract = getPoolContract(provider, poolAddress);
// 				poolSize = await poolContract.methods.totalSupply().call();
// 			} else {
// 				poolContract = getPoolV2Contract(provider, poolAddress);
// 				periodFinish = await poolContract.methods.periodFinish().call();
// 				poolSize = await poolContract.methods.totalSupply().call();
// 				const boosterInfo = await poolContract.methods.getBoosterPrice(walletAddress).call();
// 				boosterPrice = boosterInfo['boosterPrice'];
// 			}
// 			return {
// 				periodFinish,
// 				poolSize,
// 				boosterPrice,
// 			};
// 		} catch (e) {
// 			console.log(e);
// 			return null;
// 		}
// 	} else {
// 		return null;
// 	}
// };

// export const getPoolValueInUSD = async (
// 	provider: any,
// 	poolAddress: string,
// 	tokenAddress: string,
// 	coinGecko: any
// ): Promise<number> => {
// 	if (provider && poolAddress && coinGecko) {
// 		try {
// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: tokenAddress,
// 				vs_currencies: 'usd',
// 			});
// 			const tokenContract = getPoolContract(provider, tokenAddress);
// 			const poolSize = (await tokenContract.methods.balanceOf(poolAddress).call()) / 1e18;
// 			const priceInUSD = data[tokenAddress].usd;
// 			const poolSizeNumber = new BN(poolSize).toNumber();
// 			return priceInUSD * poolSizeNumber;
// 		} catch (e) {
// 			console.log(e);
// 			return 0;
// 		}
// 	} else {
// 		return 0;
// 	}
// };

// export const getBoostPoolPriceInUSD = async (provider: any, coinGecko: any): Promise<number> => {
// 	if (provider && coinGecko) {
// 		try {
// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [wethToken, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			const poolContract = getPoolContract(provider, uniswapPool);
// 			const boostTokenContract = getERC20Contract(provider, boostToken);
// 			const wethTokenContract = getERC20Contract(provider, wethToken);
// 			const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);
// 			const totalUNIAmount = (await boostWethUniContract.methods.totalSupply().call()) / 1e18;
// 			const totalBoostAmount =
// 				(await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;
// 			const totalWETHAmount =
// 				(await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;
// 			const boostPoolSize = (await poolContract.methods.totalSupply().call()) / 1e18;
// 			const boostPerUNI = totalBoostAmount / totalUNIAmount;
// 			const WETHPerUNI = totalWETHAmount / totalUNIAmount;
// 			if (data) {
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const wethPriceInUSD = data[wethToken.toLowerCase()].usd;
// 				const UNIPrice = boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;
// 				const poolSizeNumber = new BN(boostPoolSize).toNumber();
// 				return UNIPrice * poolSizeNumber;
// 			} else {
// 				return 0;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return 0;
// 		}
// 	} else {
// 		return 0;
// 	}
// };

// export const getBoostPoolV2PriceInUSD = async (provider: any, coinGecko: any): Promise<number> => {
// 	if (provider && coinGecko) {
// 		try {
// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [wethToken, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			const poolContract = getPoolContract(provider, uniswapPoolV2);
// 			const boostTokenContract = getERC20Contract(provider, boostToken);
// 			const wethTokenContract = getERC20Contract(provider, wethToken);
// 			const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);
// 			const totalUNIAmount = (await boostWethUniContract.methods.totalSupply().call()) / 1e18;
// 			const totalBoostAmount =
// 				(await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;
// 			const totalWETHAmount =
// 				(await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;
// 			const boostPoolSize = (await poolContract.methods.totalSupply().call()) / 1e18;
// 			const boostPerUNI = totalBoostAmount / totalUNIAmount;
// 			const WETHPerUNI = totalWETHAmount / totalUNIAmount;
// 			if (data) {
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const wethPriceInUSD = data[wethToken.toLowerCase()].usd;
// 				const UNIPrice = boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;
// 				const poolSizeNumber = new BN(boostPoolSize).toNumber();
// 				return UNIPrice * poolSizeNumber;
// 			} else {
// 				return 0;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return 0;
// 		}
// 	} else {
// 		return 0;
// 	}
// };

// export const getBalancerPoolPriceInUSD = async (
// 	provider: any,
// 	coinGecko: any,
// 	poolAddress: string,
// 	lpTokenAddress: string,
// 	tokenTwo?: string
// ): Promise<number> => {
// 	if (provider && coinGecko && tokenTwo) {
// 		try {
// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [tokenTwo, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			const poolContract = getPoolContract(provider, poolAddress);
// 			const boostTokenContract = getERC20Contract(provider, boostToken);
// 			const tokenTwoContract = getERC20Contract(provider, tokenTwo);
// 			const lpTokenContract = getERC20Contract(provider, lpTokenAddress);
// 			const totalBalancerAmount = (await lpTokenContract.methods.totalSupply().call()) / 1e18;
// 			const boostPoolSize = (await poolContract.methods.totalSupply().call()) / 1e18;
// 			const totalBoostAmount =
// 				(await boostTokenContract.methods.balanceOf(lpTokenAddress).call()) / 1e18;
// 			const totalTokenTwoAmount =
// 				(await tokenTwoContract.methods.balanceOf(lpTokenAddress).call()) /
// 				10 ** (await tokenTwoContract.methods.decimals().call());
// 			const boostPerBalancer = totalBoostAmount / totalBalancerAmount;
// 			const tokenTwoPerBalancer = totalTokenTwoAmount / totalBalancerAmount;
// 			if (data) {
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const tokenTwoPriceInUSD = data[tokenTwo.toLowerCase()].usd;
// 				const balancerPrice =
// 					boostPerBalancer * boostPriceInUSD + tokenTwoPerBalancer * tokenTwoPriceInUSD;
// 				const poolSizeNumber = new BN(boostPoolSize).toNumber();
// 				return balancerPrice * poolSizeNumber;
// 			} else {
// 				return 0;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return 0;
// 		}
// 	} else {
// 		return 0;
// 	}
// };

// export const stake = async (
// 	provider: any,
// 	poolAddress: string,
// 	amount: string,
// 	walletAddress: string
// ) => {
// 	const poolContract = getPoolContract(provider, poolAddress);
// 	const web3 = new Web3(provider);
// 	const tokens = web3.utils.toWei(amount.toString(), 'ether');
// 	const bntokens = web3.utils.toBN(tokens);
// 	return poolContract.methods
// 		.stake(bntokens)
// 		.send({ from: walletAddress })
// 		.on('transactionHash', (tx) => {
// 			console.log(tx);
// 			return tx.transactionHash;
// 		});
// };

// export const unstake = async (
// 	provider: any,
// 	poolAddress: string,
// 	amount: string,
// 	walletAddress: string
// ) => {
// 	try {
// 		const poolContract = getPoolContract(provider, poolAddress);
// 		const web3 = new Web3(provider);
// 		const tokens = web3.utils.toWei(amount.toString(), 'ether');
// 		const bntokens = web3.utils.toBN(tokens);
// 		return poolContract.methods
// 			.withdraw(bntokens)
// 			.send({ from: walletAddress })
// 			.on('transactionHash', (tx) => {
// 				console.log(tx);
// 				return tx.transactionHash;
// 			});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const rewardAmount = async (
// 	provider: any,
// 	poolAddress: string,
// 	walletAddress: string | null
// ): Promise<string> => {
// 	if (walletAddress && provider) {
// 		try {
// 			const poolContract = getPoolContract(provider, poolAddress);
// 			const earnedRewards: string = await poolContract.methods.earned(walletAddress).call();
// 			return earnedRewards;
// 		} catch (e) {
// 			console.log(e);
// 			return '0';
// 		}
// 	} else {
// 		return '0';
// 	}
// };

// export const claim = async (provider: any, poolAddress: string, walletAddress: string | null) => {
// 	try {
// 		const poolContract = getPoolContract(provider, poolAddress);
// 		return poolContract.methods
// 			.getReward()
// 			.send({ from: walletAddress })
// 			.on('transactionHash', (tx) => {
// 				console.log(tx);
// 				return tx.transactionHash;
// 			});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const boost = async (provider: any, poolAddress: string, walletAddress: string | null) => {
// 	try {
// 		const poolContract = getPoolContract(provider, poolAddress);
// 		return poolContract.methods
// 			.boost()
// 			.send({ from: walletAddress })
// 			.on('transactionHash', (tx) => {
// 				console.log(tx);
// 				return tx.transactionHash;
// 			});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const boostCount = async (
// 	provider: any,
// 	poolAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	const poolContract = getPoolContract(provider, poolAddress);
// 	try {
// 		const boosterCount = await poolContract.methods.numBoostersBought(walletAddress).call();
// 		return boosterCount;
// 	} catch (e) {
// 		console.log(e);
// 		return '0';
// 	}
// };

// export const stakedAmount = async (
// 	provider: any,
// 	poolAddress: string,
// 	walletAddress: string | null
// ): Promise<string> => {
// 	if (walletAddress) {
// 		try {
// 			const poolContract = getPoolContract(provider, poolAddress);
// 			const stakedAmount = await poolContract.methods.balanceOf(walletAddress).call();
// 			return stakedAmount;
// 		} catch (e) {
// 			console.log(e);
// 			return '0';
// 		}
// 	} else {
// 		return '0';
// 	}
// };

// export const exit = async (provider: any, poolAddress: string, walletAddress: string) => {
// 	try {
// 		const poolContract = getPoolContract(provider, poolAddress);
// 		return poolContract.methods
// 			.exit()
// 			.send({ from: walletAddress })
// 			.on('transactionHash', (tx) => {
// 				console.log(tx);
// 				return tx.transactionHash;
// 			});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// export const getApyCalculated = async (
// 	provider: any,
// 	poolAddress: string,
// 	tokenAddress: string,
// 	coinGecko: any
// ) => {
// 	if (provider && coinGecko) {
// 		try {
// 			const poolContract = getPoolContract(provider, poolAddress);
// 			const weeklyRewards = await getWeeklyRewards(poolContract);
// 			const rewardPerToken = weeklyRewards / (await poolContract.methods.totalSupply().call());
// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [tokenAddress, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			if (data && data[tokenAddress]) {
// 				const tokenPriceInUSD = data[tokenAddress].usd;
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const apy = ((rewardPerToken * boostPriceInUSD * 100) / tokenPriceInUSD) * 52;
// 				return Number(apy.toFixed(2));
// 			} else {
// 				return null;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return null;
// 		}
// 	} else {
// 		return null;
// 	}
// };

// export const getBoostApy = async (provider: any, coinGecko: any) => {
// 	if (provider && coinGecko) {
// 		try {
// 			const poolContract = getPoolContract(provider, uniswapPool);
// 			const boostTokenContract = getERC20Contract(provider, boostToken);
// 			const wethTokenContract = getERC20Contract(provider, wethToken);
// 			const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);

// 			const weeklyRewards = await getWeeklyRewards(poolContract);

// 			const rewardPerToken = weeklyRewards / (await poolContract.methods.totalSupply().call());

// 			const totalUNIAmount = (await boostWethUniContract.methods.totalSupply().call()) / 1e18;

// 			const totalBoostAmount =
// 				(await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;
// 			const totalWETHAmount =
// 				(await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;

// 			const boostPerUNI = totalBoostAmount / totalUNIAmount;
// 			const WETHPerUNI = totalWETHAmount / totalUNIAmount;

// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [wethToken, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			if (data) {
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const wethPriceInUSD = data[wethToken.toLowerCase()].usd;

// 				const UNIPrice = boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;

// 				const BoostWeeklyROI = (rewardPerToken * boostPriceInUSD * 100) / UNIPrice;

// 				const apy = BoostWeeklyROI * 52;
// 				return Number(apy.toFixed(2));
// 			} else {
// 				return null;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return null;
// 		}
// 	} else {
// 		return null;
// 	}
// };

// export const getBoostV2Apy = async (provider: any, coinGecko: any) => {
// 	if (provider && coinGecko) {
// 		try {
// 			const poolContract = getPoolV2Contract(provider, uniswapPoolV2);
// 			const boostTokenContract = getERC20Contract(provider, boostToken);
// 			const wethTokenContract = getERC20Contract(provider, wethToken);
// 			const boostWethUniContract = getERC20Contract(provider, uniswapLPToken);

// 			const weeklyRewards = await getWeeklyRewards(poolContract);

// 			const rewardPerToken = weeklyRewards / (await poolContract.methods.totalSupply().call());

// 			const totalUNIAmount = (await boostWethUniContract.methods.totalSupply().call()) / 1e18;

// 			const totalBoostAmount =
// 				(await boostTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;
// 			const totalWETHAmount =
// 				(await wethTokenContract.methods.balanceOf(uniswapLPToken).call()) / 1e18;

// 			const boostPerUNI = totalBoostAmount / totalUNIAmount;
// 			const WETHPerUNI = totalWETHAmount / totalUNIAmount;

// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [wethToken, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			if (data) {
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const wethPriceInUSD = data[wethToken.toLowerCase()].usd;

// 				const UNIPrice = boostPerUNI * boostPriceInUSD + WETHPerUNI * wethPriceInUSD;

// 				const BoostWeeklyROI = (rewardPerToken * boostPriceInUSD * 100) / UNIPrice;

// 				const apy = BoostWeeklyROI * 52;
// 				return Number(apy.toFixed(2));
// 			} else {
// 				return null;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return null;
// 		}
// 	} else {
// 		return null;
// 	}
// };

// export const getBalancerAPY = async (
// 	provider: any,
// 	coinGecko: any,
// 	poolAddress: string,
// 	lpTokenContract: string,
// 	tokenTwo?: string
// ) => {
// 	if (provider && coinGecko && tokenTwo) {
// 		try {
// 			const poolContract = getPoolV2Contract(provider, poolAddress);
// 			const boostContract = getERC20Contract(provider, boostToken);
// 			const tokenTwoContract = getERC20Contract(provider, tokenTwo);
// 			const balancerTokenContract = getERC20Contract(provider, lpTokenContract);

// 			const weeklyRewards = await getWeeklyRewards(poolContract);

// 			const rewardPerToken = weeklyRewards / (await poolContract.methods.totalSupply().call());

// 			const totalBalancerAmount = (await balancerTokenContract.methods.totalSupply().call()) / 1e18;

// 			const totalBoostAmount =
// 				(await boostContract.methods.balanceOf(lpTokenContract).call()) / 1e18;
// 			const totalTokenTwoAmount =
// 				(await tokenTwoContract.methods.balanceOf(lpTokenContract).call()) /
// 				10 ** (await tokenTwoContract.methods.decimals().call());

// 			const boostPerBalancer = totalBoostAmount / totalBalancerAmount;
// 			const totalTwoPerBalancer = totalTokenTwoAmount / totalBalancerAmount;

// 			const { data } = await coinGecko.simple.fetchTokenPrice({
// 				contract_addresses: [tokenTwo, boostToken],
// 				vs_currencies: 'usd',
// 			});
// 			if (data) {
// 				const boostPriceInUSD = data[boostToken.toLowerCase()].usd;
// 				const tokenTwoPriceInUSD = data[tokenTwo.toLowerCase()].usd;

// 				const balancerPrice =
// 					boostPerBalancer * boostPriceInUSD + totalTwoPerBalancer * tokenTwoPriceInUSD;

// 				const BoostWeeklyROI = (rewardPerToken * boostPriceInUSD * 100) / balancerPrice;

// 				const apy = BoostWeeklyROI * 52;
// 				return Number(apy.toFixed(2));
// 			} else {
// 				return null;
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return null;
// 		}
// 	} else {
// 		return null;
// 	}
// };

// const getWeeklyRewards = async function (synthContract) {
// 	if (await isRewardPeriodOver(synthContract)) {
// 		return 0;
// 	}
// 	const rewardRate = await synthContract.methods.rewardRate().call();
// 	return Math.round(rewardRate * 604800);
// };

// const isRewardPeriodOver = async function (rewardContract) {
// 	const now = Date.now() / 1000;
// 	const periodFinish = await getPeriodFinishForReward(rewardContract);
// 	return periodFinish < now;
// };

// const getPeriodFinishForReward = async function (rewardContract) {
// 	return await rewardContract.methods.periodFinish().call();
// };

// export const getNextBoosterAvailable = async (
// 	provider: any,
// 	poolAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	try {
// 		const poolContract = getPoolContract(provider, poolAddress);
// 		const periodFinish = await poolContract.methods.nextBoostPurchaseTime(walletAddress).call();
// 		return periodFinish;
// 	} catch (e) {
// 		console.log(e);
// 		return '9999';
// 	}
// };

// export const getBoostedBalance = async (
// 	provider: any,
// 	poolAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	try {
// 		const poolContract = getPoolV2Contract(provider, poolAddress);
// 		const boostedBalance = await poolContract.methods.boostedBalances(walletAddress).call();
// 		return boostedBalance;
// 	} catch (e) {
// 		console.log(e);
// 		return '0';
// 	}
// };

// export const getNewBoostedBalance = async (
// 	provider: any,
// 	poolAddress: string,
// 	walletAddress: string
// ): Promise<string> => {
// 	try {
// 		const poolContract = getPoolV2Contract(provider, poolAddress);
// 		const boosterInfo = await poolContract.methods.getBoosterPrice(walletAddress).call();
// 		return boosterInfo['newBoostBalance'];
// 	} catch (e) {
// 		console.log(e);
// 		return '0';
// 	}
// };
