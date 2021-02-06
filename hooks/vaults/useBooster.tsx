import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { boost } from 'utils/vault';

export const useBoost = (vaultRewardsAddress: string) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleBoost = useCallback(async () => {
		if (walletAddress) {
			const txHash = await boost(provider, vaultRewardsAddress, walletAddress);
			return txHash;
		}
	}, [walletAddress, vaultRewardsAddress, provider]);

	return { onBoost: handleBoost };
};
