import { useCallback } from 'react';

import Initialiser from 'context/Initialiser';

import { voteFor } from 'utils/governance';

export const useVoteFor = (id: string | string[] | undefined) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleVoteFor = useCallback(async () => {
		if (walletAddress && id) {
			try {
				const tx = await voteFor(provider, walletAddress, id);
				return tx;
			} catch (e) {
				return false;
			}
		}
	}, [walletAddress, provider, id]);

	return {
		onVoteFor: handleVoteFor,
	};
};
