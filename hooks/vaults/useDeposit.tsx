import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { deposit, withdraw } from 'utils/vault';

export const useVaultDeposit = (vaultAddress: string, decimals: number) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleDeposit = useCallback(
		async (amount: string) => {
			if (walletAddress) {
				const txHash = await deposit(provider, vaultAddress, amount, decimals, walletAddress);
				return txHash;
			}
		},
		[walletAddress, vaultAddress, provider, decimals]
	);

	const handleWithdraw = useCallback(
		async (amount: string) => {
			if (walletAddress) {
				const txHash = await withdraw(provider, vaultAddress, amount, decimals, walletAddress);
				return txHash;
			}
		},
		[walletAddress, vaultAddress, provider, decimals]
	);

	return { onVaultDeposit: handleDeposit, onVaultWithdraw: handleWithdraw };
};
