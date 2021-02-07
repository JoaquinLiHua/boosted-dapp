import { useCallback } from 'react';

import Initialiser from 'context/Initialiser';

import { voteAgainst } from 'utils/governance';

export const useVoteAgainst = (id: string | string[] | undefined) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleVoteAgainst = useCallback(async () => {
		if (walletAddress && id) {
			try {
				const tx = await voteAgainst(provider, walletAddress, id);
				return tx;
			} catch (e) {
				return false;
			}
		}
	}, [walletAddress, provider, id]);

	return {
		onVoteAgainst: handleVoteAgainst,
	};
};
