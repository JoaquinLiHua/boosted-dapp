import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import { getBoosterInfo } from 'utils/vault';
import BN from 'bignumber.js';

export const useGetBoosterPrice = (vaultRewardsAddress: string) => {
	const [boosterPrice, setBoosterPrice] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchBoosterPrice = useCallback(async () => {
		if (walletAddress) {
			const { boosterPrice } = await getBoosterInfo(provider, vaultRewardsAddress, walletAddress);
			const amount = new BN(boosterPrice);
			setBoosterPrice(amount);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchBoosterPrice();
			const refreshInterval1 = setInterval(fetchBoosterPrice, 10000);

			return () => {
				clearInterval(refreshInterval1);
			};
		} else {
			return;
		}
	}, [walletAddress, provider, fetchBoosterPrice]);

	return boosterPrice;
};
