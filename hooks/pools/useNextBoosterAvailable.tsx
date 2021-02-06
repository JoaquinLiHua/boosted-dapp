import { useCallback, useState, useEffect } from 'react';

import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { getNextBoosterAvailable } from 'utils/pool';
import BN from 'bignumber.js';

export const useGetNextBoosterAvailable = (poolAddress: string) => {
	const [duration, setDuration] = useState(new BN(0));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchTime = useCallback(async () => {
		if (account) {
			const time = new BN(await getNextBoosterAvailable(ethereum, poolAddress, account));
			setDuration(time);
		}
	}, [account, ethereum, poolAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchTime();
			const refreshInterval = setInterval(fetchTime, 10000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [account, ethereum, fetchTime]);

	return duration;
};
