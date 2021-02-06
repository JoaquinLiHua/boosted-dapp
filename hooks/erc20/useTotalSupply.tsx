import { useCallback, useEffect, useState } from 'react';

import BN from 'bignumber.js';
import Initialiser from 'context/Initialiser';

import { getTotalSupply } from 'utils/erc20';

export const useTotalSupply = (tokenAddress: string) => {
	const [totalSupply, setTotalSupply] = useState(new BN(0));
	const { provider } = Initialiser.useContainer();

	const fetchTotalSupply = useCallback(async () => {
		const totalSupply = new BN(await getTotalSupply(provider, tokenAddress));
		setTotalSupply(totalSupply);
	}, [provider, tokenAddress]);

	useEffect(() => {
		if (provider) {
			fetchTotalSupply();
			const refreshInterval = setInterval(fetchTotalSupply, 30000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [provider, setTotalSupply, fetchTotalSupply]);

	return totalSupply;
};
