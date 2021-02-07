import { useCallback, useEffect, useState } from 'react';

import BN from 'bignumber.js';
import Initialiser from 'context/Initialiser';

import { voteLockedPeriod } from 'utils/governance';

export const useVoteLockedPeriod = () => {
	const [lockedPeriod, setLockedPeriod] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchLockedPeriod = useCallback(async () => {
		if (walletAddress) {
			const period = new BN(await voteLockedPeriod(provider, walletAddress));
			setLockedPeriod(period);
		}
	}, [provider, walletAddress]);

	useEffect(() => {
		if (provider) {
			fetchLockedPeriod();
			const refreshInterval = setInterval(fetchLockedPeriod, 30000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [provider, fetchLockedPeriod]);

	return lockedPeriod;
};
