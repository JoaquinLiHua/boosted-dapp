import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import { stakedAmount } from '../../utils/pool';
import BN from 'bignumber.js';

export const useStakedAmount = (poolAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchStakedAmount = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await stakedAmount(provider, poolAddress, walletAddress));
			setAmount(amount);
		}
	}, [walletAddress, provider, poolAddress]);

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
