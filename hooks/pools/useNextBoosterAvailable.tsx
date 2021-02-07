import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import { getNextBoosterAvailable } from 'utils/pool';
import BN from 'bignumber.js';

export const useGetNextBoosterAvailable = (poolAddress: string) => {
	const [duration, setDuration] = useState(new BN(0));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchTime = useCallback(async () => {
		if (walletAddress) {
			const time = new BN(await getNextBoosterAvailable(provider, poolAddress, walletAddress));
			setDuration(time);
		}
	}, [walletAddress, provider, poolAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchTime();
			const refreshInterval = setInterval(fetchTime, 10000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, fetchTime]);

	return duration;
};
