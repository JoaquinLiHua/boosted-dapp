import { useCallback, useEffect, useState } from 'react';
import Initialiser from 'context/Initialiser';

import { usePriceFeedContext } from 'context/PriceFeedContext';
import { getBalancerPoolPriceInUSD, getBoostPoolPriceInUSD, getPoolValueInUSD } from 'utils/pool';
import { ALL_POOLS } from 'constants/pools';
import { B_VAULTS } from 'constants/bVaults';
import { getVaultValueLocked } from 'utils/vault';

export const useTotalValueLocked = () => {
	const [totalValueLockedInUSD, setTotalValueLockedInUSD] = useState<string>('0');
	const { coinGecko } = usePriceFeedContext();
	const { provider }: { provider: any } = Initialiser.useContainer();

	const fetchAllPoolValues = useCallback(async () => {
		const totalValue = ALL_POOLS.map(async (pool) => {
			if (pool.code === 'boost_pool') {
				return (await getBoostPoolPriceInUSD(provider, coinGecko)) ?? 0;
			} else {
				if (pool.open) {
					return (
						(await getBalancerPoolPriceInUSD(
							provider,
							coinGecko,
							pool.address,
							pool.tokenContract,
							pool.underlyingToken
						)) ?? 0
					);
				} else {
					return (
						(await getPoolValueInUSD(provider, pool.address, pool.tokenContract, coinGecko)) ?? 0
					);
				}
			}
		});

		const totalVaultValue = B_VAULTS.map(async (vault) => {
			if (vault.vaultAddress !== '' && vault.vaultRewardAddress !== '') {
				return await getVaultValueLocked(
					provider,
					vault.vaultAddress,
					vault.vaultRewardAddress,
					vault.decimals
				);
			} else {
				return 0;
			}
		});

		const totalValueResolved = await Promise.all(totalValue).then((values) => {
			return values.reduce(function (a, b) {
				return a + b;
			}, 0);
		});

		const totalVaultValueResolved = await Promise.all(totalVaultValue).then((values) => {
			return values.reduce(function (a, b) {
				return a + b;
			}, 0);
		});

		setTotalValueLockedInUSD((totalValueResolved + totalVaultValueResolved).toString());
	}, [provider, coinGecko]);

	useEffect(() => {
		if (provider) {
			fetchAllPoolValues();
			const refreshInterval = setInterval(fetchAllPoolValues, 30000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [provider, fetchAllPoolValues]);

	return totalValueLockedInUSD;
};
