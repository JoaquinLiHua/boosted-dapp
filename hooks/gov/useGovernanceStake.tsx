import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { stakeForProposal, withdrawStaked } from '../../utils/governance';

export const useGovernanceStake = () => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleStake = useCallback(
		async (amount: string) => {
			const txHash = await stakeForProposal(provider, walletAddress, amount);
			return txHash;
		},
		[walletAddress, provider]
	);

	const handleUnstake = useCallback(
		async (amount: string) => {
			const txHash = await withdrawStaked(provider, walletAddress, amount);
			return txHash;
		},
		[walletAddress, provider]
	);

	return { onStake: handleStake, onUnstake: handleUnstake };
};
