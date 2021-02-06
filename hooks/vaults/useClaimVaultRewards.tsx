import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { claim } from 'utils/vault';

export const useClaimVaultRewards = (vaultRewardsAddress: string) => {
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const handleClaim = useCallback(async () => {
		if (account) {
			const txHash = await claim(ethereum, vaultRewardsAddress, account);
			return txHash;
		}
	}, [account, vaultRewardsAddress, ethereum]);

	return { onClaim: handleClaim };
};
