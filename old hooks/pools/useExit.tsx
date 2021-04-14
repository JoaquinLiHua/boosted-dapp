import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { exit } from 'utils/pool';

export const useExit = () => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleExit = useCallback(
		async (poolContract: string) => {
			if (walletAddress) {
				const txHash = await exit(provider, poolContract, walletAddress);
				return txHash;
			}
		},
		[walletAddress, provider]
	);

	return { onExit: handleExit };
};
