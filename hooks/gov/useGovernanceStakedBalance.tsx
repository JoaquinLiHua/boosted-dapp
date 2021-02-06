import { useCallback, useEffect, useState } from 'react';

import BN from 'bignumber.js';
import Initialiser from 'context/Initialiser';

import { getStaked } from 'utils/governance';

export const useGovernanceStakedBalance = () => {
	const [balance, setBalance] = useState(new BN(0));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchBalance = useCallback(async () => {
		if (walletAddress) {
			const balance = await getStaked(provider, walletAddress);
			setBalance(new BN(balance));
		}
	}, [walletAddress, provider]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchBalance();
			const refreshInterval = setInterval(fetchBalance, 30000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setBalance, fetchBalance]);

	return balance;
};
