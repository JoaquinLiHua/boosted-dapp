import { useCallback, useState, useEffect } from 'react';
import Initialiser from 'context/Initialiser';

import BN from 'bignumber.js';
import { getPricePerFullShare } from 'utils/vault';

export const useGetVaultPricePerFullShare = (vaultRewardsAddress: string) => {
	const [amount, setAmount] = useState(new BN(0));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchPrice = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await getPricePerFullShare(provider, vaultRewardsAddress));
			setAmount(amount);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchPrice();
			const refreshInterval = setInterval(fetchPrice, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setAmount, fetchPrice]);

	return amount;
};
