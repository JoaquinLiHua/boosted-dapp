import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { stake, unstake } from '../../utils/vault';

export const useVaultRewardsStake = (vaultRewardsAddress: string, decimals: number) => {
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const handleStake = useCallback(
		async (amount: string) => {
			if (account) {
				const txHash = await stake(ethereum, vaultRewardsAddress, amount, decimals, account);
				return txHash;
			}
		},
		[account, vaultRewardsAddress, ethereum, decimals]
	);

	const handleUnstake = useCallback(
		async (amount: string) => {
			if (account) {
				const txHash = await unstake(ethereum, vaultRewardsAddress, amount, decimals, account);
				return txHash;
			}
		},
		[account, vaultRewardsAddress, ethereum, decimals]
	);

	return {
		onVaultRewardsStake: handleStake,
		onVaultRewardsUnstake: handleUnstake,
	};
};
