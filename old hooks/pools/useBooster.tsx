import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { boost } from 'utils/pool';

export const useBoost = (poolContract: string) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleBoost = useCallback(async () => {
		if (walletAddress) {
			const txHash = await boost(provider, poolContract, walletAddress);
			return txHash;
		}
	}, [walletAddress, poolContract, provider]);

	return { onBoost: handleBoost };
};
