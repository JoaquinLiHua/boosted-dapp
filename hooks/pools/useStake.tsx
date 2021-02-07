import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { stake, unstake } from 'utils/pool';

export const useStake = (poolContract: string) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleStake = useCallback(
		async (amount: string) => {
			if (walletAddress) {
				const txHash = await stake(provider, poolContract, amount, walletAddress);
				return txHash;
			}
		},
		[walletAddress, poolContract, provider]
	);

	const handleUnstake = useCallback(
		async (amount: string) => {
			if (walletAddress) {
				const txHash = await unstake(provider, poolContract, amount, walletAddress);
				return txHash;
			}
		},
		[walletAddress, poolContract, provider]
	);

	return { onStake: handleStake, onUnstake: handleUnstake };
};
