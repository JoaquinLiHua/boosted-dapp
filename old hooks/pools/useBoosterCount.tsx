import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import { boostCount } from 'utils/pool';
import BN from 'bignumber.js';

export const useGetBoosterBalance = (poolAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchBalance = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await boostCount(provider, poolAddress, walletAddress));
			setAmount(amount);
		}
	}, [walletAddress, provider, poolAddress]);

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
