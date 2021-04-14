import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { claim } from 'utils/vault';

export const useClaimVaultRewards = (vaultRewardsAddress: string) => {
	const { walletAddress, provider } = Initialiser.useContainer();

	const handleClaim = useCallback(async () => {
		if (walletAddress) {
			const txHash = await claim(provider, vaultRewardsAddress, walletAddress);
			return txHash;
		}
	}, [walletAddress, vaultRewardsAddress, provider]);

	return { onClaim: handleClaim };
};
