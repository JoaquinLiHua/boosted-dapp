import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import BN from 'bignumber.js';
import { getStakedAmount } from 'utils/vault';

export const useGetVaultRewardsStakedAmount = (vaultRewardsAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchStakedAmount = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await getStakedAmount(provider, vaultRewardsAddress, walletAddress));
			setAmount(amount);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchStakedAmount();
			const refreshInterval = setInterval(fetchStakedAmount, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setAmount, fetchStakedAmount]);

	return amount;
};
