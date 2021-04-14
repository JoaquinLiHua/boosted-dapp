import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { stake, unstake } from '../../utils/vault';

export const useVaultRewardsStake = (vaultRewardsAddress: string, decimals: number) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleStake = useCallback(
		async (amount: string) => {
			if (walletAddress) {
				const txHash = await stake(provider, vaultRewardsAddress, amount, decimals, walletAddress);
				return txHash;
			}
		},
		[walletAddress, vaultRewardsAddress, provider, decimals]
	);

	const handleUnstake = useCallback(
		async (amount: string) => {
			if (walletAddress) {
				const txHash = await unstake(
					provider,
					vaultRewardsAddress,
					amount,
					decimals,
					walletAddress
				);
				return txHash;
			}
		},
		[walletAddress, vaultRewardsAddress, provider, decimals]
	);

	return {
		onVaultRewardsStake: handleStake,
		onVaultRewardsUnstake: handleUnstake,
	};
};
