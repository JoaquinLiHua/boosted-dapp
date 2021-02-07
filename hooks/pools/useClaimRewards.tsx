import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { claim } from 'utils/pool';

export const useClaimRewards = (poolContract: string) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleClaim = useCallback(async () => {
		if (walletAddress) {
			const txHash = await claim(provider, poolContract, walletAddress);
			return txHash;
		}
	}, [walletAddress, poolContract, provider]);

	return { onClaim: handleClaim };
};
