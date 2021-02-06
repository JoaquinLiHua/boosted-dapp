import { useCallback } from 'react';

import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { voteFor } from 'utils/governance';

export const useVoteFor = (id: string | string[] | undefined) => {
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const handleVoteFor = useCallback(async () => {
		if (account && id) {
			try {
				const tx = await voteFor(ethereum, account, id);
				return tx;
			} catch (e) {
				return false;
			}
		}
	}, [account, ethereum, id]);

	return {
		onVoteFor: handleVoteFor,
	};
};
