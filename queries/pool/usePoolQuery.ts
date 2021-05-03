import { useQuery } from 'react-query';

import Initialiser from 'context/Initialiser';
import QUERY_KEYS from 'constants/queryKeys';
import { AvailablePools, poolBySymbol } from 'constants/pools';
import BoostRewards from 'contracts/BoostRewards';
import { ethers, BigNumber } from 'ethers';
import ERC20 from 'contracts/ERC20';

export type PoolQueryData = {
	duration: number;
	distribution: number;
	totalStaked: BigNumber;
	userStakedBalance: BigNumber;
	userStakingTokenBalance: BigNumber;
	rewardsEarnedAmount: BigNumber;
	boosterPriceArray: BigNumber[];
};

const usePoolQuery = (pool: AvailablePools) => {
	const { isAppReady, provider, walletAddress } = Initialiser.useContainer();

	return useQuery<PoolQueryData>(
		QUERY_KEYS.Pools.PoolInfo(pool, walletAddress ?? ''),
		async () => {
			const poolObj = poolBySymbol();
			const rewardsContract = new ethers.Contract(
				poolObj[pool].contractAddress,
				BoostRewards.abi,
				provider as any
			);
			const stakedToken = poolObj[pool].stakedTokenAddress;
			const tokenContract = new ethers.Contract(stakedToken, ERC20.abi);
			const [duration, rate, periodFinish] = await Promise.all([
				rewardsContract.duration(),
				rewardsContract.rewardRate(),
				rewardsContract.periodFinish(),
			]);

			const durationInWeeks = Number(duration) / 3600 / 24 / 7;
			const isPeriodFinished = new Date().getTime() > Number(periodFinish) * 1000;
			const distribution = isPeriodFinished
				? 0
				: Math.trunc(Number(duration) * (rate / 1e18)) / durationInWeeks;

			const totalStaked = ethers.BigNumber.from(
				await tokenContract.balanceOf(poolObj[pool].contractAddress)
			);

			let userStakedBalance = ethers.BigNumber.from(0);
			let userStakingTokenBalance = ethers.BigNumber.from(0);
			let rewardsEarnedAmount = ethers.BigNumber.from(0);
			let boosterPriceArray = [];

			if (walletAddress) {
				[userStakedBalance, userStakingTokenBalance, rewardsEarnedAmount] = await Promise.all([
					rewardsContract.balanceOf(walletAddress),
					tokenContract.balanceOf(walletAddress),
					rewardsContract.earned(walletAddress),
				]);

				boosterPriceArray = await rewardsContract.getBoosterPrice(walletAddress);

				[userStakedBalance, userStakingTokenBalance, rewardsEarnedAmount] = [
					userStakedBalance,
					userStakingTokenBalance,
					rewardsEarnedAmount,
				].map((data) => ethers.BigNumber.from(data));
			}

			return {
				duration,
				distribution,
				periodFinish,
				totalStaked,
				userStakedBalance,
				userStakingTokenBalance,
				rewardsEarnedAmount,
				boosterPriceArray,
			};
		},
		{
			enabled: isAppReady,
		}
	);
};

export default usePoolQuery;
