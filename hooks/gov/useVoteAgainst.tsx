import { useCallback } from 'react';

import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { voteAgainst } from 'utils/governance';

export const useVoteAgainst = (id: string | string[] | undefined) => {
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const handleVoteAgainst = useCallback(async () => {
		if (account && id) {
			try {
				const tx = await voteAgainst(ethereum, account, id);
				return tx;
			} catch (e) {
				return false;
			}
		}
	}, [account, ethereum, id]);

	return {
		onVoteAgainst: handleVoteAgainst,
	};
};
