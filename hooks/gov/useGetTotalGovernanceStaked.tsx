import { useCallback, useEffect, useState } from 'react';

import BN from 'bignumber.js';
import Initialiser from 'context/Initialiser';

import { getTotalStaked } from '../../utils/governance';

export const useGetTotalGovernanceStaked = () => {
	const [staked, setStaked] = useState(new BN(0));
	const { provider }: { provider: any } = Initialiser.useContainer();

	const fetchStaked = useCallback(async () => {
		const staked = await getTotalStaked(provider);
		setStaked(new BN(staked));
	}, [provider]);

	useEffect(() => {
		if (provider) {
			fetchStaked();
			const refreshInterval = setInterval(fetchStaked, 10000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [provider, setStaked, fetchStaked]);

	return staked;
};
