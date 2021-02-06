import { useCallback, useState, useEffect } from 'react';
import Initialiser from 'context/Initialiser';

import { rewardAmount as poolRewardAmount } from 'utils/pool';
import { getRewardAmount as vaultRewardAmount } from 'utils/vault';
import BN from 'bignumber.js';
import { ALL_POOLS } from 'constants/pools';
import { B_VAULTS } from 'constants/bVaults';

export const useGetTotalRewardAmount = () => {
	const [amount, setAmount] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();
	const fetchReadyToHarvest = useCallback(async () => {
		if (walletAddress) {
			const totalPoolAmount = ALL_POOLS.map(async (pool) => {
				return new BN(await poolRewardAmount(provider, pool.address, walletAddress));
			});
			const totalVaultAmount = B_VAULTS.map(async (vault) => {
				if (vault.vaultRewardAddress !== '') {
					return new BN(await vaultRewardAmount(provider, vault.vaultRewardAddress, walletAddress));
				} else {
					return new BN('0');
				}
			});
			const totalPoolResolved = await Promise.all(totalPoolAmount).then((values) => {
				return values.reduce(function (a: BN, b: BN) {
					return a.plus(b);
				}, new BN('0'));
			});
			const totalVaultResolved = await Promise.all(totalVaultAmount).then((values) => {
				return values.reduce(function (a: BN, b: BN) {
					return a.plus(b);
				}, new BN('0'));
			});
			setAmount(totalPoolResolved.plus(totalVaultResolved));
		}
	}, [walletAddress, provider]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchReadyToHarvest();
			const refreshInterval = setInterval(fetchReadyToHarvest, 10000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setAmount, fetchReadyToHarvest]);

	return amount;
};
