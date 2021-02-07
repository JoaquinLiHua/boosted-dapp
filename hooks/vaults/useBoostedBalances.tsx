import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import { getBoostedBalance, getBoosterInfo } from 'utils/vault';
import BN from 'bignumber.js';

export const useGetBoostedBalances = (vaultRewardsAddress: string) => {
	const [currentBoostedBalance, setCurrentBoostedBalance] = useState(new BN('0'));
	const [nextBoostedBalance, setNextBoostedBalance] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchCurrentBoostedBalance = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await getBoostedBalance(provider, vaultRewardsAddress, walletAddress));
			setCurrentBoostedBalance(amount);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	const fetchNextBoostedBalance = useCallback(async () => {
		if (walletAddress) {
			const { newBoostBalance } = await getBoosterInfo(
				provider,
				vaultRewardsAddress,
				walletAddress
			);
			const amount = new BN(newBoostBalance);
			setNextBoostedBalance(amount);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchNextBoostedBalance();
			fetchCurrentBoostedBalance();
			const refreshInterval1 = setInterval(fetchNextBoostedBalance, 10000);
			const refreshInterval2 = setInterval(fetchCurrentBoostedBalance, 10000);

			return () => {
				clearInterval(refreshInterval1);
				clearInterval(refreshInterval2);
			};
		} else {
			return;
		}
	}, [walletAddress, provider, fetchCurrentBoostedBalance, fetchNextBoostedBalance]);

	return [currentBoostedBalance, nextBoostedBalance];
};
