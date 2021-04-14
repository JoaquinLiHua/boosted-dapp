import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import { boostCount } from 'utils/vault';
import BN from 'bignumber.js';

export const useGetBoosterBalance = (vaultRewardsAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchBalance = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await boostCount(provider, vaultRewardsAddress, walletAddress));
			setAmount(amount);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchBalance();
			const refreshInterval = setInterval(fetchBalance, 10000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setAmount, fetchBalance]);

	return amount;
};
